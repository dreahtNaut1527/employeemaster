<template>
    <v-main>
        <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
        <v-container class="mt-n3">
            <v-card>
                <v-toolbar color="primary" dark>
                    <v-toolbar-title>Query Builder</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form v-model="valid" ref="form" lazy-validation>
                        <v-row dense>
                            <v-col cols="12" md="3">
                                <v-autocomplete
                                    v-model="selectedFilter"
                                    :items="filterByItems"
                                    :rules="[v => !!v || 'Filter is required']"
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
                                    :rules="[v => !!v || 'Operator is required']"
                                    label="Operator"
                                    return-object
                                    clearable
                                    outlined
                                    dense
                                ></v-select>
                            </v-col>
                            <v-col v-if="showPickerFrom == 0" cols="12" md="6">
                                <v-text-field
                                    v-model="searchBy"
                                    :rules="[v => !!v || 'This field is required']"
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
                        </v-row>
                    </v-form>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-card outlined>
                                <v-container>
                                    <v-toolbar flat>
                                        <v-toolbar-title>Fields to Show</v-toolbar-title>
                                        <!-- <v-spacer></v-spacer>
                                        <v-text-field
                                            v-model="searchFields"
                                            class="mt-7"
                                            label="Search"
                                            append-icon="mdi-magnify"
                                            outlined
                                            dense
                                        ></v-text-field> -->
                                    </v-toolbar>
                                    <v-list class="listFields" two-line dense>
                                        <draggable v-model="headers" v-bind="dragOptions" :move="onMove">
                                            <v-list-item v-for="item in headers" :key="item.id">
                                                <v-list-item-content>
                                                    <v-card outlined>
                                                        <v-card-actions class="ma-0 pa-0">
                                                            <v-card-text>{{item.text}}</v-card-text>
                                                            <v-spacer></v-spacer>
                                                            <v-icon class="mx-3">mdi-resize-bottom-right</v-icon>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </draggable>
                                    </v-list>   
                                </v-container>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-card outlined>
                                <v-container>
                                    <v-toolbar flat>
                                        <v-toolbar-title>Arrange Fields</v-toolbar-title>
                                    </v-toolbar>
                                    <v-list class="listFields" two-line dense>
                                        <draggable v-model="selectedHeaders" v-bind="dragOptions" :move="onMove">
                                            <v-list-item v-for="(item, i) in selectedHeaders" :key="i">
                                                <v-list-item-content>
                                                    <v-card outlined>
                                                        <v-card-actions class="ma-0 pa-0">
                                                            <v-card-text>{{item.text}}</v-card-text>
                                                            <v-spacer></v-spacer>
                                                            <v-btn 
                                                                class="mx-3" 
                                                                @click="removeItem(item)" icon
                                                            >
                                                                <v-icon>mdi-trash-can</v-icon>
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </draggable>
                                    </v-list>   
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="clearVariables()" text>
                        <v-icon left>mdi-close</v-icon>Clear
                    </v-btn>
                    <v-btn color="primary" @click="searchDataClick()">
                        <v-icon left>mdi-play</v-icon>Run Query
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
        <v-dialog v-model="displayDialog" persistent>
            <v-card>
                <v-toolbar color="primary" flat dark>
                    <v-toolbar-title>Results</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="displayDialog = !displayDialog" icon><v-icon>mdi-close</v-icon></v-btn>
                </v-toolbar>
                <v-container>
                    <v-row>
                        <v-col v-if="userInfo.UserLevel == 9" cols="12" md="3">
                            <v-autocomplete
                                v-model="selectedDepartment"
                                :items="filterDepartments"
                                label="Department"
                                clearable
                                outlined
                                dense
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-autocomplete
                                v-model="selectedSection"
                                :items="filterSection"
                                label="Section"
                                clearable
                                outlined
                                dense
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-autocomplete
                                v-model="selectedTeam"
                                :items="filterTeam"
                                label="Team"
                                clearable
                                outlined
                                dense
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field
                                v-model="searchVal"
                                label="Search"
                                append-icon="mdi-magnify"
                                clearable
                                outlined
                                dense
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-divider></v-divider>
                <v-data-table
                    :headers="selectedHeaders"
                    :items="filterDataTable"
                    :search="searchVal"
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
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="printPreview()" color="primary">
                        <v-icon left>mdi-file-find</v-icon>Print Preview
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-main>
</template>

