<template>
    <v-main>
        <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
        <v-container class="mt-n3">
            <v-card>
                <v-toolbar color="primary" dark>
                    <v-toolbar-title>Search</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" md="3">
                            <v-autocomplete
                                v-model="selectedFilter"
                                :items="filterByItems"
                                label="Filter By"
                                clearable
                                outlined
                                dense
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-select
                                v-model="selectedOperator"
                                :items="operatorItems"
                                label="Operator"
                                return-object
                                clearable
                                outlined
                                dense
                            ></v-select>
                        </v-col>
                        <v-col v-if="showPickerFrom == 0" cols="12" md="3">
                            <v-text-field
                                v-model="searchBy"
                                label="Search"
                                append-icon="mdi-magnify"
                                clearable
                                outlined
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col v-if="showPickerFrom > 0" cols="12" md="3">
                            <datePicker
                                :menu="dateDialog"
                                dateLabel="From"
                                :dateValue.sync="dateFilterItems[0]"
                            ></datePicker>
                        </v-col>
                        <v-col v-if="showPickerTo > 0" cols="12" md="3">
                            <datePicker
                                :menu="dateDialog"
                                dateLabel="To"
                                :dateValue.sync="dateFilterItems[1]"
                            ></datePicker>
                        </v-col>
                        <v-col v-if="userInfo.UserLevel == 9" cols="12" md="4">
                            <v-autocomplete
                                v-model="selectedDepartment"
                                :items="filterDepartments"
                                label="Department"
                                clearable
                                outlined
                                dense
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-autocomplete
                                v-model="selectedSection"
                                :items="filterSection"
                                label="Section"
                                clearable
                                outlined
                                dense
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-autocomplete
                                v-model="selectedTeam"
                                :items="filterTeam"
                                label="Team"
                                clearable
                                outlined
                                dense
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-data-table
                        :headers="headers"
                        :items="filterDataTable"
                        :search="searchData"
                        :page.sync="page"
                        :loading="loading"
                        @page-count="pageCount = $event"
                        :items-per-page="7"
                        loading-text="Loading Data. . .Please Wait"
                        hide-default-footer
                    ></v-data-table>
                    <v-pagination
                        v-model="page"
                        :length="pageCount"
                        :total-visible="10"
                    ></v-pagination>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="clearVariables()" text>Clear</v-btn>
                    <v-btn color="primary" @click="searchDataClick()">
                        <v-icon left>mdi-magnify</v-icon>Search
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </v-main>
</template>

<script>
import datePicker from '@/components/datepicker'

