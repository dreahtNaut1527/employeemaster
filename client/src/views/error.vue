<template>
     <v-main>
          <v-container class="fill-height">
               <v-row align="center" justify="center">
                    <v-col cols="12" md="6">
                         <v-card flat>
                              <v-img src="../assets/404.gif"></v-img>
                              <!-- <v-card-text class="headline text-center">404: Page not found</v-card-text> -->
                              <v-card-text v-if="!isConnect" class="headline text-center">
                                   Error in network connection. Please try again
                              </v-card-text>
                              <v-card-title v-else class="headline text-caption text-center">
                                   Page not found
                              </v-card-title>
                              <v-card-actions>
                                   <v-btn @click="reloadPage()" color="primary" block text>Reload</v-btn>
                              </v-card-actions>
                         </v-card>
                    </v-col>
               </v-row>
          </v-container>
     </v-main>
</template>

<script>

export default {
     data() {
          return {

          }
     },
     methods: {
          reloadPage() {
               if(this.userInfo.UserLevel == 0) {
                    this.$router.push('/profile')
               } else {
                    this.$router.push('/dashboard')
               }
          }
     }
}
</script>