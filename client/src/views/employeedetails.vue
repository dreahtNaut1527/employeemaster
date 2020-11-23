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
                    {text: 'Main Data', disabled: false, href: '/employees'},
                    {text: 'Employees', disabled: false, href: '/employees'},
                    {text: 'Details', disabled: true, href: '/employees'}
               ]
          }
     }
}
</script>