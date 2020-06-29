<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">
                <h1>
                    {{ title }}
                    <Button style="float: right" icon="pi pi-plus-circle" class="p-button-rounded" @click="openCreate" v-tooltip.left="$t('company.lbl_create_title')"/>
                </h1>

                <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col-12">
                        <DataTable class="p-datatable-responsive" :value="companyPage.content" :lazy="true" :filters="pageable.entity" :paginator="true" :rows="10"
                                   :totalRecords="companyPage.totalElements" @filter="onPage($event)" @page="onPage($event)" @sort="onPage($event)">

                            <Column field="fiscalNumber" :header="$t('company.lbl_fiscalNumber')" :sortable="true" filterMatchMode="contains">
                                <template #filter>
                                    <InputText type="text" @blur="onPage()" v-model="pageable.entity['fiscalNumber']" class="p-column-filter" :placeholder="$t('company.lbl_fiscalNumber')"/>
                                </template>
                            </Column>

                            <Column field="name" :header="$t('company.lbl_name')" :sortable="true" filterMatchMode="contains">
                                <template #filter>
                                    <InputText type="text" @blur="onPage()" v-model="pageable.entity['name']" class="p-column-filter" :placeholder="$t('company.lbl_name')"/>
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
                title: this.$t('company.lbl_consult_title'),
            }
        },
        methods: {
            openCreate() {
                this.$router.push("/company/create");
            },
            getService() {
                return companyService;
            },
        }
    }
</script>

<style scoped>

</style>