<template>
  <div class="details-camera-channels">
    <span class="title">Kanallar</span>
    <DetailsTable
      @onSnapshotClick="handleOnSnapshotClick"
      @onDownloadRecordClick="handleOnDownloadClick"
      :data="device_channels"
    ></DetailsTable>
    <el-dialog :visible.sync="snaphotDialogVisible" width="500px" top="350px">
      <!-- @close="handleCloseCreateUserDialog" -->
      <div class="create-user-dialog-content">
        <div class="span-title">Seçilen kanalın anlık görüntüsü indirildi.</div>
        <el-button
          class="apply-button"
          @click="() => (this.snaphotDialogVisible = false)"
          ><span>Tamam</span></el-button
        >
      </div>
    </el-dialog>
    <el-dialog :visible.sync="downloadRecordVisible" width="500px">
      <div class="create-user-dialog-content">
        <div class="span-title">
          İndirmek istediğiniz kayıt için zaman aralığı seçiniz.
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="300"
          class="form"
        >
          <span class="label">BAŞLANGIÇ ZAMANI</span>
          <el-form-item prop="start_time">
            <el-date-picker
              width="270"
              v-model="ruleForm.start_time"
              type="datetime"
              placeholder="Başlangıç tarihi seçiniz"
            >
            </el-date-picker>
          </el-form-item>
          <span class="label">BİTİŞ ZAMANI</span>
          <el-form-item prop="finish_time">
            <el-date-picker
              v-model="ruleForm.finish_time"
              type="datetime"
              placeholder="Bitiş tarihi seçiniz"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <div class="action-button-group">
              <el-button
                class="canceled-button"
                @click="() => (this.downloadRecordVisible = false)"
                ><span> Vazgeç</span></el-button
              >
              <el-button
                class="apply-button"
                @click="handleRecordDownload('ruleForm')"
                ><span>İndir</span></el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DetailsTable from '@/components/device-details/hap/details-table.vue'
