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
               <!-- For Japanese -->
               <v-list-item v-if="user.UserLevel == 5">
                    <v-list-item-content class="ma-2 text-center">
                         <v-list-item-avatar size="112">                                        
                              <img :src="`${photo_jap}/${user.id}.jpg`" alt="nopic.jpg">
                         </v-list-item-avatar>
                         <v-list-item-title class="headline">{{ user.id }}</v-list-item-title>
                         <v-list-item-subtitle>{{ user.LastNameEng }} {{user.FirstNameEng}}</v-list-item-subtitle>
                         <v-list-item-subtitle>( {{ user.LastName}} {{ user.FirstName }} )</v-list-item-subtitle>
                    </v-list-item-content>
               </v-list-item>
               <!-- For Non-Japanese -->
               <v-list-item v-else>
                    <v-list-item-content class="ma-2 text-center">
                         <v-list-item-avatar size="112">                                        
                              <img :src="`${photo}/${user.EmployeeCode}.jpg`" alt="nopic.jpg">
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
                         :color="themeColor == '' ? 'primary' : themeColor"
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
                              <v-list-item-content>
                                   <v-list-item-subtitle>{{child.text}}</v-list-item-subtitle>
                              </v-list-item-content>
                         </v-list-item>
                         <div v-if="i == 1">
                              <v-list-group
                                   v-for="(subGroup, i) in navDrawerSubGroup" :key="i"
                                   :color="themeColor == '' ? 'primary' : themeColor"
                                   no-action
                                   sub-group
                              >
                                   <template v-slot:activator>
                                        <v-list-item-content>
                                             <v-list-item-subtitle class="ml-2">{{subGroup.text}}</v-list-item-subtitle>
                                        </v-list-item-content>
                                   </template>
                                   <v-list-item
                                        v-for="subGroupChild in subGroup.items"
                                        :to="subGroupChild.to"
                                        :key="subGroupChild.text"
                                        link 
                                   >
                                        <v-list-item-content>
                                             <v-list-item-subtitle>{{subGroupChild.text}}</v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                             <v-icon>{{subGroupChild.icon}}</v-icon>
                                        </v-list-item-icon>
                                   </v-list-item>
                              </v-list-group>
                         </div>
                    </v-list-group>
               </v-list>    
               <!-- <v-list shaped dense>
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
                              <v-list-item-content>
                                   <v-list-item-subtitle>{{child.text}}</v-list-item-subtitle>
                              </v-list-item-content>
                         </v-list-item>
                    </v-list-group>
               </v-list>                -->
               <!-- <v-bottom-navigation
                    background-color="transparent" 
                    absolute
               >
                    <v-spacer></v-spacer>
                    <v-switch
                         v-model="dark"
                         :prepend-icon="icon"          
                         @change="changeTheme()"
                    ></v-switch>
               </v-bottom-navigation> -->
          </v-navigation-drawer>
          <v-app-bar
               app
          >
               <v-app-bar-nav-icon @click="navDrawerVal = !navDrawerVal"></v-app-bar-nav-icon>
               <div class="hidden-sm-and-down">
                    <div v-if="userInfo.UserLevel == 5">
                         <v-toolbar-title>{{ user.LocalDepartments }}</v-toolbar-title>
                    </div>
                    <div v-else>
                         <v-toolbar-title v-if="userInfo.UserLevel < 9">{{ user.DepartmentName }} Department</v-toolbar-title>
                         <v-toolbar-title v-else>ASD Team</v-toolbar-title>
                    </div>
               </div>
               <v-spacer></v-spacer>
               <v-text-field
                    class="mt-4 mr-3" 
                    :color="themeColor == '' ? 'primary' : themeColor"
                    v-model="search"    
                    append-icon="mdi-magnify"     
                    placeholder="Search"
                    @keyup="getSearchData()"
               ></v-text-field>
               <notifications v-if="userInfo.UserLevel != 0" />    
               <v-btn @click="logout()" icon>
                    <v-icon small>mdi-logout</v-icon>
               </v-btn>  
               <v-menu
                    :close-on-content-click="false"
                    :nudge-width="200"
                    :nudge-left="270"
               >
                    <template v-slot:activator="{ on, attrs }">
                         <v-btn 
                              class="mt-15 mr-n5 rounded-l-lg" 
                              style="background-color: rgb(0, 0, 0, 0.3)"
                              v-bind="attrs"
                              v-on="on"
                              absolute 
                              top 
                              right>
                              <v-icon>mdi-cog-outline</v-icon>
                         </v-btn>
                    </template>
                    <v-card>
                         <v-list dense>
                              <v-list-item>
                                   <v-list-item-content>
                                        <v-list-item-title class="grey--text">Themes</v-list-item-title>
                                   </v-list-item-content>
                              </v-list-item>
                              <v-divider></v-divider>
                              <v-list-item>
                                   <v-list-item-content>
                                        <v-color-picker 
                                            v-model="themeColorVal"
                                            mode="hexa" 
                                            hide-mode-switch 
                                            hide-canvas
                                            :show-swatches="swatches"
                                        ></v-color-picker>
                                   </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                    <v-list-item-content>
                                        <v-btn x-small block text @click="swatches = !swatches" :color="themeColor == '' ? 'primary' : themeColor">
                                            {{swatches == false ? "Show more" : "Hide"}}
                                        </v-btn>
                                    </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                   <v-list-item-content>
                                        <v-list-item-subtitle>Dark Mode</v-list-item-subtitle>
                                   </v-list-item-content>
                                   <v-list-item-action>
                                        <v-switch
                                             v-model="dark"        
                                             @change="changeTheme()"
                                             inset
                                        ></v-switch>
                                   </v-list-item-action>
                              </v-list-item>
                         </v-list>
                    </v-card>
               </v-menu>
          </v-app-bar>
     </div>       
