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
                              <v-btn color="primary" @click="transferEmployees()"><v-icon left>mdi-transit-transfer</v-icon>Proceed</v-btn>
                         </v-row>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-title>
                         <v-row class="mb-n10" dense>
                              <v-col v-if="userInfo.UserLevel == 9" cols="12" md="3">
                                   <v-autocomplete
                                        v-model="departmentFilter"
                                        :items="loadDepartmentFilter"
                                        placeholder="Department"
                                        clearable
                                        outlined
                                        dense
                                   ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" md="3">
                                   <v-autocomplete
                                        v-model="sectionFilter"
                                        :items="loadSectionFilter"
                                        placeholder="Section"
                                        clearable
                                        outlined
                                        dense
                                   ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" md="3">
                                   <v-autocomplete
                                        v-model="teamFilter"
                                        :items="loadTeamFilter"
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
                              class="elevation-1"
                              :headers="headers"
                              :items="filterData"
                              :loading="loading"
                              :search="searchData"
                              :items-per-page="9"
                              :page.sync="page"
                              :single-select="singleSelect"
                              item-key="EmployeeCode"
                              loading-text="Loading Data. . .Please Wait"
                              @page-count="pageCount = $event"
                              show-select
                              hide-default-footer>
                         </v-data-table>
                         <v-pagination
                              v-model="page"
                              :length="pageCount"
                              :total-visible="10"
                         ></v-pagination>
                    </v-card-text>
               </v-card>
               <v-dialog v-model="dialog" width="500" persistent>
                    <v-card>
                         <v-toolbar color="primary" dark flat>
                              <v-toolbar-title>Transfer Employees</v-toolbar-title>
                         </v-toolbar>
                         <v-card-text>
                              <v-container>
                                   <v-form ref="form" v-model="valid" lazy-validation>
                                        <v-row>
                                             <v-col v-if="userInfo.UserLevel == 9" dense>
                                                  <v-autocomplete
                                                       v-model="transferdivsecteam.departmentCode"
                                                       :items="departmentList"
                                                       placeholder="Department"
                                                       clearable
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                                  <v-autocomplete
                                                       v-model="transferdivsecteam.sectionCode"
                                                       :items="sectionList"
                                                       placeholder="Section"
                                                       clearable
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                                  <v-autocomplete
                                                       v-model="transferdivsecteam.teamCode"
                                                       :items="teamList"
                                                       placeholder="Team"
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
                                   <v-btn @click="saveRecord()" color="primary">
                                        <v-icon left>mdi-content-save</v-icon>Save
                                   </v-btn>
                                   <v-btn @click="cancel()" text>
                                        <v-icon left>mdi-cancel</v-icon>Cancel
                                   </v-btn>
                              </v-card-actions>
                         </v-card-text>
                    </v-card>
               </v-dialog>
          </v-container>
     </v-main>
</template>

<script>

export default {
     data() {
          return {
               history: [],
               departmentFilter: '',
               sectionFilter: '',
               teamFilter: '',
               divsecteam: [],
               pageCount: 0,
               page: 1,
               loading: false,
               singleSelect: false,
               dialog: false,
               valid: true,
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
               ],
               transferdivsecteam:{
                    employeeCode: '',
                    departmentCode: '',
                    sectionCode: '',
                    teamCode: '',
                    createdDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    updatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    updatedUserId: this.userInfo
               }

          }
     },
     created(){
          this.loadHistory()
     },
     computed: {
          filterData() {
               return this.history.filter(rec => {
                    return (
                         rec.DepartmentName.includes(this.departmentFilter || '') &&
                         rec.SectionName.includes(this.sectionFilter || '') &&
                         rec.TeamName.includes(this.teamFilter || '')                    
                    )
               })
          },
          loadDepartmentFilter(){
               return this.history.map(rec =>{
                   return rec.DepartmentName
               }).sort()
          },
          loadSectionFilter(){
               return this.history.map(rec =>{
                   return rec.SectionName
               }).sort()
          },
          loadTeamFilter(){
               return this.filterData.map(rec =>{
                   return rec.TeamName
               }).sort()
          },
          departmentList(){
               return this.divsecteam.map(rec =>{
                   return rec.DepartmentName
               }).sort()
          },
          sectionList(){
               return this.divsecteam.map(rec =>{
                   return rec.SectionName
               }).sort()
          },
          teamList(){
               return this.divsecteam.map(rec =>{
                   return rec.TeamName
               }).sort()
          }
     },
     methods:{
          loadHistory(){
               this.axios.get(`${this.api}/employees/${this.userInfo.ShortName}`).then(res => {
                    this.history = res.data
                    console.log(res.data)
               })
          },
          transferEmployees(){
               this.dialog = true
               this.axios.get(`${this.api}/company/department/section/team/${this.userInfo.ShortName}`).then(res=>{
                    this.divsecteam = res.data
               })
          },
          saveRecord(){
               this.dialog = false
          },
          cancel(){
               this.dialog = false
          }
     },
     components: {
     }
}
</script>