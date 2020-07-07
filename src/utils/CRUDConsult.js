import Vue from "vue";
import CRUDCommon from "./CRUDCommon";

export default {
    mixins: [CRUDCommon],
    data() {
        return {
            itemSelected: null,
            popRemoveItem: false,
            page: {
                content: [],
                totalElements: 0
            },
            statusList: [
                {label: 'ACTIVE', desc: this.$t('lbl_active')},
                {label: 'INACTIVE', desc: this.$t('lbl_inactive')}
            ],
            pageable: {
                pageSize: 10,
                pageNumber: 0,
                offset: 0,
                entity: {
                    status: this.isDesktop() ? "ACTIVE" : null,
                }
            }
        }
    },
    async mounted() {
        await this.initConsult();
        this.consult();
    },
    methods: {
        initConsult() {},
        consult(){
            this.getService().findAll(this.pageable).then((response) => {
                this.page = response;
            });
        },
        openCreate() {
            this.$router.push("/" + this.crud + "/create");
        },
        openEdit(idEntity) {
            this.$router.push("/" + this.crud + "/update/" + idEntity);
        },
        remove(id){
            this.itemSelected = id;
            this.popRemoveItem = true;
        },
        confirmRemoveYes(){
            this.getService().delete(this.itemSelected).then((response) => {
                this.popRemoveItem = false;
                this.itemSelected = null;
                Vue.prototype.$msgbus.addMessageSuccess("msg_info", response.message);
                this.onPage();
            }).catch(error => {
                this.popRemoveItem = false;
                this.itemSelected = null;
                this.catchError(error);
            });
        },
        confirmRemoveNo(){
            this.popRemoveItem = false;
        },

        onPage(event) {
            if (event) {
                this.pageable.pageSize = event.rows;
                this.pageable.pageNumber = event.first == 0 ? 0 : event.first / event.rows;
                this.pageable.offset = event.first;
                if (event.sortField) {
                    this.pageable.orderDTO = [{
                        field: event.sortField,
                        direction: event.sortOrder == 1 ? "ASC" : "DESC"
                    }];
                }
            }
            this.pageable.filterDTO = this.filters;
            this.consult();
        },
        isDesktop() {
            return window.innerWidth > 1024;
        },
        getStatusDesc(value) {
            if (value) {
                return value == "ACTIVE" ? this.$t('lbl_active') : this.$t('lbl_inactive')
            }
            return "";
        }
    }
};