</template>

<script>
import notifications from '@/components/notifications'

export default {
     data() {
          return {
               user: '',
               dark: false,
               overlay: false,
               navDrawerVal: true,
               isConnected: false,
               swatches: false,
               icon: 'mdi-weather-night',
               search: '',
               socketId: '',
               themeColorVal: '',
               navDrawerList: [],
               navDrawerSubGroup: []
          }
     },
     created() {
          this.themeColorVal = this.themeColor
          this.$store.commit('CHANGE_SEARCHING', '')
          this.dark = this.darkMode
          this.user = this.userInfo
          this.getUserLevel()
     },
     methods: {
          getSearchData() {
               this.$store.commit('CHANGE_SEARCHING', this.search)
          },
          changeTheme() {
               this.$vuetify.theme.dark = this.dark
               this.icon = this.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
               this.$store.commit('CHANGE_THEME', this.dark)
          },
          logout() {
               this.$store.commit('CHANGE_USER_INFO', {})
               this.$store.commit('CHANGE_USER_LOGGING', false)
               this.$store.commit('CHANGE_THEME', false)
               this.$router.push('/')
          },
          getUserLevel() {
               switch (this.userInfo.UserLevel) {
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
                    case 1: // Department Head
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
                                        {text: 'User Accounts', to: '/accounts'},
                                        {text: 'Job Assignments', to: '/jobassignments'},
                                        {text: 'Query Builder', to: '/querybuilder'}
                                   ],
                                   active: false   
                              }
                         ]
                         break;
                    case 4: // QA Staff
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
                                        {text: 'Departments', to: '/department'},
                                        {text: 'Sections', to: '/section'},
                                        {text: 'Team', to: '/team'},
                                        {text: 'Department - Section', to: '/divsec'},
                                        {text: 'Job Assignments', to: '/jobassignments'},
                                        {text: 'Query Builder', to: '/querybuilder'}
                                   ],
                                   active: false   
                              }
                         ]
                         break;
                    case 5: // Japanese
                         this.navDrawerList = [
                              {
                                   title: 'Dashboard',
                                   icon: 'mdi-home',
                                   items: [
                                        {text: 'Home', to: '/dashboard'}
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
                                        {text: 'Department - Section', to: '/divsec'}
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
                                   {text: 'Job Assignments', to: '/jobassignments'},
                                   {text: 'Query Builder', to: '/querybuilder'}
                              ],
                              active: false ,
                              hasGrandChild: true  
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
               switch (this.userInfo.UserLevel) {
                    case 4: 
                         this.navDrawerSubGroup = []
                         break;
                    case 5:
                         this.navDrawerSubGroup = [
                              {
                                   text: 'Transfer Employees',
                                   items: [
                                        {text: 'History', icon: 'mdi-history', to: '/transferhistory'},
                                        {text: 'Pending', icon: 'mdi-timer-sand', to: '/pendingemployees'}
                                   ]
                              }
                         ]
                         break;
                    default:
                         this.navDrawerSubGroup = [
                              {
                                   text: 'Transfer Employees',
                                   items: [
                                        {text: 'Transfer', icon: 'mdi-transfer', to: '/transferemployees'},
                                        {text: 'History', icon: 'mdi-history', to: '/transferhistory'},
                                        {text: 'Pending', icon: 'mdi-timer-sand', to: '/pendingemployees'}
                                   ]
                              }
                         ]
                         break;
               }
          }
     },
     watch: {
          dark() {
               this.changeTheme()
          },
          themeColorVal(val) {
               this.$store.commit('CHANGE_THEMECOLOR', val)
          }
     },
     components: {
          notifications
     }
}
</script>