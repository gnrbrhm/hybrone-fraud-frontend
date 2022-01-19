<template>
  <div class="chart">
    <div class="dashboard-card-title">{{ title }}</div>
    <div class="_content">
      <VueApexCharts
        class="dashboard-card-circle"
        type="donut"
        :options="chartOptions"
        :series="chartOptions.series"
      ></VueApexCharts>

      <div class="legand">
        <div v-for="(key, value, index) in hash_data.series" :key="key">
          <span class="span-text"> {{ key.label }}</span>
          <span class="span-value" :style="{ color: hash_data.colors[index] }">
            {{ key.value }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'DashboardDonutChart',
  components: {
    VueApexCharts
  },
  data() {
    return {
      chart_is_loading: false
    }
  },
  props: {
    title: {
      default: '',
      type: String
    },
    hash_data: Object
  },
  computed: {
    chartOptions() {
      return {
        // colors: [...this.hash_data.colors],
        colors: this.hash_data.colors.filter((item) => {
          return item != '#6FCF97'
        }),
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false,
          dropShadow: false
        },
        // labels: [...Object.keys(this.hash_data.series)],
        labels: this.changeLabelName(this.hash_data.series),

        plotOptions: {
          pie: {
            donut: {
              // size: "25%", // Dilim boyutu belirler
              labels: {
                show: true,
                name: {
                  show: false,
                  fontSize: '22px',
                  fontFamily: 'Roboto,sans-serif',
                  color: '#dfsda',
                  offsetY: -10
                },
                value: {
                  show: true,
                  fontSize: '24px',
                  fontFamily: 'Roboto,sans-serif',
                  fontWeight: 'bold',
                  color: undefined,
                  offsetY: 4,
                  formatter: function (val, w) {
                    let total = null
                    w.globals.seriesTotals.forEach((el) => {
                      total += el
                      console.log('Indicators', el)
                    })
                    return ((100 / total) * val).toFixed(2) + '%'
                  }
                },
                total: {
                  show: true,
                  label: '',
                  color: '#373d3f',
                  formatter: function (w) {
                    if (
                      w.globals.seriesTotals[0] > 0 ||
                      w.globals.seriesTotals[1] > 0
                    ) {
                      let total = null
                      w.globals.seriesTotals.forEach((el) => {
                        console.log('Total', el)

                        total += el
                      })
                      //   return (
                      //     ((100 / total) * w.globals.seriesTotals[0]).toFixed(2) +
                      //     '%'
                      //   )
                      return ((100 / total) * total).toFixed(2) + '%'
                    }
                    // return 100 + '%'
                    // return w.globals.seriesTotals.reduce((a, b) => {
                    //   return a + b
                    // }, 0)
                  }
                }
              }
            }
          }
        },
        series: this.toArray(this.hash_data.series)
      }
    }
  },
  methods: {
    toArray(val) {
      let array = []
      Object.keys(val).forEach((item) => {
        if (val[item].label != 'Toplam' && item != 'total')
          array.push(val[item].value)
      })
      return array
    },
    changeLabelName(label) {
      let array = []
      Object.keys(label).forEach((item) => {
        if (item != 'total')
          switch (item) {
            case 'total':
              array.push('Toplam')
              break
            case 'online':
              array.push('Online')
              break
            case 'offline':
              array.push('Offline')
              break
            case 'normal_record':
              array.push('Kayıt Yapılıyor')
              break
            case 'alarm':
              array.push('Kayıt Yapılmıyor')
              break
            case 'normal_disk':
              array.push('Normal')
              break
            case 'fault':
              array.push('Hatalı')
              break
            case 'active':
              array.push('Aktif')
              break
            case 'pasif':
              array.push('Pasif')
              break
            case 'normal_analysis':
              array.push('Normal')
              break
            case 'video_loss':
              array.push('Video Kaybı')
              break
            case 'other_state':
              array.push('Diğer Durumlar')
              break
            case 'motion_detect':
              array.push('Hareket Algılama')
              break
            case 'sabotage':
              array.push('Sabotaj Algılama')
              break
            case 'scene_change':
              array.push('Sahne Değişimi')
              break

            default:
              break
          }
      })
      return array
    }
  },
  mounted() {
    this.chartOptions
  }
}
</script>

<style lang="scss" scoped>
.chart {
  display: grid;
  grid-template-rows: 1fr 1fr;
  border: 0.5px solid #c3c3c3;
  min-width: 475px;
  max-width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  height: 226px;
  padding: 12px 20px;

  margin-right: 35px;
  margin-bottom: 25px;
  &:nth-child(3n) {
    margin-right: 0px;
  }
  .dashboard-card-title {
    display: flex;
    align-content: flex-start;
    grid-column: 1;
    grid-row: 1;
    width: 191px;
    height: 34px;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    align-items: center;
  }
  ._content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr auto;

    .dashboard-card-circle {
      grid-row: 2;
      grid-column: 1;
      margin-left: 0px;
      width: 225px;
    }
    .legand {
      grid-column: 2/3;
      grid-row: 2;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, 1fr);
      grid-gap: 12px;
      align-items: center;
      .span-text {
        font-family: Roboto, sans-serif;
        font-style: sans-serif;
        font-weight: 200 !important;
        font-size: 14px;
        line-height: 16px;
        display: flex;
        justify-content: left;

        color: #444444;
      }
      .span-value {
        font-family: Roboto, sans-serif;
        font-style: sans-serif;
        font-weight: bold;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        justify-content: left;
        color: #444444;
      }
    }
  }
}
@media screen and (min-width: 1500px) {
  .chart {
    display: grid;
    grid-template-rows: 1fr 1fr;
    border: 0.5px solid #c3c3c3;
    min-width: 475px;
    max-width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    height: 226px;
    padding: 12px 20px;

    margin-right: 35px;
    margin-bottom: 25px;
    &:nth-child(3n) {
      margin-right: 0px;
    }
    .dashboard-card-title {
      display: flex;
      align-content: flex-start;
      grid-column: 1;
      grid-row: 1;
      width: 191px;
      height: 34px;
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 18px;
      line-height: 21px;
      align-items: center;
    }
    ._content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr auto;

      .dashboard-card-circle {
        grid-row: 2;
        grid-column: 1;
        margin-left: 0px;
        width: 225px;
      }
      .legand {
        grid-column: 2/3;
        grid-row: 2;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 12px;
        align-items: center;
        .span-text {
          font-family: Roboto, sans-serif;
          font-style: sans-serif;
          font-weight: 200 !important;
          font-size: 14px;
          line-height: 16px;
          display: flex;
          justify-content: left;

          color: #444444;
        }
        .span-value {
          font-family: Roboto, sans-serif;
          font-style: sans-serif;
          font-weight: bold;
          font-size: 24px;
          line-height: 28px;
          display: flex;
          justify-content: left;
          color: #444444;
        }
      }
    }
  }
}
</style>
