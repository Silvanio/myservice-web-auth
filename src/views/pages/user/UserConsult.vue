<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">
                <h1>
                    {{ title }}
                    <Button style="float: right" icon="pi pi-plus-circle" class="p-button-rounded p-shadow-7" @click="openCreate" v-tooltip.left="$t('user.lbl_create_title')"/>
                </h1>

                <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col-12 p-md-2">
                        <InputText type="text"  v-model="pageable.entity['name']" class="p-column-filter" :placeholder="$t('user.lbl_name')"/>
                    </div>

                    <div class="p-field p-col-12 p-md-2">
                        <InputText type="text"  v-model="pageable.entity['username']" class="p-column-filter"
                                   :placeholder="$t('user.lbl_username')"/>
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <InputText type="text" v-model="pageable.entity.company['name']" class="p-column-filter"
                                   :placeholder="$t('menu.lbl_company')"/>
                    </div>

                    <div class="p-field p-col-12 p-md-2">
                        <Dropdown v-model="pageable.entity['status']" :options="statusList" optionLabel="desc" optionValue="label"
                                  placeholder="Selecione..." class="p-column-filter" :showClear="true">
                            <template #option="slotProps">
                                <div class="p-clearfix p-dropdown-car-option">
                                    <span>{{slotProps.option.desc}}</span>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="p-field p-col-12 p-md-1">
                        <Button :label="$t('lbl_filter')" @click="onPage()"/>
                    </div>
                    <div class="p-field p-col-12 p-md-2">
                    </div>
                </div>

                <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col-12">
                        <DataTable class="p-datatable-responsive" :value="page.content" :lazy="true" :filters="pageable.entity" :paginator="true" :rows="10"
                                   :totalRecords="page.totalElements" @filter="onPage($event)" @page="onPage($event)" @sort="onPage($event)">

                            <Column field="name" :header="$t('user.lbl_name')" :sortable="true" filterMatchMode="contains"> </Column>

                            <Column field="username" :header="$t('user.lbl_username')" :sortable="true" filterMatchMode="contains"></Column>

                            <Column field="email" :header="$t('user.lbl_email')" :sortable="true" filterMatchMode="contains"></Column>

                            <Column field="company.name" :header="$t('menu.lbl_company')" :sortable="true" filterMatchMode="contains">
                                <template #body="slotProps">
                                    <span>{{ slotProps.data.company.name  }}</span>
                                </template>
                            </Column>

                            <Column field="status" headerStyle="overflow: visible" :header="$t('lbl_status')" :sortable="true" filterMatchMode="contains"
                                    bodyStyle="text-align: center; overflow: visible;">
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
    import UserService from "../../../service/user-service";

    const userService = new UserService();

    export default {
        mixins: [CRUDConsult],
        name: "UserConsult",
        data() {
            return {
                crud: "profile",
                title: this.$t('user.lbl_consult_title'),
                pageable: {
                    entity: {
                        company: {name: ""}
                    }
                }
            }
        },
        methods: {
            async initConsult() {
                const user = await userService.getCurrentUserInfo();
                if(user.company.client == true){
                    this.pageable.entity.company.id = user.company.id;
                }
            },
            getService() {
                return userService;
            },
        }
    }
</script>

<style scoped>

</style>