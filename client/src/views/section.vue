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
                    {text: 'Main Data', disabled: false, href: '/section'},
                    {text: 'Sections', disabled: true, href: '/section'}
               ]
          }
     }
}
</script>