import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueCompositionAPI from '@vue/composition-api'
import VTooltip from 'v-tooltip'
import UUID from "vue-uuid";

Vue.use(UUID);

Vue.use(VTooltip)

Vue.use(VueCompositionAPI)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
