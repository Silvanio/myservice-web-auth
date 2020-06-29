import Vue from 'vue'
import App from './App.vue'
import router from './router'


import 'primevue/resources/themes/nova-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'prismjs/themes/prism-coy.css';
import './assets/layout/layout.scss';

import {Vuelidate} from 'vuelidate';
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Breadcrumb from 'primevue/breadcrumb';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Card from "primevue/card";
import Password from 'primevue/password';
import Checkbox from "primevue/checkbox";
import VueI18n from 'vue-i18n';
import Dropdown from 'primevue/dropdown';
import SplitButton from 'primevue/splitbutton';
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import ProgressBar from 'primevue/progressbar';
import BlockUI from 'primevue/blockui';
import Panel from 'primevue/panel';
import Menubar from 'primevue/menubar';
import Tooltip from 'primevue/tooltip';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Textarea from 'primevue/textarea';

import {mutations, store} from "./utils/store";
import {eventMessageBus} from "./utils/event-message-bus";


Vue.component('Button', Button);
Vue.component('InputText', InputText);
Vue.component('Breadcrumb', Breadcrumb);
Vue.component('Toast', Toast);
Vue.component('Card', Card);
Vue.component('Password', Password);
Vue.component('Checkbox', Checkbox);
Vue.component('Dropdown', Dropdown);
Vue.component('SplitButton', SplitButton);
Vue.component('Menu', Menu);
Vue.component('Dialog', Dialog);
Vue.component('ProgressBar', ProgressBar);
Vue.component('BlockUI', BlockUI);
Vue.component('Panel', Panel);
Vue.component('Menubar', Menubar);
Vue.component('Tooltip', Tooltip);
Vue.component('Column', Column);
Vue.component('DataTable', DataTable);
Vue.component('Textarea', Textarea);



Vue.use(Vuelidate)
Vue.use(ToastService);
Vue.use(VueI18n)

Vue.config.productionTip = false
Vue.prototype.$mystory = store;
Vue.prototype.$mymutations = mutations;
Vue.prototype.$msgbus = eventMessageBus;


let message = require('./assets/i18n/message.js')

const i18n = new VueI18n({
  locale: 'pt',
  fallbackLocale: 'pt',
  messages: message
})

Vue.directive('tooltip', Tooltip);


export const vm =new Vue({
  router,
  i18n,
  render: h => h(App)
});

vm.$mount('#app');
