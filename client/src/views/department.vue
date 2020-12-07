<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-container>
               <v-card>
                    <v-card-title>
                         <v-row dense>
                              <v-col cols="12" md="4">
                                   <v-card-text class="pa-0 headline">Departments</v-card-text>
                              </v-col>
                         <v-spacer></v-spacer>
                         <v-btn @click="newRecord()" color="primary"><v-icon left>mdi-plus</v-icon>New</v-btn>
                         </v-row>
                    </v-card-title>
                    <v-data-table
                         :headers="headers"
                         :items="departments"
                         :loading="loading"
                         :search="searchData"
                         :page.sync="page"
                         loading-text="Loading Data. . .Please Wait"
                         @page-count="pageCount = $event"
                         hide-default-footer
                    >
                         <template v-slot:item="props">
                              <tr :style="props.item.DeletedDate != null ? 'color: #b71c1c;' : ''">
                                   <td>{{props.item.DepartmentName}}</td>
                                   <td>{{props.item.CreatedDate}}</td>
                                   <td>{{props.item.UpdatedDate}}</td>
                                   <td>
                                        <v-btn @click="editRecord(props.item)" icon>
                                             <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn @click="deleteRecord(props.item)" icon>
                                             <v-icon v-if="props.item.DeletedDate == null">mdi-delete</v-icon>
                                             <v-icon v-else>mdi-restore</v-icon>
                                        </v-btn>
                                   </td>
                              </tr>
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
                              <v-form ref="form" v-model="valid" lazy-validation>
                                   <v-row align="center" justify="center" dense>
                                        <v-col cols="12" md="12">
                                             <v-text-field
                                                  v-model="editDepartment.DepartmentName"
                                                  label="Department"
                                                  outlined
                                                  dense
                                             ></v-text-field>
                                        </v-col>
                                   </v-row>
                              </v-form>
                    </v-container>
                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn @click="saveRecord()" color="primary">Save</v-btn>
                         <v-btn @click="clearVariables()" text>Cancel</v-btn>
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
               dialog: false,
               loading: true,
               editMode: 0,
               pageCount: 0,
               page: 1,
               departments: [],
               saveOptions: {
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    denyButtonText: `Don't Save`
               },
               editDepartment: {
                    CompanyCode: '',
                    DepartmentCode: '00',
                    DepartmentName: '',
                    CreatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedUserId: '',
                    Option: 1
               },
               headers: [
                    {text: 'Department', value: 'DepartmentName'},
                    {text: 'Date Created', value: 'CreatedDate'},
                    {text: 'Date Updated', value: 'UpdatedDate'},
                    {text: 'Actions', value: 'actions'}
               ],
               breadCrumbsItems: [
                    {text: 'Main Data', disabled: false, href: '/department'},
                    {text: 'Departments', disabled: true, href: '/department'}
               ]
          }
     },
     created() {
          this.loadDepartments()
     },
     sockets: {
          showNotifications() {
               setTimeout(() => {
                    this.loadDepartments()
               }, 1500);
          }
     },
     methods: {
          loadDepartments() {
               this.loading = true
               this.axios.get(`${this.api}/company/department/${this.userInfo.ShortName}`).then(res => {
                    this.departments = res.data
                    this.loading = false
               })
          },
          saveRecord() {
               if(this.$refs.form.validate()) {
                    this.swal.fire(this.saveOptions).then(result => {
                         if(result.isConfirmed) {
                              let body = {
                                   procedureName: 'ProcDepartment',
                                   values: [
                                        this.editDepartment.CompanyCode,
                                        this.editDepartment.DepartmentCode,
                                        this.editDepartment.DepartmentName,
                                        this.editDepartment.CreatedDate,
                                        this.editDepartment.UpdatedDate,
                                        this.userInfo.EmployeeCode,
                                        1
                                   ]
                              }
                              this.axios.post(`${this.api}/execute`, {data: JSON.stringify(body)}).then(() => {
                                   this.swal.fire('Hooray!','Changes has been saved', 'success')
                                   this.setNotifications('Updated a record', `User: ${this.userInfo.EmployeeName} updated a record`)
                                   this.clearVariables()
                              })
                         } else if(result.isDenied) {
                              this.clearVariables()
                              this.swal.fire('Oh no!', 'Changes are not saved', 'info')
                         }
                    })
               }
          },
          newRecord() {
               this.dialog = true
               this.editDepartment.CompanyCode = this.userInfo.CompanyCode
          },
          editRecord(val) {
               this.editDepartment = val
               this.dialog = true
               this.editMode = 1
          },
          deleteRecord(val) {
               this.swal.fire({
                    title: 'Are you sure?',
                    text: val.DeletedDate == null ? "This data wil not be used in any records." : "This wil restore the data.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: val.DeletedDate == null  ? 'Yes, delete it!' : 'Yes, restore it!',
                    denyButtonText: 'Cancel'
               }).then(result => {
                    if(result.isConfirmed) {
                         let body = {
                              procedureName: 'ProcDepartment',
                              values: [
                                   val.CompanyCode,
                                   val.DepartmentCode,
                                   val.DepartmentName,
                                   val.CreatedDate,
                                   val.UpdatedDate,
                                   this.userInfo.EmployeeCode,
                                   0
                              ]
                         }
                         this.axios.post(`${this.api}/execute`, {data: JSON.stringify(body)}).then(() => {
                              this.swal.fire('Confirmed!','Changes has been saved', 'success')
                              this.setNotifications('Deleted a record', `User: ${this.userInfo.EmployeeName} deleted a record`)
                              this.clearVariables()
                         })
                    }
               }) 
          },
          clearVariables() {
               this.editDepartment = {
                    CompanyCode: '',
                    DepartmentCode: '00',
                    DepartmentName: '',
                    CreatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedUserId: '',
                    Option: 1
               },
               this.dialog = false
               this.editMode = 0
          }
     }
}
</script>