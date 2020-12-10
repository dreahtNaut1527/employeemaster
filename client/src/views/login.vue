<template>
     <v-main>
          <v-alert v-model="alert" color="error" transition="scroll-y-transition" dismissible dark tile>{{alertText}}</v-alert>
          <v-container class="fill-height">
               <v-row align="center" justify="center">
                    <v-col cols="12" md="5">
                         <v-card elevation="7">
                              <v-card-text class="text-center subheading">
                                   <v-card-text>
                                        <v-card-text class="text-center headline">Sign in to Employee Master</v-card-text>
                                   </v-card-text>
                                   <v-avatar class="mb-6" color="primary" size="95">
                                        <v-icon x-large dark>mdi-account</v-icon>
                                   </v-avatar>
                                   <v-form>
                                        <v-text-field
                                             v-model="username"
                                             placeholder="Employee Code"
                                             append-icon="mdi-account"
                                             outlined
                                             rounded
                                             @blur="getUserInfo()"
                                        >
                                             <template v-slot:append>
                                                  <v-fade-transition leave-absolute>
                                                       <v-progress-circular
                                                            v-if="loading"
                                                            size="24"
                                                            color="info"
                                                            indeterminate
                                                       ></v-progress-circular>
                                                  </v-fade-transition>
                                             </template>
                                        </v-text-field>
                                        <v-text-field
                                             v-model="password"
                                             placeholder="Password"
                                             append-icon="mdi-lock"
                                             type="password"
                                             outlined
                                             rounded
                                             @keydown.enter="checkUserRights()"
                                        ></v-text-field>
                                        <v-card-actions>
                                             <v-btn @click="checkUserRights()" color="primary" :disabled="loading == true" block>Login</v-btn>
                                        </v-card-actions>
                                        <v-card-text class="text-center">
                                             Don't have any account? 
                                             <v-btn 
                                                  @click="signUpDialog = !signUpDialog" 
                                                  color="primary" 
                                                  x-small 
                                                  text
                                             >
                                                  Sign Up
                                             </v-btn>
                                        </v-card-text>
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
               hidePassword: true,
               alertText: '',
               username: '',
               password: '',
               dialogTitle: '',
               dialogText: '',
               dialogIcon: '',
               dialogColor: '',
               employeeDetails: '',
               myIpAddress: {}
          }
     },
     created() {
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
               let body = {
                    procedureName: 'ProcGetUserAccount',
                    values: [this.username]
               }
               if (this.username) {     
                    this.axios.post(`${this.api}/executeselect`, {data: JSON.stringify(body)}).then(res => {
                         this.loading = false
                         this.employeeDetails = res.data[0]
                         if (!this.employeeDetails) { 
                              this.alert = !this.alert
                              this.alertText = 'User not found.'
                         } else {
                              this.hidePassword = this.employeeDetails.UserLevel > 0 ? true : false
                         }
                    })
               } else {
                    this.alert = !this.alert
                    this.alertText = 'Please input username'
                    this.loading = false 
               }
          },
          checkUserRights() {
               switch (this.myIpAddress.IPADDRESS) {
                    case '10.169.140.176':
                    case '10.169.140.173':
                    case '10.169.140.188':
                    case '10.169.140.68':
                         this.userLoggedIn()
                         break;
               
                    default:
                         if(this.employeeDetails.IPAddress == "" || this.employeeDetails.IPAddress == null) {
                              this.dialog = true
                              this.dialogTitle = 'Welcome new user'
                              this.dialogText = `Please update your information`
                              this.dialogIcon = 'mdi-information'
                              this.dialogColor = 'info'
                         } else if(this.employeeDetails.IPAddress != this.myIpAddress.IPADDRESS) {
                              this.dialog = true
                              this.dialogTitle = 'Warning'
                              this.dialogText = `You're using someone else account. Please login to your account`
                              this.dialogIcon = 'mdi-alert'
                              this.dialogColor = 'error'
                         } else {
                              this.userLoggedIn()
                         }
                         break;
               }
          },
          userLoggedIn() {
               if(this.employeeDetails.Status == 1) {
                    if(this.employeeDetails.IPAddress == null || this.employeeDetails.IPAddress == this.myIpAddress.IPADDRESS) {
                         if(this.employeeDetails.Password == this.md5(this.password)) {
                              store.commit('CHANGE_USER_INFO', this.employeeDetails)
                              store.commit('CHANGE_USER_LOGGING', true)
                              if (this.employeeDetails.UserLevel == 0) {
                                   this.$router.push('/profile')
                              } else {
                                   this.$router.push('/dashboard')
                              }
                         } else {
                              this.alert = !this.alert
                              this.alertText = 'Incorrect password. Please try again'
                         }
                    } else {
                         this.dialog = false
                    }
               } if(!this.employeeDetails.Status) {
                    this.alert = !this.alert
                    this.alertText = 'Account does not exists.'
               } else {
                    this.alert = !this.alert
                    this.alertText = 'Account has been deactivate.'
               }
               this.clearVariables()
          },
          clearVariables() {
               this.username = ''
               this.password = ''
          }
     },
     components: {
          signUp
     }
}
</script>
