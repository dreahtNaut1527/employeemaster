<template>
     <v-menu
          v-model="menuDialog"
          :close-on-content-click="false"
          :nudge-width="300"
          offset-y
          origin="center center"
          transition="scroll-y-reverse-transition"
     >
          <template v-slot:activator="{ on, attrs }">
               <v-btn 
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
               <v-list two-line dense>
                    <v-subheader>Today</v-subheader>
                    <v-list-item-group
                         active-class="pink--text"
                         multiple
                    >
                         <template v-for="(item, i) in notificationList">
                              <v-list-item :key="i">
                                   <v-list-item-content>
                                        <v-list-item-title>{{item.title}}</v-list-item-title>
                                        <v-list-item-subtitle>{{item.message}}</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{item.socket}}</v-list-item-subtitle>
                                   </v-list-item-content>
                              </v-list-item>
                              <!-- <v-divider
                                   v-if="i < notificationList.length - 1"
                                   :key="i"
                              ></v-divider> -->
                         </template>
                    </v-list-item-group>
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
          showNotifications(data) {
               this.notificationList.push(data)
          }
     },
     methods: {
          
     },
     watch: {
          menuDialog() {
               this.totalNotifs = 0
          },
          notificationList(val) {
               // val.forEach(rec => {
               //      if(rec.Viewed == 0) {
               //           this.totalNotifs++
               //      }
               // })
               console.log(val)
          }
     }
}
</script>

<style scoped> 
     .v-list{
          height: 220px;
          overflow-y:auto
     }
</style>