<template>
    <div class="layout-profile">
        <div>
            <img src="assets/layout/images/profile.png" alt=""/>
        </div>
        <button class="p-link layout-profile-link" @click="onClick">
            <span class="username">{{ this.user.name }}</span>
            <i class="pi pi-fw pi-cog"></i>
        </button>
        <transition name="layout-submenu-wrapper">
            <ul v-show="expanded">
                <li>
                    <button class="p-link"><i class="pi pi-fw pi-user"></i><span>Account</span></button>
                </li>
                <li>
                    <button class="p-link"><i class="pi pi-fw pi-inbox"></i><span>Notifications</span><span class="menuitem-badge">2</span></button>
                </li>
                <li>
                    <button class="p-link" too @click="logout"><i class="pi pi-fw pi-power-off"></i><span>Logout</span></button>
                </li>
            </ul>
        </transition>

    </div>
</template>

<script>
    import LoginService from "../../service/login-service";

    const loginService = new LoginService();

    export default {
        props: {
            user: Object
        },
        data() {
            return {
                expanded: false
            }
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
        }
    }
</script>

<style scoped>

</style>