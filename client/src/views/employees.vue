<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-container>
               <v-row  dense>
                    <v-col cols="12" md="3">
                         <v-autocomplete
                              v-model="department"
                              :items="departmentList"
                              placeholder="Department"
                              clearable
                              outlined
                              dense
                         ></v-autocomplete>
                          <!-- item-text="DepartmentName"
                              item-value="DepartmentName" -->
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
                              :items="teamdata"
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
               :items="getempInfos">
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
               deptList: [],
               secList: [],
               teamList: [],
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
          this.loadDepartments()
          store.commit('CHANGE_EMPLCODE', {})
          
     },
     computed:{
          departmentList() {
               return this.deptList.map(rec => {
                    return rec.DepartmentName
               }).sort()
          },
          sectionList() {
               return this.secList.map(rec => {
                    return rec.SectionName
               }).sort()
          },
          teamdata() {
               return this.teamList.filter(rec => {
                    return rec.TeamName
               }).sort()
          },
          filterData() {
               return this.getempInfos.filter(rec => {
                    return (
                         rec.DepartmentName.includes(this.department || '') &&
                         rec.SectionName.includes(this.section || '') &&
                         rec.TeamName.includes(this.team || '')                         
                    )
               })
          },
       

     },
     methods:{
           loadDepartments() {
               this.axios.get(`${this.api}/company/department/${this.userInfo.ShortName}`).then(res => {
                    this.deptList = res.data
                    this.loadSections()
               })
          },
           loadSections() {
               this.axios.get(`${this.api}/company/department/section/${this.userInfo.ShortName}`).then(res => {
                    this.secList = res.data
                     this.loadTeams()
                    //  this.loadShifts()
               })
          },
          loadTeams() {
               this.axios.get(`${this.api}/company/department/section/team/${this.userInfo.ShortName}`).then(res => {
                    this.teamList = res.data
                    // this.loadDesignations()
               })
          },

          loadEmpinfo(){
               this.axios.get(`${this.api}/employees/${this.userInfo.ShortName}/${this.userInfo.DepartmentName}`).then(res => {
                    console.log("RES DATA", res.data);
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
               // this.editMode = 1
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