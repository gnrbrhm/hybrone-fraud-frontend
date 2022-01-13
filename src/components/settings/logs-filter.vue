<template>
  <div class="header">
    <div class="wrapper">
      <router-link to="/settings">
        <BackArrow></BackArrow>
      </router-link>
      <div class="controls">
        <div class="date-range">
          <span class="label">Zaman Aralığı</span>
          <el-date-picker
            @change="handleChangeDate"
            v-model="date_value"
            class="sentinel-date-time-input"
            type="datetimerange"
            range-separator="-"
            start-placeholder="Başlangıç Tarihi"
            end-placeholder="Bitiş Tarihi"
          >
            <!-- :default-time="['12:00:00', 'new Date()']" -->
            <!-- :default-value="" -->
          </el-date-picker>
        </div>
        <div class="export-report">
          <span class="label">Rapor</span>
          <el-button
            :disabled="!this.getPermissions['user_event_export']"
            class="sentinel-button report-button"
            @click="onDownloadLogsList"
          >
            <SvgIconListRapor></SvgIconListRapor>
          </el-button>
        </div>
      </div>
    </div>

    <span class="premise-title">Kullanıcı İşlem Logları</span>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import BackArrow from '@/components/atomic/back-arrow.vue'
import SvgIconListRapor from '@/assets/icons/services/svg-icon-list-rapor.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'LogsFilter',
  components: {
    BackArrow,
    SvgIconListRapor
  },
  data() {
    return {
      state: '',
      date_value: '',
      start_time: '',
      finish_time: '',
      selected_date: false
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: 'auth/getPermissions'
    })
  },
  methods: {
    ...mapActions({
      getLogListDownload: 'logs/getLogListDownload'
    }),
    handleChangeDate(val) {
      console.log('val')
      console.log(val)
      let date = []
      this.selected_date = true
      this.start_time = moment(val[0]).add(3, 'hours')._d.toISOString()
      date.push(this.start_time)
      this.finish_time = moment(val[1]).add(3, 'hours')._d.toISOString()
      date.push(this.finish_time)
      this.$emit('onHandleFiltre', date)
      // this.start_time = val[0]
      // this.finish_time = val[1]
    },
    onDownloadLogsList() {
      let currentDate = new Date()

      if (this.selected_date) {
        let user_activities = this.getLogListDownload({
          start_time: this.start_time,
          finish_time: this.finish_time,
          response_type: 'excel'
        })
        user_activities.then((r) => {
          if (r.status) {
            const url = window.URL.createObjectURL(new Blob([r.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute(
              'download',
              'Sistem-loglari-' +
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
          }
        })
      } else {
        Vue.notify({
          text: 'Lütfen tarih bilgisi giriniz.',
          group: 'error-template',
          type: 'error'
        })
      }
    },
    create() {
      this.date_value['1'] = Date.now()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.header {
  padding: 38px;

  background-color: $hybrone_header_background_color;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.controls {
  display: flex;

  .date-range {
    margin-right: 16px;
  }
}

.label {
  margin-bottom: 6px;
}
.premise-title {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #000000;
  margin: 48px 0 32px;
}
.export-report button {
  width: 54px;
  height: 40px;
}
.export-report button svg {
  display: flex;
  align-items: center;
}
.report-button {
  @extend .sentinel-button;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: #e5e5e5;

  // &:hover {
  //   background: #a6a9ad;
  //   border-color: #a6a9ad;
  //   color: #fff;
  // }
}
span {
  font-family: Roboto;
  font-style: normal;
  font-weight: 200;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;

  color: #000000;
}
</style>
