<template>
    <v-main>
        <v-breadcrumbs :items="breadCrumbsItems" divider="/"></v-breadcrumbs>
        <v-lazy transition="scroll-y-transition" :options="{ threshold: 0.8 }">
            <v-container class="mt-n3" fluid>
                <v-card>
                    <v-toolbar :color="themeColor == '' ? 'primary' : themeColor" dark>
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
                                        :color="themeColor == '' ? 'primary' : themeColor"
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
                                        :color="themeColor == '' ? 'primary' : themeColor"
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
                                        :color="themeColor == '' ? 'primary' : themeColor"
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
                                    <v-container fluid>
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
                                                        <v-card class="dragItem" outlined>
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
                                    <v-container fluid>
                                        <v-toolbar flat>
                                            <v-toolbar-title>Arrange Fields</v-toolbar-title>
                                        </v-toolbar>
                                        <v-list class="listFields" v-bind:class="[selectedHeaders.length == 0 ? 'listImage' : '']" two-line dense>
                                            <draggable v-model="selectedHeaders" v-bind="dragOptions" :move="onMove">
                                                <v-list-item v-for="(item, i) in selectedHeaders" :key="i">
                                                    <v-list-item-content>
                                                        <v-card class="dragItem" outlined>
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
                        <v-btn :color="themeColor == '' ? 'primary' : themeColor" @click="searchDataClick()" dark>
                            <v-icon left>mdi-play</v-icon>Run Query
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-lazy>
        <v-dialog v-model="displayDialog" persistent>
            <v-card>
                <v-toolbar :color="themeColor == '' ? 'primary' : themeColor" flat dark>
                    <v-toolbar-title>Results</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="displayDialog = !displayDialog" icon><v-icon>mdi-close</v-icon></v-btn>
                </v-toolbar>
                <v-tabs v-model="tab" :color="themeColor == '' ? 'primary' : themeColor" centered icons-and-text grow>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab v-for="(item, i) in tabHeaders" :key="i" :href="`#${item.value}`">
                        {{item.text}}<v-icon>{{item.icon}}</v-icon>
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <!-- Begin Tab 1 -->
                    <v-tab-item value="tab-1">
                        <v-container fluid>
                            <v-row dense>
                                <v-col v-if="userInfo.UserLevel == 9" cols="12" md="3">
                                    <v-autocomplete
                                        v-model="selectedDepartment"
                                        :items="filterDepartments"
                                        :color="themeColor == '' ? 'primary' : themeColor"
                                        label="Department"
                                        hide-details
                                        clearable
                                        outlined
                                        dense
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-autocomplete
                                        v-model="selectedSection"
                                        :items="filterSection"
                                        :color="themeColor == '' ? 'primary' : themeColor"
                                        label="Section"
                                        hide-details
                                        clearable
                                        outlined
                                        dense
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-autocomplete
                                        v-model="selectedTeam"
                                        :items="filterTeam"
                                        :color="themeColor == '' ? 'primary' : themeColor"
                                        label="Team"
                                        hide-details
                                        clearable
                                        outlined
                                        dense
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field
                                        v-model="searchVal"
                                        :color="themeColor == '' ? 'primary' : themeColor"
                                        label="Search"
                                        append-icon="mdi-magnify"
                                        hide-details
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
                            dense
                        >
                        
                            <v-progress-linear v-show="loading" slot="progress" :color="themeColor == '' ? 'primary' : themeColor" indeterminate></v-progress-linear>
                        </v-data-table>
                        <v-pagination
                            v-model="page"
                            :length="pageCount"
                            :total-visible="10"
                            :color="themeColor == '' ? 'primary' : themeColor"
                        ></v-pagination>
                    </v-tab-item>
                    <!-- End of Tab 1 -->
                    <v-tab-item value="tab-2">
                        summary
                    </v-tab-item>
                </v-tabs-items>
                <v-card-actions>
                    <v-card-text class="caption">Total Record(s): {{filterDataTable.length}}</v-card-text>
                    <v-spacer></v-spacer>
                    <v-btn @click="printPreview()" :color="themeColor == '' ? 'primary' : themeColor" dark>
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
            tab: null,
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
            tabHeaders: [
                {text: 'Lists', icon: 'mdi-format-list-bulleted', value: 'tab-1'},
                {text: 'Summary', icon: 'mdi-poll-box-outline', value: 'tab-2'}
            ],
            filterByItems: [
                {text: 'Employee Code', value: 'EmployeeCode'},
                {text: 'Last Name', value: 'LastName'},
                {text: 'First Name', value: 'FirstName'},
                {text: 'Middle Name', value: 'MiddleName'},
                {text: 'Department', value: 'DepartmentName'},
                {text: 'Section', value: 'SectionName'},
                {text: 'Team', value: 'TeamName'},
                {text: 'Gender', value: 'Gender'},
                {text: 'Present Address', value: 'PresentAddress'},
                {text: 'Permanent Address', value: 'PermanentAddress'},
                {text: 'Birthday', value: 'DateBirth'},
                {text: 'Hired Date', value: 'ContractHiredDate'},
                {text: 'Separation Date', value: 'SeparationDate'},
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
            if(this.selectedHeaders.length != 0) {
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
            }
        },
        getTableFields() {
            // call procedure
            let body = {
                procedureName: 'ProcGetFields',
                values: []
            }
            this.axios.post(`${this.api}/executeselect`, {data: JSON.stringify(body)}).then(res => {
                this.headers = []
                if(Array.isArray(res.data)) {
                    let fields = res.data
                    fields.forEach((rec, index) => {
                        this.headers.push({
                            id: index,
                            text: rec.FieldDesc,
                            value: rec.FieldUsed
                        })
                    })
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
            this.printreportpdf(this.selectedHeaders, this.filterDataTable, null)
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
                case 'SeparationDate':
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
     .listFields {
          height: 380px;
          overflow-y: auto;
          overflow-x: hidden;
     }
     .listImage {
        background: url('../assets/box.png') no-repeat center center;
        background-size: 100px 100px;
        opacity: 0.3;
     }
     .dragItem {
         cursor: grab;
     }
     .dragItem:active {
         cursor: grabbing;
     }
</style>