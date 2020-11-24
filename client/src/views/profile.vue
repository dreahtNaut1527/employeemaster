<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-container>
               <v-card class="mx-auto" tile>
                    <v-img height="12.5rem" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>
                    <v-col cols="12">
                         <v-avatar color="white" size="150" style="position:absolute; top: 127px">
                              <v-avatar size="140">
                                   <v-img :src="`http://asd_sql:8080/photos/${userInfo.EmployeeCode}.jpg`"></v-img>
                              </v-avatar>
                         </v-avatar>
                    </v-col>
                    <v-list-item class="mt-12">
                         <v-list-item-content>
                              <v-list-item-title class="headline">
                                   {{`${information.EmployeeName} (${information.EmployeeCode})`}}
                              </v-list-item-title>
                              <v-list-item-subtitle>{{information.DesignationName}}</v-list-item-subtitle>
                              <v-list-item-subtitle>{{information.WorkEmailAddress}}</v-list-item-subtitle>
                         </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mx-3"></v-divider>
                    <v-card-text>
                         <v-tabs v-model="tab" centered icons-and-text grow>
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
                                                       label="Last Name"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="5">
                                                  <v-text-field
                                                       v-model="information.FirstName"
                                                       label="First Name"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="3">
                                                  <v-text-field
                                                       v-model="information.MiddleName"
                                                       label="Middle Name"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>
                                        <v-row align="center" justify="center" dense>
                                             <v-col cols="12" md="12">
                                                  <v-autocomplete
                                                       v-model="information.DepartmentCode"
                                                       :items="departmentList"
                                                       item-text="DepartmentName"
                                                       item-value="DepartmentCode"
                                                       label="Department"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                             </v-col>
                                             <v-col cols="12" md="12">
                                                  <v-autocomplete
                                                       v-model="information.SectionCode"
                                                       :items="sectionList"
                                                       item-text="SectionName"
                                                       item-value="SectionCode"
                                                       label="Section"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                             </v-col>
                                             <v-col cols="12" md="12">
                                                  <v-autocomplete
                                                       v-model="information.TeamCode"
                                                       :items="teamList"
                                                       item-text="TeamName"
                                                       item-value="TeamCode"
                                                       label="Team"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                             </v-col>
                                             <v-col cols="12" md="12">
                                                  <v-text-field
                                                       v-model="information.DesignationName"
                                                       label="Designation"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="12">
                                                  <v-text-field
                                                       v-model="information.PositionName"
                                                       label="Position"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="12">
                                                  <v-text-field
                                                       v-model="information.ContractHiredDate"
                                                       label="Date Hired"
                                                       append-icon="mdi-calendar"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="12">
                                                  <v-text-field
                                                       v-model="information.RetiredDate"
                                                       label="Date Resigned"
                                                       append-icon="mdi-calendar"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="12">
                                                  <v-autocomplete
                                                       v-model="information.ShiftID"
                                                       :items="shiftList"
                                                       item-text="ShiftTime"
                                                       item-value="ShiftID"
                                                       label="Shift"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                             </v-col>
                                        </v-row>
                                   </v-card-text>
                              </v-tab-item>
                              <v-tab-item value="2">
                                   <v-card-text>
                                        <v-row align="center" justify="center" dense>
                                             <v-col cols="12" md="8">
                                                  <v-text-field
                                                       v-model="information.NickName"
                                                       label="Nick Name"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="2">
                                                  <datePicker
                                                       :menu="dateDialog"
                                                       dateLabel="Date of Birth"
                                                       :dateValue.sync="dateBirth"
                                                  ></datePicker>
                                             </v-col>
                                             <v-col cols="12" md="1">
                                                  <v-text-field
                                                       v-model="ageValue"
                                                       label="Age"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="1">
                                                  <v-text-field
                                                       v-model="genderValue"
                                                       label="Gender"
                                                       readonly
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="8">
                                                  <v-autocomplete
                                                       v-model="information.MarStatus"
                                                       :items="marStatus"
                                                       item-text="label"
                                                       item-value="value"
                                                       label="Marital Status"
                                                       clearable
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                             </v-col>
                                             <v-col cols="12" md="4">
                                                  <v-text-field
                                                       v-model="information.NoOfChildren"
                                                       label="No of Children"
                                                       type="number"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="8">
                                                  <v-text-field
                                                       v-model="information.School"
                                                       label="School"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="4">
                                                  <v-autocomplete
                                                       v-model="information.EducCode"
                                                       :items="educationList"
                                                       item-text="EducDesc"
                                                       item-value="EducCode"
                                                       label="Educational Attainment"
                                                       clearable
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.Phone"
                                                       append-icon="mdi-phone"
                                                       label="Telephone"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.Cellphone"
                                                       append-icon="mdi-cellphone"
                                                       label="Cellphone"
                                                       hint="0000-000-0000"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-textarea
                                                       v-model="information.PresentAddress"
                                                       label="Present Address"
                                                       outlined
                                                       dense
                                                  ></v-textarea>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-textarea
                                                       v-model="information.PermanentAddress"
                                                       label="Permanent Address"
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
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="12">
                                                  <v-text-field
                                                       v-model="information.ConRelationship"
                                                       label="Relationship"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="12">
                                                  <v-textarea
                                                       v-model="information.ConAddress"
                                                       label="Contact Address"
                                                       outlined
                                                       dense
                                                  ></v-textarea>
                                             </v-col>
                                             <v-col cols="12" md="12">
                                                  <v-text-field
                                                       v-model="information.ConNumber"
                                                       append-icon="mdi-phone"
                                                       label="Contact Phone No."
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
                                                       label="CPU Number"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.IPAddress"
                                                       append-icon="mdi-ip"
                                                       label="IP Address"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.CompUserName"
                                                       append-icon="mdi-account"
                                                       label="Computer Username"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.CompPassword"
                                                       append-icon="mdi-lock"
                                                       label="Computer Password"
                                                       type="password"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="12">
                                                  <v-autocomplete
                                                       v-model="information.OperatingSystem"
                                                       :items="operatingSystem"
                                                       item-text="OperatingSystem"
                                                       item-value="OperatingSystem"
                                                       label="Operating System"
                                                       clearable
                                                       outlined
                                                       dense
                                                  ></v-autocomplete>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.WorkEmailAddress"
                                                       append-icon="mdi-email"
                                                       label="Work Email Address"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="12" md="6">
                                                  <v-text-field
                                                       v-model="information.WorkLocation"
                                                       append-icon="mdi-map-marker"
                                                       label="Work Location"
                                                       outlined
                                                       dense
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>
                                   </v-card-text>
                              </v-tab-item>
                         </v-tabs-items>
                         <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="primary" @click="saveRecord()">
                                   <v-icon left>mdi-content-save</v-icon>Save
                              </v-btn>
                              <v-btn @click="loadInformation()" text>
                                   <v-icon left>mdi-delete</v-icon>Cancel
                              </v-btn>
                         </v-card-actions>
                    </v-card-text>
               </v-card>
          </v-container>
          <v-overlay :value="overlay">
               <v-progress-circular
                    :size="100"
                    indeterminate
               ></v-progress-circular>
          </v-overlay>
     </v-main>
