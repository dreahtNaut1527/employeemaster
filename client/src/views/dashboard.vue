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
                              <!-- <v-divider class="mx-3"></v-divider> -->
                              <v-card-text>{{item.text}}</v-card-text>
                         </v-card>
                    </v-col>
               </v-row>
               <v-row>
                    <v-col>
                         <v-card>  
                              <v-card-title>Employee Logtime</v-card-title>
                              <v-divider></v-divider>
                              <v-row dense>
                                   <v-col cols="12" md="2" class="mb-n10">
                                        <v-card-text>
                                             <datePicker
                                                  :menu="dateDialog"
                                                  dateLabel="Logtime Date"
                                                  :dateValue.sync="logtimeDate"
                                             ></datePicker>
                                        </v-card-text>
                                   </v-col>
                                   <v-col v-if="userInfo.UserLevel == 9" cols="12" md="3" class="mb-n10">
                                        <v-card-text>
                                             <v-autocomplete
                                                  v-model="department"
                                                  :items="departmentList"
                                                  placeholder="Department"
                                                  clearable
                                                  outlined
                                                  dense
                                             ></v-autocomplete>
                                        </v-card-text>
                                   </v-col>
                                   <v-col cols="12" md="3" class="mb-n10">
                                        <v-card-text>
                                             <v-autocomplete
                                                  v-model="section"
                                                  :items="sectionList"
                                                  placeholder="Section"
                                                  clearable
                                                  outlined
                                                  dense
                                             ></v-autocomplete>
                                        </v-card-text>
                                   </v-col>
                                   <v-col cols="12" md="2" class="mb-n10">
                                        <v-card-text>
                                             <v-autocomplete
                                                  v-model="team"
                                                  :items="teamList"
                                                  placeholder="Team"
                                                  clearable
                                                  outlined
                                                  dense
                                             ></v-autocomplete>
                                        </v-card-text>
                                   </v-col>
                                   <!-- <v-col cols="12" md="2" class="mb-n10">
                                        <v-card-text>
                                             <v-autocomplete
                                                  v-model="options"
                                                  :items="optionList"
                                                  item-text="text"
                                                  item-value="value"
                                                  outlined
                                                  dense
                                             ></v-autocomplete>
                                        </v-card-text>
                                   </v-col> -->
                              </v-row>
                              <v-data-table
                                   :headers="headers"
                                   :items="filterData"
                                   :loading="loading"
                                   :search="employeeCode"
                                   :items-per-page="6"
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
          </v-container>
     </v-main>
</template>

<script>
import datePicker from '@/components/datepicker'

export default {
     data() {
          return {
               loading: true,
               dateDialog: false,
               employeeCode: '',
               department: '',
               section: '',
               team: '',
               pageCount: 0,
               page: 1,
               logtime: [],
               options: {text: 'All', value: 0},
               logtimeDate: this.moment().format('YYYY-MM-DD'),
               optionList: [
                    {text: 'All', value: 0},
                    {text: 'Present', value: 1},
                    {text: 'Absent', value: 2},
               ],
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
                    server: `HRIS${this.userInfo.ShortName}`,
                    deptcode: this.userInfo.UserLevel == 9 ? '' : this.userInfo.DepartmentCode
               }
               console.log(body)
               this.axios.post('http://asd_sql:8080/server/api/logtime.php', body).then(res => {
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
          datePicker
     }
}
</script>