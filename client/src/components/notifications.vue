<template>
     <v-menu
          v-model="menuDialog"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
          origin="center center"
          transition="scale-transition"
     >
          <template v-slot:activator="{ on, attrs }">
               <v-btn 
                    @click="this.closeLogging()" 
                    v-bind="attrs"
                    v-on="on"
                    icon>    
                    <v-icon small>mdi-bell</v-icon>
                    <v-badge
                         v-if="notifications.length"
                         color="error"
                         :content="notifications.length"
                    ></v-badge>
               </v-btn>
          </template>
          <v-card>
               <v-list>
                    <v-list-item v-for="(item, i) in notificationList" :key="i">
                         <v-list-item-content>
                              {{item}}
                         </v-list-item-content>
                    </v-list-item>
               </v-list>
          </v-card>
     </v-menu>
</template>

<script>
export default {
     data() {
          return {
               menuDialog: false,
               notificationList: []
          }
     },
     created() {
          
     },
     sockets: {
          loggedIn(data) {
               this.onLineUsers = data
          },
          notifications(data) {
               console.log(data)
          }
     },
     computed: {
          notifications() {
               return this.notificationList.filter(rec => {
                    return rec
               })
          }
     },
     methods: {
          loadLogging() {
               this.axios.get(`${this.api}/logging`).then(res => {
                    this.notificationList = res.data
               })
          },
          closeLogging() {
               this.menuDialog = !this.menuDialog
               let body = {
                    procedureName: 'ProcUserLogging',
                    values: [
                              this.$socket.id, 
                              this.userInfo.EmployeeCode,
                              `User: ${this.userInfo.EmployeeCode} logged in`,
                              this.moment().format('YYYY-MM-DD hh:mm:ss'),
                              this.moment().format('YYYY-MM-DD hh:mm:ss'),
                              this.userInfo.EmployeeCode,
                         ]
               }
               this.axios.post(`${this.api}/execute`, {data: JSON.stringify(body)})
          }
     }
}
</script>