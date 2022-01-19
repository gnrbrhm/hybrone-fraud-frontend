<template>
  <div :class="getRouteForClass">
    <span
      v-if="!['DeviceLastSignals'].includes(this.$route.name)"
      class="device-name"
      >{{ getDevice.premise.custom_premise_name }}</span
    >
    <DeviceDetailsLastSignalsFilter
      v-else
      @onFilteredData="handleFilteredData"
    ></DeviceDetailsLastSignalsFilter>
    <DetailsActions
      @downloadSignalsHistory="handleDownloadSignalsHistory"
      @openServiceModal="handleServiceModal"
    ></DetailsActions>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DetailsActions from '@/components/device-details/hap/details-actions'
import DeviceDetailsLastSignalsFilter from '@/components/device-details/hap/details-last-signals-filter.vue'

export default {
  name: 'DeviceDetailsTitle',
  components: {
    DetailsActions,
    DeviceDetailsLastSignalsFilter
  },
  computed: {
    ...mapGetters({
      getDevice: 'device/getDevice'
    }),
    getRouteForClass: function () {
      if (!this.$route.path.split('/').includes('last-signals')) {
        return 'details-title'
      } else {
        return 'details-title'

        // return 'details-title__last-signals'
      }
    }
  },
  methods: {
    handleDownloadSignalsHistory() {
      this.$emit('onDownloadSignalsHistory')
    },
    handleServiceModal() {
      this.$emit('onServiceModal', true)
    }
  },
  mounted() {
    console.log('DEVICE', this.getDevice)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.details-title {
  display: flex;
  justify-content: space-between;
  padding: 10px 0px 0 6px;
  min-width: 100%;

  .device-name {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 42px;
    display: flex;
    align-items: center;
  }
  &__last-signals {
    display: flex;
    justify-content: space-between;
    padding-top: 17px !important;
    padding: 0 36px 0 29px;
    background-color: $hybrone_header_background_color;

    .device-name {
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
    }
  }
}
.active-background {
  background-color: $hybrone_header_background_color;
}
</style>
