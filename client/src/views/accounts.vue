<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-container>
               <v-card>
                    <v-card-title>
                         <v-row class="mb-n6" dense>
                              <v-col cols="12" md="4">
                                   <v-select
                                        v-model="companies"
                                        :items="companyList"
                                        placeholder="Company"
                                        clearable
                                        outlined
                                        dense
                                   ></v-select>
                              </v-col>
                         <v-spacer></v-spacer>
                         <v-btn @click="dialog = !dialog" color="primary"><v-icon left>mdi-plus</v-icon>New</v-btn>
                         </v-row>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-data-table 
                         :headers="headers" 
                         :items="filterData"
                         :loading="loading"
                         :search="searchData"
                         :page.sync="page"
                         loading-text="Loading Data. . .Please Wait"
                         @page-count="pageCount = $event"
                         hide-default-footer
                    >
                         <template v-slot:[`item.Status`]="{ item }">
                              <v-chip :color="item.Status == 1 ? 'success' : 'error'">
                                   {{item.Status == 1 ? 'Active' : 'Inactive'}}
                              </v-chip>
                         </template>
                         <template v-slot:[`item.actions`]="{ item }">
                              <v-btn @click="editRecord(item)" icon>
                                   <v-icon>mdi-pencil</v-icon>
                              </v-btn>
                              <v-btn @click="deleteRecord(item)" icon>
                                   <v-icon v-if="item.Status == 1">mdi-delete</v-icon>
                                   <v-icon v-else>mdi-restore</v-icon>
                              </v-btn>
                         </template>
                    </v-data-table>
                    <v-pagination
                         v-model="page"
                         :length="pageCount"
                         :total-visible="10"
                    ></v-pagination>
               </v-card>
          </v-container>
          <v-dialog v-model="dialog" width="500" persistent>
               <v-card>
                    <v-toolbar color="primary" dark flat>
                         <v-toolbar-title>{{editMode == 1 ? 'Edit Record' : 'New Record'}}</v-toolbar-title>
                    </v-toolbar>
                    <v-container>
                         <v-form v-model="valid" ref="form" lazy-validation>
                              <v-card-text>
                                   <v-row align="center" justify="center" dense>
                                        <v-col cols="12" md="3">
                                             <v-text-field
                                                  v-model="editedAccount.EmployeeCode"
                                                  label="Code"
                                                  :readonly="editMode == 1"
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
                                        <v-col cols="12" md="6">
                                             <v-text-field
                                                  v-model="editedAccount.IPAddr"
                                                  append-icon="mdi-ip"
                                                  label="IP Address"
                                                  outlined
                                                  dense
                                             ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                             <v-select
                                                  v-model="editedAccount.UserLevel"
                                                  :items="userLevel"
                                                  item-text="text"
                                                  item-value="value"
                                                  label="Level"
                                                  outlined
                                                  dense
                                             ></v-select>
                                        </v-col>
                                   </v-row>
                              </v-card-text>
                         </v-form>
                    </v-container>
                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn @click="saveRecord()" color="primary" :disabled="disabled">
                              <v-icon left>mdi-content-save</v-icon>Save
                         </v-btn>
                         <v-btn @click="clearVariables()" text>
                              <v-icon left>mdi-cancel</v-icon>Cancel
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-dialog>
     </v-main>
</template>

