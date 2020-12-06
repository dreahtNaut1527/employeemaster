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
               summaryLabel: [],
               summaryData: []
          }
     },
     created() {
          this.loadStatusSection()
     },
     mounted () {
          this.renderChart(this.chartData, this.options)
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
                    this.summaryLabel = Object.keys(res.data[0])
                    this.summaryData = Object.values(res.data[0])
                    this.chartData = {
                         labels: this.summaryLabel,
                         datasets: [
                              {
                                   label: 'Male',
                                   data: this.summaryData,
                                   fill: false,
                                   borderColor: 'primary',
                                   backgroundColor: '#2554FF',
                                   borderWidth: 1
                              }
                         ]
                    }
               })
          }
     }
  }
</script>