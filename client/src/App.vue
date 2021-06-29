<template>
     <v-app id="inspire">
          <navdrawer v-if="(userInfo.EmployeeCode != undefined || userInfo.id != undefined) && isConnect" />
          <router-view/>
          <navfooter v-if="(userInfo.EmployeeCode != undefined || userInfo.id != undefined)" />
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
     mounted() {
          setInterval(() => {
               this.checkAppVersion()
          }, 1000);
     },
     methods: {

     },
     components: {
          navdrawer,
          navfooter
     }
}
</script> 