<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">
                <h1>
                    {{ title }}
                    <Button style="float: right" icon="pi pi-plus-circle" class="p-button-rounded" @click="openCreate" v-tooltip.left="$t('module.lbl_create_title')"/>
                </h1>

                <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col-12">
                        <DataTable class="p-datatable-responsive" :value="page.content" :lazy="true" :filters="pageable.entity" :paginator="true" :rows="10"
                                   :totalRecords="page.totalElements" @filter="onPage($event)" @page="onPage($event)" @sort="onPage($event)">

                            <Column field="name" :header="$t('module.lbl_name')" :sortable="true" filterMatchMode="contains">
                                <template #filter>
                                    <InputText type="text" @blur="onPage()" v-model="pageable.entity['name']" class="p-column-filter" :placeholder="$t('module.lbl_name')"/>
                                </template>
                            </Column>

                            <Column field="description" :header="$t('module.lbl_description')" :sortable="true" filterMatchMode="contains">
                                <template #filter>
                                    <InputText type="text" @blur="onPage()" v-model="pageable.entity['description']" class="p-column-filter"
                                               :placeholder="$t('module.lbl_description')"/>
                                </template>
                            </Column>

                            <Column field="webUrl" :header="$t('module.lbl_web_url')" :sortable="true" filterMatchMode="contains">
                                <template #filter>
                                    <InputText type="text" @blur="onPage()" v-model="pageable.entity['webUrl']" class="p-column-filter" :placeholder="$t('module.lbl_web_url')"/>
                                </template>
                            </Column>

                            <Column field="status" headerStyle="overflow: visible" :header="$t('lbl_status')" :sortable="true" filterMatchMode="contains"
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

                            <Column headerStyle="text-align: center" :header="$t('lbl_action')" bodyStyle="text-align: center; overflow: visible">
                                <template #body="slotProps">
                                    <Button type="button" icon="fa fa-fw fa-pencil-square-o" @click="openEdit(slotProps.data.id)" class="p-button-info"
                                            style="margin-right: .5em" v-tooltip.left="$t('lbl_edit')"/>
                                    <Button type="button" icon="fa fa-fw fa-trash-o" @click="remove(slotProps.data.id)" class="p-button-warning" v-tooltip.left="$t('lbl_remove')"/>
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
    import AppModuleService from "../../../service/app-module-service";

    const appModuleService = new AppModuleService();

    export default {
        mixins: [CRUDConsult],
        name: "AppModuleConsult",
        data() {
            return {
                crud: "module",
                title: this.$t('module.lbl_consult_title'),
            }
        },
        methods: {
            getService() {
                return appModuleService;
            },
        }
    }
</script>

<style scoped>

</style>