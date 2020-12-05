<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-container>
               <v-row  dense>
                    <v-col v-if="userInfo.UserLevel == 9" cols="12" md="3">
                        
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
                    <v-col cols="12" md="3">
                         <v-text-field
                              v-model="search"
                              placeholder="Name, Code . . "
                              outlined
                              dense
                         ></v-text-field>
                         
                    </v-col>
               </v-row>
               <v-data-table 
               :headers="headers"
               :items="filterData"
               :search="search">
               <template v-slot:item.actions="{ item }">
                              <v-btn @click="viewRecord(item.EmployeeCode)" icon>
                                 
                                   <v-icon>mdi-account-details</v-icon>
                              </v-btn>
                              <v-btn @click="editRecord(item.EmployeeCode)" icon>
                                   <v-icon>mdi-pencil</v-icon>
                              </v-btn>
                              
               </template>

               </v-data-table>
               <!-- Your Code Here -->

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
               search: '',
        
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
          
     },
     computed:{
          filterData() {
               return this.getempInfos.filter(rec => {
                    return (
                         rec.LastName.includes(this.search) ||
                         rec.FirstName.includes(this.search) ||
                         rec.EmployeeCode.includes(this.search || '') &&
                         rec.DepartmentName.includes(this.department || '') &&
                         rec.SectionName.includes(this.section || '') &&
                         rec.TeamName.includes(this.team || '')                         
                    )
               })
          },
          departmentList() {
               return this.getempInfos.map(rec => {
                    return rec.DepartmentName
                   
               }).sort()
          },
          sectionList() { 
               return this.getempInfos.map(rec => {
                    return rec.SectionName   
               }).sort()
      
          },
          teamList() {
               return this.filterData.map(rec => {
                    return rec.TeamName
               }).sort()
          },
          

     },
     methods:{
          

          loadEmpinfo(){
               this.axios.get(`${this.api}/employees/${this.userInfo.ShortName}/${this.userInfo.DepartmentName}`).then(res => {
                    // console.log("RES DATA", res.data);
                    this.getempInfos = res.data
                    // this.loadDesignations()
               })     
          },
          editRecord(val) {
               //  alert(val)
               store.commit('CHANGE_EMPLCODE', val)
               location.replace('/employeedetails')
               // this.editedAccount = Object.assign({}, val)
               // this.dialog = true
               // this.disabled = false
           
          },
           viewRecord(val) {
               // alert(val)
               store.commit('CHANGE_EMPLCODE', val)
               location.replace('/employeedetails')
             
               // this.editedAccount = Object.assign({}, item)
               // this.dialog = true
               // this.disabled = false
               // this.editMode = 1
          },
     }
}
</script>