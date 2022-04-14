<template>
  <div class="container">
    <DataTable
      :data="data"
      @onDownloadEventRecord="handleDownloadEventRecord"
    ></DataTable>
    <DataTablePagination
      @onChangeCurrentPage="handleChangePagination"
      @onChangeSize="handleChangePagination"
      class="bottom"
    ></DataTablePagination>
    <SentinelPopup
      @onclose="handlePopupClose"
      :dialogTableVisible="popupVisible"
      :data="selectedRowData"
    >
    </SentinelPopup>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SentinelPopup from '@/components/popup/sentinel-popup'
import DataTable from '@/components/atomic/data-table.vue'
import DataTablePagination from '@/components/atomic/data-table-pagination.vue'
import moment from 'moment'
import { bus } from '@/main'
// import DeviceDetailsLastSignalsFilter from '@/components/device-details/hap/details-last-signals-filter.vue'

export default {
  name: 'StoreCaseAction',
  components: {
    DataTable,
    DataTablePagination,
    SentinelPopup
    // DeviceDetailsLastSignalsFilter
  },
  data() {
    return {
      data: [],
      device_id: this.$route.params.device_id,
      filtered_data: {},
      selected_events: '',
      downloadEventRecordConfirmDialog: false,
      record_download_request: false,
      again_request: true,
      channels_normal_status: {
        has_sabotage: false,
        has_scene_change: false,
        has_video_loss: false,
        motion_detect: false,
        is_active: true,
        is_record: true
      },
      popupVisible: false,
      selectedRowData: {}
    }
  },
  computed: {
    ...mapGetters({
      getCurrentPage: 'pagination/getCurrentPage',
      getCurrentLimit: 'pagination/getCurrentLimit',
      getDevice: 'device/getDevice'
    })
  },
  methods: {
    ...mapActions({
      getFraudRegisterActivity: 'shopies/getFraudRegisterActivity',
      getProsecDeviceLastSignals: 'device/getProsecDeviceLastSignals',
      getVguardDeviceChannelsEvents: 'device/getVguardDeviceChannelsEvents',
      getVguardDeviceChannelRecord: 'device/getVguardDeviceChannelRecord'
    }),
    handlePopupClose() {
      this.popupVisible = false
    },
    openReceiptPopop(val) {
      console.log('openReceiptPopop Tetiklendi ::::::')
      this.selectedRowData = val
      this.popupVisible = true
    },

    handleDownloadEventRecord(val) {
      this.selected_events = val
      console.log(val)
      this.downloadEventRecordConfirmDialog = true
    },
    handleClose() {
      if (this.record_download_request) {
        this.downloadEventRecordConfirmDialog = false
        this.record_download_request = false
      }
    },
    downloadEventRecord() {
      /**
       * Buraya cihazda gerçekleşen olayın
       * kaydının indirileceği kod gelicek
       */
      console.log('Kontrol', this.again_request)
      if (this.again_request) {
        let start_time = ''
        let finish_time = ''
        if (this.selected_events.state == 'Video Kaybı Algılandı') {
          start_time = moment(this.selected_events.event_date)
            .add(3, 'hours')
            .add(-30, 'seconds')
            ._d.toISOString()
          finish_time = moment(this.selected_events.event_date).add(3, 'hours')
        } else if (this.selected_events.state == 'Video Kaybı Düzeldi') {
          start_time = moment(this.selected_events.event_date).add(3, 'hours')
          finish_time = moment(this.selected_events.event_date)
            .add(3, 'hours')
            .add(30, 'seconds')
            ._d.toISOString()
        } else {
          start_time = moment(this.selected_events.event_date)
            .add(3, 'hours')
            .add(-61, 'seconds')
            ._d.toISOString()
          finish_time = moment(this.selected_events.event_date)
            .add(3, 'hours')
            .add(29, 'seconds')
            ._d.toISOString()
        }
        console.log('FinishTime', finish_time)
        console.log('StartTime', start_time)
        let video = this.getVguardDeviceChannelRecord({
          channel_id: this.selected_events.channel_id,
          device_id: parseInt(this.$route.params.device_id),
          // channel_id: 1,
          // device_id: 36,
          start_time: start_time,
          end_time: finish_time
        })
        this.again_request = false
        video.then((r) => {
          if (r.status == 200) {
            let currentDate = new Date()
            const url = window.URL.createObjectURL(new Blob([r.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute(
              'download',
              this.getDevice.premise.custom_premise_id +
                '-CH-' +
                this.selected_channel +
                '-' +
                currentDate.getFullYear() +
                ('0' + (currentDate.getMonth() + 1)).slice(-2) +
                ('0' + currentDate.getDate()).slice(-2) +
                ('0' + currentDate.getHours()).slice(-2) +
                ('0' + currentDate.getMinutes()).slice(-2) +
                ('0' + currentDate.getSeconds()).slice(-2) +
                '.avi'
            )
            document.body.appendChild(link)
            link.click()
            this.downloadEventRecordConfirmDialog = false
            this.record_download_request = true
          } else {
            //   this.downloadEventRecordConfirmDialog = false
            this.record_download_request = true
          }
          setTimeout(() => {
            this.again_request = true
          }, 2000)
        })
      }
    },
    handleChangePagination() {
      this.data = []
      this.filtered_data.page = this.getCurrentPage
      this.filtered_data.limit = this.getCurrentLimit
      console.log('FilterData', this.filtered_data)
      this.getVguardDeviceChannelsEventsHistory({
        ...this.filtered_data
      })
    },
    handleFilteredData(payload) {
      this.data = []
      this.filtered_data = { page: 1, limit: 20, ...payload }
      this.$emit('filterData', this.filtered_data)
      //   console.log("filterData", this.filtered_data);
      this.getProsecDeviceSignalsHistory(payload)
    },
    getProsecDeviceSignalsHistory(payload) {
      let device_signals = this.getProsecDeviceLastSignals({
        device_id: this.device_id,
        ...payload
      })
      device_signals.then((r) => {
        console.log('Last Signals', r)
        this.data = r
      })
    },

    getVguardDeviceChannelsEventsHistory(payload) {
      let device_signals = this.getVguardDeviceChannelsEvents({
        device_id: this.device_id,
        ...payload
      })
      let events_data = []

      device_signals.then((r) => {
        console.log('Events R', r)
        if (r !== null)
          r.forEach((item) => {
            //    if (r.length - 1 > index) {}
            events_data.push({
              ...item,
              state: this.getDifferenceObject(item)
            })
          })
        console.log('Events', events_data)
        this.data = events_data.length > 0 ? events_data : []
      })
    },
    getDifferenceObject(obj1) {
      let result = ''
      Object.keys(obj1).forEach((item1) => {
        if (
          item1 != 'channel_id' &&
          item1 != 'created_at' &&
          item1 != 'updated_at' &&
          item1 != 'event_id' &&
          item1 != 'device_id' &&
          item1 != 'event_date' &&
          item1 != 'id' &&
          item1 != 'is_active' &&
          item1 != 'is_record' &&
          item1 != 'vguard_device' &&
          obj1[item1] != null
        ) {
          console.log(item1 + obj1[item1])
          switch (item1) {
            case 'has_sabotage':
              result = obj1[item1]
                ? 'Video Sabotaj Algılandı'
                : 'Video Sabotaj Düzeldi'
              break
            case 'has_scene_change':
              result = obj1[item1]
                ? 'Video Sahne Değişimi Algılandı'
                : 'Video Sahne Değişimi Düzeldi'
              break
            case 'has_video_loss':
              result = obj1[item1]
                ? 'Video Kaybı Algılandı'
                : 'Video Kaybı Düzeldi'
              break
            case 'motion_detect':
              result = obj1[item1]
                ? 'Hareket Algılama Algılandı'
                : 'Hareket Algılama Düzeldi'
              break

            default:
              break
          }
        }
      })
      return result
    }
  },
  created() {
    let register = this.getFraudRegisterActivity({
      offset: 0,
      limit: 1,
      where: {},
      include: ['cashier', 'store']
    })
    console.log(register)
    register.then((r) => {
      console.log('Store Case Action', r)
      this.data = r.data
    })
    //   this.device_id = this.$route.params.device_id;
  },
  mounted() {
    // console.log("mounted last signals");
    bus.$on('onFilteredEventsData', (val) =>
      this.getVguardDeviceChannelsEventsHistory(val)
    )
    bus.$on('storeOpenModal', (val) => this.openReceiptPopop(val))
    this.getVguardDeviceChannelsEventsHistory()
  },
  destroyed() {
    bus.$off('onFilteredEventsData')
    bus.$off('storeOpenModal')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.container {
  justify-content: space-between !important;
  height: 75vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  // padding: 0px 0px 0px 13px;
  .bottom {
    position: relative;
    padding: 34px;
    min-height: 25px;
    background: rgba(160, 160, 160, 0.1);
  }
}
.create-user-dialog-content {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  max-width: 376px;
  .apply-button {
    background: $hybrone_light_blue;
    box-shadow: 0px 2px 4px rgba(91, 134, 245, 0.05);
    border-radius: 4px;
    width: 120px;
    display: flex;
    height: 39px;
    align-items: center;
    justify-content: center;
    span {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      text-align: center;

      /* White */

      color: #ffffff;
    }
  }
  .span-title {
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 25px;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-content: center;
    min-width: 276px;
    span {
      display: flex;
      justify-content: flex-start;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      font-feature-settings: 'zero' on;
      margin-bottom: 4px;

      /* Gray Dark */

      color: #444444;
    }
    input {
      min-width: 100% !important;
    }
    .action-button-group {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .canceled-button {
        width: 120px;
        height: 39px;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          text-align: center;

          /* Hybrone Blue */

          color: #2c3357;

          text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
        }
      }
      .apply-button {
        background: $hybrone_light_blue;
        box-shadow: 0px 2px 4px rgba(91, 134, 245, 0.05);
        border-radius: 4px;
        width: 120px;
        display: flex;
        height: 39px;
        align-items: center;
        justify-content: center;
        span {
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          text-align: center;

          /* White */

          color: #ffffff;
        }
      }
    }
  }
}
</style>
