<template>
     <v-main>
          <v-container class="fill-height">
               <v-row align="center" justify="center">
                    <v-col cols="12" md="4">
                         <v-card elevation="7">
                              <v-card-text class="text-center title">
                                   <v-card-text>
                                        <v-card-text class="text-center title">Sign in to Employee Master</v-card-text>
                                   </v-card-text>
                                   <v-avatar class="mb-6" :color="themeColor == '' ? 'primary' : themeColor" size="95">
                                        <v-icon x-large dark>mdi-account</v-icon>
                                   </v-avatar>
                                   <v-alert
                                        class="pa-2 mb-5"
                                        v-model="alert"
                                        transition="scale-transition"
                                        type="error"
                                        border="left"
                                        outlined
                                        dismissible
                                        dense
                                        text
                                   >
                                        <v-subheader class="pa-0 caption">{{alertText}}</v-subheader>
                                   </v-alert>
                                   <v-form>
                                        <v-text-field
                                             v-model="username"
                                             placeholder="Username"
                                             append-icon="mdi-account"
                                             outlined
                                             rounded
                                             :color="themeColor == '' ? 'primary' : themeColor"
                                        ></v-text-field>
                                        <v-text-field
                                             v-model="password"
                                             placeholder="Password"
                                             append-icon="mdi-lock"
                                             type="password"
                                             outlined
                                             rounded
                                             @keydown.enter="getUserInfo()"
                                             :color="themeColor == '' ? 'primary' : themeColor"
                                        ></v-text-field>
                                        <v-card-actions>
                                             <v-btn @click="getUserInfo()" :color="themeColor == '' ? 'primary' : themeColor" block dark>Login</v-btn>
                                        </v-card-actions>
                                        <v-card-text class="text-center">
                                             Don't have any account? 
                                             <v-btn 
                                                  @click="signUpDialog = !signUpDialog" 
                                                  :color="themeColor == '' ? 'primary' : themeColor"
                                                  x-small 
                                                  text
                                             >
                                                  Sign Up
                                             </v-btn>
                                        </v-card-text>
                                        <v-card-actions class="ma-0 pa-0">
                                             <v-spacer></v-spacer>
                                             <v-tooltip bottom>
                                                  <template v-slot:activator="{ on, attrs }">
                                                       <v-btn @click="gotoHelp()" v-bind="attrs" v-on="on" small icon>
                                                            <v-icon>mdi-help-circle-outline</v-icon>
                                                       </v-btn>
                                                  </template>
                                                  <span>Help</span>
                                             </v-tooltip>
                                        </v-card-actions>
                                   </v-form>
                              </v-card-text>
                         </v-card>
                    </v-col>
               </v-row>
          </v-container>
          <v-dialog v-model="dialog" width="400" persistent>
               <v-card class="rounded-lg" light>
                    <v-toolbar :color="dialogColor" flat>
                         <v-icon x-large dark>mdi-information</v-icon>
                    </v-toolbar>
                    <v-card-text class="text-center">
                         <v-card-text>
                              <v-card-text class="headline">{{dialogTitle}}</v-card-text>
                              {{dialogText}}
                         </v-card-text>
                         <v-card-actions>
                              <v-btn @click="userLoggedIn()" :color="dialogColor" block dark>close</v-btn>
                         </v-card-actions>
                    </v-card-text>
               </v-card>
          </v-dialog>
          <signUp :signUpDialog="signUpDialog"></signUp>
          <v-overlay :value="loading">
               <v-progress-circular
                    size="100"
                    indeterminate
               ></v-progress-circular>
          </v-overlay>
     </v-main>
</template>


<script>
import store from '@/store'
import signUp from '@/components/signup'

