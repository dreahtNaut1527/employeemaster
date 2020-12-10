<template>
     <v-app id="inspire">
          <navdrawer v-if="userInfo.EmployeeCode != undefined" />
          <router-view/>
          <navfooter v-if="userInfo.EmployeeCode != undefined" />
     </v-app>
</template>

<script>
import navdrawer from './components/navdrawer'
import navfooter from './components/navfooter'
export default {
     data() {
          return {
               connected: false
          }
     },
     components: {
          navdrawer,
          navfooter
     }
}
</script> 