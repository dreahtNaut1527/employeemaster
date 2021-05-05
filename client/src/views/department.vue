<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-container>
               <v-card>
                    <v-toolbar flat>
                         <v-toolbar-title class="headline hidden-sm-and-down">Departments</v-toolbar-title>
                         <v-spacer></v-spacer>
                         <v-row align="center" >
                              <v-col class="ml-auto" cols="12" md="7">
                                   <v-autocomplete
                                        v-model="deptCategory"
                                        :items="departmentCategories"
                                        :color="themeColor == '' ? 'primary' : themeColor"
                                        item-value="DepartmentCategoryDesc"
                                        item-text="DepartmentCategoryDesc"
                                        label="Department Category"   
                                        hide-details
                                        clearable    
                                        outlined
                                        dense
                                   ></v-autocomplete>
                              </v-col>
                         </v-row>
                         <v-btn 
                              class="mx-3"
                              v-if="userInfo.UserLevel == 4 || userInfo.UserLevel == 9 || userRights == 3" 
                              @click="newRecord()" 
                              :color="themeColor == '' ? 'primary' : themeColor" 
                              dark
                         >
                              <v-icon left>mdi-plus</v-icon>New
                         </v-btn>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-data-table
                         :headers="headers"
                         :items="filterDepartments"
                         :loading="loading"
                         :search="searchData"
                         :page.sync="page"
                         loading-text="Loading Data. . .Please Wait"
                         @page-count="pageCount = $event"
                         hide-default-footer
                    >
                         
                         <v-progress-linear v-show="loading" slot="progress" :color="themeColor == '' ? 'primary' : themeColor" indeterminate></v-progress-linear>
                         <template v-slot:item="props">
                              <tr :style="props.item.DeletedDate != null ? 'color: #b71c1c;' : ''">
                                   <td>{{props.item.DepartmentName}}</td>
                                   <td>{{props.item.CreatedDate}}</td>
                                   <td>{{props.item.UpdatedDate}}</td>
                                   <td>
                                        <div v-if="userInfo.UserLevel == 4 || userInfo.UserLevel == 9 || userRights > 1">
                                             <v-btn @click="editRecord(props.item)" icon>
                                                  <v-icon >mdi-pencil</v-icon>
                                             </v-btn>
                                             <v-btn  @click="deleteRecord(props.item)" icon>
                                                  <v-icon v-if="props.item.DeletedDate == null">mdi-delete</v-icon>
                                                  <v-icon v-else>mdi-restore</v-icon>
                                             </v-btn>
                                        </div>
                                        <div v-else>
                                             <v-btn @click="editRecord(props.item)" icon>
                                                  <v-icon>mdi-eye</v-icon>
                                             </v-btn>
                                        </div>
                                   </td>
                              </tr>
                         </template>
                    </v-data-table>
                    <v-pagination
                         v-model="page"
                         :length="pageCount"
                         :total-visible="10"
                         :color="themeColor == '' ? 'primary' : themeColor"
                    ></v-pagination>
                    <v-card-text class="caption">Total Record(s): {{filterDepartments.length}}</v-card-text>
               </v-card>
          </v-container>
          <v-dialog v-model="dialog" width="500" persistent>
               <v-card>
                    <v-toolbar :color="themeColor == '' ? 'primary' : themeColor" dark flat>
                         <v-toolbar-title v-if="userRights > 1">{{editMode == 1 ? 'Edit Record' : 'New Record'}}</v-toolbar-title>
                         <v-toolbar-title v-else>View Record</v-toolbar-title>
                    </v-toolbar>
                    <v-container>
                              <v-form ref="form" v-model="valid" lazy-validation>
                                   <v-row align="center" justify="center" dense>
                                        <v-col cols="12" md="12">
                                             <v-text-field
                                                  v-model="editDepartment.DepartmentName"
                                                  label="Department"
                                                  @keypress.enter="saveRecord()"
                                                  :rules="[v => !!v || 'Department is required']"
                                                  :readonly="userInfo.UserLevel != 4 && userInfo.UserLevel != 9 || userRights == 1"
                                                  :color="themeColor == '' ? 'primary' : themeColor"
                                                  outlined
                                                  dense
                                             ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="12">
                                             <v-autocomplete
                                                  v-model="editDepartment.DepartmentCategoryCode"
                                                  :items="departmentCategories"
                                                  :color="themeColor == '' ? 'primary' : themeColor"
                                                  item-value="DepartmentCategoryCode"
                                                  item-text="DepartmentCategoryDesc"
                                                  label="Department Category"   
                                                  clearable    
                                                  outlined
                                                  dense
                                             ></v-autocomplete>
                                        </v-col>
                                   </v-row>
                              </v-form>
                    </v-container>
                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn @click="clearVariables()" text>
                              <v-icon left>mdi-cancel</v-icon>Cancel
                         </v-btn>
                         <v-btn v-if="userInfo.UserLevel == 4 || userInfo.UserLevel == 9 || userRights > 1" @click="saveRecord()" :color="themeColor == '' ? 'primary' : themeColor" dark>
                              <v-icon left>mdi-content-save</v-icon>Save
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
               dialog: false,
               loading: true,
               editMode: 0,
               pageCount: 0,
               userRights: 0,
               page: 1,
               deptCategory: '',
               departments: [],
               departmentCategories: [],
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
                    DepartmentCategoryCode: 0,
                    CreatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedUserId: '',
                    Option: 1
               },
               headers: [
                    {text: 'Department', value: 'DepartmentName'},
                    {text: 'Date Created', value: 'CreatedDate'},
                    {text: 'Last Update', value: 'UpdatedDate'},
                    {text: 'Actions', value: 'actions'}
               ],
               breadCrumbsItems: [
                    {text: 'Main Data', disabled: false, href: '#'},
                    {text: 'Departments', disabled: true, href: '#'}
               ]
          }
     },
     created() {
          this.loadRights()
     },
     sockets: {
          showNotifications() {
               setTimeout(() => {
                    this.loadRights()
               }, 1500);
          }
     },
     computed: {
          filterDepartments() {
               return this.departments.filter(rec => {
                    return rec.DepartmentCategory.includes(this.deptCategory || '')
               })
          }
     },
     methods: {
          loadRights() {
               if(this.userInfo.UserLevel != 9) {
                    this.axios.get(`${this.api}/processrights/${this.userInfo.EmployeeCode}/EM01/${this.$route.query.id}`).then(res => {
                         this.userRights = res.data[0].Rights
                         this.loadDepartments()
                    })
               } else {
                    this.loadDepartments()
               }
          },
          loadDepartments() {
               this.loading = true
               let url = ''
               switch(this.userInfo.UserLevel) {
                    case 5: // Japanese
                         url = `${this.api}/company/department/${this.userInfo.Comp_Name}`
                         break;
                    default:
                         url = `${this.api}/company/department/${this.userInfo.ShortName}`
                         break;
               }
               this.axios.get(url).then(res => {
                    this.departments = res.data
                    this.loading = false
                    this.loadDepartmentCategory()
               })
          },
          loadDepartmentCategory() {
               this.loading = true
               this.axios.get(`${this.api}/departmentcategory/${this.userInfo.ShortName}`).then(res => {
                    this.departmentCategories = res.data
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
                                        this.editDepartment.DepartmentCategoryCode,
                                        this.editDepartment.CreatedDate,
                                        this.moment().format('YYYY-MM-DD hh:mm:ss'),
                                        this.userInfo.EmployeeCode,
                                        1
                                   ]
                              }
                              this.axios.post(`${this.api}/execute`, {data: JSON.stringify(body)})
                              this.swal.fire('Hooray!','Changes has been saved', 'success')
                              this.setNotifications(
                                   this.userInfo.EmployeeCode, 
                                   this.editMode == 0 ? 'added a new department' : 'updated an department'
                              )
                              this.clearVariables()
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
                                   val.DepartmentCategoryCode,
                                   val.CreatedDate,
                                   this.moment().format('YYYY-MM-DD hh:mm:ss'),
                                   this.userInfo.EmployeeCode,
                                   0
                              ]
                         }
                         this.axios.post(`${this.api}/execute`, {data: JSON.stringify(body)})
                         this.swal.fire('Confirmed!','Changes has been saved', 'success')
                         this.setNotifications('Deleted a record', `User: ${this.userInfo.EmployeeName} deleted a record`)
                         this.clearVariables()
                    }
               }) 
          },
          clearVariables() {
               this.$refs.form.resetValidation()
               this.editDepartment = {
                    CompanyCode: '',
                    DepartmentCode: '00',
                    DepartmentName: '',
                    DepartmentCategoryCode: 0,
                    CreatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedUserId: '',
                    Option: 1
               },
               this.dialog = false
               this.editMode = 0
               this.loadDepartments()
          }
     }
}
</script>