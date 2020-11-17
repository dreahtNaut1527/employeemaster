<template>
     <v-app id="inspire">
<<<<<<< HEAD
          <navdrawer v-if="userInfo.EmployeeCode != undefined" />
          <router-view/>
          <navfooter v-if="userInfo.EmployeeCode != undefined" />
=======
          <navdrawer v-if="userInfo.EmplCode != undefined" />
          <router-view/>
          <navfooter v-if="userInfo.EmplCode != undefined" />
>>>>>>> 8559198239804058af14de5af1e009f588ad2926
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