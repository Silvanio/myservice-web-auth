<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">

                <h1>
                    {{ title }}
                    <Button style="float: right" icon="pi pi-arrow-circle-left" class="p-button-rounded p-button-secondary p-shadow-7" @click="openConsult"
                            v-tooltip.left="$t('user.lbl_consult_title')"/>
                </h1>

                <div class="p-fluid p-formgrid p-grid">

                    <div class="p-field p-col-12 p-md-3">
                        <label required for="companyComplete">{{ $t('menu.lbl_company')}}</label>
                        <AutoComplete id="companyComplete"  v-if="!this.isCompanyClient"  :minLength="4" v-model="entity.company" :suggestions="companyList"
                                      @complete="findCompanyByName($event)" field="name"
                                      @item-select="findModules($event)"
                                      :class="{'p-invalid' :$v.entity.company.id.$invalid && submitted}"/>
                        <InputText id="companyText" v-if="this.isCompanyClient"  disabled autocomplete="off" v-model="entity.company.name" type="text" />

                        <small   v-if="!this.isCompanyClient" v-show="$v.entity.company.id.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label required for="nameUserForm">{{ $t('user.lbl_name')}}</label>
                        <InputText id="nameUserForm" autocomplete="off" v-model="entity.name" type="text" :class="{'p-invalid' :$v.entity.name.$invalid && submitted}"/>
                        <small v-show="$v.entity.name.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label required for="usernameUserForm">{{ $t('user.lbl_username')}}</label>
                        <InputText id="usernameUserForm" autocomplete="off" v-model="entity.username" type="text"
                                   :class="{'p-invalid' :$v.entity.username.$invalid && submitted}"/>
                        <small v-show="$v.entity.username.$invalid && submitted" class="p-error">{{$t('msg_required')}}</small>
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label required for="emailUserForm">{{ $t('user.lbl_email')}}</label>
                        <InputText id="emailUserForm"  autocomplete="off" v-model="entity.email" type="text"
                                   :class="{'p-invalid' :$v.entity.email.$invalid && submitted}"/>
                        <small v-show="$v.entity.email.$invalid && submitted" class="p-error">{{$t('msg_required')}}</small>
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
                        <div v-for="item in appModuleList" :key="item.name">
                            <Panel>
                                <template #header>
                                    <span class="picklist-title">{{ item.description }}</span>
                                    <span class="picklist-subtitle"></span>
                                </template>
                                <DataTable :value="item.authorities" :selection.sync="item.selectedAuthorities"
                                           :paginator="true" :rows="10">
                                    <Column selectionMode="multiple" headerStyle="width: 3em"></Column>

                                    <Column field="shortDescription" header="Name"></Column>
                                    <Column field="description" header="Descrição"></Column>
                                </DataTable>
                            </Panel>
                            <br>
                        </div>


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
    import {required} from "vuelidate/lib/validators";
    import CRUDCreate from "../../../utils/CRUDCreate";
    import CompanyService from "../../../service/company-service";
    import UserService from "../../../service/user-service";
    import ContractService from "../../../service/contract-service";
    import Vue from "vue";

    const contractService = new ContractService();
    const companyService = new CompanyService();
    const userService = new UserService();

    export default {
        name: "UserCreate",
        mixins: [CRUDCreate],
        data() {
            return {
                title: this.$t('user.lbl_create_title'),
                crud: "profile",
                isCompanyClient: false,
                companyList: null,
                appModuleList: null,
                entity: {
                    id: null,
                    company: null,
                    status: "ACTIVE"
                }
            }
        },
        validations: {
            entity: {
                email: {required},
                name: {required},
                username: {required},
                status: {required},
                company: {
                    id: {required},
                },

            }
        },

        methods: {
            init() {
                const id = this.$route.params.id;
                if (id) {
                    this.getService().getDTO(id).then((response) => {
                        this.entity = response;
                        this.initEdit();
                    }).catch(this.catchError);
                } else {
                    this.initCreate();
                }
            },
            async initCreate() {
                const user = await userService.getCurrentUserInfo();
                if(user.company.client == true){
                    this.entity.company = user.company;
                    this.isCompanyClient = true;
                    this.findModules(null);
                }
            },
            initEdit() {
                this.findModules(null);
            },
            findCompanyByName(event) {
                companyService.findAllByName(event.query).then((response) => {
                    this.companyList = response;
                }).catch(this.catchError);
            },
            findModules(event) {
                const userCompanyDTO = {
                    idUser: this.entity.id,
                    idCompany: event != null ? event.value.id : this.entity.company.id,
                }
                contractService.findModules(userCompanyDTO).then((response) => {
                    this.appModuleList = response;
                }).catch(this.catchError);
            },
            save(isFormValid) {
                this.submitted = true;
                if (!isFormValid) {
                    return;
                }
                this.entity.appModules = this.appModuleList;
                console.log(this.entity)

                this.getService().saveDTO(this.entity).then((response) => {
                    Vue.prototype.$msgbus.addMessageSuccess("msg_info", response.message);
                    if (!this.entity.id) {
                        Object.assign(this.$data, this.$options.data.apply(this))
                    }
                }).catch(this.catchError);
            },
            getService() {
                return userService;
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
</style>