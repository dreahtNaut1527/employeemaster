<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-container>
               <v-card>
                    <v-card-title>
                         <v-row dense>
                              <v-col>
                                   <v-card-text class="pa-0 headline">Transferred History</v-card-text>
                              </v-col>
                         </v-row>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-title>
                         <v-row class="mb-n6" dense>
                              <v-col cols="12" md="2">
                                   <datePicker
                                        :menu="dateDialog"
                                        dateLabel="Transferred Date"
                                        :dateValue.sync="transferredDate"
                                   ></datePicker>
                              </v-col>
                              <v-col v-if="userInfo.UserLevel == 4 || userInfo.UserLevel == 5 || userInfo.UserLevel == 9" cols="12" md="3">
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
                    <v-data-table
                         :headers="headers"
                         :items="filterData"
                         :loading="loading"
                         :search="searchData"
                         :items-per-page="9"
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
               </v-card>
          </v-container>
     </v-main>
</template>

<script>
import datePicker from '@/components/datepicker'

export default {
     data() {
          return {
               history: [],
               dateDialog: false,
               transferredDate: this.moment().format('YYYY-MM-DD'),
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
                         this.moment(rec.TransferredDate).format('YYYY-MM-DD') == this.transferredDate &&
                         (rec.DepartmentName.includes(this.department || '') &&
                         rec.SectionName.includes(this.section || '') &&
                         rec.TeamName.includes(this.team || '')      )                   
                    )
               })
          },
          loadDepartmentList(){
               if (this.userInfo.UserLevel == 5){
                    return this.userInfo.AssignDepartments.map(rec =>{
                         return rec
                    }).sort()
               }else{
                    return this.history.map(rec =>{
                    return rec.DepartmentName
                    }).sort()
               }
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
               let url = ''
               switch (this.userInfo.UserLevel) {
                    case 1: // DH
                         url = `${this.api}/history/${this.userInfo.ShortName}/${this.userInfo.DepartmentName}`
                         break;
                    case 2: // Section Head
                         url = `${this.api}/history/${this.userInfo.ShortName}/${this.userInfo.DepartmentName}/${this.userInfo.SectionName}`
                         break;
                    case 3: // Team Leader
                         url = `${this.api}/history/${this.userInfo.ShortName}/${this.userInfo.DepartmentName}/${this.userInfo.SectionName}/${this.userInfo.TeamName}`
                         break;
                    case 5: // JA
                         // url = `${this.api}/history/${this.userInfo.Comp_Name}`
                         url = `${this.api}/history/${this.userInfo.Comp_Name}/${this.userInfo.LocalDepartments}?array=${this.userInfo.AssignDepartments}`
                         break;
                    default: // Developer & QA
                         url = `${this.api}/history/${this.userInfo.ShortName}`
                         break;
               }
               this.axios.get(url).then(res => {
                    this.history = res.data
               }).catch(() => this.$router.push('*'))
          }
     },
     components: {
          datePicker
     }
          
     

}
</script>