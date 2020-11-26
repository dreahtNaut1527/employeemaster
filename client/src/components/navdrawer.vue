<template>
     <div>
          <v-navigation-drawer 
               :value="navDrawerVal"
               app
          >    
               <v-list-item>
                    <v-list-item-content class="ma-2 text-center">
                         <v-list-item-avatar size="112">
                              <img :src="`http://asd_sql:8080/photos/${user.EmployeeCode}.jpg`" alt="nopic.jpg">
                         </v-list-item-avatar>
                         <v-list-item-title class="headline">{{ user.EmployeeCode }}</v-list-item-title>
                         <v-list-item-subtitle>{{ user.EmployeeName }}</v-list-item-subtitle>
                         <v-list-item-subtitle>{{ user.DesignationName }}</v-list-item-subtitle>
                    </v-list-item-content>
               </v-list-item>
               <v-divider></v-divider>
               <v-list shaped dense>
                    <v-list-group
                         v-for="(item, i) in navDrawerList" :key="i"
                         v-model="item.active"
                         :prepend-icon="item.icon"
                         no-action
                    >
                         <template v-slot:activator>
                              <v-list-item-content>
                                   <v-list-item-title>{{item.title}}</v-list-item-title>
                              </v-list-item-content>
                         </template>
                         <v-list-item
                              v-for="child in item.items"
                              :to="child.to"
                              :key="child.text"
                              link 
                         >
                              <!-- @click="navDrawerHide(child.to)" -->
                              <v-list-item-content>
                                   <v-list-item-subtitle>{{child.text}}</v-list-item-subtitle>
                              </v-list-item-content>
                         </v-list-item>
                    </v-list-group>
               </v-list>               
               <v-bottom-navigation
                    background-color="transparent" 
                    absolute
               >
                    <v-spacer></v-spacer>
                    <v-switch
                         v-model="dark"
                         :prepend-icon="icon"
                         @change="changeTheme()"
                    ></v-switch>
               </v-bottom-navigation>
          </v-navigation-drawer>
          <v-app-bar
               app
          >
               <v-app-bar-nav-icon @click="navDrawerHide(null)"></v-app-bar-nav-icon>
               <v-toolbar-title v-if="userInfo.UserLevel < 9">{{ user.DepartmentName }} Department</v-toolbar-title>               <v-toolbar-title v-else>ASD Team</v-toolbar-title>
               <v-spacer></v-spacer>
               <v-text-field
                    class="mt-4 mr-3" 
                    v-model="search"    
                    append-icon="mdi-magnify"     
                    placeholder="Search"
                    @keyup="getSearchData()"
               ></v-text-field>
               <notifications />    
               <v-btn @click="logout()" icon>
                    <v-icon small>mdi-logout</v-icon>
               </v-btn>
          </v-app-bar>
          <v-snackbar
               v-model="snackBar"
               transition="scroll-x-reverse-transition"
               :timeout="2000"
               bottom
               right
          >
               hello
          </v-snackbar>
     </div>    
</template>

<script>
import notifications from '@/components/notifications'
import store from '@/store'

export default {
     data() {
          return {
               user: '',
               dark: false,
               overlay: false,
               isConnected: false,
               snackBar: false,
               icon: 'mdi-weather-night',
               search: '',
               socketId: '',
               navDrawerList: [],
               onLineUsers: []
          }
     },
     created() {
          this.dark = store.state.darkMode
          this.user = store.state.userInfo
          this.getUserLevel()
          this.socketId = this.$socket.id
     },
     sockets: {
          connect() {
               // Fired when the socket connects.
               this.isConnected = true;
               console.log("server connected");
          },

          disconnect() {
               this.isConnected = false;
               console.log("server disconnected");
          },
          loggedIn(data) {
               this.onLineUsers = data
          },
          notifications(data) {
               console.log(data)
               this.snackBar = !this.snackBar
          }
     },
     methods: {
          getSearchData() {
               store.commit('CHANGE_SEARCHING', this.search)
          },
          changeTheme() {
               this.$vuetify.theme.dark = this.dark
               this.icon = this.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
               store.commit('CHANGE_THEME', this.dark)
          },
          logout() {
               store.commit('CHANGE_USER_INFO', {})
               store.commit('CHANGE_THEME', false)
               store.commit('CHANGE_USER_LOGGING', false)
               store.commit('CHANGE_NAVDRAWER', false)
               this.setOffline()
               this.$router.push('/')
          },
          getUserLevel() {
               switch (store.state.userInfo.UserLevel) {
                    case 0:
                         this.navDrawerList = [
                              {
                                   title: 'Employee',
                                   icon: 'mdi-account',
                                   items: [{text: 'Profile', to: '/profile'}],
                                   active: true   
                              }
                         ]
                         break;
                    case 1: 
                         this.navDrawerList = [
                              {
                                   title: 'Dashboard',
                                   icon: 'mdi-home',
                                   items: [
                                        {text: 'Home', to: '/dashboard'},
                                        {text: 'Profile', to: '/profile'}
                                   ],
                                   active: true   
                              },
                              {
                                   title: 'Main Data',
                                   icon: 'mdi-account',
                                   items: [
                                        {text: 'Employees', to: '/employees'},
                                        {text: 'Departments', to: '/department'},
                                        {text: 'Sections', to: '/section'},
                                        {text: 'Team', to: '/team'},
                                        {text: 'Department - Section', to: '/divsec'},
                                        {text: 'Transfer Employees', to: '/transfer'},
                                   ],
                                   active: false   
                              }
                         ]
                         break;
                    default:
                         this.navDrawerList = [
                         {
                              title: 'Dashboard',
                              icon: 'mdi-home',
                              items: [{text: 'Home', to: '/dashboard'}],
                              active: true   
                         },
                         {
                              title: 'Main Data',
                              icon: 'mdi-account',
                              items: [
                                   {text: 'Employees', to: '/employees'},
                                   {text: 'Departments', to: '/department'},
                                   {text: 'Sections', to: '/section'},
                                   {text: 'Team', to: '/team'},
                                   {text: 'Department - Section', to: '/divsec'},
                                   {text: 'Transfer Employees', to: '/transfer'},
                              ],
                              active: false   
                         },
                         {
                              title: 'Maintenance',
                              icon: 'mdi-cog',
                              items: [
                                   {text: 'User Accounts', to: '/accounts'},
                                   {text: 'Profile', to: '/profile'}
                              ],
                              active: false   
                         }
                    ]
                         break;
               }
          },
          navDrawerHide(path) {
               if(!store.state.navDrawerVal) {
                    store.commit('CHANGE_NAVDRAWER', true)
               } else {
                    store.commit('CHANGE_NAVDRAWER', false)
               }
               if(path != null) {
                    this.$router.push(path).catch(err => {
                         if(err.name != 'NavigationDuplicated') {
                              console.log(err)
                         }
                    })
               }
          },
          setOffline() {
               let index = this.onLineUsers.findIndex(rec => {
                    console.log(rec.id)
                    if(rec.id == this.socketId) {
                         return true
                    }
               })
               this.onLineUsers.splice(index, 1)
               this.$socket.emit('loggedIn', this.onLineUsers)
          }
     },
     watch: {
          dark() {
               this.changeTheme()
          }
     },
     components: {
          notifications
     }
}
</script>