<script>
export default {
     data() {
          return {
               valid: true,
               loading: true,
               loadName: false,
               dialog: false,
               disabled: false,
               pageCount: 0,
               page: 1,
               editMode: 0,
               newPassword: '',
               companies: '',
               confirmedPassword: '',
               accounts: [],
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
               userLevel: [
                    {text: 'Staff', value: 0},
                    {text: 'Department Head', value: 1},
                    {text: 'Section Head', value: 2},
                    {text: 'Team Leader', value: 3},
                    {text: 'QA', value: 4},
                    {text: 'Japanese Manager', value: 5}
               ],
               saveOptions: {
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    denyButtonText: `Don't Save`
               },
               headers: [
                    {text: 'Code', value: 'EmployeeCode'},
                    {text: 'Name', value: 'Fullname'},
                    {text: 'Username', value: 'Username'},  
                    {text: 'IP Address', value: 'IPAddr'},
                    {text: 'Level', value: 'UserLevel'},
                    {text: 'Status', value: 'Status'},
                    {text: 'Actions', value: 'actions'}
               ],
               breadCrumbsItems: [ 
                    {text: 'Maintenance', disabled: false, href: '/accounts'},
                    {text: 'User Accounts', disabled: true, href: '/accounts'}
               ]
          }
     },
     created() {
          this.loadAccounts()
          this.companies = this.userInfo.ShortName
     },
     sockets: {
          showNotifications() {
               setTimeout(() => {
                    this.loadAccounts()
               }, 1500);
          }
     },
     computed: {
          filterData() {
               return this.accounts.filter(rec => {
                    return rec.ShortName.includes(this.companies || '')
               })
          },
          companyList() {
               return this.accounts.map(rec => {
                    return rec.ShortName
               })
          }
     },
     methods: {
          loadAccounts() {
               this.loading = true
               this.accounts = []
               this.axios.get(`${this.api}/usercontrol`).then(res => {
                    this.accounts = res.data
                    this.loading = false
               })
          },
          getEmployeeFullname() {
               this.loadName = true
               this.disabled = false
               let data = this.accounts.filter(rec => (rec.EmployeeCode == this.editedAccount.EmployeeCode))
               if(data.length == 0 && this.editedAccount.EmployeeCode != '') {
                    this.axios.get(`${this.api}/employeeinfo/${this.editedAccount.EmployeeCode}`).then(res => {
                         if(res.data.length != 0) {
                              this.$refs.form.resetValidation()
                              this.editedAccount.Fullname = res.data[0].EmployeeName
                         } else {
                              this.editedAccount.Fullname = ''
                              this.disabled = true
                         }
                         this.loadName = false
                    })
               } else {
                    this.editedAccount = Object.assign({}, data[0])
                    this.loadName = false
               }
               this.disabled = false
          },
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
                                        this.editedAccount.IPAddr,
                                        this.editedAccount.UserLevel,
                                        this.moment().format('YYYY-MM-DD'),
                                        this.moment().format('YYYY-MM-DD'),
                                        this.userInfo.EmployeeCode,
                                        1
                                   ]
                              }
                              this.axios.post(`${this.api}/execute`, {data: JSON.stringify(body)})
                              this.swal.fire('Hooray!','Changes has been saved', 'success')
                              this.setNotifications(
                                   this.userInfo.EmployeeCode, 
                                   this.editMode == 0 ? 'added a new account' : 'updated an account'
                              )
                              this.clearVariables()
                         } else if(result.isDenied) {
                              this.clearVariables()
                              this.swal.fire('Oh no!', 'Changes are not saved', 'info')
                         }
                    })
               }
          },
          editRecord(val) {
               this.editMode = 1
               this.editedAccount = val
               this.dialog = true
               this.disabled = false
          },
          deleteRecord(val) {
               this.swal.fire({
                    title: 'Are you sure?',
                    text: val.Status == 1 ? "This account wil set to Inactive." : "This wil restore the account.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: val.Status == 1 ? 'Yes, delete it!' : 'Yes, restore it!',
                    denyButtonText: 'Cancel'
               }).then(result => {
                    if(result.isConfirmed) {
                         let body = {
                              procedureName: 'ProcUserControl',
                              values: [
                                   val.EmployeeCode,
                                   val.Username,
                                   val.Fullname,
                                   this.md5(this.newPassword),
                                   val.IPAddr,
                                   val.UserLevel,
                                   this.moment().format('YYYY-MM-DD'),
                                   this.moment().format('YYYY-MM-DD'),
                                   this.userInfo.EmployeeCode,
                                   0
                              ]
                         }
                         this.axios.post(`${this.api}/execute`, {data: JSON.stringify(body)})
                         this.swal.fire('Confirmed!','Changes has been saved', 'success')
                         this.setNotifications(
                              this.userInfo.EmployeeCode, 
                              val.Status != 1 ? 'restored an account' : `account set to inactive`
                         )
                         this.clearVariables()
                    }
               })
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
               this.disabled = false
               this.editMode = 0
          }
     }
}
</script>