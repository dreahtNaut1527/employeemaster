<template>
     <v-main>
          <v-alert v-model="alert" color="error" transition="scroll-y-transition" dismissible dark tile>{{alertText}}</v-alert>
          <v-container class="fill-height">
               <v-row align="center" justify="center">
                    <v-col cols="12" md="4">
                         <v-card elevation="7">
                              <v-card-text class="text-center subheading">
                                   <v-card-text class="text-center headline">Login to your account</v-card-text>
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
                                        ></v-text-field>
                                        <v-text-field
                                             v-model="password"
                                             placeholder="Password"
                                             append-icon="mdi-lock"
                                             type="password"
                                             outlined
                                             rounded
                                             v-show="hidePassword"
                                             @keydown.enter="checkUserRights()"
                                        ></v-text-field>
                                        <v-card-actions>
                                             <v-btn @click="checkUserRights()" color="primary" block>Login</v-btn>
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
     </v-main>
</template>


<script>
import store from '@/store'

export default {
     data() {
          return {
               dialog: false,
               alert: false,
               valid: false,
               remember: false,
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
          store.commit('CHANGE_USER_INFO', {})
          store.commit('CHANGE_USER_LOGGING', false)
          this.axios.get(`${this.asd_sql}/getclientip.php`).then(res => {
               this.myIpAddress = res.data
          })
     },
     methods: {
          getUserInfo() {
               this.alert = false
               let body = {
                    procedureName: 'ProcGetUserAccount',
                    values: [this.username]
               }
               if (this.username) {     
                    this.axios.post(`${this.api}/getaccount`, {data: JSON.stringify(body)}).then(res => {
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
               }
          },
          checkUserRights() {
               if(this.employeeDetails.IPAddress == "" || this.employeeDetails.IPAddress == null) {
                    this.dialog = true
                    this.dialogTitle = 'Welcome new user'
                    this.dialogText = `Please update your information`
                    this.dialogIcon = 'mdi-information'
                    this.dialogColor = 'info'
               } else if(this.employeeDetails.IPAddress != this.myIpAddress.IPADDRESS) {
                    this.dialog = true
                    this.dialogTitle = 'Warning'
                    this.dialogText = `Your using someone else device. Please login to your account`
                    this.dialogIcon = 'mdi-alert'
                    this.dialogColor = 'error'
               } else {
                    this.userLoggedIn()
               }
          },
          userLoggedIn() {
               switch (this.employeeDetails.UserLevel) {
                    case 0: // staff account
                         if(this.employeeDetails.IPAddress == null || this.employeeDetails.IPAddress == this.myIpAddress.IPADDRESS) {
                              store.commit('CHANGE_USER_INFO', this.employeeDetails)
                              store.commit('CHANGE_USER_LOGGING', true)
                              this.$router.push('/profile')
                         } else {
                              this.dialog = false
                         }
                         break;
               
                    default:
                         if(this.employeeDetails.Status == 1) {
                              if(this.employeeDetails.IPAddress == null || this.employeeDetails.IPAddress == this.myIpAddress.IPADDRESS) {
                                   store.commit('CHANGE_USER_INFO', this.employeeDetails)
                                   store.commit('CHANGE_USER_LOGGING', true)
                                   this.$router.push('/dashboard')
                              } else {
                                   this.dialog = false
                              }
                         } else {
                              this.alert = !this.alert
                              this.alertText = 'Account has been deactivate.'
                         }
                         break;
               }
          }
     }
}
</script>
