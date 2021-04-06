import { mapState, mapMutations } from 'vuex'
import store from '../store'

const plugins = {
     install(Vue) {
          Vue.mixin({
               data: () => ({
                    api: process.env.VUE_APP_LOCAL_URL,
                    // api: process.env.VUE_APP_URL,
                    api_jap: process.env.VUE_APP_JAP_URL,
                    asd_sql: process.env.VUE_APP_ASD_SQL,
                    photo: process.env.VUE_APP_PHOTO,
                    photo_jap: process.env.VUE_APP_PHOTO_JAP
               }),
               created() {
                    if(store.state.EmployeeCode == undefined) {
                         this.axios.defaults.headers.common['x-api-key'] = process.env.VUE_APP_AWS_KEY
                    } else {
                         this.axios.defaults.headers.common['master-api'] = process.env.VUE_APP_URL_KEY
                    }
               },
               computed: {
                    ...mapState([
                         'userInfo', 
                         'isLoggedIn', 
                         'darkMode', 
                         'searchData',
                         'emplcode',
                         'isEmpEdit',
                         'isConnect',
                         'themeColor'
                    ])
               },
               methods: {
                    ...mapMutations([
                         'CHANGE_USER_INFO', 
                         'CHANGE_USER_LOGGING', 
                         'CHANGE_THEME', 
                         'CHANGE_SEARCHING',
                         'CHANGE_EMPLCODE',
                         'CHANGE_EMP_EDIT',
                         'CHANGE_CONNECTION',
                         'CHANGE_THEMECOLOR'
                    ]),
                    setNotifications(code, message) {
                         let body = {
                              procedureName: 'ProcPushNotification',
                              values: [
                                   0,
                                   this.$socket.id,
                                   this.userInfo.CompanyCode,
                                   code,
                                   message,
                                   1
                              ]
                         }
                         this.axios.post(`${this.api}/execute`, {data: JSON.stringify(body)})
                         this.$socket.emit('newNotifications', body.values)
                    },
                    clearHeaders(reset) {
                         if(reset == 1) {
                              delete this.axios.defaults.headers.common['x-api-key']
                              this.axios.defaults.headers.common['master-api'] = process.env.VUE_APP_URL_KEY
                         } else {
                              delete this.axios.defaults.headers.common['master-api']
                              this.axios.defaults.headers.common['x-api-key'] = process.env.VUE_APP_AWS_KEY
                         }
                    }
               }
          })
     }
}

export default plugins