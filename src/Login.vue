<template>
    <div class="p-grid flex-center">
        <div class="p-md-4"></div>
        <div class="p-md-3">
            <Card>
                <template slot="title">
                    <h1>{{ title }}</h1>
                </template>
                <template slot="content">
                    <div class="p-grid p-fluid">
                        <div class="p-md-12">
                            <InputText id="company" v-model="userModel.company" type="text" placeholder="Código Empresa"
                                       :class="{'p-invalid':$v.userModel.company.$invalid && submitted}"/>
                            <small v-show="$v.userModel.company.$invalid && submitted" class="p-error">Código da Empresa é obrigatório.</small>
                        </div>
                        <div class="p-md-12">
                            <InputText id="username" v-model="userModel.name" type="text" placeholder="Utilizador"
                                       :class="{'p-invalid':$v.userModel.name.$invalid && submitted}"/>
                            <small v-show="$v.userModel.name.$invalid && submitted" class="p-error">Utilizador é obrigatório.</small>
                        </div>
                        <div class="p-md-12">
                            <Password id="password" v-model="userModel.password" :feedback="false" placeholder="Palavra passe"
                                      :class="{'p-invalid':$v.userModel.password.$invalid && submitted}"/>
                            <small v-show="$v.userModel.password.$invalid && submitted" class="p-error">Palavra passe é obrigatória.</small>
                        </div>
                        <div class="p-md-6">
                            <Checkbox :binary="true" v-model="remember"/>
                            Remember Me
                        </div>
                        <div class="p-md-6">
                            <Button label="Esqueci minha senha" class="p-button-link"/>
                        </div>
                        <div class="p-md-4 p-offset-8   ">
                            <Button label="Entrar" @click="login(!$v.$invalid)"/>

                        </div>

                    </div>
                </template>
            </Card>
        </div>
        <div class="p-md-5"></div>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    import LoginService from "./service/login-service";
    import AuthStorage from "./service/arq/auth-storage";
    const loginService = new LoginService();


    export default {
        name: 'Login',
        data() {
            return {
                title: "Autenticação",
                remember: false,
                submitted: false,
                userModel: {
                    company:"",
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
            login(isFormValid) {
                this.submitted = true;
                if (!isFormValid) {
                    return;
                }
                console.log(this.userModel.password)
                loginService.login(this.userModel).then((response) => {
                    let access_token = response.access_token;
                    let refresh_toke = response.refresh_token;
                    if (access_token) {
                        AuthStorage.setStorage(this.remember, "access_token", access_token);
                        AuthStorage.setStorage(this.remember, "refresh_token", refresh_toke);
                        this.$router.push("/empty");
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .flex-center {
        width: 100vw;
        height: 80vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center
    }
</style>