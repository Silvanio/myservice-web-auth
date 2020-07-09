<template>
    <div :class="containerClass" @click="onDocumentClick">
        <div>
            <AppTopBar :topbarMenuActive="topbarMenuActive" :profileMode="profileMode" :horizontal="layoutMode === 'horizontal'" :activeTopbarItem="activeTopbarItem"
                       @menubutton-click="onMenuButtonClick" @topbar-menubutton-click="onTopbarMenuButtonClick" @topbar-item-click="onTopbarItemClick"></AppTopBar>

            <transition name="layout-menu-container">
                <div :class="menuClass" @click="onMenuClick" v-show="isMenuVisible()">
                    <div class="menu-scroll-content">
                        <AppInlineProfile v-if="profileMode === 'inline' && layoutMode !== 'horizontal'" @profile-click="onProfileClick"
                                          :expanded="profileExpanded" :dark="darkMenu"></AppInlineProfile>

                        <AppMenu :model="menu" :layoutMode="layoutMode" :active="menuActive" @menuitem-click="onMenuItemClick" @root-menuitem-click="onRootMenuItemClick"></AppMenu>

                    </div>
                </div>
            </transition>

            <div class="layout-main">
                <router-view/>
            </div>

            <AppFooter/>
        </div>
    </div>
</template>