<script>
import draggable from 'vuedraggable'
import datePicker from '@/components/datepicker'

export default {
    data() {
        return {
            valid: true,
            loading: false,
            displayDialog: false,
            dateDialog: false,
            isDragging: false,
            pageCount: 0,
            page: 1,              
            showPickerFrom: 0, 
            showPickerTo: 0,
            searchVal: '',
            searchFields: '',
            sqlWhereOuput: '',
            selectedGender: '',
            selectedTeam: '',
            selectedSection: '',
            selectedDepartment: '',
            searchBy: null,
            selectedFilter: null,
            selectedOperator: null,
            headers: [],
            resultQuery: [],
            operatorItems: [],
            selectedHeaders: [],
            genderItems: [
                {text: 'Male', value: 'M'},
                {text: 'Female', value: 'F'}
            ],
            dateFilterItems: [
                this.moment().startOf('month').format('YYYY-MM-DD'),
                this.moment().endOf('month').format('YYYY-MM-DD')
            ],
            breadCrumbsItems: [ 
                {text: 'Main Data', disabled: false, href: '#'},
                {text: 'Query Builder', disabled: true, href: '#'}
            ],
            filterByItems: [
                {text: 'Employee Code', value: 'EmployeeCode'},
                {text: 'Last Name', value: 'LastName'},
                {text: 'First Name', value: 'FirstName'},
                {text: 'Middle Name', value: 'MiddleName'},
                {text: 'Gender', value: 'Gender'},
                {text: 'Present Address', value: 'PresentAddress'},
                {text: 'Permanent Address', value: 'PermanentAddress'},
                {text: 'Birthday', value: 'DateBirth'},
                {text: 'Hired Date', value: 'ContractHiredDate'},
                {text: 'Resigned Date', value: 'RetiredDate'},
                {text: 'Transferred Date', value: 'TransferredDate'}
            ]
        }
    },
    created() {
        this.getTableFields()
    },
    computed: {
        dragOptions() {
            return {
                animation: 300,
                group: "fields",
                disabled: false,
                ghostClass: "ghost",
                scrollSensitivity: 200,
                forceFallback: true
            }
        },
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
        },
        // filterHeaders() {
        //     return this.headers.filter(rec => {
        //         return rec.text.toLowerCase().includes(this.searchFields.toLowerCase() || '')
        //     })
        // }
    },
    methods: {
        removeItem(val) {
            let index = 0
            index = this.selectedHeaders.findIndex(rec => rec.id == val.id)
            this.selectedHeaders.splice(index, 1)
            this.headers.unshift(val)
        },
        onMove({ relatedContext, draggedContext }) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (
                (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            )
        },
        searchDataClick() {
            if(this.$refs.form.validate()) {
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
                })
                this.displayDialog = true
            }
        },
        getTableFields() {
            // call procedure
            let body = {
                procedureName: 'ProcQueryData',
                values: [
                    this.userInfo.CompanyCode,
                    ` AND EmployeeCode = #${this.userInfo.EmployeeCode}#`,
                    0
                ]
            }
            this.axios.post(`${this.api}/executeselect`, {data: JSON.stringify(body)}).then(res => {
                this.headers = []
                if(Array.isArray(res.data)) {
                    let objectKeys = Object.keys(res.data[0])
                    objectKeys.forEach((rec, index) => {
                        this.headers.push({
                            id: index,
                            text: rec,
                            value: rec
                        })
                    })
                    this.headers.sort()
                } else {
                    this.headers = []
                }
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
        printPreview() {
            this.printreport(this.selectedHeaders, this.filterDataTable)
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
            this.selectedHeaders = []
            this.headers = []
            this.getTableFields()
            this.$refs.form.resetValidation()
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
        draggable,
        datePicker
    }
}
</script>

<style scoped> 
     .listFields{
          height: 380px;
          overflow-y: auto;
          overflow-x: hidden;
     }
</style>