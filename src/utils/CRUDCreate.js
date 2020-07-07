import Vue from "vue";
import CRUDCommon from "./CRUDCommon";

export default {
    mixins: [CRUDCommon],
    data() {
        return {
            submitted: false,
            statusList: [
                {label: 'ACTIVE', desc: this.$t('lbl_active')},
                {label: 'INACTIVE', desc: this.$t('lbl_inactive')}
            ],
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            const id = this.$route.params.id;
            if (id) {
                this.getService().get(id).then((response) => {
                    this.entity = response;
                    this.initEdit();
                }).catch(this.catchError);
            }else{
                this.initCreate();
            }
        },
        initEdit(){},
        initCreate(){},
        posSave() {},
        posValidate() {return true;},
        openConsult() {
            this.$router.push("/" + this.crud + "/consult");
        },
        save(isFormValid) {
            this.submitted = true;
            if (!isFormValid) {
                return;
            }
            if (!this.posValidate()) {
                return;
            }
            this.getService().save(this.getModel()).then((response) => {
                Vue.prototype.$msgbus.addMessageSuccess("msg_info", response.message);
                if (!this.entity.id) {
                    Object.assign(this.$data, this.$options.data.apply(this))
                }
                this.posSave();
            }).catch(this.catchError);
        },
    }
};