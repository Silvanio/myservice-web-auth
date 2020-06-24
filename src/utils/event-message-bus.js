import Vue from "vue";


export const eventMessageBus = new Vue({
    methods: {
        addMessageError(summary, detail) {
            const messageModel = {
                type: "error",
                summary: summary,
                detail: detail
            }
            eventMessageBus.$emit('MSG_GENERAL', messageModel)
        },
        addMessageWarn(summary, detail) {
            const messageModel = {
                type: "warn",
                summary: summary,
                detail: detail
            }
            eventMessageBus.$emit('MSG_GENERAL', messageModel)
        },
        addMessageSuccess(summary, detail) {
            const messageModel = {
                type: "success",
                summary: summary,
                detail: detail
            }
            eventMessageBus.$emit('MSG_GENERAL', messageModel)
        },
        addMessageInfo(summary, detail) {
            const messageModel = {
                type: "info",
                summary: summary,
                detail: detail
            }
            eventMessageBus.$emit('MSG_GENERAL', messageModel)
        }
    },
});
