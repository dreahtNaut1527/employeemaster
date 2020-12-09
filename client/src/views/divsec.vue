<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-container>
              <v-card>
                    <v-card-title>                                   
                         <v-row dense>
                              <v-col cols="12" md="4">
                                   <v-card-text class="pa-0 headline">Department-Section-Team</v-card-text>
                              </v-col>
                              <v-spacer></v-spacer>
                              <v-btn @click="newRecord()" color="primary"><v-icon left>mdi-plus</v-icon>New</v-btn>
                         </v-row>
                    </v-card-title>
                    <v-card-title>
                         <v-row dense>
                              <v-col cols="4">
                                   <v-autocomplete
                                   v-model="departmentfilter"
                                   :items="departmentlistfilter"
                                   label="Department"    
                                   clearable                                 
                                   outlined
                                   dense
                                   ></v-autocomplete>
                              </v-col>
                              <v-col cols="4">
                                   <v-autocomplete 
                                   v-model="sectionfilter"
                                   :items="sectionlistfilter"
                                   label="Section"   
                                   clearable    
                                   outlined
                                   dense
                                   ></v-autocomplete>
                              </v-col>
                              <v-col cols="4">
                                   <v-autocomplete 
                                   v-model="teamfilter"
                                   :items="teamlistfilter"
                                   label="Team" 
                                   clearable    
                                   outlined
                                   dense
                                   ></v-autocomplete>
                              </v-col>
                         </v-row>
                    </v-card-title>     
                    <v-data-table
                         :headers="headers"
                         :items="filterData"
                         :search="searchData"
                         :page.sync="page"
                         loading-text="Loading Data. . .Please Wait"
                         @page-count="pageCount = $event"
                              hide-default-footer
                    >
                         <template v-slot:item="props">                             
                              <tr >
                                   <td>{{props.item.DepartmentName}}</td>                              
                                   <td>{{props.item.SectionName}}</td>   
                                   <td>{{props.item.TeamName}}</td>                                   
                              </tr>                              
                         </template>

                    </v-data-table>
                    <v-pagination
                         v-model="page"
                         :length="pageCount"
                         :total-visible="10"
                    ></v-pagination>
              </v-card>
          </v-container>
          <v-dialog v-model="dialog" width="500" persistent>
               <v-card>
                    <v-toolbar color="primary" flat dark>New Record</v-toolbar>
                    <v-container>
                         <v-form ref="form"  lazy-validation>
                              <v-row align="center" justify="center" dense>
                                   <v-col cols="12" md="12">                                 
                                        <v-autocomplete
                                             v-model="editdivsecteam.DepartmentName"
                                             :items="departmentlist"
                                             label="Department"    
                                             clearable                                 
                                             outlined
                                             dense
                                        ></v-autocomplete>        
                                        <v-autocomplete 
                                             v-model="editdivsecteam.SectionName"
                                             :items="sectionlist"
                                             label="Section"   
                                             clearable    
                                             outlined
                                             dense
                                        ></v-autocomplete>                           
                                        <v-autocomplete 
                                             v-model="editdivsecteam.TeamName"
                                             :items="teamlist"
                                             label="Team" 
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
                         <v-btn @click="saveRecord()" color="primary">Save</v-btn>
                         <v-btn @click="clearVariables()" text>Cancel</v-btn>
                    </v-card-actions>
               </v-card>
          </v-dialog>
     </v-main>
</template>
<script>
export default {
     data() {
          return {
               dialog:false,
               departmentfilter:"",
               sectionfilter:"",
               teamfilter:"",
               divsecteam:[],
               pageCount: 0,
               page: 1,
               headers:[
                    {text:"Department",value:"DepartmentName"},
                    {text:"Section",value:"SectionName"},
                    {text:"Team",value: "TeamName"}             
               ],
               breadCrumbsItems: [
                    {text: 'Main Data', disabled: false, href: '/divsec'},
                    {text: 'Department - Section', disabled: true, href: '/divsec'}
               ],
               editdivsecteam:{
                    CompanyCode: '',
                    DepartmentCode: '00',
                    SectionCode: '',
                    TeamCode: '',
                    CreatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedUserId: '',
                    Option: 1
               }
          }
     },
     computed:{
          filterData() {
               return this.divsecteam.filter(rec => {
                    return (
                         rec.DepartmentName.includes(this.departmentfilter || '') &&
                         rec.SectionName.includes(this.sectionfilter || '') && 
                         rec.TeamName.includes(this.teamfilter || '')
                    )
               })
          },
          departmentlistfilter(){
               return this.divsecteam.map((rec)=>{
                    return rec.DepartmentName
               }).sort()               
          },
          sectionlistfilter(){
               return this.filterData.map((rec)=>{
                    return rec.SectionName
               }).sort()                
          },
          teamlistfilter(){
               return this.filterData.map((rec)=>{
                    return rec.TeamName
               }).sort()               
          }, 
          departmentlist(){
               return this.divsecteam.map((rec)=>{
                    return rec.DepartmentName
               }).sort()               
          },
          sectionlist(){
               return this.divsecteam.map((rec)=>{
                    return rec.SectionName
               }).sort()                
          },
          teamlist(){
               return this.divsecteam.map((rec)=>{
                    return rec.TeamName
               }).sort()               
          },         
     },
     created(){
          this.loaddivsectionteam()
     },
     methods:{
          loaddivsectionteam(){
               this.axios.get(`${this.api}/company/department/section/team/${this.userInfo.ShortName}`).then(res=>{
                    this.divsecteam = res.data
               })
          },
          newRecord(){
               this.dialog=true
          },
          clearVariables(){
               this.editdivsecteam={
                    CompanyCode: '',
                    DepartmentCode: '00',
                    SectionCode: '',
                    TeamCode: '',
                    CreatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedUserId: '',
                    Option: 1
               }

               this.loaddivsectionteam()
               this.dialog=false
          }
     }
}
</script>