<script>
    import AppTopBar from './AppTopbar.vue';
    import AppInlineProfile from './AppInlineProfile.vue';
    import AppMenu from './AppMenu.vue';
    import AppFooter from './AppFooter.vue';
    import UserService from "../../service/user-service";
    import Vue from "vue";
    import AuthStorage from "../../utils/auth-storage";
    import LoginService from "../../service/login-service";

    const userService = new UserService();
    const loginService = new LoginService();

    export default {
        data() {
            return {
                layoutMode: 'slim',
                profileMode: 'top',
                overlayMenuActive: false,
                staticMenuDesktopInactive: false,
                staticMenuMobileActive: false,
                topbarMenuActive: false,
                activeTopbarItem: null,
                rotateMenuButton: false,
                darkMenu: true,
                menu: [
                    {label: this.$t('menu.lbl_initial'), icon: 'pi pi-fw pi-ticket', to: '/empty', auth: true},
                    {
                        label: this.$t('menu.lbl_company'), icon: 'fa fa-fw fa-building', to: '/company/consult',
                        auth: this.isAuthorizedRules(["AUTH_ADMIN"])
                    },
                    {
                        label: this.$t('menu.lbl_contracts'), icon: 'fa fa-fw fa-file-text', to: '/contract/consult',
                        auth: this.isAuthorizedRules(["AUTH_ADMIN"])
                    },
                    {
                        label: this.$t('menu.lbl_my_contracts'), icon: 'fa fa-fw fa-file-text', to: '/my-contracts/consult',
                        auth: this.isAuthorizedRules(["AUTH_CLIENT_ADMIN"])
                    },
                    {
                        label: this.$t('menu.lbl_modules'), icon: 'pi pi-fw pi-microsoft', to: '/module/consult',
                        auth: this.isAuthorizedRules(["AUTH_ADMIN"])
                    },
                    {
                        label: this.$t('menu.lbl_users'), icon: 'fa fa-fw fa-user-circle-o', to: '/profile/consult',
                        auth: this.isAuthorizedRules(["AUTH_ADMIN", "AUTH_CLIENT_ADMIN"])
                    },
                ],
                menuActive: false,
                profileExpanded: false,
                theme: 'blue',
                layout: 'blue',
                version: 'v4'
            }
        },
        beforeCreate: function () {
            document.body.className = 'home';
        },
        created: function () {
            userService.getCurrentUserInfo().then((response) => {
                Vue.prototype.$mymutations.setUserLogged(response);
                AuthStorage.setStorage(true, "authorities", JSON.stringify(response.authorities));
            }).catch(error => {
                const code = error.response.status
                if (code === 400) {
                    console.log(error.message)
                    const message = JSON.parse(error.response.data);
                    Vue.prototype.$msgbus.addMessageWarn(message.message, message.details);
                }
                loginService.logout()
                this.$router.push("/login");
            });
            this.initMenu();
            this.initMenuEvent();
        },
        watch: {
            $route() {
                this.menuActive = false;
                this.$toast.removeAllGroups();
            }
        },
        methods: {
            initMenu() {
                const storageLayoutMode = AuthStorage.getStorage("layoutMode")
                const storageProfileMode = AuthStorage.getStorage("profileMode")
                const storageDarkMenu = AuthStorage.getStorage("darkMenu")
                if (storageLayoutMode) {
                    this.layoutMode = storageLayoutMode;
                }
                if (storageProfileMode) {
                    this.profileMode = storageProfileMode;
                }
                if (storageDarkMenu) {
                    this.darkMenu = storageDarkMenu === "true";
                }
            },
            initMenuEvent() {
                Vue.prototype.$msgbus.$on('change-layoutMode', (value) => {
                    this.layoutMode = value;
                    AuthStorage.setStorage(true, "layoutMode", value);

                });
                Vue.prototype.$msgbus.$on('change-darkMenu', (value) => {
                    this.darkMenu = value
                    AuthStorage.setStorage(true, "darkMenu", value);

                });
                Vue.prototype.$msgbus.$on('change-profileMode', (value) => {
                    this.profileMode = value;
                    AuthStorage.setStorage(true, "profileMode", value);
                });
            },
            onDocumentClick() {
                if (!this.topbarItemClick) {
                    this.activeTopbarItem = null;
                    this.topbarMenuActive = false;
                }

                if (!this.menuClick) {
                    if (this.isHorizontal() || this.isSlim()) {
                        this.menuActive = false;
                        Vue.prototype.$msgbus.$emit('reset_active_index');
                    }

                    this.hideOverlayMenu();
                }

                this.topbarItemClick = false;
                this.menuClick = false;
            },
            onProfileClick(event) {
                this.profileExpanded = !this.profileExpanded;
                if (this.isHorizontal() || this.isSlim()) {
                    Vue.prototype.$msgbus.$emit('reset_active_index');
                }

                event.preventDefault();
            },
            onMenuClick() {
                this.menuClick = true;
            },
            onMenuItemClick(event) {
                if (!event.item.items) {
                    Vue.prototype.$msgbus.$emit('reset_active_index');
                    this.hideOverlayMenu();
                }
                if (!event.item.items && this.isHorizontal()) {
                    this.menuActive = false;
                }
            },
            onRootMenuItemClick() {
                this.menuActive = !this.menuActive;
            },
            onMenuButtonClick(event) {
                this.menuClick = true;

                this.rotateMenuButton = !this.rotateMenuButton;
                this.topbarMenuActive = false;

                if (this.layoutMode === 'overlay') {
                    this.overlayMenuActive = !this.overlayMenuActive;
                } else {
                    if (this.isDesktop())
                        this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
                    else
                        this.staticMenuMobileActive = !this.staticMenuMobileActive;
                }

                event.preventDefault();
            },
            onTopbarMenuButtonClick(event) {
                this.topbarItemClick = true;
                this.topbarMenuActive = !this.topbarMenuActive;
                this.hideOverlayMenu();
                event.preventDefault();
            },
            onTopbarItemClick(event) {
                this.topbarItemClick = true;

                if (this.activeTopbarItem === event.item)
                    this.activeTopbarItem = null;
                else
                    this.activeTopbarItem = event.item;

                event.originalEvent.preventDefault();
            },
            hideOverlayMenu() {
                this.rotateMenuButton = false;
                this.overlayMenuActive = false;
                this.staticMenuMobileActive = false;
            },
            isDesktop() {
                return window.innerWidth > 1024;
            },
            isHorizontal() {
                return this.layoutMode === 'horizontal';
            },
            isSlim() {
                return this.layoutMode === 'slim';
            },
            isAuthorizedRules(necessaryRules) {
                return Vue.prototype.$authbus.isAuthorized(necessaryRules)
            },
            isMenuVisible() {
                if (this.isDesktop()) {
                    if (this.layoutMode === 'static')
                        return !this.staticMenuDesktopInactive;
                    else if (this.layoutMode === 'overlay')
                        return this.overlayMenuActive;
                    else
                        return true;
                } else {
                    if (this.staticMenuMobileActive)
                        return true;
                    else if (this.layoutMode === 'overlay')
                        return this.overlayMenuActive;
                    else
                        return true;
                }
            },
        },
        computed: {
            containerClass() {
                return ['layout-wrapper', {
                    'menu-layout-static': this.layoutMode !== 'overlay',
                    'menu-layout-overlay': this.layoutMode === 'overlay',
                    'layout-menu-overlay-active': this.overlayMenuActive,
                    'menu-layout-slim': this.layoutMode === 'slim',
                    'menu-layout-horizontal': this.layoutMode === 'horizontal',
                    'layout-menu-static-inactive': this.staticMenuDesktopInactive,
                    'layout-menu-static-active': this.staticMenuMobileActive
                }];
            },
            menuClass() {
                return ['layout-menu-container', {'layout-menu-dark': this.darkMenu}];
            }
        },
        components: {
            'AppTopBar': AppTopBar,
            'AppInlineProfile': AppInlineProfile,
            'AppMenu': AppMenu,
            'AppFooter': AppFooter
        }
    }
</script>

<style lang="scss">
    @import './App.scss';

</style>
