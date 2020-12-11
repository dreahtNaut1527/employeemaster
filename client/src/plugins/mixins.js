import { mapState, mapMutations } from 'vuex'

const plugins = {
     install(Vue) {
          Vue.mixin({
               data: () => ({
                    api: process.env.VUE_APP_LOCAL_URL,
                    asd_sql: process.env.VUE_APP_ASD_SQL
               }),
               computed: {
                    ...mapState([
                         'userInfo', 
                         'isLoggedIn', 
                         'darkMode', 
                         'searchData',
                         'navDrawerVal',
                         'emplcode',
                         'isEmpEdit',
                         'isConnect'
                    ])
               },
               methods: {
                    ...mapMutations([
                         'CHANGE_USER_INFO', 
                         'CHANGE_USER_LOGGING', 
                         'CHANGE_THEME', 
                         'CHANGE_SEARCHING',
                         'CHANGE_NAVDRAWER',
                         'CHANGE_EMPLCODE',
                         'CHANGE_EMP_EDIT',
                         'CHANGE_CONNECTION'
                    ]),
                    setNotifications(title, message) {
                         let body = {
                              procedureName: 'ProcPushNotification',
                              values: [
                                   this.$socket.id,
                                   title,
                                   message
                              ]
                         }
                         this.axios.post(`${this.api}/execute`, {data: JSON.stringify(body)})
                         this.$socket.emit('newNotifications', body)
                    }
               }
          })
     }
}

export default plugins