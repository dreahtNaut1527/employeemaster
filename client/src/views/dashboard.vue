<template>
     <v-main>
          <v-subheader>Dashboard</v-subheader>
          <v-container>
               <v-row align="center" justify="center" dense>
                    <v-col v-for="(item, i) in summaries" :key="i" cols="12" md="4">
                         <v-lazy transition="scroll-y-transition" :options="{ threshold: 0.8 }">
                              <v-card :color="item.color" :dark="i != 2">
                                   <v-toolbar flat color="transparent">
                                        <v-toolbar-title v-if="i == 0" class="text-lg-h4">{{filterData.length}}</v-toolbar-title>
                                        <v-toolbar-title v-if="i == 1" class="text-lg-h4">{{getTotalRegular.length}}</v-toolbar-title>
                                        <v-toolbar-title v-if="i == 2" class="text-lg-h4">{{getTotalCasual.length}}</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-icon x-large>{{item.icon}}</v-icon>
                                   </v-toolbar>
                                   <v-card-text>{{item.text}}</v-card-text>
                              </v-card>
                         </v-lazy>
                    </v-col>
               </v-row>
               <v-lazy transition="scroll-y-reverse-transition" :options="{ threshold: 0.8 }">
                    <v-card class="mt-3">
                         <v-tabs v-model="tab" :color="themeColor == '' ? 'primary' : themeColor" centered icons-and-text grow>
                              <v-tabs-slider></v-tabs-slider>
                              <v-tab href="#tab-1">
                                   Employees
                                   <v-icon>mdi-account-group</v-icon> 
                              </v-tab>
                              <v-tab href="#tab-2">
                                   Summary
                                   <v-icon>mdi-poll-box-outline</v-icon> 
                              </v-tab>
                         </v-tabs>
                         <v-tabs-items v-model="tab">
                              <v-tab-item value="tab-1">
                                   <v-card>
                                        <v-card-text class="mb-n8">
                                             <v-row dense>
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
                                                  <v-col cols="12" md="3">
                                                       <v-text-field
                                                            v-model="searchTable"
                                                            placeholder="Search"
                                                            append-icon="mdi-magnify"
                                                            :color="themeColor == '' ? 'primary' : themeColor"
                                                            clearable
                                                            outlined  
                                                            dense
                                                       ></v-text-field>
                                                  </v-col>
                                             </v-row>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-data-table
                                             :headers="headers"
                                             :items="filterData"
                                             :loading="loading"
                                             :search="searchTable"
                                             :items-per-page="6"
                                             :page.sync="page"
                                             loading-text="Loading Data. . .Please Wait"
                                             @page-count="pageCount = $event"
                                             hide-default-footer
                                        >
                                             <v-progress-linear v-show="loading" slot="progress" :color="themeColor == '' ? 'primary' : themeColor" indeterminate></v-progress-linear>
                                             <template v-slot:[`item.actions`]="{ item }">
                                                  <v-btn @click="viewRecord(item.EmployeeCode)" icon>
                                                       <v-icon>mdi-eye</v-icon>
                                                  </v-btn>
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
               </v-lazy>
          </v-container>
     </v-main>
</template>

<script>
import barGraph from '@/components/bargraph'

