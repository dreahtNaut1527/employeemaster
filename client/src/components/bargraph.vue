<script>
import { Bar } from 'vue-chartjs'

export default {
     extends: Bar,
     // props: ['chartLabels', 'chartDatas', 'chartText'],
     data () {
          return {
               chartData: {
                    labels: [],
                    datasets: [
                         {
                              label: 'Male',
                              data: [],
                              fill: false,
                              borderColor: 'primary',
                              backgroundColor: '#2554FF',
                              borderWidth: 1
                         }
                    ]
               },
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
               }
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
               this.axios.post(`${this.api}/execute`, {data: JSON.stringify(body)}).then(res => {
                    this.chartData.labels = Object.keys(res.data)
               })
          }
     }
  }
</script>