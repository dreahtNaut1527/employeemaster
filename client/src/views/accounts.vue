<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-container>
               <!-- Your Code Here -->
          </v-container>
     </v-main>
</template>

<script>
export default {
     data() {
          return {
               breadCrumbsItems: [
                    {text: 'Maintenance', disabled: false, href: '/accounts'},
                    {text: 'User Accounts', disabled: true, href: '/accounts'}
               ]
          }
     }
}
</script>