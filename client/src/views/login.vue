<template>
     <v-main>
          <v-container class="fill-height">
               <v-row align="center" justify="center">
                    <v-col cols="12" md="5">
                         <v-card elevation="7">
                              <v-card-text class="text-center subheading">
                                   <v-card-text class="text-center headline">Login to your account</v-card-text>
                                   <v-avatar class="mb-6" color="primary" size="95">
                                        <v-icon x-large dark>mdi-account</v-icon>
                                   </v-avatar>
                                   <v-form>
                                        <v-text-field
                                             v-model="user"
                                             placeholder="Username"
                                             append-icon="mdi-account"
                                             outlined
                                             rounded
                                        ></v-text-field>
                                        <v-text-field
                                             v-model="pass"
                                             placeholder="Password"
                                             append-icon="mdi-lock"
                                             type="password"
                                             outlined
                                             rounded
                                        ></v-text-field>
                                   </v-form>
                                        <v-checkbox
                                             label="Remember Me"
                                        ></v-checkbox>
                                   <v-card-actions>
                                        <v-btn color="primary" block>Login</v-btn>
                                   </v-card-actions>
                              </v-card-text>
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
               user: '',
               pass: ''
          }
     },
     methods: {
          
     }
}
</script>