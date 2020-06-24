<template>
    <div :class="containerClass" @click="onWrapperClick">

        <AppTopBar @menu-toggle="onMenuToggle"  @menu-close="onMenuClose" />

        <transition name="layout-sidebar">
            <div :class="sidebarClass" @click="onSidebarClick" v-show="isSidebarVisible()">
                <div class="layout-title">
                    <router-link to="/">
                        <h1 class="title">{{$t('lbl_app_title')}}</h1>
                    </router-link>
                </div>

                <AppProfile/>
                <AppMenu :model="menu" @menuitem-click="onMenuItemClick"/>
            </div>
        </transition>

        <div class="layout-main">
            <router-view/>
        </div>

        <AppFooter/>
    </div>

</template>

<script>

    import AppTopBar from './AppTopbar';
    import AppProfile from './AppProfile';
    import AppMenu from './AppMenu';
    import AppFooter from './AppFooter';
    import Vue from "vue";
    import UserService from "../../service/user-service";

    const userService = new UserService();

    export default {
        components: {
            'AppTopBar': AppTopBar,
            'AppProfile': AppProfile,
            'AppMenu': AppMenu,
            'AppFooter': AppFooter,

        },
        beforeCreate: function () {
            document.body.className = 'home';
        },
        created: function () {
            userService.getCurrentUserInfo().then((response) => {
                Vue.prototype.$mymutations.setUserLogged(response);
            });
        },
        data() {
            return {
                layoutMode: 'static',
                layoutColorMode: 'light',
                staticMenuInactive: false,
                overlayMenuActive: false,
                mobileMenuActive: false,
                userLogged: {},
                title: "Acessos",
                menu: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-chart-line', to: '/'},
                    {label: 'About', icon: 'pi pi-fw pi-info-circle', to: '/about'},
                    {
                        label: 'Template Pages', icon: 'pi pi-fw pi-desktop',
                        items: [
                            {label: 'Empty Page', icon: 'pi pi-fw pi-ticket', to: '/empty'}
                        ]
                    },
                    {
                        label: 'Menu Colors', icon: 'pi pi-fw pi-align-left',
                        items: [
                            {label: 'Dark', icon: 'pi pi-fw pi-bars', command: () => this.layoutColorMode = 'dark'},
                            {label: 'Light', icon: 'pi pi-fw pi-bars', command: () => this.layoutColorMode = 'light'}
                        ]
                    },
                ]
            }
        },
        watch: {},
        methods: {
            onWrapperClick() {
                if (!this.menuClick) {
                    this.overlayMenuActive = false;
                    this.mobileMenuActive = false;
                }
                this.menuClick = false;
            },

            onMenuClose() {
                this.menuClick = true;

                if (this.isDesktop()) {
                    if (this.layoutMode === 'overlay') {
                        this.overlayMenuActive = true;
                    } else if (this.layoutMode === 'static') {
                        this.staticMenuInactive = true;
                    }
                } else {
                    this.mobileMenuActive = true;
                }
                event.preventDefault();
            },

            onMenuToggle() {
                this.menuClick = true;

                if (this.isDesktop()) {
                    if (this.layoutMode === 'overlay') {
                        this.overlayMenuActive = !this.overlayMenuActive;
                    } else if (this.layoutMode === 'static') {
                        this.staticMenuInactive = !this.staticMenuInactive;
                    }
                } else {
                    this.mobileMenuActive = !this.mobileMenuActive;
                }

                event.preventDefault();
            },
            onSidebarClick() {
                this.menuClick = true;
            },
            onMenuItemClick(event) {
                if (event.item && !event.item.items) {
                    this.overlayMenuActive = false;
                    this.mobileMenuActive = false;
                }
            },
            addClass(element, className) {
                if (element.classList)
                    element.classList.add(className);
                else
                    element.className += ' ' + className;
            },
            removeClass(element, className) {
                if (element.classList)
                    element.classList.remove(className);
                else
                    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            },
            isDesktop() {
                return window.innerWidth > 1024;
            },
            isSidebarVisible() {
                if (this.isDesktop()) {
                    if (this.layoutMode === 'static')
                        return !this.staticMenuInactive;
                    else if (this.layoutMode === 'overlay')
                        return this.overlayMenuActive;
                    else
                        return true;
                } else {
                    return true;
                }
            },
        },
        computed: {
            containerClass() {
                return ['layout-wrapper', {
                    'layout-overlay': this.layoutMode === 'overlay',
                    'layout-static': this.layoutMode === 'static',
                    'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                    'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                    'layout-mobile-sidebar-active': this.mobileMenuActive
                }];
            },
            sidebarClass() {
                return ['layout-sidebar', {
                    'layout-sidebar-dark': this.layoutColorMode === 'dark',
                    'layout-sidebar-light': this.layoutColorMode === 'light'
                }];
            },
        },
        beforeUpdate() {
            if (this.mobileMenuActive)
                this.addClass(document.body, 'body-overflow-hidden');
            else
                this.removeClass(document.body, 'body-overflow-hidden');
        },

    }
</script>

<style lang="scss">
    .p-toast.p-toast-topright {
        z-index: 1000;
        top: 70px;
    }

    .p-toast {
        width: 20.4rem !important;
    }

    .p-toast.p-toast-topright {
        z-index: 1000 !important;
        top: 10px !important;
        right: 10px !important;
    }

    .title {
        color: #eeeeee !important;
        margin: -7px !important;
    }

</style>
