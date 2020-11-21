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
                         </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mx-3"></v-divider>
                    <v-card-title>Employee Information</v-card-title>
                    <v-card-text>
                         <v-row align="center" justify="center" dense>
                              <v-col cols="12" md="2">
                                   <v-text-field
                                        v-model="information.EmployeeCode"
                                        label="Code"
                                        readonly
                                        outlined
                                        dense
                                   ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="3">
                                   <v-text-field
                                        v-model="information.LastName"
                                        label="Last Name"
                                        outlined
                                        dense
                                   ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4">
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
                         <v-row align="center" justify="center">
                              <v-col cols="12" md="6">
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
                                   </v-row>
                              </v-col>
                              <v-col cols="12" md="6">
                                   <v-row align="center" justify="center" dense>
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
                                   </v-row>
                              </v-col>
                         </v-row>
                         <v-row align="center" justify="center" dense>
                              <v-col cols="12" md="4">
                                   <v-text-field
                                        v-model="information.NickName"
                                        label="Nickname"
                                        outlined
                                        dense
                                   ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4">
                                   <v-autocomplete
                                        v-model="information.MarStatus"
                                        :items="marStatus"
                                        item-text="label"
                                        item-value="value"
                                        label="Marital Status"
                                        outlined
                                        dense
                                   ></v-autocomplete>
                              </v-col>
                         </v-row>
                    </v-card-text>
                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn color="primary">
                              <v-icon left>mdi-content-save</v-icon>Save
                         </v-btn>
                         <v-btn text>
                              <v-icon left>mdi-delete</v-icon>Cancel
                         </v-btn>
                    </v-card-actions>
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
export default {
     data() {
          return {
               overlay: true,
               information: '',
               departmentList: [],
               sectionList: [],
               teamList: [],
               designationList: [],
               positionList: [],
               breadCrumbsItems: [],
               marStatus: [
                    {label: 'Single', value: 'S'},
                    {label: 'Married', value: 'M'},
                    {label: 'Widowed/Widower', value: 'W'},
                    {label: 'Separated', value: 'C'}
               ],
               genderOption: [
                    {label: 'Male', value: 'M'},
                    {label: 'Female', value: 'F'}
               ],
          }
     },
     created() {
          this.loadInformation()
     },
     methods: {
          loadInformation() {
               this.axios.get(`${this.api}/employeeinfo/${this.userInfo.EmployeeCode}`).then(res => {
                    this.information = res.data[0]
                    // If variable has no error
                    if(this.information) {
                         this.breadCrumbsItems = [
                              {text: this.userInfo.UserLevel == 0 ? 'Employee' : 'Maintenance', disabled: false, href: '/profile'},
                              {text: 'Profile', disabled: true, href: '/profile'}
                         ]
                         this.loadDepartments()
                    // catch error goto error page
                    } else {
                         this.$router.push('*')
                    }
                    this.overlay = !this.overlay
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
               })
          }
     },
     watch: {
          information(val) {
               val.ContractHiredDate = this.moment(val.ContractHiredDate).format('MMM DD, YYYY')
          }
     }
}
</script>