</template>

<script>
import datePicker from '@/components/datepicker'
export default {
     data() {
          return {
               tab: null,
               dateDialog: false,
               overlay: true,
               ageValue: 0,
               genderValue: '',
               information: '',
               dateBirth: '',
               departmentList: [],
               sectionList: [],
               teamList: [],
               designationList: [],
               positionList: [],
               educationList: [],
               breadCrumbsItems: [],
               shiftList: [],
               operatingSystem: [],
               saveOptions: {
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    denyButtonText: `Don't Save`
               },
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
               ]
          }
     },
     created() {
          this.loadInformation()
          this.loadOperatingSystem()
     },
     methods: {
          loadInformation() {
               this.overlay = true
               this.axios.get(`${this.api}/employeeinfo/${this.userInfo.EmployeeCode}`).then(res => {
                    this.information = res.data[0]
                    // If variable has no error
                    if(this.information) {
                         this.overlay = !this.overlay
                         this.breadCrumbsItems = [
                              {text: this.userInfo.UserLevel == 0 ? 'Employee' : 'Maintenance', disabled: false, href: '/profile'},
                              {text: 'Profile', disabled: true, href: '/profile'}
                         ]
                         this.loadDepartments()
                    // catch error goto error page
                    } else {
                         this.$router.push('*')
                    }
               })
          },
          loadDepartments() {
               this.axios.get(`${this.api}/company/department/${this.userInfo.ShortName}`).then(res => {
                    this.departmentList = res.data
                    this.loadSections()
               })
          },
          loadSections() {
               this.axios.get(`${this.api}/company/department/section/${this.userInfo.ShortName}`).then(res => {
                    this.sectionList = res.data
                    this.loadTeams()
                    this.loadShifts()
               })
          },
          loadTeams() {
               this.axios.get(`${this.api}/company/department/section/team/${this.userInfo.ShortName}`).then(res => {
                    this.teamList = res.data
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
          loadEducations() {
               this.axios.get(`${this.api}/education`).then(res => {
                    this.educationList = res.data
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
                    console.log(this.operatingSystem)
               })
          },
          saveRecord() {
               this.swal.fire(this.saveOptions).then(result => {
                    if(result.isConfirmed) {
                         let body = {
                              procedureName: 'ProcPostEmployee',
                              values: [	
                                        this.information.CompanyCode  ,
                                        this.information.EmployeeCode  ,
                                        this.information.AgencyCode  ,
                                        this.information.LastName  ,
                                        this.information.FirstName  ,
                                        this.information.MiddleName,
                                        this.information.NickName  ,
                                        this.information.Gender  ,
                                        this.information.DateBirth  ,
                                        this.information.MarStatus  ,
                                        this.information.NoOfChildren  ,
                                        this.information.EducCode  ,
                                        this.information.Phone  ,
                                        this.information.Cellphone  ,
                                        this.information.PresentAddress  ,
                                        this.information.PermanentAddress  ,
                                        this.information.Course  ,
                                        this.information.School  ,
                                        this.information.ConPerson  ,
                                        this.information.ConRelationship  ,
                                        this.information.ConAddress  ,
                                        this.information.ConNumber  ,
                                        this.information.ShiftID  ,
                                        this.information.DepartmentCode  ,
                                        this.information.SectionCode  ,
                                        this.information.TeamCode  ,
                                        this.information.PositionCode  ,
                                        this.information.DesignationCode  ,
                                        this.information.ContractStatus  ,
                                        this.information.ContractHiredDate  ,
                                        this.information.RegularHiredDate  ,
                                        this.information.RetiredDate  ,
                                        this.information.CPUNumber,
                                        this.information.IPAddress,
                                        this.information.CompUserName,
                                        this.information.CompPassword,
                                        this.information.OperatingSystem,
                                        this.information.WorkEmailAddress,
                                        this.information.WorkLocation,
                                        this.moment().format('YYYY-MM-DD')  ,
                                        this.moment().format('YYYY-MM-DD')  ,
                                        this.userInfo.EmployeeCode  
                              ]
                         }
                         this.axios.post(`${this.api}/execute`, {data: JSON.stringify(body)}).then(res => {
                              console.log(res.data)
                              this.swal.fire('Hooray!','Changes has been saved', 'success')
                              this.loadInformation()
                         })
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
          dateBirth(val) {
               this.information.DateBirth = val
               this.ageValue = this.moment().diff(val, 'years')
          }
     },
     components: {
          datePicker
     }
}
</script>