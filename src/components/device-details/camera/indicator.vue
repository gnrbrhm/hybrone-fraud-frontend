<template>
  <div class="container">
    <div class="indicator">
      <span class="indicator-title">
        {{ 'İletişim' }}
      </span>
      <div class="show-data">
        <div class="svg">
          <SvgIconCommunication
            :status="getDevice.is_active"
          ></SvgIconCommunication>
        </div>
        <div class="value">
          {{ getDevice.is_active ? 'Var' : 'Yok' }}
        </div>
      </div>
    </div>
    <div class="indicator">
      <span class="indicator-title">
        {{ 'Kayıt Durumu' }}
      </span>
      <div class="show-data">
        <div class="svg">
          <SvgIconRecords
            :status="!getDevice.is_active ? 0 : !getDevice.record_error"
          ></SvgIconRecords>
        </div>
        <div class="value">
          {{
            !getDevice.is_active || getDevice.record_error == null
              ? 'Bilgi Alınamadı'
              : !getDevice.record_error
              ? 'Normal'
              : 'Hatalı'
          }}
        </div>
      </div>
    </div>
    <div class="indicator">
      <span class="indicator-title">
        {{ 'Tarih/Saat Durumu' }}
      </span>
      <div class="show-data">
        <div class="svg">
          <SvgIconTime
            :status="!getDevice.is_active ? 0 : getDevice.datetime_error"
          ></SvgIconTime>
        </div>
        <div class="value">
          {{
            !getDevice.is_active || getDevice.datetime_error === 0
              ? 'Bilgi Alınamadı'
              : !getDevice.datetime_error
              ? 'Normal'
              : 'Hatalı'
          }}
        </div>
      </div>
    </div>
    <!-- <div class="indicator">
      <span class="indicator-title">
        {{ "Tarih / Saat" }}
      </span>
      <div class="show-data">
        <div class="svg">
          <SvgIconTime :status="getDevice.time"></SvgIconTime>
        </div>
        <div class="value">
          {{ getDevice.status ? "Var" : "Yok" }}
        </div>
      </div>
    </div> -->
    <div class="indicator">
      <span class="indicator-title">
        {{ 'Son Sinyal' }}
      </span>
      <div class="show-data">
        <div class="svg">
          <SvgIconTime :status="getDevice.last_signals"></SvgIconTime>
        </div>
        <div class="value">
          {{
            getDevice.last_signal.event_date == null ||
            getDevice.last_signal.event_date == '0001-01-01T00:00:00Z'
              ? 'Bilgi Alınamadı'
              : formattedDatetime(getDevice.last_signal.event_date)
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIconCommunication from '@/assets/icons/device-details/hap/svg-icon-communication'
import SvgIconTime from '@/assets/icons/device-details/hap/svg-icon-time'
import SvgIconRecords from '@/assets/icons/device-details/svg-icon-records'

import { dateTimeChange } from '@/utils.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Indicator',
  components: {
    SvgIconCommunication,
    SvgIconTime,
    SvgIconRecords
  },
  data() {
    return {
      formattedData: {}
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters({
      getDevice: 'device/getDevice'
    }),
    getSelectedDevice() {
      return this.$store.state.dataTable.selectedRow
    }
  },
  methods: {
    ...mapActions({
      getVguardDeviceById: 'device/getVguardDeviceById'
    }),
    formattedDatetime(val) {
      return dateTimeChange(val)
    }
  },
  mounted() {
    this.formattedData = this.data[Object.keys(this.data)[0]]
  },
  created() {
    if (Object.keys(this.getDevice).length == 0) {
      this.getVguardDeviceById(this.$route.params.device_id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.container {
  width: 100%;
  display: flex;
  justify-content: space-between !important;
  flex-direction: row;
  .indicator {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 24%;
    height: 100px;
    border: 0.5px solid $hybrone_avatar_background;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 13px 20px;
    .indicator-title {
      align-self: flex-start;
      font-weight: 300;
      font-size: 18px;
      line-height: 21px;
    }
    .show-data {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      .value {
        align-self: flex-end;
        font-weight: bold;
        font-size: 18px;
        line-height: 21px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
