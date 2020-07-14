<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">
                <h1>
                    {{ title }}
                    <Button style="float: right" icon="pi pi-plus-circle" class="p-button-rounded p-shadow-7" @click="openCreate" v-tooltip.left="$t('company.lbl_create_title')"/>
                </h1>

                <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col-12 p-md-3">
                        <InputText type="text" v-model="pageable.entity['code']" class="p-column-filter" :placeholder="$t('company.lbl_code')"/>
                    </div>


                    <div class="p-field p-col-12 p-md-3">
                        <Dropdown v-model="pageable.entity['status']" :options="statusList" optionLabel="desc" optionValue="label"
                                  placeholder="Selecione..." class="p-column-filter" :showClear="true">
                            <template #option="slotProps">
                                <div class="p-clearfix p-dropdown-car-option">
                                    <span>{{slotProps.option.desc}}</span>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <InputText type="text" v-model="pageable.entity['name']" class="p-column-filter" :placeholder="$t('company.lbl_name')"/>
                    </div>
                    <div class="p-field p-col-12 p-md-1">
                        <Button :label="$t('lbl_filter')" @click="onPage()"/>
                    </div>
                    <div class="p-field p-col-12 p-md-2">
                    </div>
                </div>


                <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col-12">
                        <DataTable class="p-datatable-responsive p-datatable-striped p-datatable-gridlines p-datatable-sm "
                                   :value="page.content" :lazy="true" :filters="pageable.entity" :paginator="true" :rows="10"
                                   :totalRecords="page.totalElements" @filter="onPage($event)" @page="onPage($event)" @sort="onPage($event)">

                            <Column field="code" :header="$t('company.lbl_code')" :sortable="true" filterMatchMode="contains"
                                    headerStyle="text-align: center" bodyStyle="text-align: center"  />

                            <Column field="fiscalNumber" :header="$t('company.lbl_fiscalNumber')" :sortable="true" filterMatchMode="contains"
                                    headerStyle="text-align: center" bodyStyle="text-align: center" ></Column>

                            <Column field="name" :header="$t('company.lbl_name')" :sortable="true" filterMatchMode="contains"
                                    headerStyle="text-align: center" bodyStyle="text-align: center" ></Column>

                            <Column field="status"  :header="$t('lbl_status')"  :sortable="true" filterMatchMode="contains"
                                    headerStyle="text-align: center" bodyStyle="text-align: center" > </Column>

                            <Column field="client" :header="$t('lbl_client')" headerStyle="text-align: center" bodyStyle="text-align: center">
                                <template #filter>
                                    <TriStateCheckbox v-model="pageable.entity['client']" @change="onPage()" />
                                </template>
                                <template  #body="slotProps">
                                    <span>{{ slotProps.data.client ? $t('lbl_yes') : $t('lbl_no') }}</span>
                                </template>
                            </Column>

                            <Column headerStyle="text-align: center" :header="$t('lbl_action')" bodyStyle="text-align: center; overflow: visible">
                                <template #body="slotProps">
                                    <Button type="button" icon="fa fa-fw fa-pencil-square-o " @click="openEdit(slotProps.data.id)" class="p-button-info"
                                            style="margin-right: .5em" v-tooltip.left="$t('lbl_edit')"/>
                                    <Button type="button" icon="fa fa-fw fa-trash-o" @click="remove(slotProps.data.id)" class="p-button-warning " v-tooltip.left="$t('lbl_remove')"/>
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
    import CompanyService from "../../../service/company-service";
    import CRUDConsult from "../../../utils/CRUDConsult";

    const companyService = new CompanyService();

    export default {
        mixins: [CRUDConsult],
        name: "ConsultCompany",
        data() {
            return {
                crud: "company",
                title: this.$t('company.lbl_consult_title'),
                pageable: {
                    entity: {
                        client:null,
                    }
                }
            }
        },
        methods: {
            getService() {
                return companyService;
            },
        }
    }
</script>

<style scoped>

</style>