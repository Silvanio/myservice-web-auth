<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">

                <h1>
                    {{ title }}
                    <Button style="float: right" icon="pi pi-arrow-circle-left" class="p-button-rounded p-button-secondary p-shadow-7" @click="openConsult"
                            v-tooltip.left="$t('company.lbl_consult_title')"/>
                </h1>

                <div class="p-fluid p-grid p-formgrid">
                    <div class="p-field p-col-12 p-md-3">
                        <label required for="companyComplete">{{ $t('menu.lbl_company')}}</label>
                        <AutoComplete id="companyComplete" v-tooltip.left="$t('msg_field_autocomplete')" :minLength="4" v-model="entity.company" :suggestions="companyList"
                                      @complete="findCompanyByName($event)" field="name"
                                      :class="{'p-invalid' :$v.entity.company.id.$invalid && submitted}"/>
                        <small v-show="$v.entity.company.id.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
                    </div>

                    <div class="p-field p-col-12 p-md-4">
                        <label required for="initialDate">{{ $t('contract.lbl_initial_date') }}</label>
                        <Calendar id="initialDate" dateFormat="dd/mm/yy" :locale="pt" v-model="entity.initialDate" :monthNavigator="true" :yearNavigator="true"
                                  :manualInput="false" yearRange="2020:2030" :class="{'p-invalid' :$v.entity.initialDate.$invalid && submitted}"/>
                        <small v-show="$v.entity.initialDate.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
                    </div>

                    <div class="p-field p-col-12 p-md-4">
                        <label required for="finalDate">{{ $t('contract.lbl_final_date') }}</label>
                        <Calendar id="finalDate" dateFormat="dd/mm/yy" :locale="pt" v-model="entity.finalDate" :monthNavigator="true" :yearNavigator="true"
                                  :manualInput="false" yearRange="2020:2030" :class="{'p-invalid' :$v.entity.finalDate.$invalid && submitted}"/>
                        <small v-show="$v.entity.finalDate.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label required for="countUser">{{ $t('contract.lbl_count_user') }}</label>
                        <InputNumber id="countUser" mode="decimal" showButtons v-model="entity.countUser" :min="1" :max="9999999"/>
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label required for="statusCompany">{{ $t('lbl_status')}}</label>
                        <Dropdown id="statusCompany" v-model="entity.status" :options="statusList" optionLabel="desc" optionValue="label"
                                  placeholder="Selecione..." class="p-column-filter" :class="{'p-invalid' :$v.entity.status.$invalid && submitted}">
                            <template #option="slotProps">
                                <div class="p-clearfix p-dropdown-car-option">
                                    <span>{{slotProps.option.desc}}</span>
                                </div>
                            </template>
                        </Dropdown>
                        <small v-show="$v.entity.status.$invalid && submitted" class="p-error">{{$t('msg_required')}}</small>
                    </div>

                    <div class="p-field p-col-12 p-md-12">
                        <label required for="appModule">{{ $t('contract.lbl_modules') }}</label>

                        <PickList listStyle="height:200px" id="appModule" v-model="appModuleList" dataKey="name">
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


                        </PickList>

                    </div>
                </div>
                <div class="p-grid p-fluid p-justify-end">
                    <div class="p-sm-2">
                        <Button :label="$t('lbl_save')" @click="save(!$v.$invalid)"/>
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
    import AppModuleService from "../../../service/app-module-service";
    import {required} from "vuelidate/lib/validators";
    import Vue from "vue";

    const companyService = new CompanyService()
    const contractService = new ContractService();
    const appModuleService = new AppModuleService();

    export default {
        name: "CreateContract",
        mixins: [CRUDCreate],
        data() {
            return {
                title: this.$t('contract.lbl_create_title'),
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
        validations: {
            entity: {
                initialDate: {required},
                finalDate: {required},
                status: {required},
                company: {
                    id: {required},
                },

            }
        },
        methods: {
            initCreate() {
                appModuleService.findAllActiveDTO().then(response => this.appModuleList = [response, []]).catch(this.catchError);
            },
            initEdit() {
                if (this.entity.initialDate) {
                    this.entity.initialDate = new Date(this.entity['initialDate']);
                }
                if (this.entity.finalDate) {
                    this.entity.finalDate = new Date(this.entity['finalDate']);
                }
                if (this.entity.appModules) {
                    appModuleService.findAllActiveDTO().then((response) => {
                        for (let i = response.length - 1; i >= 0; i--) {
                            for (let j = 0; j < this.entity.appModules.length; j++) {
                                if (response[i] && (response[i].name === this.entity.appModules[j].name)) {
                                    response.splice(i, 1);
                                }
                            }
                        }
                        this.appModuleList = [response, this.entity.appModules]
                    }).catch(this.catchError);
                }
            },
            posValidate() {
                this.entity.appModules = this.appModuleList[1];
                if (!this.entity.appModules) {
                    Vue.prototype.$msgbus.addMessageWarn("msg_info", "contract.msg_select_modules");
                    return false;
                }
                if (this.entity.appModules.length == 0) {
                    Vue.prototype.$msgbus.addMessageWarn("msg_info", "contract.msg_select_modules");
                    return false;
                }
                return true;
            },
            posSave() {
                this.init();
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