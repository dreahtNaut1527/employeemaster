<template>
     <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="scale-transition"
          origin="center center"
     >
          <v-card>
               <v-container class="fill-height">
                    <v-row align="center" justify="center">
                         <v-col cols="12" md="5">
                              <v-card elevation="7">
                                   <v-card-text class="text-center subheading">
                                        <v-card-text class="text-center headline">Create account</v-card-text>
                                        <v-form v-model="valid" ref="form" lazy-validation>
                                        <v-card-text>
                                             <v-row align="center" justify="center" dense>
                                                  <v-col cols="12" md="3">
                                                       <v-text-field
                                                            v-model="editedAccount.EmployeeCode"
                                                            label="Code"
                                                            :rules="[v => !!v || 'Code is required']"
                                                            outlined
                                                            dense
                                                            @blur="getEmployeeFullname()"
                                                       ></v-text-field>
                                                  </v-col>
                                                  <v-col cols="12" md="9">
                                                       <v-text-field
                                                            v-model="editedAccount.Fullname"
                                                            label="Name"
                                                            readonly
                                                            outlined
                                                            dense
                                                       >
                                                            <template v-slot:append>
                                                                 <v-fade-transition leave-absolute>
                                                                      <v-progress-circular
                                                                           v-if="loadName"
                                                                           size="24"
                                                                           color="primary"
                                                                           indeterminate
                                                                      ></v-progress-circular>
                                                                 </v-fade-transition>
                                                            </template>
                                                       </v-text-field>
                                                  </v-col>
                                                  <v-col cols="12" md="12">
                                                       <v-text-field
                                                            v-model="editedAccount.Username"
                                                            append-icon="mdi-account"
                                                            label="UserName"
                                                            :rules="[v => !!v || 'Username is required']"
                                                            outlined
                                                            dense
                                                       ></v-text-field>
                                                  </v-col>
                                                  <v-col cols="12" md="6">
                                                       <v-text-field
                                                            v-model="newPassword"
                                                            append-icon="mdi-lock"
                                                            label="Password"
                                                            type="password"
                                                            :rules="[v => !!v || 'Password is required']"
                                                            outlined
                                                            dense
                                                       ></v-text-field>
                                                  </v-col>
                                                  <v-col cols="12" md="6">
                                                       <v-text-field
                                                            v-model="confirmedPassword"
                                                            append-icon="mdi-lock-check"
                                                            label="Confirm Password"
                                                            type="password"
                                                            :rules="passwordRules"
                                                            outlined
                                                            dense
                                                       ></v-text-field>
                                                  </v-col>
                                             </v-row>
                                        </v-card-text>
                                   </v-form>
                                   <v-card-actions>
                                        <v-btn @click="saveRecord()" color="primary" :disabled="disableButton" block>
                                             Create an account
                                        </v-btn>
                                   </v-card-actions>
                                   <v-card-actions>
                                        <v-btn @click="clearVariables()" color="primary" block>
                                             Log in to your account
                                        </v-btn>
                                   </v-card-actions>
                                   </v-card-text>
                              </v-card>
                         </v-col>
                    </v-row>
               </v-container>
          </v-card>
     </v-dialog>
</template>

<script>
export default {
     props: ['signUpDialog'],
     data() {
          return {
               valid: true,
               dialog: false,
               loadName: false,
               disableButton: false,
               newPassword: '',
               confirmedPassword: '',
               passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v == this.newPassword) || 'Password do not match'
               ],
               editedAccount: {
                    EmployeeCode: '',
                    Username: '',
                    Fullname: '',
                    IPAddr: '',
                    UserLevel: 0
               },
               saveOptions: {
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    denyButtonText: `Don't Save`
               },
          }
     },
     methods: {
          saveRecord() {
               if(this.$refs.form.validate()) {
                    this.swal.fire(this.saveOptions).then(result => {
                         if(result.isConfirmed) {
                              let body = {
                                   procedureName: 'ProcUserControl',
                                   values: [
                                        this.editedAccount.EmployeeCode,
                                        this.editedAccount.Username,
                                        this.editedAccount.Fullname,
                                        this.md5(this.newPassword),
                                        "",
                                        0,
                                        this.moment().format('YYYY-MM-DD'),
                                        this.moment().format('YYYY-MM-DD'),
                                        "ASD",
                                        1
                                   ]
                              }
                              this.axios.post(`${this.api}/execute`, {data: JSON.stringify(body)}).then(() => {
                                   this.swal.fire('Hooray!','Changes has been saved', 'success')
                                   this.clearVariables()
                              })
                         } else if(result.isDenied) {
                              this.swal.fire('Oh no!', 'Changes are not saved', 'info')
                         }
                    })
               }
          },
          getEmployeeFullname() {
               if(this.editedAccount.EmployeeCode != '') {
                    this.loadName = true
                    this.axios.get(`${this.api}/employeeinfo/${this.editedAccount.EmployeeCode}`).then(res => {
                         this.$refs.form.resetValidation()
                         this.editedAccount.Fullname = res.data[0].EmployeeName
                         this.loadName = false
                    })
                    this.getUserAccount()
               }
          },
          getUserAccount() { 
               let body = {
                    procedureName: 'ProcGetUserAccount',
                    values: [this.editedAccount.EmployeeCode]
               }
               // if (this.editedAccount.EmployeeCode) {     
                    this.axios.post(`${this.api}/executeselect`, {data: JSON.stringify(body)}).then(res => {
                         if(res.data[0].Username != undefined) {
                              this.disableButton = true
                         } else {
                              this.disableButton = false
                         }
                    })
               // } 
          },
          clearVariables() {
               this.editedAccount = {
                    EmployeeCode: '',
                    Username: '',
                    Fullname: '',
                    IPAddr: '',
                    UserLevel: 0,
               }
               if(this.dialog) {
                    this.$refs.form.resetValidation()
               }
               this.newPassword = ''
               this.confirmedPassword = ''
               this.dialog = false
          }
     },
     watch: {
          signUpDialog() {
               this.dialog = true
          }
     }
}
</script>