<template>
     <v-main>
          <v-container class="fill-height">
               <v-row align="center" justify="center">
<<<<<<< HEAD
                    <v-col cols="12" md="4">
=======
                    <v-col cols="12" md="5">
>>>>>>> 8559198239804058af14de5af1e009f588ad2926
                         <v-card elevation="7">
                              <v-card-text class="text-center subheading">
                                   <v-card-text class="text-center headline">Login to your account</v-card-text>
                                   <v-avatar class="mb-6" color="primary" size="95">
                                        <v-icon x-large dark>mdi-account</v-icon>
                                   </v-avatar>
                                   <v-form>
                                        <v-text-field
<<<<<<< HEAD
                                             v-model="username"
=======
                                             v-model="user"
>>>>>>> 8559198239804058af14de5af1e009f588ad2926
                                             placeholder="Username"
                                             append-icon="mdi-account"
                                             outlined
                                             rounded
<<<<<<< HEAD
                                             @blur="getUserInfo()"
                                        ></v-text-field>
                                        <v-text-field
                                             v-model="password"
=======
                                        ></v-text-field>
                                        <v-text-field
                                             v-model="pass"
>>>>>>> 8559198239804058af14de5af1e009f588ad2926
                                             placeholder="Password"
                                             append-icon="mdi-lock"
                                             type="password"
                                             outlined
                                             rounded
<<<<<<< HEAD
                                             :disabled="employeeDetails.UserLevel == 0"
                                        ></v-text-field>
                                   </v-form>
                                        <v-checkbox
                                             v-model="remember"
                                             label="Remember Me"
                                        ></v-checkbox>
                                   <v-card-actions>
                                        <v-btn @click="loggedIn()" color="primary" block>Login</v-btn>
=======
                                        ></v-text-field>
                                   </v-form>
                                        <v-checkbox
                                             label="Remember Me"
                                        ></v-checkbox>
                                   <v-card-actions>
                                        <v-btn color="primary" block>Login</v-btn>
>>>>>>> 8559198239804058af14de5af1e009f588ad2926
                                   </v-card-actions>
                              </v-card-text>
                         </v-card>
                    </v-col>
               </v-row>
          </v-container>
     </v-main>
</template>

<<<<<<< HEAD

<script>
import store from '@/store'
export default {
     data() {
          return {
               valid: false,
               remember: false,
               username: '',
               password: '',
               employeeDetails: ''
          }
     },
     created() {
          store.commit('CHANGE_USER_INFO', {})
          store.commit('CHANGE_USER_LOGGING', false)
     },
     methods: {
          getUserInfo() {
               let body = {
                    procedureName: 'ProcGetUserAccount',
                    values: [this.username]
               }
               this.axios.post(`${this.api}/getaccount`, {data: JSON.stringify(body)}).then(res => {
                    this.employeeDetails = res.data[0]
                    console.log(res.data)
               })
          },
          loggedIn() {
               switch(this.employeeDetails.UserLevel) {
                    case 0:
                         store.commit('CHANGE_USER_INFO', this.employeeDetails)
                         store.commit('CHANGE_USER_LOGGING', true)
                         this.$router.push('/profile')
                         break;
                    default:
                         if(this.password === this.employeeDetails.Password) {
                              store.commit('CHANGE_USER_INFO', this.employeeDetails)
                              store.commit('CHANGE_USER_LOGGING', true)
                              this.$router.push('/dashboard')
                         }
                         break;
               }
          }
=======
<script>
export default {
     data() {
          return {
               user: '',
               pass: ''
          }
     },
     methods: {
>>>>>>> 8559198239804058af14de5af1e009f588ad2926
          
     }
}
</script>