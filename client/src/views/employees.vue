<template>
     <v-main>
          <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
          <v-container>
               <v-row align="left" justify="left" dense>
                    <v-col cols="12" md="3">
                         <v-autocomplete
                              v-model="Company"
                              label="Company"
                              outlined
                              dense
                         ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="3">
                         <v-autocomplete
                              v-model="Department"
                              label="Department"
                              outlined
                              dense
                         ></v-autocomplete>
                    </v-col>
                     <v-col cols="12" md="3">
                         <v-autocomplete
                              v-model="Section"
                              label="Section"
                              outlined
                              dense
                         ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="3">
                         <v-autocomplete
                              v-model="Team"
                              label="Team"
                              outlined
                              dense
                         ></v-autocomplete>
                         
                    </v-col>
                    <v-col cols="12" md="3">
                         <v-text-field
                              v-model="Code"
                              label="Code"
                              outlined
                              dense
                         ></v-text-field>
                         
                    </v-col>
                     <v-col cols="12" md="3">
                         <v-text-field
                              v-model="LastName"
                              label="LastName"
                              outlined
                              dense
                         ></v-text-field>
                         
                    </v-col>
                     <v-col cols="12" md="3">
                         <v-text-field
                              v-model="FirstName"
                              label="FirstName"
                              outlined
                              dense
                         ></v-text-field>
                         
                    </v-col>
               </v-row>
               <v-data-table :headers="headers">

               </v-data-table>
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
                    {text: 'Employees', disabled: true, href: '/employees'}
               ],
               headers:[
                    {text: 'Code', value: 'EMPLCODE'},
                    {text: 'LastName', value: 'LName'},
                    {text: 'FirstName', value: 'FName'},
                    {text: 'MiddleName', value: 'MName'},
                    {text: 'NickName', value: 'NName'},
                    {text: 'Department', value: 'DEPTDESC'},
                    {text: 'Section', value: 'SECTIONDESC'},
                    {text: 'Team', value: 'TEAMDESC'},
                    {text: 'Actions', value: 'actions'},
                  
               ]
          }

     }
}
</script>