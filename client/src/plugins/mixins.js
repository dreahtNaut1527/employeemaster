import { mapState, mapMutations } from 'vuex'

const plugins = {
     install(Vue) {
          Vue.mixin({
               data: () => ({
                    api: process.env.VUE_APP_URL,
                    asd_sql: process.env.VUE_APP_ASD_SQL
               }),
               computed: {
                    ...mapState([
                         'userInfo', 
                         'isLoggedIn', 
                         'darkMode', 
                         'searchData',
                         'navDrawerVal',
                         'emplcode'
                    ])
               },
               methods: {
                    ...mapMutations([
                         'CHANGE_USER_INFO', 
                         'CHANGE_USER_LOGGING', 
                         'CHANGE_THEME', 
                         'CHANGE_SEARCHING',
                         'CHANGE_NAVDRAWER',
                         'CHANGE_EMPLCODE'
                    ])
               }
          })
     }
}

export default plugins