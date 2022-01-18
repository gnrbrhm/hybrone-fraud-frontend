<template>
  <div class="dashboard-content">
    <span class="title">Disk Durumu</span>
    <div class="dashboard-indicator">
      <VueApexCharts
        class="dashboard-card-circle"
        type="donut"
        :options="chartOptions"
        :series="chartOptions.series"
      ></VueApexCharts>
    </div>
    <div class="dashboard-legand">
      <div class="item">
        <span class="title">Durum</span>
        <span class="value">Normal</span>
      </div>
      <div class="item">
        <span class="title">Toplam Kapasite</span>
        <span class="value">4TB</span>
      </div>
      <div class="item">
        <span class="title">Kullanılan</span> <span class="value">3,42 TB</span>
      </div>
      <div class="item">
        <span class="title">Kalan</span> <span class="value">0,36 TB</span>
      </div>
    </div>
  </div>
</template>

<script>
// import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'DetailsDiskState',
  data() {
    return {
      indicators: {}
    }
  },
  props: {
    title: {
      default: '',
      type: String
    },
    hash_data: Object
  },
  //   components: {
  //     VueApexCharts
  //   },
  computed: {
    chartOptions() {
      return {
        colors: [...this.hash_data.colors],
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false,
          dropShadow: false
        },
        labels: [...Object.keys(this.hash_data.series)],

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
                        total += el
                      })
                      return (
                        ((100 / total) * w.globals.seriesTotals[0]).toFixed(2) +
                        '%'
                      )
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
  }
}
</script>

<style lang="scss" scoped>
.dashboard-content {
  display: flex;
  flex-direction: column;

  /* Gray Light */
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0.5px solid #2c3357;
  box-sizing: border-box;
  border-radius: 10px;
  margin-left: 20px;
  width: 290px;
  height: 300px;
  .title {
    font-size: 18px;
    line-height: 21px;
    margin-top: 20px;
    margin-left: 10px;
    display: flex;
    align-items: flex-start;
    /* Gray Dark */

    color: #444444;
  }
  .dashboard-indicator {
    display: flex;
    .dashboard-card-circle {
      margin-left: 0px;
      width: 225px;
    }
  }
  .dashboard-legand {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto);
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-size: 12px;
        line-height: 14px;
        display: flex;
        align-items: center;
        text-align: center;

        /* Gray Dark */

        color: #444444;
      }
      .value {
        font-weight: bold;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;

        /* Gray Dark */

        color: #444444;
      }
    }
  }
}
</style>
