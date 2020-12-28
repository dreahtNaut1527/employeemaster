<script>
import { Bar } from 'vue-chartjs'

export default {
     extends: Bar,
     // props: ['chartLabels', 'chartDatas', 'chartText'],
     data () {
          return {
               chartData: {},
               options: {
                    scales: {
                         yAxes: [{
                         ticks: {
                              beginAtZero: true
                         },
                         gridLines: {
                              display: true
                         }
                         }],
                         xAxes: [ {
                              gridLines: {
                                   display: false
                              }
                         }]
                    },
                    legend: {
                         display: true
                    },
                    responsive: true,
                    maintainAspectRatio: false
               },
               summaryRecords: [],
               summaryLabel: [],
               summaryData: []
          }
     },
     created() {
          this.loadStatusSection()
     },
     methods: {
          loadStatusSection() {
               let body = {
                    procedureName: 'ProcStatusSectionSummary',
                    values: [
                         this.userInfo.CompanyCode,
                         this.userInfo.DepartmentCode
                    ]
               }
               this.axios.post(`${this.api}/executeselect`, {data: JSON.stringify(body)}).then(res => {
                    this.summaryRecords = res.data
                    this.summaryLabel = Object.keys(this.summaryRecords[1])
                    this.chartData = {
                         labels: this.summaryLabel.slice(1),
                         datasets: [
                              {
                                   label: 'Casual',
                                   data: Object.values(this.summaryRecords[0]).slice(1),
                                   fill: false,
                                   borderColor: '#1976d2',
                                   backgroundColor: '#1976d2',
                                   borderWidth: 1
                              },
                              {
                                   label: 'Regular',
                                   data: Object.values(this.summaryRecords[1]).slice(1),
                                   fill: false,
                                   borderColor: '#4caf50',
                                   backgroundColor: '#4caf50',
                                   borderWidth: 1
                              }
                         ]
                    }
                    this.renderChart(this.chartData, this.options)
               }).catch(err => {
                    if(err) {
                         this.$router.push('*')
                    }
               })
          }
     }
  }
</script>