import Vue from 'vue'
import axios from 'axios'
import md5 from 'md5'
import swal from 'sweetalert2'
import moment from 'moment'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import mixins from './plugins/mixins'

// export const SocketInstance = socketio('http://asd_sql:8700');

export const SocketInstance = socketio('http://ADMINSQL1:8700');

// Vue Config 
Vue.config.productionTip = false


// Vue Prototype
Vue.prototype.axios = axios
Vue.prototype.swal = swal
Vue.prototype.md5 = md5
Vue.prototype.moment = moment

// Vue Use
Vue.use(mixins)
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance
}));

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
