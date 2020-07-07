<template>
    <div style="margin-bottom: 16px">
        <div :class="['profile', {'profile-expanded': this.expanded}]">
            <button class="p-link" @click="onClick">
                <img  v-show="dark" alt="Profile" class="profile-image" src="@/assets/images/avatar.png"/>
                <img  v-show="!dark" alt="Profile" class="profile-image" src="@/assets/images/avatar_grey.png"/>
                <span class="profile-name">{{ this.user.name }}</span>
                <i class="fa fa-fw fa-caret-down"></i>
                <span class="profile-role">{{ this.user.company }}</span>
            </button>
        </div>


        <transition name="layout-profile-menu">
            <ul class="layout-menu profile-menu" v-show="expanded">
                <li role="menuitem">
                    <button class="p-link" :tabIndex="expanded ? null : '-1'" @click="goToAccount">
                        <i class="fa fa-fw fa-user"></i>
                        <span>{{this.$t('configs.msg_account')}}</span>
                    </button>
                    <div class="layout-menu-tooltip">
                        <div class="layout-menu-tooltip-arrow"></div>
                        <div class="layout-menu-tooltip-text">{{this.$t('configs.msg_account')}}</div>
                    </div>
                </li>
                <li role="menuitem">
                    <button class="p-link" @click="logout">
                        <i class="fa fa-fw fa-sign-out"></i>
                        <span>Logout</span>
                    </button>
                    <div class="layout-menu-tooltip">
                        <div class="layout-menu-tooltip-arrow"></div>
                        <div class="layout-menu-tooltip-text">logout</div>
                    </div>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
    import Vue from "vue";
    import LoginService from "../../service/login-service";
    const loginService = new LoginService();

    export default {
        name: "AppInlineProfile",
        props: {
            expanded: {
                type: Boolean,
                default: null
            },
            dark: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            onClick(event) {
                this.$emit('profile-click', event);
                event.preventDefault();
            },
            goToAccount() {
                this.$router.push("/account");
            },
            logout() {
                loginService.logout();
                this.$router.push("/login");
            },
        },
        computed: {
            user() {
                const userLogged = Vue.prototype.$mystory.userLogged;
                const user = {
                    name: "",
                    company: ""
                }
                if (userLogged && userLogged.company) {
                    user.name = userLogged.name
                    user.company = userLogged.company.name
                }
                return user;
            },
        },
    }
</script>

<style scoped>

</style>
