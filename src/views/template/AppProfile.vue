<template>
    <div class="layout-profile background-profile">
        <div>
            <img src="assets/layout/images/profile_avatar.png" alt=""/>
        </div>
        <div>
            <span class="username">{{ this.user.name }}</span>
        </div>
        <div>
            <span class="company">{{ this.user.company.name }}</span>
            <button class="p-link layout-profile-link" @click="onClick">
                <i class="pi pi-fw pi-cog"></i>
            </button>
        </div>
        <transition name="layout-submenu-wrapper">
            <ul v-show="expanded">
                <li>
                    <button class="p-link" @click="myAccount"><i class="pi pi-fw pi-user"></i><span>{{$t('configs.msg_account')}}</span></button>
                </li>
                <li>
                    <button class="p-link" too @click="logout"><i class="pi pi-fw pi-power-off"></i><span>{{$t('configs.msg_logout')}}</span></button>
                </li>
            </ul>
        </transition>

    </div>
</template>

<script>
    import LoginService from "../../service/login-service";
    import Vue from "vue";

    const loginService = new LoginService();

    export default {
        data() {
            return {
                expanded: false,
            }
        },
        computed:{
            user() {
                return Vue.prototype.$mystory.userLogged;
            },
        },
        methods: {
            onClick(event) {
                this.expanded = !this.expanded;
                event.preventDefault();
            },
            logout() {
                loginService.logout();
                this.$router.push("/login");
            },
            myAccount() {
                this.$router.push("/account");
            },
        }
    }
</script>

<style scoped>

.background-profile{
    box-sizing: border-box;
    padding-top: 1em;
    width: 250px;
    text-align: center;
    background: url(/assets/layout/images/profile-bg.png) top left no-repeat;
    background-size: 250px 145px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
}

</style>