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
                              <v-btn color="primary" @click="transferEmployees()" :disabled="selected.length <= 0"><v-icon left>mdi-transit-transfer</v-icon>Proceed</v-btn>
                         </v-row>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-title>
                         <v-row class="mb-n6" dense>
                              <v-col cols="12" md="3">
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
                    <v-data-table
                         v-model="selected"
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
               </v-card>
               <v-dialog v-model="dialog" width="500" persistent>
                    <v-card>
                         <v-toolbar color="primary" dark flat>
                              <v-toolbar-title>Transfer Employees</v-toolbar-title>
                         </v-toolbar>
                         <v-card-text>
                              <v-container>
                                   <v-form ref="form" v-model="valid" lazy-validation>
                                        <v-row align="center" justify="center" dense>
                                             <v-col cols="12" md="12">     
                                                  <datePicker
                                                       :menu="dateDialog"
                                                       dateLabel="Effectivity Date"
                                                       :dateValue.sync="transdivsecteam.EffectivityDate"
                                                  ></datePicker>
                                                  <v-autocomplete
                                                       v-model="transdivsecteam.DepartmentCode"
                                                       :items="departmentList"
                                                       item-value="DepartmentCode"
                                                       item-text="DepartmentName"
                                                       placeholder="Department"
                                                       clearable
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                                  <v-autocomplete
                                                       v-model="transdivsecteam.SectionCode"
                                                       :items="sectionList"
                                                       item-value="SectionCode"
                                                       item-text="SectionName"
                                                       placeholder="Section"
                                                       clearable
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                                  <v-autocomplete
                                                       v-model="transdivsecteam.TeamCode"
                                                       :items="teamList"
                                                       item-value="TeamCode"
                                                       item-text="TeamName"
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
                                   <v-btn @click="dialog = !dialog" text>
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
import datePicker from '@/components/datepicker'

export default {
     data() {
          return {
               history: [],
               selected: [],
               departmentFilter: '',
               sectionFilter: '',
               teamFilter: '',
               divsecteam: [],
               pageCount: 0,
               page: 1,
               dateDialog: false,
               loading: true,
               singleSelect: false,
               dialog: false,
               valid: true,
               breadCrumbsItems: [
                    {text: 'Main Data', disabled: false, href: '/transfer'},
                    {text: 'Transfer Employee', disabled: false, href: '/transferemployees'},
                    {text: 'Transfer', disabled: true, href: '#'},
               ],
               headers: [
                    {text:'Code',value:'EmployeeCode'},
                    {text:'Name',value:'EmployeeName'},
                    {text:'Department',value:'DepartmentName'},
                    {text:'Section',value:'SectionName'},
                    {text:'Team',value:'TeamName'}
               ],
               transdivsecteam:{
                    EffectivityDate: this.moment().format('YYYY-MM-DD'),
                    DepartmentCode: '',
                    SectionCode: '',
                    TeamCode: '',
                    CreatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedUserId: ''
               }, 
          }
     },
     created(){
          this.loadEmployees()
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
          filterSection() {
               return this.divsecteam.filter(rec => {
                    return (
                         rec.DepartmentCode.includes(this.transdivsecteam.DepartmentCode || '')              
                    )
               })
          },
          filterTeam() {
               return this.divsecteam.filter(rec => {
                    return (
                         rec.DepartmentCode.includes(this.transdivsecteam.DepartmentCode || '') &&
                         rec.SectionCode.includes(this.transdivsecteam.SectionCode || '')                   
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
               return this.divsecteam.filter(rec =>{
                   return rec.DepartmentName
               }).sort()
          },
          sectionList(){
               return this.filterSection.filter(rec =>{
                   return rec.SectionName
               }).sort()
          },
          teamList(){
               return this.filterTeam.filter(rec =>{
                   return rec.TeamName         
               }).sort()
          }
     },
     methods:{
          loadEmployees(){
               this.loading = true
               this.axios.get(`${this.api}/employees/${this.userInfo.ShortName}`).then(res => {
                    this.history = res.data
                    this.loading = false
               })
          },
          transferEmployees(){
               this.dialog = true
               this.axios.get(`${this.api}/company/department/section/team/${this.userInfo.ShortName}`).then(res=>{
                    this.divsecteam = res.data
               })
          },
          saveRecord(){
               let data = []
               let body = {
                    procedureName: 'ProcGetEmployeesForTransfer',
                    values: []
               }
               this.selected.forEach(rec =>{
                    data = [
                         this.transdivsecteam.EffectivityDate,
                         rec.CompanyCode,
                         rec.EmployeeCode,
                         this.transdivsecteam.DepartmentCode,
                         this.transdivsecteam.SectionCode,
                         this.transdivsecteam.TeamCode,
                         this.transdivsecteam.CreatedDate,
                         this.transdivsecteam.UpdatedDate,
                         this.userInfo.EmployeeCode
                    ]
                    body.values.push(data)
               })
               this.axios.post(`${this.api}/execute`, {data: JSON.stringify(body)})
               this.swal.fire('Saved','', 'success')
               // this.$router.push('/transfer')
               this.selected = [],
               this.dialog = false
          },
          clearVariables(){
               this.transdivsecteam = {
                    EffectivityDate: this.moment().format('YYYY-MM-DD'),
                    DepartmentCode: '',
                    SectionCode: '',
                    TeamCode: '',
                    CreatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedUserId: ''
               }
               this.dialog = false
          }
     },
     components: {
          datePicker
     }
}
</script>