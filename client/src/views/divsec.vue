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
                    {text: 'Main Data', disabled: false, href: '/divsec'},
                    {text: 'Department - Section', disabled: true, href: '/divsec'}
               ]
          }
     }
}
</script>