export default {
    data() {
        return {
            loading: false,
            dateDialog: false,
            pageCount: 0,
            page: 1,              
            showPickerFrom: 0, 
            showPickerTo: 0,
            sqlWhereOuput: '',
            selectedTeam: '',
            selectedSection: '',
            selectedDepartment: '',
            searchBy: null,
            selectedFilter: null,
            selectedOperator: null,
            resultQuery: [],
            operatorItems: [],
            dateFilterItems: [
                this.moment().startOf('month').format('YYYY-MM-DD'),
                this.moment().endOf('month').format('YYYY-MM-DD')
            ],
            breadCrumbsItems: [ 
                {text: 'Main Data', disabled: false, href: '#'},
                {text: 'Query Builder', disabled: true, href: '#'}
            ],
            headers:[
                {text: 'Code', value: 'EmployeeCode'},
                {text: 'LastName', value: 'LastName'},
                {text: 'FirstName', value: 'FirstName'},
                {text: 'MiddleName', value: 'MiddleName'},
                {text: 'Department', value: 'DepartmentName'},
                {text: 'Section', value: 'SectionName'},
                {text: 'Team', value: 'TeamName'}
                
            ],
            filterByItems: [
                {text: 'Employee Code', value: 'EmployeeCode'},
                {text: 'Last Name', value: 'LastName'},
                {text: 'First Name', value: 'FirstName'},
                {text: 'Middle Name', value: 'MiddleName'},
                {text: 'Nick Name', value: 'NickName'},
                {text: 'Present Address', value: 'PresentAddress'},
                {text: 'Birthday', value: 'DateBirth'},
                {text: 'Hired Date', value: 'ContractHiredDate'},
                {text: 'Resigned Date', value: 'RetiredDate'},
                {text: 'Transferred Date', value: 'TransferredDate'}
            ]
        }
    },
    created() {

    },
    computed: {
        filterDataTable() {
            return this.resultQuery.filter(rec => {
                return (
                    rec.DepartmentName.includes(this.selectedDepartment || '') &&
                    rec.SectionName.includes(this.selectedSection || '') &&
                    rec.TeamName.includes(this.selectedTeam || '')                         
                )
            })
        },
        filterDepartments() {
            return this.resultQuery.map(rec => {
                return rec.DepartmentName
            }).sort()
        },
        filterSection() {
            return this.resultQuery.map(rec => {
                return rec.SectionName
            }).sort()
        },
        filterTeam() {
            return this.filterDataTable.map(rec => {
                return rec.TeamName
            }).sort()
        }
    },
    methods: {
        searchDataClick() {
            this.loading = true
            let searchVal = this.searchBy
            let filter = this.selectedFilter
            let operator = this.selectedOperator.value
            let operatorName = this.selectedOperator.text
            let dateFrom = this.dateFilterItems[0]
            let dateTo = this.dateFilterItems[1]

            switch (operator) {
                case '%':
                    this.sqlWhereOuput = `${this.filterSearchQuery()} AND ${filter} ${operatorName} #${operator}${searchVal}${operator}#`
                    break;
                case 'BETWEEN':
                    this.sqlWhereOuput = `${this.filterSearchQuery()} AND ${filter} ${operator} #${dateFrom}# AND #${dateTo}#`
                    break;
                default:
                    this.sqlWhereOuput = `${this.filterSearchQuery()} AND ${filter} ${operator} #${searchVal == null ? dateFrom : searchVal}#`
                    break;
            }
            
            // call procedure
            let body = {
                procedureName: 'ProcQueryData',
                values: [
                    this.userInfo.CompanyCode,
                    this.sqlWhereOuput,
                    this.selectedFilter == 'TransferredDate' ? 1 : 0
                ]
            }

            this.axios.post(`${this.api}/executeselect`, {data: JSON.stringify(body)}).then(res => {
                this.loading = false
                if(Array.isArray(res.data)) {
                    this.resultQuery = res.data
                } else {
                    this.resultQuery = []
                }
                // this.clearVariables()
            })
        },
        filterSearchQuery() {
            let query = ''
            let department = this.userInfo.DepartmentName
            let section = this.userInfo.SectionName
            let team = this.userInfo.TeamName

            switch (this.userInfo.UserLevel) {
                case 1: // DH
                case 4: // QA Staff
                    query = ` AND lower(DepartmentName) = lower(#${department}#)`
                    break;
                case 2: // Section Head
                    query = ` AND lower(DepartmentName) = lower(#${department}#)
                                AND lower(SectionName) = lower(#${section}#)`
                    break;
                case 3: // Team Head
                    query = ` AND lower(DepartmentName) = lower(#${department}#)
                                AND lower(SectionName) = lower(#${section}#)
                                AND lower(TeamName) = lower(#${team}#)`
                    break;
                default: // Developer
                    query = ''
                    break;
            }
            return query
        },
        clearVariables() {
            this.showPickerFrom = 0
            this.showPickerTo = 0
            this.selectedTeam = ''
            this.selectedSection = ''
            this.selectedDepartment = ''
            this.searchBy = null
            this.sqlWhereOuput = null
            this.selectedFilter = null
            this.selectedOperator = null
            this.resultQuery = []
        }
    },
    watch: {
        selectedFilter(val) {
            switch (val) {
                case 'DateBirth':
                case 'ContractHiredDate':
                case 'RetiredDate':
                case 'TransferredDate':
                    this.showPickerFrom = 1
                    this.operatorItems = [
                        {text: 'equals to', value: '='},
                        {text: 'greater than', value: '>'},
                        {text: 'less than', value: '<'},
                        {text: 'greater than or equals to', value: '>='},
                        {text: 'less than or equals to', value: '<='},
                        {text: 'not equals to', value: '<>'},
                        {text: 'between', value: 'BETWEEN'}
                    ]
                    break;
                default:
                    this.showPickerFrom = 0
                    this.operatorItems = [
                        {text: 'equals to', value: '='},
                        {text: 'like', value: '%'}
                    ]
                    break;
            }
        },
        selectedOperator(val) {
            if(val != undefined) {
                this.showPickerTo = val.value == 'BETWEEN'  ? 1 : 0
            } else {
                this.showPickerTo = 0
            }
        }
    },
    components: {
        datePicker
    }
}
</script>