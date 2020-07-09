<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">

                <h1>
                    {{ title }}
                    <Button style="float: right" icon="pi pi-arrow-circle-left" class="p-button-rounded p-button-secondary p-shadow-7" @click="openConsult"
                            v-tooltip.left="$t('contract.lbl_consult_title')"/>
                </h1>

                    <div class="p-field-checkbox">
                        <Checkbox id="binary" v-model="entity.client" :binary="true"/>
                        <label for="binary">{{ $t('lbl_client') }}</label>
                    </div>

                <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col-12 p-md-3">
                        <label required for="codeCompany">{{ $t('company.lbl_code')}}</label>
                        <InputText id="codeCompany" autocomplete="off" v-model="entity.code" type="text" :class="{'p-invalid' :$v.entity.code.$invalid && submitted}"/>
                        <small v-show="$v.entity.code.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <label required for="nameCompany">{{ $t('company.lbl_name')}}</label>
                        <InputText id="nameCompany" autocomplete="off" v-model="entity.name" type="text" :class="{'p-invalid' :$v.entity.name.$invalid && submitted}"/>
                        <small v-show="$v.entity.name.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <label required for="fiscalNumberCompany">{{ $t('company.lbl_fiscalNumber')}}</label>
                        <InputText id="fiscalNumberCompany" autocomplete="off" v-model="entity.fiscalNumber" type="text"
                                   :class="{'p-invalid' :$v.entity.fiscalNumber.$invalid && submitted}"/>

                        <small v-show="$v.entity.fiscalNumber.$invalid && submitted" class="p-error">{{$t('msg_required')}}</small>
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

                    <div class="p-field p-col-12 p-md-6">
                        <label for="adressCompany">{{ $t('company.lbl_address')}}</label>
                        <Textarea id="adressCompany" v-model="entity.address" :autoResize="true" rows="3" cols="20"/>
                    </div>
                    <div class="p-field p-col-12 p-md-6">
                        <label for="commentsCompany">{{ $t('company.lbl_comments')}}</label>
                        <Textarea id="commentsCompany" v-model="entity.comments" :autoResize="true" rows="3" cols="20"/>
                    </div>


                </div>
                <div class="p-grid p-fluid p-justify-end">
                    <div class="p-sm-2">
                        <Button  :label="$t('lbl_save')" @click="save(!$v.$invalid)"/>
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

    const companyService = new CompanyService();

    export default {
        name: "CreateCompany",
        mixins: [CRUDCreate],
        data() {
            return {
                title: this.$t('company.lbl_create_title'),
                crud: "company",
                entity: {
                    id: "",
                    code: "",
                    name: "",
                    fiscalNumber: "",
                    address: "",
                    comments: "",
                    client: true,
                    status: "ACTIVE"
                }
            }
        },
        validations: {
            entity: {
                code: {required},
                name: {required},
                fiscalNumber: {required},
                status: {required}

            }
        },

        methods: {
            getService() {
                return companyService;
            },
            getModel() {
                return this.entity;
            },
        }
    }
</script>

<style scoped>

</style>