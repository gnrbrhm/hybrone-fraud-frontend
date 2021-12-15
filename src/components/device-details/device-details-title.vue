<template>
  <div :class="getRouteForClass">
    <span class="device-name">{{ getDevice.name }}</span>
    <DetailsActions
      @downloadSignalsHistory="handleDownloadSignalsHistory"
      @openServiceModal="handleServiceModal"
    ></DetailsActions>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DetailsActions from '@/components/device-details/hap/details-actions'
export default {
  name: 'DeviceDetailsTitle',
  components: {
    DetailsActions
  },
  computed: {
    ...mapGetters({
      getDevice: 'device/getDevice'
    }),
    getRouteForClass: function () {
      if (!this.$route.path.split('/').includes('last-signals')) {
        return 'details-title'
      } else {
        return 'details-title__last-signals'
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
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.details-title {
  display: flex;
  justify-content: space-between;
  padding: 10px 0px 0 6px;

  .device-name {
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
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
