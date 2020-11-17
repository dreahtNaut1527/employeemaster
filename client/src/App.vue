<template>
     <v-app id="inspire">
          <navdrawer v-if="userInfo.EmplCode != undefined" />
          <router-view/>
          <navfooter v-if="userInfo.EmplCode != undefined" />
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