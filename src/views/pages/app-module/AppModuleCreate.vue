<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">

                <h1>
                    {{ title }}
                    <Button style="float: right" icon="pi pi-arrow-circle-left" class="p-button-rounded p-button-secondary p-shadow-7 " @click="openConsult"
                            v-tooltip.left="$t('module.lbl_consult_title')"/>
                </h1>

                <div class="p-fluid p-formgrid p-grid">

                    <div class="p-field p-col-12 p-md-4">
                        <label required for="nameModule">{{ $t('module.lbl_name')}}</label>
                        <InputText id="nameModule" autocomplete="off" v-model="entity.name" type="text" :class="{'p-invalid' :$v.entity.name.$invalid && submitted}"/>
                        <small v-show="$v.entity.name.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
                    </div>
                    <div class="p-field p-col-12 p-md-4">
                        <label required for="descModule">{{ $t('module.lbl_description')}}</label>
                        <InputText id="descModule" autocomplete="off" v-model="entity.description" type="text" :class="{'p-invalid' :$v.entity.description.$invalid  && submitted}"/>
                        <small v-show="$v.entity.description.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
                    </div>
                    <div class="p-field p-col-12 p-md-4">
                        <label required for="webUrl">{{ $t('module.lbl_web_url')}}</label>
                        <InputText id="webUrl" autocomplete="off" v-model="entity.webUrl" type="text"
                                   :class="{'p-invalid' :$v.entity.webUrl.$invalid && submitted}"/>
                        <small v-show="$v.entity.webUrl.$invalid && submitted" class="p-error">{{$t('msg_required')}}</small>
                    </div>
                    <div class="p-field p-col-12 p-md-4">
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
    import AppModuleService from "../../../service/app-module-service";

    const appModuleService = new AppModuleService();

    export default {
        name: "CreateAppModule",
        mixins: [CRUDCreate],
        data() {
            return {
                title: this.$t('module.lbl_create_title'),
                crud: "module",
                entity: {
                    status: "ACTIVE"
                }
            }
        },
        validations: {
            entity: {
                name: {required},
                description: {required},
                webUrl: {required},
                status: {required}

            }
        },

        methods: {
            getService() {
                return appModuleService;
            },
            getModel() {
                return this.entity;
            },
        }
    }
</script>

<style scoped>

</style>