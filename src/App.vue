<template>
    <div>
        <div v-if="showProgressBar" class="p-blockui p-component-overlay" style="z-index: 1008;"></div>
        <ProgressBar v-show="showProgressBar" :mode="showProgress" style="height: .2em"/>
        <Toast :base-z-index="99999" :auto-z-index="false"/>
        <router-view/>
    </div>
</template>

<script>

    import Vue from "vue";

    export default {
        name: "app",
        beforeMount() {
            Vue.prototype.$mymutations.setProgressBar(false);
        },
        created() {
            const vm = this;
            Vue.prototype.$msgbus.$on("MSG_GENERAL", function(message,event) {
                this.$toast.add({severity: message.type, summary: vm.$t(message.summary), detail: vm.$t(message.detail), life:3000});
                if(event){
                    event.preventDefault();
                }
            });
        },
        computed: {
            showProgress() {
                return Vue.prototype.$mystory.progressBar ? "indeterminate" : "determinate";
            },
            showProgressBar() {
                return Vue.prototype.$mystory.progressBar;
            },
        },
    };
</script>

<style lang="scss">
    .p-link:focus {
        box-shadow: none !important;
    }
    .p-toast.p-toast-topright {
        z-index: 9999 !important;
    }

</style>
