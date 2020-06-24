<template>
    <div class="layout-footer footer-abs">
            <span class="footer-text" style="margin-right: 5px">    
                <img alt="Vue logo" src="@/assets/layout/images/logo.png" width="95">
            </span>
            <span class="footer-text" style="margin-left: 5px">|</span>
            <span class="footer-text" style="margin-left: 5px">Administração de acessos</span>
    </div>
</template>

<script>
    export default {
        name: "AppFooter"
    }
</script>

<style scoped>
    .footer-abs {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
    .footer-abs1 {
        width: 100%;
    }
</style>