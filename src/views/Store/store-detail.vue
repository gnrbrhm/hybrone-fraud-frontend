<template>
  <div :class="getRouteForClass">
    <DeviceDetailsHeader
      :premise_information="data"
      @openServiceModal="openModal"
    ></DeviceDetailsHeader>

    <StoreCaseAction @filterData="handleFilteredData"></StoreCaseAction>
  </div>
</template>

<script>
import StoreCaseAction from '@/components/device-details/fraud/store-case-action.vue'
import DeviceDetailsHeader from '@/components/device-details/device-details-header.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'StoreDetail',
  components: {
    DeviceDetailsHeader,
    StoreCaseAction
  },
  data() {
    return {
      device_id: null,
      data: {},
      premise: {},
      is_last_signals: false,
      filtered_data: {},
      modal_visible: false
    }
  },
  computed: {
    ...mapGetters({
      getSelectedRow: 'dataTable/getSelectedRow'
    }),
    isLastSignals() {
      return this.$route.path.split('/').includes('last-signals')
    },
    getRouteForClass: function () {
      if (!['StoreDetail'].includes(this.$route.name)) {
        return 'details-content'
      } else {
        return 'details-last-signals-content'
      }
    }
  },
  methods: {
    ...mapActions({
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
    console.log('Store Detail')
    this.device_id = this.$route.params.device_id
    this.data = this.getSelectedRow
    console.log('this.data', this.data)
    // let register = this.getFraudRegisterActivity()
    // register.then((r) => {
    //   console.log(r)
    //   this.data = r.data
    // })

    // if (this.isLastSignals) {
    //   this.getProsecDeviceSignalsHistory({
    //     device_id: this.device_id
    //   })
    // }
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
