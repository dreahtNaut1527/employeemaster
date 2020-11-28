<template>
     <v-menu
          v-model="menuDialog"
           content-class="my-menu"
          :close-on-content-click="false"
          :nudge-width="300"
          offset-y
          origin="center center"
          transition="scroll-y-reverse-transition"
     >
          <template v-slot:activator="{ on, attrs }">
               <v-btn 
                    @click="closeLogging()" 
                    v-bind="attrs"
                    v-on="on"
                    icon>    
                    <v-icon small>mdi-bell</v-icon>
                    <v-badge
                         v-if="totalNotifs > 0"
                         color="error"
                         :content="totalNotifs"
                    ></v-badge>
               </v-btn>
          </template>
          <v-card>
               <v-toolbar color="primary" flat dark>
                    <v-toolbar-title>Notifications</v-toolbar-title>
               </v-toolbar>
               <v-list dense>
                    <v-subheader>Today</v-subheader>
                    <v-list-item v-for="(item, i) in notificationList" :key="i">
                         <v-list-item-avatar>
                              <v-img :src="`http://asd_sql:8080/photos/${item.EmployeeCode}.jpg`"></v-img>
                         </v-list-item-avatar>
                         <v-list-item-content>
                              <v-list-item-title>{{item.EmployeeName}}</v-list-item-title>
                              <v-list-item-subtitle>{{item.Details}}</v-list-item-subtitle>
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
               notificationList: [],
               totalNotifs: 0
          }
     },
     created() {
          
     },
     sockets: {
          loggedIn(data) {
               this.onLineUsers = data
          },
          notifications() {
               this.loadLogging()
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
                    this.totalNotifs = this.notificationList.length
               })
          },
          closeLogging() {
               this.menuDialog = !this.menuDialog
               this.totalNotifs = 0
               // this.$socket.emit('notifications', this.notifications)
          }
     }
}
</script>

<style scoped> 
     .v-list{
          height: 220px;
          overflow-y:auto
     }
     .my-menu {
          margin-top: 20px;
          contain: initial;
          overflow: visible;
     }
     .my-menu::before {
          position: absolute;
          content: "";
          top: 0;
          right: 13%;
          transform: translateY(-100%);
          width: 10px; 
          height: 13px; 
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 13px solid #1976d2;
     }
</style>