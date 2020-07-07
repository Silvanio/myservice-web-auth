<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">

                <h1>
                    {{ title }}

                    <Button style="float: right" icon="pi pi-key" class="p-button-rounded " @click="openChangePassword" v-tooltip.left="$t('account.lbl_change_password')"/>
                </h1>

                <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col-12 p-md-4">
                        <label for="name">{{ $t('account.lbl_name')}}</label>
                        <InputText id="name" autocomplete="off" v-model="userModel.name" type="text" :class="{'p-invalid'
                        :$v.userModel.name.$invalid && submitted}"/>
                        <small v-show="$v.userModel.name.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
                    </div>
                    <div class="p-field p-col-12 p-md-4">
                        <label for="username">{{ $t('account.lbl_username')}}</label>
                        <InputText id="username"  autocomplete="off" v-model="userModel.username" type="text" :class="{'p-invalid' :$v.userModel.username.$invalid && submitted}"/>
                        <small v-show="$v.userModel.username.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
                    </div>
                    <div class="p-field p-col-12 p-md-4">
                        <label for="email">{{ $t('account.lbl_email')}}</label>
                        <InputText id="email"  v-model="userModel.email" type="text"  autocomplete="off" :class="{'p-invalid' :$v.userModel.email.$invalid && submitted}"/>
                        <small v-show="$v.userModel.email.$invalid && submitted" class="p-error">{{$t('msg_required')}}</small>

                    </div>
                    <div class="p-field p-col-12 p-md-12">
                        <label for="company">{{ $t('account.lbl_company')}}</label>
                        <InputText id="company" autocomplete="off" disabled dis v-model="userModel.company.name" type="text" />
                    </div>
                </div>

                <div class="p-grid p-fluid p-justify-end">
                    <div class="p-sm-2">
                        <Button :label="$t('lbl_save')" @click="save(!$v.$invalid)"/>
                    </div>
                </div>
            </div>
        </div>

        <Dialog :header="$t('account.lbl_change_password')" :visible.sync="displayChangePassword" :maximizable="true" :modal="true">
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <InputText id="passwordDialog" v-model="userModel.password" type="password" :placeholder="$t('account.lbl_password')"/>
                </div>

                <div class="p-col-12">
                    <InputText id="newPasswordDialog" v-model="userModel.newPassword" type="password" :placeholder="$t('account.lbl_new_password')"/>
                </div>
                <div class="p-col-12">
                    <InputText id="repeatNewPasswordDialog" v-model="userModel.repeatNewPassword" type="password" :placeholder="$t('account.lbl_repeat_new_password')"/>
                </div>
            </div>
            <template #footer>
                <Button :label="$t('lbl_save')" icon="pi pi-check" @click="changePassword"/>
                <Button :label="$t('lbl_close')" icon="pi pi-times" @click="closeChangePassword" class="p-button-secondary"/>
            </template>
        </Dialog>
    </div>
</template>

<script>
    import Vue from "vue";
    import {required} from "vuelidate/lib/validators";
    import UserService from "../../service/user-service";

    const userService = new UserService();

    export default {
        name: "MyAccount",
        created: function () {
            userService.getCurrentUserInfo().then((response) => {
                this.userModel = response;
            });
        },
        data() {
            return {
                title: this.$t('account.lbl_account'),
                submitted: false,
                displayChangePassword: false,
                userModel: {
                    name: "",
                    username: "",
                    email: "",
                    password: "",
                    newPassword: "",
                    repeatNewPassword: "",
                    company: {
                        name: "",
                        fiscalNumber: ""
                    },
                }
            }
        },
        validations: {
            userModel: {
                name: {required},
                username: {required},
                email: {required},
            }
        },
        methods: {
            save(isFormValid) {
                this.submitted = true;
                if (!isFormValid) {
                    return;
                }
                userService.updateUserDTO(this.userModel).then((response) => {
                    Vue.prototype.$msgbus.addMessageSuccess("msg_info", response.message);
                }).catch(error => {
                    const code = error.response.status
                    if (code === 400) {
                        const message = JSON.parse(error.response.data);
                        Vue.prototype.$msgbus.addMessageWarn(message.message, message.details);
                    }
                });
            },
            changePassword() {
                if (!this.userModel.password || !this.userModel.newPassword || !this.userModel.repeatNewPassword) {
                    Vue.prototype.$msgbus.addMessageWarn("msg_info", "msg_required_fields")
                    return;
                }

                if (this.userModel.newPassword != this.userModel.repeatNewPassword) {
                    Vue.prototype.$msgbus.addMessageWarn("msg_info", "account.msg_passwords_different")
                    return;
                }

                userService.changePassword(this.userModel).then((response) => {
                    this.userModel.password = "";
                    this.userModel.newPassword = "";
                    this.userModel.repeatNewPassword = "";
                    this.closeChangePassword();
                    Vue.prototype.$msgbus.addMessageSuccess("msg_info", response.message);
                }).catch(error => {
                    const code = error.response.status
                    if (code === 400) {
                        const message = JSON.parse(error.response.data);
                        Vue.prototype.$msgbus.addMessageWarn("msg_info", message.details);
                    }
                });
            },
            openChangePassword() {
                this.displayChangePassword = true;
            },
            closeChangePassword() {
                this.displayChangePassword = false;
            },
        }
    }
</script>

<style scoped>

</style>