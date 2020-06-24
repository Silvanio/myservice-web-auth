<template>
    <div class="layout-topbar">
        <button class="p-link layout-menu-button" @click="onMenuToggle">
            <span class="pi pi-bars"></span>
        </button>
        <div class="layout-topbar-icons">
                <button class="p-link"  style="position: relative;" @click="onMenuProfile" aria-haspopup="true" aria-controls="overlay_menu">
                    <span class="layout-topbar-icon pi pi-user"></span>
                </button>
                <Menu id="overlay_menu"  ref="menu" :model="profileItems" :popup="true"/>
        </div>
    </div>
</template>

<script>

    import LoginService from "../../service/login-service";

    const loginService = new LoginService();

    export default {
        data() {
            return {
                selectLang: null,
                lang: [
                    {name: 'Português', code: 'pt'},
                    {name: 'Inglês', code: 'en'}
                ],
                profileItems: [
                    {
                        label: this.$t('configs.msg_account'),
                        icon: 'pi pi-user',
                        command: () => {
                            this.$router.push("/account");
                            if(this.isDesktop()){
                                this.$emit('menu-toggle', event);
                            }
                        }
                    },
                    {
                        label: this.$t('configs.msg_logout'),
                        icon: 'pi pi-power-off  ',
                        command: () => {
                            loginService.logout();
                            this.$router.push("/login");
                        }
                    }
                ]
            }
        },
        methods: {
            onMenuProfile(event) {
                if(this.isDesktop()){
                    this.$emit('menu-close', event);
                }
                this.$refs.menu.toggle(event);
            },
            onMenuToggle(event) {
                this.$emit('menu-toggle', event);
            },
            isDesktop() {
                return window.innerWidth > 1024;
            },
        }
    }
</script>

<style scoped>

</style>
