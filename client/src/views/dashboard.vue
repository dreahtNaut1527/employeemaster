<template>
     <v-main>
          <v-subheader>Dashboard</v-subheader>
          <v-container>
               <v-row align="center" justify="center" dense>
                    <v-col v-for="(item, i) in summaries" :key="i" cols="12" md="3">
                         <v-card :color="item.color" :dark="i != 1">
                              <v-toolbar flat color="transparent">
                                   <v-toolbar-title v-if="i == 0" class="text-lg-h4">{{filterData.length}}</v-toolbar-title>
                                   <v-toolbar-title v-if="i == 1" class="text-lg-h4">{{getTotalPresent.length}}</v-toolbar-title>
                                   <v-toolbar-title v-if="i == 2" class="text-lg-h4">{{getTotalAbsent.length}}</v-toolbar-title>
                                   <v-toolbar-title v-if="i == 3" class="text-lg-h4">
                                        {{filterData.length == 0 ? '0' : ((getTotalPresent.length / filterData.length) * 100).toFixed(2) }}
                                   </v-toolbar-title>
                                   <v-spacer></v-spacer>
                                   <v-icon x-large>{{item.icon}}</v-icon>
                              </v-toolbar>
                              <v-card-text>{{item.text}}</v-card-text>
                         </v-card>
                    </v-col>
               </v-row>
               <v-row>
                    <v-col>
                         <v-card>  
                              <v-card-title>Employee Logtime</v-card-title>
                              <v-divider></v-divider>
                              <v-card-text>
                                   <v-row class="mb-n10" dense>
                                        <v-col cols="12" md="2">
                                             <datePicker
                                                  :menu="dateDialog"
                                                  dateLabel="Logtime Date"
                                                  :dateValue.sync="logtimeDate"
                                             ></datePicker>
                                        </v-col>
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
                                        <v-col cols="12" md="2">
                                             <v-autocomplete
                                                  v-model="team"
                                                  :items="teamList"
                                                  placeholder="Team"
                                                  clearable
                                                  outlined
                                                  dense
                                             ></v-autocomplete>
                                        </v-col>
                                        <!-- <v-col cols="12" md="2" class="mb-n10">
                                                  <v-autocomplete
                                                       v-model="options"
                                                       :items="optionList"
                                                       item-text="text"
                                                       item-value="value"
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                        </v-col> -->
                                   </v-row>
                              </v-card-text>
                              <v-data-table
                                   :headers="headers"
                                   :items="filterData"
                                   :loading="loading"
                                   :search="searchData"
                                   :items-per-page="7"
                                   :page.sync="page"
                                   loading-text="Loading Data. . .Please Wait"
                                   @page-count="pageCount = $event"
                                   hide-default-footer
                              >
                                   <template v-slot:item="props">
                                        <tr :style="props.item.TIMEIN == null ? 'color: #b71c1c;' : ''">
                                             <td>{{props.item.EMPLCODE}}</td>
                                             <td>{{props.item.EMPNAME}}</td>
                                             <td>{{props.item.DEPTDESC}}</td>
                                             <td>{{props.item.SECTIONDESC}}</td>
                                             <td>{{props.item.TEAMDESC}}</td>
                                             <td>{{props.item.TIMEIN}}</td>
                                             <td>{{props.item.TIMEOUT}}</td>
                                        </tr>
                                   </template>
                              </v-data-table>
                              <v-pagination
                                   v-model="page"
                                   :length="pageCount"
                                   :total-visible="10"
                              ></v-pagination>
                         </v-card>
                    </v-col>
               </v-row>
               <v-row dense>
                    <v-col cols="12" md="12">
                         <v-card>
                              <v-card-title>Total Summary of Sections</v-card-title>
                              <barGraph></barGraph>
                         </v-card>
                    </v-col>
               </v-row>
          </v-container>
     </v-main>
</template>

<script>
import datePicker from '@/components/datepicker'
import barGraph from '@/components/bargraph'

export default {
     data() {
          return {
               loading: true,
               dateDialog: false,
               department: '',
               section: '',
               team: '',
               pageCount: 0,
               page: 1,
               logtime: [],
               logtimeDate: this.moment().format('YYYY-MM-DD'),
               headers: [
                    {text: 'Code', value: 'EMPLCODE'},
                    {text: 'Name', value: 'EMPNAME'},
                    {text: 'Department', value: 'DEPTDESC'},
                    {text: 'Section', value: 'SECTIONDESC'},
                    {text: 'Team', value: 'TEAMDESC'},
                    {text: 'LogIn', value: 'TIMEIN'},
                    {text: 'LogOut', value: 'TIMEOUT'}
               ],
               summaries: [
                    {text: 'Total Employees', value: 0, icon: 'mdi-account-group', color: 'primary'},
                    {text: 'Total Present', value: 0, icon: 'mdi-account-multiple-check', color: 'warning'},
                    {text: 'Total Absent', value: 0, icon: 'mdi-account-remove', color: 'error'},
                    {text: 'Percentage', value: 0, icon: 'mdi-percent', color: 'success'}
               ]
          }
     },
     created() {
          this.loadLogtime()
     },
     sockets: {
          disconnect() {
               this.$router.push('*')
          }
     },
     computed: {
          filterData() {
               return this.logtime.filter(rec => {
                    return (
                         rec.DEPTDESC.includes(this.department || '') &&
                         rec.SECTIONDESC.includes(this.section || '') &&
                         rec.TEAMDESC.includes(this.team || '')                         
                    )
               })
          },
          getTotalPresent() {
               return this.logtime.filter(rec => {
                    return (
                         rec.TIMEIN != null &&
                         rec.DEPTDESC.includes(this.department || '') &&
                         rec.SECTIONDESC.includes(this.section || '') &&
                         rec.TEAMDESC.includes(this.team || '')
                    ) 
               })
          },
          getTotalAbsent() {
               return this.logtime.filter(rec => {
                    return (
                         rec.TIMEIN == null && 
                         rec.DEPTDESC.includes(this.department || '') &&
                         rec.SECTIONDESC.includes(this.section || '') &&
                         rec.TEAMDESC.includes(this.team || '')
                    )
               })
          },
          departmentList() {
               return this.logtime.map(rec => {
                    return rec.DEPTDESC
               }).sort()
          },
          sectionList() {
               return this.logtime.map(rec => {
                    return rec.SECTIONDESC
               }).sort()
          },
          teamList() {
               return this.filterData.map(rec => {
                    return rec.TEAMDESC
               }).sort()
          }
     },
     methods: {
          loadLogtime() {
               let body = {
                    logdate: this.moment(this.logtimeDate).format('MMDDYY'),
                    server: `HRIS${this.userInfo.ShortName.toLowerCase()}`,
                    deptcode: this.userInfo.UserLevel == 9 ? '' : this.userInfo.DepartmentCode
               }
               this.axios.post(`${this.asd_sql}/logtime.php`, body).then(res => {
                    if(Array.isArray(res.data)) {
                         this.logtime = res.data
                    } else {
                         this.logtime = []
                    }
                    this.loading = !this.loading
               })
          }
     },
     watch: {
          logtimeDate() {
               this.loading = !this.loading
               this.loadLogtime()
          }
     },
     components: {
          datePicker,
          barGraph
     }
}
</script>