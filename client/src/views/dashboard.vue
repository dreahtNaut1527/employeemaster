<template>
     <v-main>
          <v-subheader>Dashboard</v-subheader>
          <v-container>
               <v-row align="center" justify="center" dense>
                    <v-col v-for="(item, i) in summaries" :key="i" cols="12" md="3">
                         <v-card :color="item.color" :dark="i != 1">
                              <v-toolbar flat color="transparent">
                                   <v-toolbar-title>{{item.text}}</v-toolbar-title>
                                   <v-spacer></v-spacer>
                                   <v-icon x-large>{{item.icon}}</v-icon>
                              </v-toolbar>
                              <v-divider class="mx-3"></v-divider>
                              <v-card-text v-if="i == 0">Total Records: {{logtime.length}}</v-card-text>
                              <v-card-text v-if="i == 1">Total Records: {{getTotalPresent.length}}</v-card-text>
                              <v-card-text v-if="i == 2">Total Records: {{getTotalAbsent.length}}</v-card-text>
                              <v-card-text v-if="i == 3">Total Records: {{logtime.length - getTotalAbsent.length}}</v-card-text>
                         </v-card>
                    </v-col>
               </v-row>
               <v-row>
                    <v-col>
                         <v-card>  
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
                              </v-row>
                              <v-data-table
                                   :headers="headers"
                                   :items="logtime"
                                   :loading="loading"
                                   :search="employeeCode"
                                   :items-per-page="8"
                                   :page.sync="page"
                                   loading-text="Loading Data. . .Please Wait"
                                   @page-count="pageCount = $event"
                                   hide-default-footer
                              >
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
                    {text: 'Total Manpower', value: 0, icon: 'mdi-account-hard-hat', color: 'success'}
               ]
          }
     },
     created() {
          this.loadLogtime()
     },
     computed: {
          getTotalPresent() {
               return this.logtime.filter(rec => {
                    return rec.TIMEIN != null 
               })
          },
          getTotalAbsent() {
               return this.logtime.filter(rec => {
                    return rec.TIMEIN == null
               })
          }
     },
     methods: {
          loadLogtime() {
               let body = {
                    logdate: this.moment(this.logtimeDate).format('MMDDYY'),
                    server: `HRIS${this.userInfo.ShortName}`
               }
               this.axios.post('http://asd_sql:8080/server/api/logtime.php', body).then(res => {
                    this.logtime = res.data
                    console.log(res)
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