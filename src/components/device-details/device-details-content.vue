<template>
  <div class="device-details-content">
    <div class="content">
      <DetailsIndicators></DetailsIndicators>
    </div>
    <div class="sidebar">
      <DetailsCameraChannels></DetailsCameraChannels>
      <DetailsDiskState></DetailsDiskState>
      <!-- <DetailsArmOperation></DetailsArmOperation>-->
    </div>
  </div>
</template>

<script>
import DetailsCameraChannels from '@/components/device-details/camera/details-channels'
import DetailsDiskState from '@/components/device-details/camera/details-disk-state.vue'
import DetailsIndicators from '@/components/device-details/camera/details-indicators'
// import DetailsArmOperation from '@/components/device-details/hap/details-arm-operation'
export default {
  name: 'DeviceDetailsContent',
  components: {
    DetailsIndicators,
    DetailsCameraChannels,
    DetailsDiskState
    // DetailsArmOperation
  },
  data() {
    return {
      device_zones: []
    }
  },
  mounted() {
    console.log('mounted detail Dashboard')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.device-details-content {
  display: flex;
  flex-direction: column;
  flex-basis: auto;
  min-width: 100%;
  margin-top: 20px;
  .content {
    flex-direction: column;
    // min-width: 942px;
    min-width: 1214px;
    // min-width: 100%;
    margin-right: 37px;
    .bottom-content {
      display: flex;
      flex-direction: row;
    }
  }
  .sidebar {
    width: 100%;
    // height: 100%;
    display: flex;
    flex-direction: row;
    background-color: $hybrone_background_color;
  }
}
</style>
