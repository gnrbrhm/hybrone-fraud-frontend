<template>
  <div class="content">
    <DashboardDonutChart
      v-for="indicator in indicators"
      :key="indicator.id"
      :title="indicator.title"
      :hash_data="indicator.state"
    ></DashboardDonutChart>
  </div>
</template>

<script>
import DashboardDonutChart from '@/components/dashboard/donut-chart'
import { DASHBOARD_VARIABLES } from '@/constant'
import endpoints from '@/endpoints'
export default {
  name: 'Indicators',
  data() {
    return {
      indicators: {}
    }
  },
  components: {
    DashboardDonutChart
  },
  created() {
    this.indicators = { ...DASHBOARD_VARIABLES['HAP'] }
    let dashboard_data = this.$api({
      ...endpoints.getDashboardData
    }).then((r) => {
      this.indicators[0].state.series.total.value =
        r.data.data.report.total_device
      this.indicators[0].state.series.online.value = r.data.data.report.online
      this.indicators[0].state.series.offline.value = r.data.data.report.offline
      this.indicators[1].state.series.normal.value = r.data.data.report.normal
      this.indicators[1].state.series.alarm.value = r.data.data.report.alarmed
      this.indicators[2].state.series.arm.value = r.data.data.report.armed
      this.indicators[2].state.series.disarm.value =
        r.data.data.report.dis_armed
      this.indicators[3].state.series.normal.value = r.data.data.report.normal
      this.indicators[3].state.series.low_charge.value =
        r.data.data.report.no_energy
      this.indicators[4].state.series.normal.value =
        r.data.data.report.battery_normal
      this.indicators[4].state.series.low.value = r.data.data.report.battery_low
      this.indicators[5].state.series.normal.value = r.data.data.report.normal
      this.indicators[5].state.series.sabotage.value =
        r.data.data.report.sabotage
      this.indicators[5].state.series.fault.value = r.data.data.report.trouble
    })
    console.log(dashboard_data)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.content {
  max-width: 100%;
  height: 100%;
  background-color: $hybrone_background_color;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-evenly;
  justify-content: space-between;
}
@media screen and (min-width: 1500px) {
  .content {
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(3, auto);
  }
}
</style>
