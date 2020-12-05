<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-container>
               <v-card>
                    <v-data-table
                         :items="departments"
                    ></v-data-table>
               </v-card>
          </v-container>
     </v-main>
</template>

<script>
export default {
     data() {
          return {
               departments: [],
               headers: [
                    {text: 'Department', value: 'DepartmentName'},
                    {text: 'Department', value: 'DepartmentName'}
               ],
               breadCrumbsItems: [
                    {text: 'Main Data', disabled: false, href: '/department'},
                    {text: 'Departments', disabled: true, href: '/department'}
               ]
          }
     },
     created() {
          this.loadDepartments()
     },
     methods: {
          loadDepartments() {
               this.axios.get(`${this.api}/api/company/department/${this.userInfo.ShortName}`).then(res => {
                    this.departments = res.data
               })
          },
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