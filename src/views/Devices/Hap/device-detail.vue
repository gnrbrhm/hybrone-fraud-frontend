<template>
  <div :class="getRouteForClass">
    <DeviceDetailsHeader :premise_information="data"></DeviceDetailsHeader>
    <DeviceDetailsTitle
      @onDownloadSignalsHistory="handleDownloadSignalsHistory"
      @onServiceModal="openModal"
    ></DeviceDetailsTitle>
    <DeviceLastSignals
      v-if="isLastSignals"
      @filterData="handleFilteredData"
    ></DeviceLastSignals>
    <DeviceDetailsContent v-else :data="data"></DeviceDetailsContent>
    <SentinelModal
      @onClose="handleModalClose"
      :drawer="modal_visible"
      :type="'service'"
    ></SentinelModal>
  </div>
</template>

<script>
import SentinelModal from '@/components/modal/sentinel-modal.vue'
import DeviceLastSignals from '@/components/device-details/hap/device-last-signals.vue'
import DeviceDetailsHeader from '@/components/device-details/device-details-header.vue'
import DeviceDetailsTitle from '@/components/device-details/device-details-title.vue'
import DeviceDetailsContent from '@/components/device-details/device-details-content.vue'
import { mapActions } from 'vuex'
export default {
  name: 'DeviceDetail',
  components: {
    DeviceDetailsHeader,
    DeviceDetailsTitle,
    DeviceDetailsContent,
    DeviceLastSignals,
    SentinelModal
  },
  data() {
    return {
      device_id: null,
      data: [],
      premise: {},
      is_last_signals: false,
      filtered_data: {},
      modal_visible: false
    }
  },
  computed: {
    isLastSignals() {
      return this.$route.path.split('/').includes('last-signals')
    },
    getRouteForClass: function () {
      if (!this.$route.path.split('/').includes('last-signals')) {
        return 'details-content'
      } else {
        return 'details-last-signals-content'
      }
    }
  },
  methods: {
    ...mapActions({
      getProsecDeviceById: 'device/getProsecDeviceById',
      getProsecDeviceLastSignals: 'device/getProsecDeviceLastSignals',
      downloadProsecDeviceLastSignals: 'device/downloadProsecDeviceLastSignals'
    }),
    handleModalClose(val) {
      this.modal_visible = val
    },
    openModal(val) {
      this.modal_visible = val
    },
    handleFilteredData(val) {
      this.filtered_data = val
    },
    handleDownloadSignalsHistory() {
      let download_file = this.downloadProsecDeviceLastSignals(
        this.filtered_data
      )
      download_file.then((r) => {
        let currentDate = new Date()
        const url = window.URL.createObjectURL(new Blob([r]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
          'download',
          'Cihaz-Gecmiş-Sinyalleri-' +
            currentDate.getFullYear() +
            ('0' + (currentDate.getMonth() + 1)).slice(-2) +
            ('0' + currentDate.getDate()).slice(-2) +
            ('0' + currentDate.getHours()).slice(-2) +
            ('0' + currentDate.getMinutes()).slice(-2) +
            ('0' + currentDate.getSeconds()).slice(-2) +
            '.xlsx'
        )
        document.body.appendChild(link)
        link.click()
      })
    }
  },
  created() {
    this.device_id = this.$route.params.device_id
    let device = this.getProsecDeviceById(this.device_id)
    device.then((r) => {
      this.data = r
    })
    if (this.isLastSignals) {
      this.getProsecDeviceSignalsHistory({
        device_id: this.device_id
      })
    }
  },
  mounted() {
    // if (this.isLastSignals) {
    //   let device_signals = this.getProsecDeviceLastSignals({
    //     device_id: this.device_id,
    //   });
    //   device_signals.then((r) => {
    //     this.data = r;
    //   });
    // }
  }
}
</script>

<style lang="scss" scoped>
.details-content {
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  padding: 0 36px 0 36px;
  overflow: none;
}
.details-last-signals-content {
  display: flex;
  flex-direction: column;
  // min-height: 100vh !important;

  // justify-content: space-between;
  padding: 0 0 0 13px;
}
.bottom {
  padding: 34px;
  min-height: 25px;
  background: rgba(160, 160, 160, 0.1);
}
</style>
