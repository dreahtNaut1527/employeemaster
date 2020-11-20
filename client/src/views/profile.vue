<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
     </v-main>
</template>

<script>
export default {
     data() {
          return {
               breadCrumbsItems: [
                    {text: 'Employee', disabled: false, href: '/profile'},
                    {text: 'Profile', disabled: true, href: '/profile'}
               ]
          }
     }
}
</script>