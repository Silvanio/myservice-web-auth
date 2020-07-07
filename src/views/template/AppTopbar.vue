<template>
    <div class="topbar clearfix">
        <div class="topbar-left">
            <img alt="Logo" src="@/assets/images/mylogo_white.png" class="topbar-logo"/>
        </div>

        <div class="topbar-right">
            <button class="p-link" id="menu-button" @click="onMenuButtonClick">
                <i class="fa fa-angle-left"></i>
            </button>

            <button class="p-link" id="topbar-menu-button" @click="onTopbarMenuButtonClick">
                <i class="fa fa-bars"></i>
            </button>

            <ul :class="topbarItemsClass">

                <li  v-show="isDesktop"  :class="[{'active-top-menu': activeTopbarItem === 'design'}]"
                    @click="$emit('topbar-item-click',{originalEvent:$event,item:'design'})">
                    <button class="p-link">
                        <i class="topbar-icon pi pi-desktop"></i>
                        <span class="topbar-item-name">Design</span>
                    </button>
                    <transition name="layout-submenu-container">
                        <ul class="layout-menu fadeInDown" v-show="activeTopbarItem === 'design'">
                            <li role="menuitem" v-for="item in items" :key="item.label">
                                <button class="p-link" @click="item.command()">
                                    <i :class="item.icon"></i>
                                    <span>{{item.label}}</span>
                                </button>
                            </li>
                        </ul>
                    </transition>
                </li>


                <li :class="[{'active-top-menu': activeTopbarItem === 'modulos'}]"
                    @click="$emit('topbar-item-click',{originalEvent:$event,item:'modulos'})">
                    <button class="p-link">
                        <i class="topbar-icon pi pi-microsoft"></i>
                        <span class="topbar-item-name">Módulos</span>
                    </button>
                    <transition name="layout-submenu-container">
                        <ul class="layout-menu fadeInDown" v-show="activeTopbarItem === 'modulos'">
                            <li role="menuitem" v-for="item in appModules" :key="item.description">
                                <button class="p-link" @click="goToURL(item.webUrl)">
                                    <span>{{item.description}}</span>
                                </button>
                            </li>
                        </ul>
                    </transition>
                </li>


                <li v-if="profileMode === 'top' || horizontal"
                    :class="['profile-item', {'active-top-menu': activeTopbarItem === 'profile'}]"
                    @click="$emit('topbar-item-click',{originalEvent:$event,item:'profile'})">
                    <button class="p-link">
                        <img alt="User" v-show="isDesktop" class="profile-image" src="@/assets/images/avatar.png"/>
                        <img alt="User" v-show="!isDesktop" class="profile-image" src="@/assets/images/avatar_black.png"/>
                        <span class="topbar-item-name">{{ this.user.name }}</span>
                        <span class="topbar-item-role">{{ this.user.company }}</span>
                    </button>

                    <transition name="layout-submenu-container">
                        <ul class="layout-menu fadeInDown" v-show="activeTopbarItem === 'profile'">
                            <li role="menuitem">
                                <button class="p-link" @click="goToAccount">
                                    <i class="fa fa-fw fa-user"></i>
                                    <span>{{this.$t('configs.msg_account')}}</span>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button class="p-link" @click="logout">
                                    <i class="fa fa-fw fa-sign-out"></i>
                                    <span>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </transition>
                </li>


            </ul>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import LoginService from "../../service/login-service";

    const loginService = new LoginService();

    export default {
        props: {
            topbarMenuActive: Boolean,
            profileMode: String,
            horizontal: Boolean,
            activeTopbarItem: String
        },

        data() {
            return {
                items: [
                    {label: 'Static Menu', icon: 'fa fa-fw fa-bars', command: () =>   Vue.prototype.$msgbus.$emit('change-layoutMode','static')},
                    {label: 'Overlay Menu', icon: 'fa fa-fw fa-bars', command: () => Vue.prototype.$msgbus.$emit('change-layoutMode','overlay')},
                    {label: 'Slim Menu', icon: 'fa fa-fw fa-bars', command: () => Vue.prototype.$msgbus.$emit('change-layoutMode','slim')},
                    {label: 'Horizontal Menu', icon: 'fa fa-fw fa-bars', command: () => Vue.prototype.$msgbus.$emit('change-layoutMode','horizontal')},
                    {label: 'Perfil Lateral', icon: 'fa fa-sun-o fa-fw', command: () => Vue.prototype.$msgbus.$emit('change-profileMode','inline')},
                    {label: 'Perfil Superior', icon: 'fa fa-moon-o fa-fw', command: () => Vue.prototype.$msgbus.$emit('change-profileMode','top')},
                    {label: 'Light Menu', icon: 'fa fa-sun-o fa-fw', command: () => Vue.prototype.$msgbus.$emit('change-darkMenu',false)},
                    {label: 'Dark Menu', icon: 'fa fa-moon-o fa-fw', command: () => Vue.prototype.$msgbus.$emit('change-darkMenu',true)}
                ]
            }
        },
        methods: {
            onMenuButtonClick(event) {
                this.$emit('menubutton-click', event);
            },
            onTopbarMenuButtonClick(event) {
                this.$emit('topbar-menubutton-click', event);
            },
            goToAccount() {
                this.$router.push("/account");
            },
            goToURL(URL) {
                window.location.href = URL;
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
            appModules() {
                const userLogged = Vue.prototype.$mystory.userLogged;
                return userLogged.appModules;
            },
            topbarItemsClass() {
                return ['topbar-items fadeInDown', {
                    'topbar-items-visible': this.topbarMenuActive
                }];
            },
            isDesktop() {
                return window.innerWidth > 1024;
            },
        }
    }
</script>

<style scoped>
    .layout-wrapper .topbar-items > li.profile-item button .topbar-item-role {
        font-size: 9px !important;
    }

    .layout-wrapper .topbar-items > li.profile-item button .topbar-item-name {
        font-size: 15px !important;
    }

    .layout-wrapper .topbar-items > li.profile-item button {
        top: -9px !important;
    }

    .layout-wrapper .topbar-items > li.profile-item button .profile-image {
        margin-top: 4px !important;;
    }


</style>
