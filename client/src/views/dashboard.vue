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
               <v-card class="mt-3">
                    <v-tabs v-model="tab" :color="themeColor == '' ? 'primary' : themeColor" centered icons-and-text grow>
                         <v-tabs-slider></v-tabs-slider>
                         <v-tab href="#tab-1">
                              Employee Logtime
                              <v-icon>mdi-clock-outline</v-icon> 
                         </v-tab>
                         <v-tab href="#tab-2">
                              Summary
                              <v-icon>mdi-poll-box-outline</v-icon> 
                         </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                         <v-tab-item value="tab-1">
                              <v-card>
                                   <v-card-text>
                                        <v-row class="mb-n8" dense>
                                             <v-col cols="12" md="3">
                                                  <datePicker
                                                       :menu="dateDialog"
                                                       dateLabel="Logtime Date"
                                                       :dateValue.sync="logtimeDate"
                                                  ></datePicker>
                                             </v-col>
                                             <v-col v-if="userInfo.UserLevel == 9 || userInfo.UserLevel == 5" cols="12" md="3">
                                                  <v-autocomplete
                                                       v-model="department"
                                                       :items="departmentList"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
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
                                                       :color="themeColor == '' ? 'primary' : themeColor"
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
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       placeholder="Team"
                                                       clearable
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                             </v-col>
                                             <!-- <v-col cols="12" md="2">
                                                  <v-btn @click="exportData()">try</v-btn>
                                             </v-col> -->
                                        </v-row>
                                   </v-card-text>
                                   <v-divider></v-divider>
                                   <v-data-table
                                        :headers="headers"
                                        :items="filterData"
                                        :loading="loading"
                                        :search="searchData"
                                        :items-per-page="6"
                                        :page.sync="page"
                                        loading-text="Loading Data. . .Please Wait"
                                        @page-count="pageCount = $event"
                                        hide-default-footer
                                   >
                                        <v-progress-linear v-show="loading" slot="progress" :color="themeColor == '' ? 'primary' : themeColor" indeterminate></v-progress-linear>
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
                                        :color="themeColor == '' ? 'primary' : themeColor"
                                   ></v-pagination>
                                   <v-card-text class="caption">Total Record(s): {{filterData.length}}</v-card-text>
                              </v-card>
                         </v-tab-item>
                         <v-tab-item value="tab-2">
                              <v-container>
                                   <barGraph></barGraph>
                              </v-container>
                         </v-tab-item>
                    </v-tabs-items>
               </v-card>
          </v-container>
     </v-main>
</template>

<script>
import datePicker from '@/components/datepicker'
import barGraph from '@/components/bargraph'

export default {
     data() {
          return {
               tab: null,
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
               if(this.userInfo.UserLevel == 5) {
                    return this.userInfo.AssignDepartments.map(rec => {
                         return rec
                    }).sort()
               } else {
                    return this.logtime.map(rec => {
                         return rec.DEPTDESC
                    }).sort()
               }
          },
          sectionList() {
               if(this.userInfo.UserLevel == 5) {
                    return this.filterData.map(rec => {
                         return rec.SECTIONDESC
                    }).sort()
               } else {
                    return this.logtime.map(rec => {
                         return rec.SECTIONDESC
                    }).sort()
               }
          },
          teamList() {
               return this.filterData.map(rec => {
                    return rec.TEAMDESC
               }).sort()
          }
     },
     methods: {
          exportData() {
               let body = ''
               let value = this.filterData
               value.forEach((rec) => {
                    body += `value=${JSON.stringify(rec)}&`
               })
               window.open(`${this.api}/exportexcel?${body}`, '_blank')
          },
          loadLogtime() {
               this.loading = true
               let body = {}
               switch (this.userInfo.UserLevel) {
                    case 1: // Department Head
                         body = {
                              logdate: this.moment(this.logtimeDate).format('MMDDYY'),
                              company: this.userInfo.ShortName.toLowerCase(),
                              department: this.userInfo.DepartmentName,
                              section: '',
                              team: ''
                         }
                         break;
                    case 2: // Section Head
                         body = {
                              logdate: this.moment(this.logtimeDate).format('MMDDYY'),
                              company: this.userInfo.ShortName.toLowerCase(),
                              department: this.userInfo.DepartmentName,
                              section: this.userInfo.SectionName,
                              team: ''
                         }
                         break;
                    case 3: // Team Leader
                         body = {
                              logdate: this.moment(this.logtimeDate).format('MMDDYY'),
                              company: this.userInfo.ShortName.toLowerCase(),
                              department: this.userInfo.DepartmentName,
                              section: this.userInfo.SectionName,
                              team: this.userInfo.TeamName
                         }
                         break;
                    case 5: // Japanese
                         body = {
                              logdate: this.moment(this.logtimeDate).format('MMDDYY'),
                              company: this.userInfo.Comp_Name.toLowerCase(),
                              department: this.userInfo.AssignDepartments,
                              section: '',
                              team: ''
                         }
                         break;
                    default: // Developer
                         body = {
                              logdate: this.moment(this.logtimeDate).format('MMDDYY'),
                              company: this.userInfo.ShortName.toLowerCase(),
                              department: '',
                              section: '',
                              team: ''
                         }
                         break;
               }
               this.axios.post(`${this.asd_sql}/logtime.php`, body).then(res => {
                    if(Array.isArray(res.data)) {
                         this.logtime = res.data
                    } else {
                         this.logtime = []
                    }
                    this.loading = !this.loading
               }).catch(() => this.$router.push('*'))
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