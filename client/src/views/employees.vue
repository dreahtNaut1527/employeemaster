<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-container>
               <v-card>
                    <v-card-title>
                              <v-row  dense>
                                    <v-col v-if="userInfo.UserLevel == 9 || userInfo.UserLevel == 5" cols="12" md="3">           
                                        <v-autocomplete
                                             v-model="department"
                                             :items="departmentList"
                                             placeholder="Department"
                                             clearable
                                             outlined
                                             dense
                                        ></v-autocomplete>
                                   </v-col>
                                   <v-col cols="12" md="3">
                                        <v-autocomplete
                                             v-model="section"
                                             :items="sectionList"
                                             placeholder="Section"
                                             clearable
                                             outlined
                                             dense
                                        ></v-autocomplete>
                                   </v-col>
                                   <v-col cols="12" md="3">
                                        <v-autocomplete
                                             v-model="team"
                                             :items="teamList"
                                             placeholder="Team"
                                             clearable
                                             outlined
                                             dense
                                        ></v-autocomplete>
                                   </v-col>
                                   
                              </v-row>
                    </v-card-title>
               <v-data-table 
               :headers="headers"
               :items="filterData"
               :search="searchData"
               :page.sync="page"
               @page-count="pageCount = $event"
               hide-default-footer
               >
               <template v-slot:[`item.actions`]="{ item }">
                              <v-btn @click="viewRecord(item.EmployeeCode)" icon>
                                 
                                   <v-icon>mdi-eye</v-icon>
                              </v-btn>
                            
                              <v-btn  v-if="userInfo.UserLevel != 5" @click="editRecord(item.EmployeeCode)" icon>
                                   <v-icon>mdi-pencil</v-icon>
                              </v-btn>
                              
               </template>

               </v-data-table>
                <v-pagination
                         v-model="page"
                         :length="pageCount"
                         :total-visible="10"
                    ></v-pagination>
               <!-- Your Code Here -->
               </v-card>
          </v-container>
     </v-main>
</template>

<script>
import store from '@/store'
export default {
     data() {
          return {
               
               department: '',
               section: '',
               team: '',
               pageCount: 0,
               page: 1,
              
        
               // deptList: [],
               // secList: [],
               // teamList: [],
               // departmentList: '',
               // sectionList: '',
               // teamList: '',
               breadCrumbsItems: [
                    {text: 'Main Data', disabled: false, href: '/employees'},
                    {text: 'Employees', disabled: true, href: '/employees'}
               ],
               headers:[
                    {text: 'Code', value: 'EmployeeCode'},
                    {text: 'LastName', value: 'LastName'},
                    {text: 'FirstName', value: 'FirstName'},     
                    // {text: 'MiddleName', value: 'MiddleName'},
                    // {text: 'NickName', value: 'NickName'},
                    {text: 'Department', value: 'DepartmentName'},
                    {text: 'Section', value: 'SectionName'},
                    {text: 'Team', value: 'TeamName'},
                    {text: 'Actions', value: 'actions'},
                  
               ],
               getempInfos: [],
          }

     },
     created() {
          this.loadEmpinfo()
          // this.loadDepartments()
          store.commit('CHANGE_EMPLCODE', {})
          store.commit('CHANGE_EMP_EDIT')
          
     },
     computed:{
          filterData() {
               return this.getempInfos.filter(rec => {
                    return (
                         rec.DepartmentName.includes(this.department || '') &&
                         rec.SectionName.includes(this.section || '') &&
                         rec.TeamName.includes(this.team || '')                         
                    )
               })
          },
          departmentList() {
               if(this.userInfo.UserLevel == 5) {
                    return this.userInfo.AssignDepartments.map(rec => {
                          return rec
                    }).sort()
                }else {
                    return this.getempInfos.map(rec => {
                         return rec.DepartmentName
                    
                    }).sort()
                }
          },
          sectionList() { 
                if(this.userInfo.UserLevel == 5) {
                    return this.filterData.map(rec => {
                         return rec.SectionName   
                    }).sort()
                }else {
                     return this.getempInfos.map(rec => {
                         return rec.SectionName   
                    }).sort()     

                }
       
          },
          teamList() {
               return this.filterData.map(rec => {
                    return rec.TeamName
               }).sort()
          },
          

     },
     methods:{
          loadEmpinfo(){
               let url = ''

               switch (this.userInfo.UserLevel) {
                    case 1: // DH
                         url = `${this.api}/employees/${this.userInfo.ShortName}/${this.userInfo.DepartmentName}`
                         break;
                    case 5: //JA
                         // url = `${this.api}/employees/${this.userInfo.Comp_Name}`
                         url = `${this.api}/employees/${this.userInfo.Comp_Name}/${this.userInfo.LocalDepartments}?array=${this.userInfo.AssignDepartments}`
                         break;
                    case 2: // Section Head
                         url = `${this.api}/employees/${this.userInfo.ShortName}/${this.userInfo.DepartmentName}/${this.userInfo.SectionName}`
                         break;
                    case 3: // Team Leader
                         url = `${this.api}/employees/${this.userInfo.ShortName}/${this.userInfo.DepartmentName}/${this.userInfo.SectionName}/${this.userInfo.TeamName}`
                         break;
                    default: // Developer
                         url = `${this.api}/employees/${this.userInfo.ShortName}`
                         break;
               }
               this.axios.get(url).then(res => {
                    this.getempInfos = res.data
               })
          }, 

          // loadEmpinfo(){
          //      this.axios.get(`${this.api}/employees/${this.userInfo.ShortName}/${this.userInfo.DepartmentName}`).then(res => {
          //           // console.log("RES DATA", res.data);
          //           this.getempInfos = res.data
          //           // this.loadDesignations()
          //      })     
          // },
          editRecord(val) {
               //  alert(val)
               store.commit('CHANGE_EMPLCODE', val)
               store.commit('CHANGE_EMP_EDIT', true)
                this.$router.push('/employeedetails')
               // location.replace('/employeedetails')
               // this.editedAccount = Object.assign({}, val)
               // this.dialog = true
               // this.disabled = false
           
          },
           viewRecord(val) {
               // alert(val)
               store.commit('CHANGE_EMPLCODE', val)
               store.commit('CHANGE_EMP_EDIT', false)
                this.$router.push('/employeedetails')
               // location.replace('/employeedetails')
             
               // this.editedAccount = Object.assign({}, item)
               // this.dialog = true
               // this.disabled = false
               // this.editMode = 1
          },
     }
}
</script>