<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-container>
               <v-card>
                    <v-card-title>
                         <v-row dense>
                              <v-col>
                                   <v-card-text class="pa-0 headline">Transfer Employees</v-card-text>
                              </v-col>
                              <v-spacer></v-spacer>
                              <v-btn color="primary"><v-icon left>mdi-transit-transfer</v-icon>Transfer</v-btn>
                         </v-row>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-title>
                         <v-row class="mb-n10" dense>
                              <v-col v-if="userInfo.UserLevel == 9" cols="12" md="3">
                                   <v-autocomplete
                                        v-model="department"
                                        :items="loadDepartmentList"
                                        placeholder="Department"
                                        clearable
                                        outlined
                                        dense
                                   ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" md="3">
                                   <v-autocomplete
                                        v-model="section"
                                        :items="loadSectionList"
                                        placeholder="Section"
                                        clearable
                                        outlined
                                        dense
                                   ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" md="3">
                                   <v-autocomplete
                                        v-model="team"
                                        :items="loadTeamList"
                                        placeholder="Team"
                                        clearable
                                        outlined
                                        dense
                                   ></v-autocomplete>
                              </v-col>
                         </v-row>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                         <v-data-table
                              :headers="headers"
                              :items="filterData"
                              :loading="loading"
                              :search="searchData"
                              :items-per-page="7"
                              :page.sync="page"
                              loading-text="Loading Data. . .Please Wait"
                              @page-count="pageCount = $event"
                              hide-default-footer>
                         </v-data-table>
                         <v-pagination
                              v-model="page"
                              :length="pageCount"
                              :total-visible="10"
                         ></v-pagination>
                    </v-card-text>
               </v-card>
          </v-container>
     </v-main>
</template>

<script>

export default {
     data() {
          return {
               history: [],
               department: '',
               section: '',
               team: '',
               pageCount: 0,
               page: 1,
               loading: false,
               breadCrumbsItems: [
                    {text: 'Main Data', disabled: false, href: '/transfer'},
                    {text: 'Transfer Employee', disabled: true, href: '/transfer'}
               ],
               headers: [
                    {text:'Code',value:'EmployeeCode'},
                    {text:'Name',value:'EmployeeName'},
                    {text:'Department',value:'DepartmentName'},
                    {text:'Section',value:'SectionName'},
                    {text:'Team',value:'TeamName'}
               ]

          }
     },
     created(){
          this.loadHistory()
     },
     computed: {
          filterData() {
               return this.history.filter(rec => {
                    return (
                         rec.DepartmentName.includes(this.department || '') &&
                         rec.SectionName.includes(this.section || '') &&
                         rec.TeamName.includes(this.team || '')                    
                    )
               })
          },
          loadDepartmentList(){
               return this.history.map(rec =>{
                   return rec.DepartmentName
               }).sort()
          },
          loadSectionList(){
               return this.history.map(rec =>{
                   return rec.SectionName
               }).sort()
          },
          loadTeamList(){
               return this.filterData.map(rec =>{
                   return rec.TeamName
               }).sort()
          }
     },
     methods:{
          loadHistory(){
               this.axios.get(`${this.api}/employees/${this.userInfo.ShortName}/${this.userInfo.DepartmentName}`).then(res => {
                    this.history = res.data
                    console.log(res.data)
               })
          }
     },
     components: {
     }
          
     

}
</script>