<template>
     <div>
          <v-navigation-drawer 
               :value="navDrawerVal"
               app
          >     
               <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
                    <v-row align="center" justify="center">
                         <v-col cols="12" md="6">
                              <v-avatar color="white" size="120">
                                   <v-avatar size="110">
                                        
                                   <img :src="`http://asd_sql:8080/photos/${user.EmployeeCode}.jpg`" alt="nopic.jpg">
                                   </v-avatar>
                              </v-avatar>
                         </v-col>
                    </v-row>
                    <v-list-item>
                         <v-list-item-content class="text-center white--text">
                              <v-list-item-title class="headline">{{ user.EmployeeCode }}</v-list-item-title>
                              <v-list-item-subtitle class="text-center white--text">{{ user.EmployeeName }}</v-list-item-subtitle>
                              <v-list-item-subtitle class="text-center white--text">{{ user.DesignationName }}</v-list-item-subtitle>
                         </v-list-item-content>
                    </v-list-item>
               </v-img>   -->
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
               <div class="hidden-sm-and-down">
                    <v-toolbar-title v-if="userInfo.UserLevel < 9">{{ user.DepartmentName }} Department</v-toolbar-title>
                    <v-toolbar-title v-else>ASD Team</v-toolbar-title>
               </div>
               <v-spacer></v-spacer>
               <v-text-field
                    class="mt-4 mr-3" 
                    v-model="search"    
                    append-icon="mdi-magnify"     
                    placeholder="Search"
                    @keyup="getSearchData()"
               ></v-text-field>
               <notifications v-if="userInfo.UserLevel != 0" />    
               <v-btn @click="logout()" icon>
                    <v-icon small>mdi-logout</v-icon>
               </v-btn>
          </v-app-bar>
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
               icon: 'mdi-weather-night',
               search: '',
               socketId: '',
               navDrawerList: [],
          }
     },
     created() {
          store.commit('CHANGE_SEARCHING', '')
          this.dark = store.state.darkMode
          this.user = store.state.userInfo
          this.getUserLevel()
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
                    case 1: // DH/JA
                    case 2: // Section Head
                    case 3: // Team Leader
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
                    default: // Developer
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