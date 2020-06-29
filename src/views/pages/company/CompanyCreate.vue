<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">

                <h1>
                    {{ title }}
                    <Button style="float: right" icon="pi pi-arrow-circle-left" class="p-button-rounded p-button-secondary" @click="openConsult"
                            v-tooltip.left="$t('company.lbl_consult_title')"/>
                </h1>

                <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col-12 p-md-4">
                        <label for="codeCompany">{{ $t('company.lbl_code')}}</label>
                        <InputText id="codeCompany" autocomplete="off" v-model="company.code" type="text" :class="{'p-invalid' :$v.company.code.$invalid && submitted}"/>
                        <small v-show="$v.company.code.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
                    </div>
                    <div class="p-field p-col-12 p-md-4">
                        <label for="nameCompany">{{ $t('company.lbl_name')}}</label>
                        <InputText id="nameCompany" autocomplete="off" v-model="company.name" type="text" :class="{'p-invalid' :$v.company.name.$invalid && submitted}"/>
                        <small v-show="$v.company.name.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
                    </div>
                    <div class="p-field p-col-12 p-md-4">
                        <label for="fiscalNumberCompany">{{ $t('company.lbl_fiscalNumber')}}</label>
                        <InputText id="fiscalNumberCompany" autocomplete="off" v-model="company.fiscalNumber" type="text"
                                   :class="{'p-invalid' :$v.company.fiscalNumber.$invalid && submitted}"/>
                        <small v-show="$v.company.fiscalNumber.$invalid && submitted" class="p-error">{{$t('msg_required')}}</small>
                    </div>
                    <div class="p-field p-col-12 p-md-6">
                        <label for="adressCompany">{{ $t('company.lbl_address')}}</label>
                        <Textarea id="adressCompany" v-model="company.address" :autoResize="true" rows="3" cols="20"/>
                    </div>
                    <div class="p-field p-col-12 p-md-6">
                        <label for="commentsCompany">{{ $t('company.lbl_comments')}}</label>
                        <Textarea id="commentsCompany" v-model="company.comments" :autoResize="true" rows="3" cols="20"/>
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

    const companyService = new CompanyService();

    export default {
        name: "CreateCompany",
        mixins: [CRUDCreate],
        data() {
            return {
                title: this.$t('company.lbl_create_title'),
                company: {
                    id: "",
                    code: "",
                    name: "",
                    fiscalNumber: "",
                    address: "",
                    comments: "",
                    client: true,
                }
            }
        },
        validations: {
            company: {
                code: {required},
                name: {required},
                fiscalNumber: {required}
            }
        },
        methods: {
            openConsult() {
                this.$router.push("/company/consult");
            },
            getService() {
                return companyService;
            },
            getModel() {
                return this.company;
            },
        }
    }
</script>

<style scoped>

</style>