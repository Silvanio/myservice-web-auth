import Vue from "vue";

export default {
    data() {
        return {
            submitted: false,
        }
    },
    methods: {
        save(isFormValid) {
            this.submitted = true;
            if (!isFormValid) {
                return;
            }
            this.getService().save(this.getModel()).then((response) => {
                Vue.prototype.$msgbus.addMessageSuccess("msg_info", response.message);
            }).catch(error => {
                const code = error.response.status
                if (code === 400) {
                    const message = JSON.parse(error.response.data);
                    Vue.prototype.$msgbus.addMessageWarn(message.message, message.details);
                }
            });
        },
    }
};