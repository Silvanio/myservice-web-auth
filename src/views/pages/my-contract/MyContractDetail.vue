<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">

                <h1>
                    {{ title }}
                    <Button style="float: right" icon="pi pi-arrow-circle-left" class="p-button-rounded p-button-secondary p-shadow-7" @click="openConsult"
                            v-tooltip.left="$t('contract.lbl_consult_title')"/>
                </h1>

                <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col-12 p-md-3">
                        <label required for="companyComplete">{{ $t('menu.lbl_company')}}</label>
                        <AutoComplete disabled id="companyComplete" v-tooltip.left="$t('msg_field_autocomplete')" :minLength="4" v-model="entity.company" :suggestions="companyList"
                                      @complete="findCompanyByName($event)" field="name"
                        />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label required for="initialDate">{{ $t('contract.lbl_initial_date') }}</label>
                        <Calendar disabled id="initialDate" dateFormat="dd/mm/yy" :locale="pt" v-model="entity.initialDate" :monthNavigator="true" :yearNavigator="true"
                                  :manualInput="false" yearRange="2020:2030"/>
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label required for="initialDate">{{ $t('contract.lbl_final_date') }}</label>
                        <Calendar disabled id="finalDate" dateFormat="dd/mm/yy" :locale="pt" v-model="entity.finalDate" :monthNavigator="true" :yearNavigator="true"
                                  :manualInput="false" yearRange="2020:2030"/>
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label required for="countUser">{{ $t('contract.lbl_count_user') }}</label>
                        <InputNumber disabled id="countUser" mode="decimal" showButtons v-model="entity.countUser" :min="1" :max="9999999"/>
                    </div>
                    <div class="p-field p-col-12 p-md-12">
                        <label required for="appModule">{{ $t('contract.lbl_modules') }}</label>

                        <OrderList listStyle="height:200x" data-key=""  id="appModule" v-model="appModuleList" dataKey="name">
                            <template #sourceHeader>
                                Disponíveis
                            </template>
                            <template #targetHeader>
                                Selecionados
                            </template>
                            <template #item="slotProps">
                                <div>
                                    <span class="picklist-title">{{slotProps.item.name}}</span><br/>
                                    <span class="picklist-subtitle">{{slotProps.item.description}}</span>
                                </div>
                            </template>

                        </OrderList>

                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import CRUDCreate from "../../../utils/CRUDCreate";
    import ContractService from "../../../service/contract-service";
    import CompanyService from "../../../service/company-service";

    const companyService = new CompanyService()
    const contractService = new ContractService();

    export default {
        name: "MyDetailContract",
        mixins: [CRUDCreate],
        data() {
            return {
                title: this.$t('contract.lbl_my_contracts_consult_title'),
                crud: "contract",
                companyList: null,
                appModuleList: null,
                entity: {
                    id: "",
                    company: null,
                    status: "ACTIVE",
                    countUser: 1
                }
            }
        },
        methods: {
            initEdit() {
                if (this.entity.initialDate) {
                    this.entity.initialDate = new Date(this.entity['initialDate']);
                }
                if (this.entity.finalDate) {
                    this.entity.finalDate = new Date(this.entity['finalDate']);
                }

                this.appModuleList = this.entity.appModules;
            },
            openConsult() {
                this.$router.push("/my-contracts/consult");
            },
            findCompanyByName(event) {
                companyService.findAllByName(event.query).then((response) => {
                    this.companyList = response;
                }).catch(this.catchError);
            },
            getService() {
                return contractService;
            },
            getModel() {
                return this.entity;
            },
        }
    }
</script>

<style scoped>
    .picklist-title {
        font-size: 14px;
        font-weight: 600;
    }

    .picklist-subtitle {
        margin-left: 12px;
        font-size: 11px;
    }

    .p-picklist-buttons p-picklist-source-controls {
        display: none !important;
    }

    .p-picklist-buttons p-picklist-target-controls {
        display: none !important;
    }
</style>