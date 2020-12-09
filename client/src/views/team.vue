<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
               <v-container>
                    <v-card>
                         <v-card-title>                                   
                              <v-row dense>
                                   <v-col cols="12" md="4">
                                        <v-card-text class="pa-0 headline">Team</v-card-text>
                                   </v-col>
                                   <v-spacer></v-spacer>
                                   <v-btn @click="newRecord()" color="primary"><v-icon left>mdi-plus</v-icon>New</v-btn>
                              </v-row>
                         </v-card-title>
                         <v-data-table
                              :headers="headers"
                              :items="teams"
                              :loading="loading"
                              :search="searchData"
                              :page.sync="page"
                              loading-text="Loading Data. . .Please Wait"
                              @page-count="pageCount = $event"
                               hide-default-footer
                         >
                         <template v-slot:item="props">
                              <tr :style="props.item.DeletedDate != null ? 'color: #b71c1c;' : ''">
                                   <td>{{props.item.TeamName}}</td>
                                   <td>{{props.item.CreatedDate}}</td>
                                   <td>{{props.item.UpdatedDate}}</td>
                                   <td>
                                        <v-btn @click="editRecord(props.item)" icon>
                                             <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn @click="deleteRecord(props.item)" icon>
                                             <v-icon v-if="props.item.DeletedDate == null">mdi-delete</v-icon>
                                             <v-icon v-else>mdi-restore</v-icon>
                                        </v-btn>
                                   </td>
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
                         {{editTeam}}
                         <v-toolbar color="primary" flat dark>{{editmode==1? "Edit Record":"New Record"}}</v-toolbar>
                         <v-container>
                              <v-form ref="form" v-model="valid" lazy-validation>
                                   <v-row align="center" justify="center" dense>
                                        <v-col cols="12" md="12">
                                             <v-text-field
                                                  v-model="editTeam.TeamName"
                                                  label="Team Name"
                                                  outlined
                                                  dense
                                             ></v-text-field>
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
               valid: true,
               loading:true,
               teams:[],
               dialog: false,
               pageCount: 0,
               page: 1,
               editmode:0,
               editTeam: {
                    CompanyCode: '',
                    TeamCode: '00',
                    TeamName: '',
                    CreatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedUserId: '',
                    Option: 1
               },
               breadCrumbsItems: [
                    {text: 'Main Data', disabled: false, href: '/team'},
                    {text: 'Teams', disabled: true, href: '/team'}
               ],
               headers:[
                    {text:'Team',value:'TeamName'},
                    {text:'Date Created',value:'CreatedDate'},
                    {text:'Date Updated',value:'UpdatedDate'},
                    {text:'Actions',value:'actions'},

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
          }
     },
     created(){
          this.loadteams()
     },
     methods:{
         loadteams(){
              this.loading=true
              this.axios.get(`${this.api}/company/team/${this.userInfo.ShortName}`).then(res=>{
                   this.teams=res.data
                   this.loading=false
              })
         } ,
         editRecord(val){
              this.editTeam=val
              this.dialog=true
              this.editmode=1
         },
         newRecord(){
              this.loadteams()
              this.dialog=true
              this.editTeam.CompanyCode=this.userInfo.CompanyCode
         },
         saveRecord(){
              if (this.$refs.form.validate){
                   this.swal.fire(this.saveOptions).then(result=>{
                         if(result.isConfirmed){
                             let body = {
                                  procedureName:"ProcTeam",
                                  values:[
                                       this.editTeam.CompanyCode,
                                       this.editTeam.TeamCode,
                                       this.editTeam.TeamName,
                                       this.editTeam.CreatedDate,
                                       this.editTeam.UpdatedDate,
                                       this.editTeam.UpdatedUserId,
                                       1
                                  ]
                             }
                             this.axios.post(`${this.api}/execute`,{data:JSON.stringify(body)}).then(()=>{
                                   this.swal.fire('Hooray!','Changes has been saved', 'success')
                                   this.clearVariables()
                                   
                             })
                         }else if(result.isDenied) {
                              this.clearVariables()
                              this.swal.fire('Oh no!', 'Changes are not saved', 'info')
                         }
                   })
              }
         },
         deleteRecord(val){
              this.swal.fire({
                    title: 'Are you sure?',
                    text: val.DeletedDate == null ? "This data wil not be used in any records." : "This wil restore the data.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: val.DeletedDate == null  ? 'Yes, delete it!' : 'Yes, restore it!',
                    denyButtonText: 'Cancel'
              }).then(result=>{
                   if (result.isConfirmed){
                      let body = {
                                  procedureName:"ProcTeam",
                                  values:[
                                       val.CompanyCode,
                                       val.TeamCode,
                                       val.TeamName,
                                       val.CreatedDate,
                                       val.UpdatedDate,                                      
                                       this.userInfo.EmployeeCode,
                                       0
                                  ]
                      }
                         this.axios.post(`${this.api}/execute`,{data:JSON.stringify(body)}).then(()=>{
                              this.swal.fire('Confirmed!','Changes has been saved', 'success')
                              this.setNotifications('Deleted a record', `User: ${this.userInfo.EmployeeName} deleted a record`)
                              this.clearVariables()
                         })
                   }
              })
         },
         clearVariables(){
               this.editTeam={
                    CompanyCode: '',
                    TeamCode: '00',
                    TeamName: '',
                    CreatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedDate: this.moment().format('YYYY-MM-DD hh:mm:ss'),
                    UpdatedUserId: '',
                    Option: 1
               }
          this.loadteams()
          this.dialog=false
          this.editmode=0
         }
     }
}
</script>