<template>
    <div>
        <div class="p-grid flex-center margin-top">

            <div class="p-grid p-fluid p-justify-center margin-phone">

                <div class="p-md-3 p-nogutter p-shadow-5 div-left" v-show="isDesktop">
                    <div class="p-grid p-fluid " style="padding-left:8%;">
                        <div class="p-col-12"></div>
                        <div class="p-col-12">
                            <h2 style="color: #e9e9e9">{{$t('msg_module_access')}}</h2>
                            <p style="color: #e9e9e9">{{$t('msg_password_management')}}</p>
                            <p style="color: #e9e9e9">{{$t('msg_access_management')}}</p>
                            <p style="color: #e9e9e9">{{$t('msg_info_data_personal')}}</p>
                            <p style="color: #e9e9e9">{{$t('msg_info')}}</p>
                        </div>

                        <div class="p-col-12 ">
                        </div>
                    </div>
                </div>

                <div class="p-md-5 p-nogutter  p-shadow-5  div-right">

                    <div class="p-grid p-fluid p-justify-center ">
                        <div class="p-col-11"></div>

                        <div class="p-col-11">
                            <div class="box"><img alt="Vue logo" src="assets/layout/images/mylogo.png" width="150"></div>
                        </div>

                        <div class="p-col-11">
                            <div class="box" style="font-size: 20px;">{{ $t('login.lbl_title') }}</div>
                        </div>


                        <div class="p-col-11">
                            <InputText id="company" v-model="userModel.company" type="text" :placeholder="$t('login.lbl_company_code')" :class="{'p-invalid'
                                        :$v.userModel.company.$invalid && submitted}"/>
                            <small v-show="$v.userModel.company.$invalid && submitted" class="p-error">{{$t('msg_required')}}</small>
                        </div>

                        <div class="p-col-11">
                            <InputText id="username" v-model="userModel.name" type="text" :placeholder="$t('login.lbl_user')"
                                       :class="{'p-invalid':$v.userModel.name.$invalid && submitted}"/>
                            <small v-show="$v.userModel.name.$invalid && submitted" class="p-error">{{$t('msg_required')}}</small>
                        </div>

                        <div class="p-col-11">
                            <Password id="password" v-model="userModel.password" :feedback="false" :placeholder="$t('login.lbl_password')"
                                      :class="{'p-invalid':$v.userModel.password.$invalid && submitted}"/>
                            <small v-show="$v.userModel.password.$invalid && submitted" class="p-error">{{$t('msg_required')}}</small>
                        </div>


                        <div class="p-col-5">
                            <div class="p-field-checkbox">
                                <Checkbox :binary="true" v-model="remember" id="id_remember"/>
                                <label for="id_remember">{{$t('login.lbl_remember')}}</label>
                            </div>
                        </div>

                        <div class="p-col-5">
                            <Button :label="$t('login.msg_forgot_password')" class="p-button-link forgot-password" @click="openMaximizable"/>
                        </div>

                        <div class="p-col-3 p-offset-8">
                            <Button :label="$t('lbl_btn_open')" @click="login(!$v.$invalid)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Dialog :header="$t('login.msg_forgot_password')" :visible.sync="displayMaximizable" :maximizable="true" :modal="true">
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <InputText id="companyDialog" v-model="userModel.company" type="text" :placeholder="$t('login.lbl_company_code')"/>
                </div>

                <div class="p-col-12">
                    <InputText id="usernameDialog" v-model="userModel.name" type="text" :placeholder="$t('login.lbl_user')"/>
                </div>
            </div>
            <template #footer>
                <Button :label="$t('lbl_send')" icon="pi pi-check" @click="sendMailForgotPassword"/>
                <Button :label="$t('lbl_close')" icon="pi pi-times" @click="closeMaximizable" class="p-button-secondary"/>
            </template>
        </Dialog>
    </div>
</template>

<script>
    import LoginService from '../../service/login-service';
    import AuthStorage from '../../utils/auth-storage';
    import {required} from 'vuelidate/lib/validators';
    import Vue from "vue";
    import UserService from "../../service/user-service";

    const loginService = new LoginService();
    const userService = new UserService();

    export default {
        name: 'Login',
        beforeCreate: function () {
            document.body.className = "login";
        },
        computed: {
            isDesktop() {
                return false;
                //return window.innerWidth > 1024;
            }
        },
        data() {
            return {
                displayMaximizable: false,
                remember: false,
                submitted: false,
                userModel: {
                    company: "",
                    name: "",
                    password: ""
                }
            }
        },
        validations: {
            userModel: {
                company: {
                    required
                },
                name: {
                    required
                },
                password: {
                    required
                },
            }
        },
        methods: {
            openMaximizable() {
                this.displayMaximizable = true;
            },
            closeMaximizable() {
                this.displayMaximizable = false;
            },
            login(isFormValid) {
                this.submitted = true;
                if (!isFormValid) {
                    return;
                }

                loginService.login(this.userModel).then((response) => {
                    let access_token = response.access_token;
                    let refresh_token = response.refresh_token;
                    if (access_token) {
                        AuthStorage.setStorage(this.remember, "access_token", access_token);
                        AuthStorage.setStorage(this.remember, "refresh_token", refresh_token);
                        AuthStorage.setStorage(this.remember, "remember_token", this.remember,);
                        this.getUserLogged();
                    }
                }).catch(error => {
                    const code = error.response.status
                    if (code === 400) {
                        const message = JSON.parse(error.response.data).error;
                        Vue.prototype.$msgbus.addMessageWarn("msg_info", message)

                    }
                })
            },
            getUserLogged() {
                userService.getCurrentUserInfo().then((response) => {
                    Vue.prototype.$mymutations.setUserLogged(response);
                    AuthStorage.setStorage(true, "authorities", JSON.stringify(response.authorities));
                    this.$router.push("/empty");
                }).catch(error => {
                    const code = error.response.status
                    if (code === 400) {
                        console.log(error.message)
                        const message = JSON.parse(error.response.data);
                        Vue.prototype.$msgbus.addMessageWarn(message.message, message.details);
                    }
                    loginService.logout()
                });
            },
            sendMailForgotPassword() {
                if (!this.userModel.name || !this.userModel.company) {
                    Vue.prototype.$msgbus.addMessageWarn("msg_info", "msg_required");
                    return;
                }
                this.displayMaximizable = false;
                loginService.sendMailForgotPassword(this.userModel)
                    .then((response) => {
                        Vue.prototype.$msgbus.addMessageSuccess("msg_ok_send_mail", response.message);
                    })
                    .catch(error => {
                        const code = error.response.status
                        if (code === 400) {
                            const message = JSON.parse(error.response.data);
                            Vue.prototype.$msgbus.addMessageWarn(message.message, message.details);
                        }
                    });
            },
        }
    }
</script>
<style scoped>

    .flex-center {
        width: 100vw;
        height: 85vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center
    }

    .div-left {
        background-color: #116fbf;
        border-radius: 1% 0% 0% 1%;
    }

    .div-right {
        background-color: white;
        border-radius: 0% 1% 1% 0%;
    }

    .forgot-password {
        text-decoration: underline !important;
        color: #1f414d !important;
    }
    @media (max-width: 1024px) {
        .margin-phone {
            margin-right: 15px !important;
            margin-left: 30px !important;

        }
        .margin-top{
            padding-top: 120px;
        }
    }


</style>