export default {
     data() {
          return {
               dialog: false,
               alert: false,
               valid: false,
               remember: false,
               loading:false,
               signUpDialog: false,
               alertText: '',
               username: '',
               password: '',
               dialogTitle: '',
               dialogText: '',
               dialogIcon: '',
               dialogColor: '',
               employeeDetails: {},
               myIpAddress: {}
          }
     },
     created() {
          this.clearHeaders(0)
          store.commit('CHANGE_CONNECTION', true)
          store.commit('CHANGE_USER_INFO', {})
          store.commit('CHANGE_USER_LOGGING', false)
          this.axios.get(`${this.asd_sql}/getclientip.php`).then(res => {
               this.myIpAddress = res.data
          })
     },
     sockets: {
          connect() {
               store.commit('CHANGE_CONNECTION', true)
          },
          disconnect() {
               this.alert = !this.alert
               this.alertText = 'Could not connect to server. Please try again'
               this.loading = true 
               store.commit('CHANGE_CONNECTION', false)
          }
     },
     methods: {
          getUserInfo() {
               this.alert = false
               this.loading = true 
               this.employeeDetails = ''
               let body = {
                    procedureName: 'ProcGetUserAccount',
                    values: [this.username]
               }
               if (this.username) {  
                    // check if Japanese
                    this.clearHeaders(0)
                    this.axios.get(`${this.api_jap}/${this.username}`).then(res => {
                         this.loading = false
                         this.employeeDetails = JSON.parse(JSON.stringify(res.data))
                         if(this.employeeDetails == '') {
                              this.clearHeaders(1)
                              this.axios.post(`${this.api}/executeselect`, {data: JSON.stringify(body)}).then(res => {
                                   this.loading = false
                                   this.employeeDetails = res.data[0]
                                   if (!this.employeeDetails) { 
                                        this.alert = !this.alert
                                        this.alertText = 'User not found.'
                                   } else {
                                        this.userLoggedIn()
                                   }
                              })
                         } else {
                              // Config Japanese data
                              delete this.employeeDetails.userLevel   
                              Object.assign(this.employeeDetails, {
                                   UserLevel: 5,
                              })
                              this.employeeDetails.AssignDepartments.push(this.employeeDetails.LocalDepartments)
                              if(this.employeeDetails.Comp_Name == 'SCAD') {
                                   this.employeeDetails.Comp_Name = 'SCD'
                              } else if(this.employeeDetails.Comp_Name == 'WUKONG') {
                                   this.employeeDetails.Comp_Name = 'WKN'
                              }
                              this.userLoggedIn()
                         }
                    }) 
               } else {
                    this.alert = !this.alert
                    this.alertText = 'Please input username'
                    this.loading = false 
               }
          },
          userLoggedIn() { 
               // Japanese Account
               if(this.employeeDetails.UserLevel == 5) {
                    if(this.employeeDetails.Password == this.md5(this.password)) {
                         this.clearHeaders(1)
                         store.commit('CHANGE_USER_INFO', this.employeeDetails)
                         store.commit('CHANGE_USER_LOGGING', true)
                         this.$router.push('/dashboard')
                    } else {
                         this.alert = true
                         this.alertText = 'Incorrect password. Please try again'
                    }
               } else {
                    if(this.employeeDetails.Status == 1) {
                         if(this.employeeDetails.Password == this.md5(this.password)) {
                              store.commit('CHANGE_USER_INFO', this.employeeDetails)
                              store.commit('CHANGE_USER_LOGGING', true)
                              if (this.employeeDetails.UserLevel == 0) {
                                   this.$router.push('/profile')
                              } else {
                                   this.$router.push('/dashboard')
                              }
                         } else {
                              this.alert = true
                              this.alertText = 'Incorrect password. Please try again'
                         }
                    } else if(this.employeeDetails.Status == 0) {
                         this.alert = true
                         this.alertText = 'Account has been deactivate.'
                    } else {
                         this.alert = true
                         this.alertText = 'Account does not exists.'
                    }
               }
               this.clearVariables()
          },
          clearVariables() {
               this.username = ''
               this.password = ''
          }
     },
     watch: {
          
     },
     components: {
          signUp
     }
}
</script>
