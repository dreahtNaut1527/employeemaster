<template>
     <v-main>
          <v-container class="fill-height">
               <v-row align="center" justify="center">
                    <v-col cols="12" md="3">
                         <v-card flat>
                              <v-img src="../assets/404.gif"></v-img>
                              <!-- <v-card-text class="headline text-center">404: Page not found</v-card-text> -->
                              <v-card-text class="headline text-caption text-center">
                                   Error in network connection. Please try again
                              </v-card-text>
                         </v-card>
                    </v-col>
               </v-row>
          </v-container>
     </v-main>
</template>

<script>
import store from '@/store'

export default {
     data() {
          return {

          }
     },
     sockets: {
          connect() {
               store.commit('CHANGE_CONNECTION', true)
               if(this.userInfo.UserLevel == 0) {
                    this.$router.push('/profile')
               } else {
                    this.$router.push('/dashboard')
               }
          }
     }
}
</script>