import Vue from 'vue'
import App from './about.vue'

import api from '@/api'
Vue.use(api)

new Vue({
  render: h => h(App)
}).$mount('#app')
