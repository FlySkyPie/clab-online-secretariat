import Vue from 'vue'

import router from './router'
import App from './components/App.vue'
import DataProvider from './plugin/DataProvider';

//for api fetch

Vue.use(DataProvider);

//for bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
