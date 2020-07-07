import Vue from "vue";

export default {
    data() {
        return {
            pt: {
                firstDayOfWeek: 1,
                dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"],
                dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
                dayNamesMin: ["D", "S", "T", "Qa", "Qi", "Sx", "Sb"],
                monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dec"],
                today: 'Hoje',
                clear: 'Limpar',
                weekHeader: 'SM',
                dateFormat: 'mm/dd/yy',
            },
        }
    },
    methods: {
        catchError(error) {
            const code = error.response.status
            if (code === 400) {
                console.log(error.message)
                const message = JSON.parse(error.response.data);
                Vue.prototype.$msgbus.addMessageWarn(message.message, message.details);
            }
        }
    }
}