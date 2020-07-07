<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">
                <h1>
                    {{ title }}
                </h1>

                <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col-12">
                        <DataTable class="p-datatable-responsive" :value="page.content" :lazy="true" :filters="pageable.entity" :paginator="true" :rows="10"
                                   :totalRecords="page.totalElements" @filter="onPage($event)" @page="onPage($event)" @sort="onPage($event)">

                            <Column field="company.name" :header="$t('menu.lbl_company')" :sortable="true">
                                <template #body="slotProps">
                                    <span>{{ slotProps.data.company.name  }}</span>
                                </template>
                            </Column>

                            <Column field="status"  headerStyle=" text-align: center overflow: visible" :header="$t('lbl_status')" :sortable="true" filterMatchMode="contains"
                                    bodyStyle="text-align: center; overflow: visible;">
                                <template #filter>
                                    <Dropdown v-model="pageable.entity['status']" @change="onPage()" :options="statusList" optionLabel="desc" optionValue="label"
                                              placeholder="Selecione..." class="p-column-filter" :showClear="true">
                                        <template #option="slotProps">
                                            <div class="p-clearfix p-dropdown-car-option">
                                                <span>{{slotProps.option.desc}}</span>
                                            </div>
                                        </template>
                                    </Dropdown>
                                </template>
                                <template #body="slotProps">
                                    <span>{{ getStatusDesc(slotProps.data.status)   }}</span>
                                </template>
                            </Column>

                            <Column :header="$t('contract.lbl_initial_date')" headerStyle="text-align: center"  bodyStyle="text-align: center;" >
                                <template #body="slotProps">
                                    <span>{{ slotProps.data.initialDate | formatDate }}</span>
                                </template>
                            </Column>
                            <Column :header="$t('contract.lbl_final_date')" headerStyle="text-align: center"  bodyStyle="text-align: center;">
                                <template #body="slotProps">
                                    <span>{{ slotProps.data.finalDate | formatDate }}</span>
                                </template>
                            </Column>

                            <Column  :header="$t('lbl_action')" headerStyle="width: 10em; text-align: center"  bodyStyle="width: 10em; text-align: center; overflow: visible">
                                <template #body="slotProps">
                                    <Button type="button" icon="pi pi-fw pi-eye" @click="openEdit(slotProps.data.id)" class="p-button-info"
                                            style="margin-right: .5em" v-tooltip.left="$t('lbl_see')"/>
                                </template>
                            </Column>
                            <template #empty>
                                {{$t('msg_no_records_found')}}
                            </template>

                        </DataTable>
                    </div>
                </div>

            </div>
        </div>

        <Dialog :header="$t('msg_confirm')" position="top" :visible.sync="popRemoveItem" :maximizable="true" :modal="true">
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h3>{{ $t('msg_confirm_remove') }}</h3>
                </div>
            </div>
            <template #footer>
                <Button :label="$t('lbl_yes')" icon="pi pi-check" @click="confirmRemoveYes"/>
                <Button :label="$t('lbl_no')" icon="pi pi-times" @click="confirmRemoveNo" class="p-button-secondary"/>
            </template>
        </Dialog>

    </div>
</template>

<script>
    import CRUDConsult from "../../../utils/CRUDConsult";
    import ContractService from "../../../service/contract-service";
    import UserService from "../../../service/user-service";

    const contractService = new ContractService();
    const userService = new UserService();

    export default {
        mixins: [CRUDConsult],
        name: "ContractConsult",
        data() {
            return {
                crud: "contract",
                title: this.$t('contract.lbl_my_contracts_consult_title'),
                pageable: {
                    entity: {
                        company: {}
                    }
                }
            }
        },
        methods: {
            async initConsult() {
                const user = await userService.getCurrentUserInfo();
                this.pageable.entity.company.id = user.company.id;
            },
            consult(){
                this.getService().findMyContracts(this.pageable).then((response) => {
                    this.page = response;
                });
            },
            openEdit(idEntity) {
                this.$router.push("/my-contracts/detail/" + idEntity);
            },
            getService() {
                return contractService;
            },
        }
    }
</script>

<style scoped>

</style>