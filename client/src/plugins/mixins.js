import { mapState, mapMutations } from 'vuex'

const plugins = {
     install(Vue) {
          Vue.mixin({
               data: () => ({
                    api: process.env.VUE_APP_URL
               }),
               computed: {
                    ...mapState([
                         'userInfo', 
                         'isLoggedIn', 
                         'darkMode', 
                         'searchData',
                         'navDrawerVal'
                    ])
               },
               methods: {
                    ...mapMutations([
                         'CHANGE_USER_INFO', 
                         'CHANGE_USER_LOGGING', 
                         'CHANGE_THEME', 
                         'CHANGE_SEARCHING',
                         'CHANGE_NAVDRAWER'
                    ])
               }
          })
     }
}

export default plugins