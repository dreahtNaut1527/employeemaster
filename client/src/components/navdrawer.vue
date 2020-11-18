<template>
     <div>
          <v-navigation-drawer 
               :value="navDrawerVal"
               app
          >    
               <v-list-item>
                    <v-list-item-content class="ma-2 text-center">
                         <!-- <v-list-item-title class="headline">Production Employee</v-list-item-title> -->
                         <v-list-item-avatar
                              size="112"
                         >
                              <img v-if="userInfo.UserLevel < 9" :src="`http://asd_sql:8080/photos/${user.EmployeeCode}.jpg`" alt="nopic.jpg">
                              <img v-else :src="`http://asd_sql:8080/photos/nopic.jpg`" alt="nopic.jpg">
                         </v-list-item-avatar>
                         <v-list-item-title>{{ user.EmpName }}</v-list-item-title>
                         <v-list-item-subtitle>{{ user.EmplCode }}</v-list-item-subtitle>
                    </v-list-item-content>
               </v-list-item>
               <v-divider></v-divider>
               <v-list dense>
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
                              @click="navDrawerHide(child.to)"
                              :key="child.text"
                              link
                         >
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
               <v-btn icon>
                    <v-icon small>mdi-bell</v-icon>
                    <v-badge
                         color="error"
                         content="10"
                    ></v-badge>
               </v-btn>
               <v-btn @click="logout()" icon>
                    <v-icon small>mdi-logout</v-icon>
               </v-btn>
          </v-app-bar>
     </div>    
</template>

<script>
import store from '@/store'
export default {
     data() {
          return {
               user: '',
               dark: false,
               icon: 'mdi-weather-night',
               search: '',
               navDrawerList: [
                    {
                         title: 'Dashboard',
                         icon: 'mdi-home',
                         items: [{text: 'Home', to: '/dashboard'}],
                         active: true   
                    }
               ]
          }
     },
     created() {
          this.user = store.state.userInfo
          this.dark = store.state.darkMode
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
               this.$router.push('/')
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
     }
}
</script>