import Vue from "vue";
import AuthStorage from "./auth-storage";

export const authBus = new Vue({
    methods: {
        isAuthorized(necessaryRules) {
            const authorities = JSON.parse(AuthStorage.getStorage("authorities"));
            if (!necessaryRules) {
                return true;
            }
            if (!authorities) {
                return false;
            }
            return authorities.some(r => necessaryRules.includes(r));
        }
    },
});
