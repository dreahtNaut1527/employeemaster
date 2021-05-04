<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-container>
               <v-card class="mx-auto" tile>
                    <v-col cols="12">
                         <v-avatar size="70">
                              <v-img :src="`${photo}/${emplcode}.jpg`"></v-img>
                         </v-avatar>
                    </v-col>
                    

                     <v-list-item class="mt-1">
                         <v-list-item-content>
                              <v-list-item-title>
                                   {{`${information.EmployeeName} (${information.EmployeeCode})`}}
                              </v-list-item-title>
                              <v-list-item-subtitle>{{information.DesignationName}}</v-list-item-subtitle>
                              <!-- <v-list-item-subtitle>{{information.WorkEmailAddress}}</v-list-item-subtitle> -->
                              
                         </v-list-item-content>
                         <v-list-item-action>
                              <v-btn @click="loadTransferHist()" :color="themeColor == '' ? 'primary' : themeColor" dark>History</v-btn>
                         </v-list-item-action>                    
                    </v-list-item>
                    <v-divider class="mx-3"></v-divider>
                    <v-card-text>
                         <v-tabs v-model="tab" :color="themeColor == '' ? 'primary' : themeColor" centered icons-and-text grow>
                              <v-tabs-slider></v-tabs-slider>
                              <v-tab v-for="(item, i) in tabsHeader" :key="i" :href="`#${item.value}`">
                                    {{item.label}} <v-icon left>{{item.icon}}</v-icon>
                              </v-tab>
                         </v-tabs>
                         <v-tabs-items v-model="tab">
                              <v-tab-item value="1">
                                   <v-card-text>
                                        <v-row align="center" justify="center" dense>
                                             <v-col cols="12" md="4">
                                                  <v-text-field
                                                       v-model="information.LastName"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       label="Last Name"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="4">
                                                  <v-text-field
                                                       v-model="information.FirstName"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       label="First Name"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="4">
                                                  <v-text-field
                                                       v-model="information.MiddleName"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       label="Middle Name"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>
                                        <v-row dense>
                                             <v-col cols="12" md="4">
                                                  <v-autocomplete
                                                       v-model="information.DepartmentCode"
                                                       :items="departmentList"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       item-text="DepartmentName"
                                                       item-value="DepartmentCode"
                                                       label="Department"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                             </v-col>
                                             <v-col cols="12" md="4">
                                                  <v-autocomplete
                                                       v-model="information.SectionCode"
                                                       :items="sectionList"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       item-text="SectionName"
                                                       item-value="SectionCode"
                                                       readonly
                                                       label="Section"
                                                     
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                             </v-col>
                                             <v-col cols="12" md="4">
                                                  <v-autocomplete
                                                       v-model="information.TeamCode"
                                                       :items="teamList"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       item-text="TeamName"
                                                       item-value="TeamCode"
                                                       readonly
                                                       label="Team"                
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                             </v-col>
                                             <v-col cols="12" md="4">
                                                  <v-autocomplete
                                                       v-model="information.PositionCode"
                                                       label="Designation"
                                                       :items="positionList"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       item-text="PositionName"
                                                       item-value="PositionCode"
                                                       readonly    
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                             </v-col>
                                              <v-col cols="12" md="4">
                                                  <v-autocomplete
                                                       v-model="information.DesignationCode"
                                                       label="Position"
                                                       :items="designationList"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       item-text="DesignationName"
                                                       item-value="DesignationCode"  
                                                       readonly                                               
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                             </v-col>
                                      
                                              <v-col cols="12" md="4">
                                                  <v-autocomplete
                                                       v-model="information.ShiftID"
                                                       :items="shiftList"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       item-text="ShiftTime"
                                                       item-value="ShiftID"
                                                       label="Shift"
                                                       :readonly="this.isEmpEdit == false"
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                             </v-col>
                                             <v-col cols="12" md="4">
                                                  <v-text-field
                                                       v-model="information.ContractHiredDate"
                                                       label="Date Hired"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       append-icon="mdi-calendar"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="4">
                                                <!-- <v-text-field
                                                
                                                       v-model="information.RetiredDate"
                                                       label="Department Resigned"
                                                       append-icon="mdi-calendar"
                                                       :readonly="this.isEmpEdit == false"
                                                       :filled="this.isEmpEdit == true"
                                                       outlined
                                                       clearable
                                                       dense
                                                  ></v-text-field>  -->
                                                  <datePicker
                                                       :menu="dateDialog"
                                                       dateLabel="Department Resigned"
                                                       :dateValue.sync="information.RetiredDate" 
                                                  ></datePicker>
                                                  <!-- <v-text-field 
                                                       v-model="information.RetiredDate"
                                                       outlined
                                                       v-mask="'####-##-##'" 
                                                       dense
                                                       :filled="this.isEmpEdit == true"
                                                       label="Department Resigned"
                                                       >

                                                       <template v-slot:append>
                                                       <dtPicker v-model="information.RetiredDate"             
                                                       :menu="dateDialog"
                                                       
                                                       >
                                                       
                                                       </dtPicker> 
                                                       </template>
                                                   
                                                  </v-text-field> -->
                                                  
                                                  
                                             </v-col>
                                        </v-row>
                                   </v-card-text>
                              </v-tab-item>
                                        <v-tab-item value="2">
                                   <v-card-text>
                                        <v-row align="center" justify="center" dense>
                                             <v-col cols="12" md="7">
                                                  <v-text-field
                                                       v-model="information.NickName"
                                                       label="Nick Name"
                                                       :readonly="this.isEmpEdit == false"
                                                       :filled="this.isEmpEdit == true"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="2">
                                                  <datePicker
                                                       :menu="dateDialog"
                                                       dateLabel="Date of Birth"
                                                       :dateValue.sync="dateBirth"
                                                       readonly
                                                  ></datePicker>
                                             </v-col>
                                             <v-col cols="12" md="1">
                                                  <v-text-field
                                                       v-model="ageValue"
                                                       label="Age"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       readOnly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="2">
                                                  <v-text-field
                                                       v-model="genderValue"
                                                       label="Gender"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       outlined
                                                       readonly
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                              <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.Course"
                                                       label="Course"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-autocomplete
                                                       v-model="information.EducCode"
                                                       :items="educationList"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       item-text="EducDesc"
                                                       item-value="EducCode"
                                                       label="Educational Attainment"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.Phone"
                                                       append-icon="mdi-phone"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       label="Telephone"
                                                       v-mask="'(###)-###-####'"                                                    
                                                       hint="(###)-###-####"
                                                       :readonly="this.isEmpEdit == false"
                                                       :filled="this.isEmpEdit == true"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.Cellphone"
                                                       append-icon="mdi-cellphone"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       label="Cellphone"
                                                       v-mask="'####-###-####'"
                                                       :readonly="this.isEmpEdit == false"
                                                       hint="####-###-####"
                                                        :filled="this.isEmpEdit == true"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="7">
                                                  <v-textarea
                                                       v-model="information.PresentAddress"
                                                       label="Present Address"
                                                       :readonly="this.isEmpEdit == false"
                                                       :filled="this.isEmpEdit == true"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       outlined
                                                       dense
                                                  ></v-textarea>
                                             </v-col>
                                             <v-col cols="12" md="5">
                                                  <v-textarea
                                                       v-model="information.PermanentAddress"
                                                       label="Permanent Address"
                                                       :readonly="this.isEmpEdit == false"
                                                       :filled="this.isEmpEdit == true"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       outlined
                                                       dense
                                                  ></v-textarea>
                                             </v-col>
                                        </v-row>
                                   </v-card-text>
                              </v-tab-item>
                              <v-tab-item value="3">
                                   <v-card-text>
                                        <v-row align="center" justify="center" dense>
                                             <v-col cols="12" md="12">
                                                  <v-text-field
                                                       v-model="information.ConPerson"
                                                       label="Contact Person"
                                                       :readonly="this.isEmpEdit == false"
                                                       :filled="this.isEmpEdit == true"  
                                                       :color="themeColor == '' ? 'primary' : themeColor"                                             
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="12">
                                                  <v-text-field
                                                       v-model="information.ConRelationship"
                                                       label="Relationship"
                                                       :readonly="this.isEmpEdit == false"
                                                       :filled="this.isEmpEdit == true"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="12">
                                                  <v-textarea
                                                       v-model="information.ConAddress"
                                                       label="Contact Address"
                                                       :readonly="this.isEmpEdit == false"
                                                       :filled="this.isEmpEdit == true"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       outlined
                                                       dense
                                                  ></v-textarea>
                                             </v-col>
                                             <v-col cols="12" md="12">
                                                  <v-text-field
                                                       v-model="information.ConNumber"
                                                       append-icon="mdi-phone"
                                                       label="Contact Phone No."
                                                       :readonly="this.isEmpEdit == false"
                                                       :filled="this.isEmpEdit == true"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>
                                   </v-card-text>
                              </v-tab-item>
                              <v-tab-item value="4">
                                   <v-card-text>
                                        <v-row align="center" justify="center" dense>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.CPUNumber"
                                                       append-icon="mdi-desktop-classic"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       label="CPU Number"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.IPAddress"
                                                       append-icon="mdi-ip"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       label="IP Address"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.CompUserName"
                                                       append-icon="mdi-account"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       label="Computer Username"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.CompPassword"
                                                       append-icon="mdi-lock"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       label="Computer Password"
                                                       type="password"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.LocalNumber"
                                                       append-icon="mdi-phone-classic"
                                                       label="Local No."
                                                       v-mask="'####-###'"
                                                       :readonly="this.isEmpEdit == false"
                                                       :filled="this.isEmpEdit == true"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       hint="####-###"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.WorkEmailAddress"
                                                       append-icon="mdi-email"
                                                       label="Work Email Address"
                                                       :readonly="this.isEmpEdit == false"
                                                       :filled="this.isEmpEdit == true"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.WorkLocation"
                                                       append-icon="mdi-map-marker"
                                                       label="Work Location"
                                                        :readonly="this.isEmpEdit == false"
                                                       :filled="this.isEmpEdit == true"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                              <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.StaffCode"
                                                       label="Staff Code"
                                                       :readonly="this.isEmpEdit == false"
                                                       :filled="this.isEmpEdit == true"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-autocomplete
                                                       v-model="information.JobAssignmentCode"
                                                       :items="jobassignments"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       item-text="JobAssignmentDesc"
                                                       item-value="JobAssignmentCode"
                                                       label="Job Assignment"
                                                       outlined
                                                       dense
                                                       clearable
                                                       :filled="this.isEmpEdit == true"
                                                  ></v-autocomplete>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-autocomplete
                                                       v-model="information.CategoryCode"
                                                       :items="category"
                                                       :color="themeColor == '' ? 'primary' : themeColor"
                                                       item-text="label"
                                                       item-value="value"
                                                       label="Category"
                                                       outlined
                                                       dense
                                                       clearable
                                                       :filled="this.isEmpEdit == true"
                                                  ></v-autocomplete>
                                             </v-col>
                                        </v-row>
                                   </v-card-text>
                              </v-tab-item>
                         </v-tabs-items>
                    </v-card-text>
                    <v-card-actions v-if="this.isEmpEdit == true">
                         <v-spacer></v-spacer>
                         <v-btn @click="loadInformation()" text>
                              <v-icon left>mdi-cancel</v-icon>Cancel
                         </v-btn>
                         <v-btn v-if="userInfo.UserLevel != 5" @click="saveRecord()" :color="themeColor == '' ? 'primary' : themeColor" dark>
                              <v-icon left>mdi-content-save</v-icon>Save
                         </v-btn>
                    </v-card-actions>
               </v-card>
              
          </v-container>
          <v-dialog v-model="dialog" width="800">
               <v-card>
                    <v-toolbar :color="themeColor == '' ? 'primary' : themeColor" dark flat>
                         <v-toolbar-title>Transfer History</v-toolbar-title>
                    </v-toolbar>

                    <v-data-table
                         :headers="EmpHistoryHeader"
                         :items="transferHist"
                         :page.sync="page"
                         @page-count="pageCount = $event"
                         hide-default-footer
                    >    
                    </v-data-table>
                     <v-pagination
                         v-model="page"
                         :length="pageCount"
                         :total-visible="10"
                         :color="themeColor == '' ? 'primary' : themeColor"
                    ></v-pagination>

               </v-card>
          </v-dialog>
          <!-- <v-overlay :value="overlay">
               <v-progress-circular
                    :size="100"
                    indeterminate
               ></v-progress-circular>
          </v-overlay> -->
     </v-main>