import { mapGetters, mapActions } from 'vuex'
import { bus } from '@/main.js'
import moment from 'moment'
export default {
  name: 'DetailsCameraChannels',
  components: { DetailsTable },
  data() {
    return {
      data: [],
      ruleForm: {
        start_time: '',
        finish_time: ''
      },
      rules: {
        start_time: [
          {
            type: 'date',
            required: true,
            message: 'Lütfen başlangıç tarhini giriniz',
            trigger: 'change'
          }
        ],
        finish_time: [
          {
            type: 'date',
            required: true,
            message: 'Lütfen bitiş tarihini giriniz',
            trigger: 'change'
          }
        ]
      },
      device_channels: [],
      modal_type: null,
      selectedAction: '',
      modal_visible: false,
      snaphotDialogVisible: false,
      downloadRecordVisible: false,
      selected_channel: null
    }
  },

  props: {
    table_data: {
      default: []
    },
    watch: {
      table_data: function (val) {
        console.log('TableData', val)
      }
    }
  },
  computed: {
    ...mapGetters({
      getDevice: 'device/getDevice'
    })
  },
  methods: {
    ...mapActions({
      getVguardDeviceById: 'device/getVguardDeviceById',
      getVguardDeviceChannelSnapshot: 'device/getVguardDeviceChannelSnapshot',
      getVguardDeviceChannelRecord: 'device/getVguardDeviceChannelRecord',
      refreshVguardDeviceData: 'device/refreshVguardDeviceData'
    }),
    handleRecordDownload(form) {
      let start_time = moment(this.ruleForm.start_time)
        .add(3, 'hours')
        ._d.toISOString()
      let finish_time = moment(this.ruleForm.finish_time)
        .add(3, 'hours')
        ._d.toISOString()
      this.$refs[form].validate((valid) => {
        if (valid) {
          let video = this.getVguardDeviceChannelRecord({
            channel_id: this.selected_channel,
            device_id: parseInt(this.$route.params.device_id),
            start_time: start_time,
            end_time: finish_time
            // channel_id: 1,
            // device_id: 36,
            // end_time: '2022-01-04T19:27:05.000Z',
            // start_time: '2022-01-04T19:26:32.000Z'
          })
          video.then((r) => {
            if (r.status == 200) {
              console.log(r)
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
            }
          })
          console.log(valid)
        }
      })
    },
    handleOnSnapshotClick(val) {
      console.log('DEvice', this.getDevice.premise.custom_premise_id)
      let image = this.getVguardDeviceChannelSnapshot({
        device_id: parseInt(this.$route.params.device_id),
        channel_id: val
      })
      image.then((r) => {
        let currentDate = new Date()
        const url = window.URL.createObjectURL(new Blob([r.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
          'download',
          this.getDevice.premise.custom_premise_id +
            '-CH-' +
            val +
            '-' +
            currentDate.getFullYear() +
            ('0' + (currentDate.getMonth() + 1)).slice(-2) +
            ('0' + currentDate.getDate()).slice(-2) +
            ('0' + currentDate.getHours()).slice(-2) +
            ('0' + currentDate.getMinutes()).slice(-2) +
            ('0' + currentDate.getSeconds()).slice(-2) +
            '.jpeg'
        )
        document.body.appendChild(link)
        link.click()
      })
    },
    handleOnDownloadClick(val) {
      this.selected_channel = val
      this.downloadRecordVisible = true
    },
    async getDeviceDetails(device_id) {
      return await this.getVguardDeviceById(device_id)
    },
    getPartionsZones(vguard_device) {
      console.log('GETPartionsZones')
      //   vguard_device.channels.forEach((channel) => {
      //     vguard_device.events.forEach((event) => {
      //       if (channel.channel_id == event.channel_id) {
      //         channels.push({
      //           channel_id: channel.channel_id,
      //           category: channel.category,
      //           ...event
      //         })
      //       }
      //     })
      //   })
      //   let channels = []
      //   vguard_device.channels.forEach((channel) => {
      //     let channels_events = vguard_device.events.filter((event) => {
      //       return event.channel_id == channel.channel_id
      //     })
      //     if (channels_events.length > 0) {
      //       channels.push({
      //         channel_id: channel.channel_id,
      //         category: channel.category,
      //         status: channel.status,
      //         ...channels_events[0]
      //       })
      //     } else {
      //       channels.push({
      //         channel_id: channel.channel_id,
      //         category: channel.category,
      //         status: channel.status
      //         // is_active: false
      //       })
      //     }
      //   })

      //   this.device_channels = channels
      this.device_channels = vguard_device.channels
      console.log('Channels', vguard_device.channels)
      //   this.device_channels = vguard_device.events

      //   console.log('ProsecDevice', vguard_device)
      //   vguard_device.events.forEach((channel) => {
      //     console.log('Partion', channel)
      //     let partion_name = channel.name
      //     channel.zones.forEach((zone) => {
      //       zone = { ...zone, channel_name: partion_name }
      //       this.device_channels.push(zone)
      //     })
      //   })
      //   this.device_channels = this.device_channels.sort((a, b) => {
      //     return a.id.localeCompare(b.id)
      //   })
      //   console.log('Zone Array', this.device_channels)
    },
    async refreshDeviceAndData() {
      let refresh = await this.refreshVguardDeviceData({
        device_id: [parseInt(this.$route.params.device_id)]
      })
      console.log('Refresh Device Details', refresh)
      if (refresh.status == 200) {
        let vguard_device = await this.getDeviceDetails(
          this.$route.params.device_id
        )
        console.log('vguard_device', vguard_device)
        this.getPartionsZones(vguard_device)
      }
      //   refresh.then((r) => {
      //     if (r.status == 200) {
      //       this.getDeviceDetails(this.$route.params.device_id)
      //     }
      //   })
    }
  },
  mounted() {
    // bus.$on('onSubmitService', (val) => {
    //   this.handleServiceSubmit(val)
    // })
    bus.$on('onRefreshDeviceData', this.refreshDeviceAndData)
    let vguard_device = this.getDeviceDetails(this.$route.params.device_id)
    vguard_device.then((r) => {
      this.getPartionsZones(r)
    })
  },
  destroyed() {
    bus.$off('onRefreshDeviceData')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.details-camera-channels {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-basis: auto;
  min-width: 80%;
  min-height: 425px;
  // min-height: calc(100% * 405px / 1680px);
  border: 0.5px solid #2c3357;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  .title {
    display: flex;
    align-self: flex-start !important;
    margin-top: 24px;
    margin-left: 24px;
    align-self: end;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    color: #444444;
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
