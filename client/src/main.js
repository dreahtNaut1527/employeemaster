import Vue from 'vue'
import axios from 'axios'
import md5 from 'md5'
import swal from 'sweetalert2'
import moment from 'moment'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import Vuemask from 'v-mask'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import printreport from './plugins/printreport'
import vuetify from './plugins/vuetify'
import mixins from './plugins/mixins'

const url = process.env.VUE_APP_LOCAL_SERVER
// const url = process.env.VUE_APP_SERVER

export const SocketInstance = socketio(url)

// Vue Config 
Vue.config.productionTip = false

// Vue Prototype
Vue.prototype.axios = axios
Vue.prototype.swal = swal
Vue.prototype.md5 = md5
Vue.prototype.moment = moment
Vue.prototype.printreport = printreport

// Vue Use
Vue.use(mixins)
Vue.use(Vuemask)
Vue.use(new VueSocketIO({
     debug: false,
     connection: SocketInstance
}))

new Vue({
     router,
     store,
     vuetify,
     sockets: {
          connect() {
               store.commit('CHANGE_CONNECTION', true)
               // if(store.state.isLoggedIn) {
               //      if(this.userInfo.UserLevel == 0) {
               //           this.$router.push('/profile')
               //      } else {
               //           this.$router.push('/dashboard')
               //      }
               // }
          },
          disconnect() {
               store.commit('CHANGE_CONNECTION', false)
               this.$router.push('*')
          }
     },
     render: h => h(App)
}).$mount('#app')
 