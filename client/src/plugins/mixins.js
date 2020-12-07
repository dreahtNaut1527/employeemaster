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
                         'isEmpEdit'
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
                         'CHANGE_EMP_EDIT'
                    ]),
                    setNotifications(title, message) {
                         let data = {
                              socket: this.$socket.id,
                              title: title,
                              message: message
                         }
                         this.$socket.emit('newNotifications', data)
                    }
               }
          })
     }
}

export default plugins