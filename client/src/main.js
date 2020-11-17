import Vue from 'vue'
import axios from 'axios'
import md5 from 'md5'
import swal from 'sweetalert2'
import moment from 'moment'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import mixins from './plugins/mixins'

// Vue Config 
Vue.config.productionTip = false


// Vue Prototype
Vue.prototype.axios = axios
Vue.prototype.swal = swal
Vue.prototype.md5 = md5
Vue.prototype.moment = moment

// Vue Use
Vue.use(mixins)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
