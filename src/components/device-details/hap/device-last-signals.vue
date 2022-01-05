<template>
  <div class="container">
    <!-- <DeviceDetailsLastSignalsFilter
      @onFilteredData="handleFilteredData"
    ></DeviceDetailsLastSignalsFilter> -->
    <DataTable
      :data="data"
      @onDownloadEventRecord="handleDownloadEventRecord"
    ></DataTable>
    <DataTablePagination
      @onChangeCurrentPage="handleChangePagination"
      @onChangeSize="handleChangePagination"
      class="bottom"
    ></DataTablePagination>
    <el-dialog
      :visible.sync="downloadEventRecordConfirmDialog"
      width="500px"
      top="350px"
    >
      <!-- @close="handleCloseCreateUserDialog" -->
      <div class="create-user-dialog-content">
        <div class="span-title">
          Seçtiğiniz olay zamanının 30 saniye öncesi ve 30 saniye sonrası
          indirilecektir. <br />Onaylıyor musunuz?
        </div>
        <el-form class="form">
          <div class="action-button-group">
            <el-form-item>
              <div class="action-button-group">
                <el-button
                  class="canceled-button"
                  @click="handleCloseCreateUserDialog"
                  ><span> Vazgeç</span></el-button
                >
                <el-button
                  class="apply-button"
                  @click="downloadEventRecord('ruleForm')"
                  ><span>İndir</span></el-button
                >
              </div>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DataTable from '@/components/atomic/data-table.vue'
import DataTablePagination from '@/components/atomic/data-table-pagination.vue'
import moment from 'moment'

// import DeviceDetailsLastSignalsFilter from '@/components/device-details/hap/details-last-signals-filter.vue'

export default {
  name: 'DeviceLastSignals',
  components: {
    DataTable,
    DataTablePagination
    // DeviceDetailsLastSignalsFilter
  },
  data() {
    return {
      data: [],
      device_id: this.$route.params.device_id,
      filtered_data: {},
      selected_events: '',
      downloadEventRecordConfirmDialog: false
    }
  },
  computed: {
    ...mapGetters({
      getCurrentPage: 'pagination/getCurrentPage',
      getCurrentLimit: 'pagination/getCurrentLimit'
    })
  },
  methods: {
    ...mapActions({
      getProsecDeviceLastSignals: 'device/getProsecDeviceLastSignals',
      getVguardDeviceChannelsEvents: 'device/getVguardDeviceChannelsEvents',
      getVguardDeviceChannelRecord: 'device/getVguardDeviceChannelRecord'
    }),
    handleDownloadEventRecord(val) {
      this.selected_events = val
      console.log(val)
      this.downloadEventRecordConfirmDialog = true
    },
    downloadEventRecord() {
      let start_time = moment(this.selected_events.created_at)
        .add(-30, 'seconds')
        ._d.toISOString()
      let finish_time = moment(this.selected_events.created_at)
        .add(3, 'seconds')
        ._d.toISOString()
      let video = this.getVguardDeviceChannelRecord({
        channel_id: this.selected_events.channel_id,
        device_id: parseInt(this.$route.params.device_id),
        start_time: start_time,
        end_time: finish_time
      })
      video.then((r) => {
        if (r.status == 200) {
          let currentDate = new Date()
          const url = window.URL.createObjectURL(new Blob([r]))
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
        }
      })

      // Buraya cihazda gerçekleşen olayın kaydının indirileceği kod gelicek
    },
    handleChangePagination() {
      this.data = []
      this.filtered_data.page = this.getCurrentPage
      this.filtered_data.limit = this.getCurrentLimit
      console.log('FilterData', this.filtered_data)
      this.getProsecDeviceSignalsHistory({
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
      device_signals.then((r) => {
        console.log('Last Signals', r)
        this.data = r
      })
    }
  },
  created() {
    //   this.device_id = this.$route.params.device_id;
  },
  mounted() {
    // console.log("mounted last signals");
    this.getVguardDeviceChannelsEventsHistory()
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
