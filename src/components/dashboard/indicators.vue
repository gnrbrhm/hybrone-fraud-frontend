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
import { bus } from '@/main.js'

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
  methods: {
    getDashboardData(val) {
      this.indicators = { ...DASHBOARD_VARIABLES['CAMERA'] }
      let dashboard_data = this.$api({
        ...endpoints.getVguardDashboardData,
        params: { refresh: val != undefined ? val : true }
      }).then((r) => {
        this.indicators[0].state.series.total.value =
          r.data.data.report.total_device_count
        this.indicators[0].state.series.online.value =
          r.data.data.report.online_count
        this.indicators[0].state.series.offline.value =
          r.data.data.report.offline_count
        this.indicators[1].state.series.normal_record.value =
          r.data.data.report.recording_count
        this.indicators[1].state.series.alarm.value =
          r.data.data.report.not_recording_count
        this.indicators[2].state.series.total.value =
          r.data.data.report.total_disk_count
        this.indicators[2].state.series.normal_disk.value =
          r.data.data.report.normal_disk_count
        this.indicators[2].state.series.fault.value =
          r.data.data.report.faulty_disk_count
        this.indicators[3].state.series.total.value =
          r.data.data.report.total_channel_count
        this.indicators[3].state.series.active.value =
          r.data.data.report.active_channel_count
        this.indicators[3].state.series.pasif.value =
          r.data.data.report.passive_channel_count
        this.indicators[4].state.series.normal_analysis.value =
          r.data.data.report.normal_video_count
        this.indicators[4].state.series.video_loss.value =
          r.data.data.report.video_loss_count
        this.indicators[4].state.series.other_state.value =
          r.data.data.report.other_status_count
        this.indicators[5].state.series.motion_detect.value =
          r.data.data.report.motion_detect_count
        this.indicators[5].state.series.sabotage.value =
          r.data.data.report.sabotage_count
        this.indicators[5].state.series.scene_change.value =
          r.data.data.report.scene_change_count
      })
      console.log(dashboard_data)
    }
  },
  created() {
    this.getDashboardData()
  },
  mounted() {
    bus.$on('onDashboardDataRefresh', (val) => this.getDashboardData(val))
  },
  destroyed() {
    bus.$on('onDashboardDataRefresh')
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
