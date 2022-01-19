<template>
  <div class="dashboard-content">
    <span class="general-title">Disk Durumu</span>
    <div class="dashboard-indicator">
      <!-- v-if="this.getDevice.last_disk_event.capacity !== 0" -->
      <VueApexCharts
        v-if="is_ready"
        class="dashboard-card-circle"
        type="donut"
        :options="chartOptions"
        :series="chartOptions.series"
      ></VueApexCharts>
    </div>
    <div class="dashboard-legand">
      <div class="item">
        <span class="title">Durum</span>
        <span class="value">{{
          this.getDevice.last_disk_event.capacity !== 0
            ? 'Normal'
            : 'Bilgi Alınamadı'
        }}</span>
      </div>
      <div class="item">
        <span class="title">Toplam Kapasite</span>
        <span class="value">{{
          this.getDevice.last_disk_event.capacity + ' GB'
        }}</span>
      </div>
      <div class="item">
        <span class="title">Kullanılan</span>
        <span class="value">{{
          this.getDevice.last_disk_event.used + ' GB'
        }}</span>
      </div>
      <div class="item">
        <span class="title">Kalan</span>
        <span class="value">{{
          this.getDevice.last_disk_event.empty + ' GB'
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { mapGetters } from 'vuex'
export default {
  name: 'DetailsDiskState',
  components: {
    VueApexCharts
  },
  data() {
    return {
      indicators: {},
      is_ready: false,
      hash_data: {
        state: {
          series: {
            used: { label: 'Kullanılan', value: 10 },
            empty: { label: 'Kullanılmayan', value: 10 }
          },
          colors: ['#E04141', '#6FCF97', 'rgba(255,87,93,.77)']
        }
      }
    }
  },
  props: {
    title: {
      default: '',
      type: String
    }
    // hash_data: Object
  },
  computed: {
    ...mapGetters({
      getDevice: 'device/getDevice'
    }),
    chartOptions() {
      return {
        colors: [...this.hash_data.state.colors],
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false,
          dropShadow: false
        },
        labels: [...Object.keys(this.hash_data.state.series)],

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
        series: this.toArray(this.hash_data.state.series)
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
    }
  },
  created() {},
  mounted() {
    this.hash_data.state.series.used.value = this.getDevice.last_disk_event.used
    this.hash_data.state.series.empty.value =
      this.getDevice.last_disk_event.empty
    // this.hash_data.state.series.used.value = 5
    // this.hash_data.state.series.empty.value = 2
    console.log('Chart Option', this.chartOptions)
    this.is_ready = true
    this.$forceUpdate()
  }
}
</script>

<style lang="scss" scoped>
.dashboard-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Gray Light */
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0.5px solid #2c3357;
  box-sizing: border-box;
  border-radius: 10px;
  margin-left: 20px;
  width: 290px;
  min-height: 300px;
  .general-title {
    font-size: 18px;
    line-height: 21px;
    margin-top: 20px;
    margin-left: 10px;
    display: flex;
    align-self: flex-start;
    /* Gray Dark */

    color: #444444;
  }
  .dashboard-indicator {
    justify-content: center;
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
    grid-gap: 20px;
    margin-top: 20px;
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
