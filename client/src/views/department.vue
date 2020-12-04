<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-container>
               <!-- Your Code Here -->
               <v-btn @click="setNotifications()">Click me</v-btn>
          </v-container>
     </v-main>
</template>

<script>
export default {
     data() {
          return {
               breadCrumbsItems: [
                    {text: 'Main Data', disabled: false, href: '/department'},
                    {text: 'Departments', disabled: true, href: '/department'}
               ]
          }
     },
     methods: {
          setNotifications() {
               let data = {
                    socket: this.$socket.id,
                    title: 'This is title',
                    message: 'This message has a very long text.',
                    isRead: 0
               }
               this.$socket.emit('newNotifications', data)
          }
     }
}
</script>