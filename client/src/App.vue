<template>
     <v-app id="inspire">
          <navdrawer v-if="(userInfo.EmployeeCode != undefined || userInfo.EmployeeNumber != undefined) && isConnect" />
          <router-view/>
          <navfooter v-if="(userInfo.EmployeeCode != undefined || userInfo.EmployeeNumber != undefined)" />
     </v-app>
</template>

<script>
import navdrawer from './components/navdrawer'
import navfooter from './components/navfooter'
export default {
     data() {
          return {
               
          }
     },
     components: {
          navdrawer,
          navfooter
     }
}
</script> 