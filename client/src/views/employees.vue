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
               <v-data-table :headers="headers">

               </v-data-table>
               <!-- Your Code Here -->
          </v-container>
     </v-main>
</template>

<script>
export default {
     data() {
          return {
               department: '',
               section: '',
               team: '',
               search: '',
               deptList: [],
               secList: [],
               teamLists: [],
               // departmentList: '',
               // sectionList: '',
               // teamList: '',
               breadCrumbsItems: [
                    {text: 'Main Data', disabled: false, href: '/employees'},
                    {text: 'Employees', disabled: true, href: '/employees'}
               ],
               headers:[
                    {text: 'Code', value: 'EMPLCODE'},
                    {text: 'LastName', value: 'LName'},
                    {text: 'FirstName', value: 'FName'},
                    {text: 'MiddleName', value: 'MName'},
                    {text: 'NickName', value: 'NName'},
                    {text: 'Department', value: 'DEPTDESC'},
                    {text: 'Section', value: 'SECTIONDESC'},
                    {text: 'Team', value: 'TEAMDESC'},
                    {text: 'Actions', value: 'actions'},
                  
               ]
          }

     },
     created() {
          this.loadDepartments()
          this.loadSections()
          this.loadTeams()
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
          teamList() {
               return this.teamLists.map(rec => {
                    return rec.TeamName
               }).sort()
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
                    // this.loadShifts()
               })
          },
          loadTeams() {
               this.axios.get(`${this.api}/company/department/section/team/${this.userInfo.ShortName}`).then(res => {
                    this.teamLists = res.data
                    // this.loadDesignations()
               })
          },
     }
}
</script>