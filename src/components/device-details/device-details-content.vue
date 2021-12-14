<template>
  <div class="device-details-content">
    <div class="content">
      <DetailsIndicators></DetailsIndicators>
      <DetailsHapZones></DetailsHapZones>
    </div>
    <div class="sidebar">
      <DetailsArmOperation></DetailsArmOperation>
    </div>
  </div>
</template>

<script>
import DetailsHapZones from "@/components/device-details/hap/details-hap-zones";
import DetailsIndicators from "@/components/device-details/hap/details-indicators";
import DetailsArmOperation from "@/components/device-details/hap/details-arm-operation";
export default {
  name: "DeviceDetailsContent",
  components: {
    DetailsIndicators,
    DetailsHapZones,
    DetailsArmOperation,
  },
  data() {
    return {
      device_zones: [],
    };
  },
  mounted() {
    console.log("mounted detail Dashboard");
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.device-details-content {
  display: flex;
  flex-direction: row;
  flex-basis: auto;
  min-width: 100%;
  margin-top: 20px;
  .content {
    flex-direction: column;
    // min-width: 942px;
    min-width: 1214px;
    margin-right: 37px;
  }
  .sidebar {
    width: 100%;
    // height: 100%;
    flex-direction: column;
    background-color: $hybrone_background_color;
  }
}
</style>
