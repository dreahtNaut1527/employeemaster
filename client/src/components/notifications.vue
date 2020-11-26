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
                    @click="menuDialog = !menuDialog" 
                    v-bind="attrs"
                    v-on="on"
                    icon>    
                    <v-icon small>mdi-bell</v-icon>
                    <v-badge
                         v-if="notifications.length"
                         color="error"
                         :title="notifications.length"
                    ></v-badge>
               </v-btn>
          </template>
          <v-card>
               <v-list>
                    <v-list-item v-for="(item, i) in onLineUsers" :key="i">
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
               onLineUsers: []

          }
     },
     created() {
          
     },
     sockets: {
          loggedIn(data) {
               this.onLineUsers = data
          }
     },
     computed: {
          notifications() {
               return this.onLineUsers.filter(rec => {
                    return rec
               })
          }
     },
     methods: {

     }
}
</script>