export default {
     data() {
          return {
               tab: null,
               loading: true,
               department: '',
               section: '',
               team: '',
               searchTable: '',
               pageCount: 0,
               page: 1,
               employeeLists: [],
               headers: [
                    {text: 'Code', value: 'EmployeeCode'},
                    {text: 'Name', value: 'EmployeeName'},
                    {text: 'Department', value: 'DepartmentName'},
                    {text: 'Section', value: 'SectionName'},
                    {text: 'Team', value: 'TeamName'},
                    {text: 'Actions', value: 'actions'}
               ],
               summaries: [
                    {text: 'Total Employees', value: 0, icon: 'mdi-account-group', color: 'primary'},
                    {text: 'Total Regular', value: 0, icon: 'mdi-account-tie', color: 'success'},
                    {text: 'Total Casual', value: 0, icon: 'mdi-tshirt-crew', color: 'warning'}
               ]
          }
     },
     created() {
          this.loadLogtime()
     },
     computed: {
          filterData() {
               return this.employeeLists.filter(rec => {
                    return (
                         rec.DepartmentName.includes(this.department || '') &&
                         rec.SectionName.includes(this.section || '') &&
                         rec.TeamName.includes(this.team || '')  &&
                         (this.moment(rec.SeparationDate).format('YYYY-MM-DD') >= this.moment().format('YYYY-MM-DD') ||
                         rec.SeparationDate == null)
                    )
               })
          },
          getTotalRegular() {
               return this.employeeLists.filter(rec => {
                    return (
                         rec.DepartmentName.includes(this.department || '') &&
                         rec.SectionName.includes(this.section || '') &&
                         rec.TeamName.includes(this.team || '')  &&
                         (this.moment(rec.SeparationDate).format('YYYY-MM-DD') >= this.moment().format('YYYY-MM-DD') ||
                         rec.SeparationDate == null) &&
                         rec.EmployeeStatus == 'Regular'
                    ) 
               })
          },
          getTotalCasual() {
               return this.employeeLists.filter(rec => {
                    return (
                         rec.DepartmentName.includes(this.department || '') &&
                         rec.SectionName.includes(this.section || '') &&
                         rec.TeamName.includes(this.team || '')&&
                         (this.moment(rec.SeparationDate).format('YYYY-MM-DD') >= this.moment().format('YYYY-MM-DD') ||
                         rec.SeparationDate == null) &&
                         rec.EmployeeStatus == 'Casual'
                    )
               })
          },
          departmentList() {
               if(this.userInfo.UserLevel == 5) {
                    return this.userInfo.AssignDepartments.map(rec => {
                         return rec
                    }).sort()
               } else {
                    return this.employeeLists.map(rec => {
                         return rec.DepartmentName
                    }).sort()
               }
          },
          sectionList() {
               if(this.userInfo.UserLevel == 5) {
                    return this.filterData.map(rec => {
                         return rec.SectionName
                    }).sort()
               } else {
                    return this.employeeLists.map(rec => {
                         return rec.SectionName
                    }).sort()
               }
          },
          teamList() {
               return this.filterData.map(rec => {
                    return rec.TeamName
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
               let url = ''
               this.loading = true
               switch (this.userInfo.UserLevel) {
                    case 1: // DH
                         url = `${this.api}/employees/${this.userInfo.ShortName}/${this.userInfo.DepartmentName}`
                         break;
                    case 5: //JA
                         // url = `${this.api}/employees/${this.userInfo.Comp_Name}`
                         url = `${this.api}/employees/${this.userInfo.Comp_Name}/${this.userInfo.LocalDepartments}?array=${this.userInfo.AssignDepartments}`
                         break;
                    case 2: // Section Head
                         url = `${this.api}/employees/${this.userInfo.ShortName}/${this.userInfo.DepartmentName}/${this.userInfo.SectionName}`
                         break;
                    case 3: // Team Leader
                         url = `${this.api}/employees/${this.userInfo.ShortName}/${this.userInfo.DepartmentName}/${this.userInfo.SectionName}/${this.userInfo.TeamName}`
                         break;
                    default: // Developer
                         url = `${this.api}/employees/${this.userInfo.ShortName}`
                         break;
               }
               this.axios.get(url).then(res => {
                    if(Array.isArray(res.data)) {
                         this.employeeLists = res.data
                    } else {
                         this.employeeLists = []
                    }
                    this.loading = !this.loading
               })
          },
          viewRecord(code) {
               this.$store.commit('CHANGE_EMP_EDIT', false)
               this.$router.push({name: 'employeedetails', query: {code: code}})
          },
     },
     components: {
          barGraph
     }
}
</script>