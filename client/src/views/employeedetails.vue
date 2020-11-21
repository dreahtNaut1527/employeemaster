<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-containder>
               <!-- Your Code Here -->
          </v-containder>
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