</template>

<script>
import datePicker from '@/components/datepicker'

export default {
     data() {
          return {
              
               tab: null,         
               pageCount: 0,
               page: 1,
               disabled: false,
               dialog:false,
               dateDialog: false,
               overlay: true,
               ageValue: 0,
               genderValue: '',
               information: '',
               dateBirth: '',
               transferHist: [],
               divsecteam:[],
               designationList: [],
               positionList: [],
               salarygradeList:[],
               educationList: [],
               shiftList: [],
               operatingSystem: [],
               jobassignments: [],
               category: [
                    {label: 'Direct', value: 'D'},
                    {label: 'Indirect', value: 'I'}
               ],
               saveOptions: {
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    denyButtonText: `Don't Save`
               },
               breadCrumbsItems: [
                    {text: 'Main Data', disabled: false, href: '#'},
                    {text: 'Employees', disabled: false, href: '#'},
                    {text: 'Details', disabled: true, href: '#'},
                  
               ],
               tabsHeader: [
                    {label: 'Employee Information', icon:'mdi-account', value: 1},
                    {label: 'Other Information', icon:'mdi-card-bulleted', value: 2},
                    {label: 'Contact Person', icon:'mdi-card-account-details', value: 3},
                    {label: 'Work Information', icon:'mdi-briefcase', value: 4}
               ],
                 marStatus: [
                    {label: 'Single', value: 'S'},
                    {label: 'Married', value: 'M'},
                    {label: 'Widowed/Widower', value: 'W'},
                    {label: 'Separated', value: 'C'}
               ],
                EmpHistoryHeader: [
                    {text: 'Transferred Date', value: 'TransferredDate'},
                    {text: 'Department', value: 'DepartmentName'},
                    {text: 'Section', value: 'SectionName'},
                    {text: 'Team', value: 'TeamName'}
               ],
          }
     },
     computed:{
          filterSection() {
               return this.divsecteam.filter(rec => {
                    return (
                         rec.DepartmentCode.includes(this.information.DepartmentCode || '')              
                    )
               })
          },
          filterTeam() {
               return this.divsecteam.filter(rec => {
                    return (
                         rec.DepartmentCode.includes(this.information.DepartmentCode || '') &&
                         rec.SectionCode.includes(this.information.SectionCode || '')                   
                    )
               })
          },
          departmentList() {
               return this.divsecteam.filter(rec =>{
                   return rec.DepartmentName
               }).sort()
          },
          sectionList() {
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
     created() {
          this.loadInformation()
          // this.loadSalaryGrade() 
     },
     sockets: {
          connect() {
               this.loadInformation()
          }
     },
     
     methods:{
          loadInformation() {
               this.overlay = true
               this.information=[]
               this.axios.get(`${this.api}/employeeinfo/${this.emplcode}`).then(res => {
                    this.information = res.data[0]
                    this.loaddivsectionteam() 
               })
          },
          loadTransferHist() {
               this.dialog=true
               this.overlay = true            
               this.axios.get(`${this.api}/employeehistory/${this.emplcode}`).then(res => {      
               // console.log('hist',res.data)
               this.transferHist = res.data
    
               })
          },
          loaddivsectionteam(){
               this.loading= true
               this.axios.get(`${this.api}/company/department/section/team/${this.userInfo.ShortName}`).then(res=>{
                    this.divsecteam = res.data
                    // console.log('div',res.data)
                    this.loading  =false
                      this.loadShifts()
                      this.loadDesignations()
               })
          },        
        
          loadDesignations() {
               this.axios.get(`${this.api}/company/designation/${this.userInfo.ShortName}`).then(res => {
                    this.designationList = res.data
                    this.loadPositions()
               })
          },
          loadPositions() {
               this.axios.get(`${this.api}/company/position/${this.userInfo.ShortName}`).then(res => {
                    this.positionList = res.data
                    this.loadEducations()
               })
          },
          loadSalaryGrade() {
               let body = {
                    server: `HRIS${this.userInfo.ShortName.toLowerCase()}`,
                    database: 'MASTER'
               }
               this.axios.post(`${this.asd_sql}/salarygrade.php`, body).then(res => {
                    this.salarygradeList = res.data
               })
          },

          loadEducations() {
               this.axios.get(`${this.api}/education`).then(res => {
                    this.educationList = res.data
                    this.loadOperatingSystem()
               })
          },
          loadShifts() {
               this.axios.get(`${this.api}/shift/${this.userInfo.ShortName}`).then(res => {
                    this.shiftList = res.data
               })
          },
          loadOperatingSystem() {
               this.axios.get(`${this.api}/os`).then(res => {
                    this.operatingSystem = res.data
                    this.loadJobAssignments()
                   
               })
          },
          loadJobAssignments() {
               this.axios.get(`${this.api}/jobassignment/${this.userInfo.ShortName}/${this.userInfo.DepartmentName}`).then(async res => {
                    this.jobassignments = await res.data
               })
          },
          saveRecord() {
               this.swal.fire(this.saveOptions).then(result => {
                    if(result.isConfirmed) {
                         let body = {
                              procedureName: 'ProcPostEmployee',
                              values: [	
                                        this.information.CompanyCode,
                                        this.information.EmployeeCode,
                                        this.information.AgencyCode,
                                        this.information.LastName,
                                        this.information.FirstName,
                                        this.information.MiddleName,
                                        this.information.NickName,
                                        this.information.Gender,
                                        this.information.DateBirth,
                                        this.information.MarStatus,
                                        this.information.NoOfChildren,
                                        this.information.EducCode,
                                        this.information.Phone,
                                        this.information.Cellphone,
                                        this.information.PresentAddress,
                                        this.information.PermanentAddress,
                                        this.information.Course,
                                        this.information.School,
                                        this.information.ConPerson,
                                        this.information.ConRelationship,
                                        this.information.ConAddress,
                                        this.information.ConNumber,
                                        this.information.ShiftID,
                                        this.information.DepartmentCode,
                                        this.information.SectionCode,
                                        this.information.TeamCode,
                                        this.information.PositionCode,
                                        this.information.DesignationCode,
                                        this.information.SalaryGrade,
                                        this.information.ContractStatus,
                                        this.information.ContractHiredDate,
                                        this.information.RegularHiredDate,
                                        this.information.RetiredDate,
                                        this.information.StaffCode,
                                        this.information.CPUNumber,
                                        this.information.IPAddress,
                                        this.information.CompUserName,
                                        this.information.CompPassword,
                                        this.information.OperatingSystem,
                                        this.information.WorkEmailAddress,
                                        this.information.WorkLocation,
                                        this.information.LocalNumber,
                                        this.information.JobAssignmentCode,
                                        this.information.CategoryCode,
                                        this.moment().format('YYYY-MM-DD'),
                                        this.moment().format('YYYY-MM-DD'),
                                        this.userInfo.EmployeeCode  
                              ]
                         }
                       

                         this.axios.post(`${this.api}/execute`, {data: JSON.stringify(body)})
                         this.swal.fire('Hooray!','Changes has been saved', 'success')
                         this.loadInformation()
                        
                    } else if(result.isDenied) {
                         this.swal.fire('Oh no!', 'Changes are not saved', 'info')
                    }
               })
          }
         

     },
      watch: {
          information(val) {
               // Format dates
               val.ContractHiredDate = val.ContractHiredDate ? this.moment(val.ContractHiredDate).format('YYYY-MM-DD') : ""
               val.RegularHiredDate = val.RegularHiredDate ? this.moment(val.RegularHiredDate).format('YYYY-MM-DD') : ""
               val.RetiredDate = val.RetiredDate ? this.moment(val.RetiredDate).format('YYYY-MM-DD') : ""
               this.dateBirth = val.DateBirth ? this.moment(val.DateBirth).format('YYYY-MM-DD') : ""
               this.genderValue = val.Gender == 'M' ? 'Male' : 'Female'
               this.ageValue = this.moment().diff(this.dateBirth, 'years')
          },
          transferHist() {
               return this.transferHist.map((rec)=>{
                    return   rec.TransferredDate = rec.TransferredDate ? this.moment(rec.TransferredDate).format('YYYY-MM-DD') : ""
               })

               // alert(val.TransferredDate)
               // val.TransferredDate = val.TransferredDate ? this.moment(val.TransferredDate).format('YYYY-MM-DD') : ""     
          },
          dateBirth(val) {
               this.information.DateBirth = val
               this.ageValue = this.moment().diff(val, 'years')
          },
         
     
     },
     components: {
          datePicker
         
     }
}
</script>