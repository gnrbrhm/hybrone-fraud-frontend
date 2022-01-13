<template>
  <div class="details-actions">
    <div v-if="isLastSignals" class="component">
      <span>OLAYLAR</span>
      <el-button
        class="sentinel-button"
        @click="openSignalsHistory"
        :disabled="
          !getDevice.is_active && !this.getPermissions['device_show_event']
        "
      >
        <SvgIconHistory></SvgIconHistory>
      </el-button>
    </div>
    <div class="component">
      <span>Servis</span>
      <el-button
        :disabled="!this.getPermissions['service_create']"
        class="sentinel-button"
        @click="openServiceModal"
        ><SvgIconService></SvgIconService
      ></el-button>
    </div>
    <div class="component">
      <span>Arayüz</span>
      <el-button
        :disabled="!this.getPermissions['device_access_web_ui']"
        class="sentinel-button"
        @click="clickHandleInterface"
      >
        <SvgIconInterface></SvgIconInterface>
      </el-button>
    </div>
    <div v-if="false" class="component">
      <span>Özet</span>
      <el-button class="sentinel-button" @click="openDeviceDetails">
        <SvgIconSummary></SvgIconSummary>
      </el-button>
    </div>
    <div v-if="!isLastSignals" class="component">
      <span>Rapor</span>
      <el-button
        class="sentinel-button"
        :disabled="!this.getPermissions['device_show_event']"
        @click="downloadSignalsHistory"
        ><SvgIconListRaport></SvgIconListRaport
      ></el-button>
    </div>

    <div class="component">
      <span>Yenile</span>
      <el-button class="sentinel-button" @click="refreshDeviceData"
        ><SvgIconRefresh></SvgIconRefresh
      ></el-button>
    </div>
  </div>
</template>

<script>
import SvgIconRefresh from '@/assets/icons/list/svg-icon-refresh.vue'
import SvgIconService from '@/assets/icons/list/svg-icon-service.vue'
import SvgIconSummary from '@/assets/icons/list/svg-icon-summary.vue'
import SvgIconInterface from '@/assets/icons/device-details/hap/svg-icon-interface'
import SvgIconHistory from '@/assets/icons/device-details/hap/svg-icon-history'
import SvgIconListRaport from '@/assets/icons/services/svg-icon-list-rapor'
import { mapGetters } from 'vuex'
import { bus } from '@/main'
export default {
  name: 'DetailsActions',
  components: {
    SvgIconListRaport,
    SvgIconHistory,
    SvgIconInterface,
    SvgIconService,
    SvgIconRefresh,
    SvgIconSummary
  },
  computed: {
    ...mapGetters({
      getDevice: 'device/getDevice',
      getPermissions: 'auth/getPermissions'
    }),
    isLastSignals() {
      return !this.$route.path.split('/').includes('last-signals')
    }
  },
  methods: {
    openServiceModal() {
      this.$emit('openServiceModal', true)
    },
    openSignalsHistory() {
      // let route = this.$route.path;
      // this.$router.push({ path: route + "/last-signals" });
      this.$router.push({ name: 'DeviceLastSignals' })
    },
    clickHandleInterface() {
      console.log(
        'https://' +
          this.$store.state.device.host +
          ':' +
          this.$store.state.device.port
      )
      require('electron').shell.openExternal(
        'https://' +
          this.$store.state.device.host +
          ':' +
          this.$store.state.device.port
      )
    },
    openDeviceDetails() {
      this.$router.go(-1)
    },
    downloadSignalsHistory() {
      this.$emit('downloadSignalsHistory')
    },
    refreshDeviceData() {
      bus.$emit('onRefreshDeviceData')
      //   if (['DeviceLastSignals'].includes(this.$route.name))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.details-actions {
  display: flex;
  flex-direction: row;
  align-content: left;
  justify-content: space-between;
  align-items: center;
  .component {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: self-end;
    justify-content: space-between;
    flex-wrap: nowrap;
    margin-right: 24px;

    &:nth-child(0) {
      margin-left: 23px;
    }
    span {
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
      text-transform: uppercase;
      align-self: flex-start;
    }
    button {
      width: 51px;
      height: 51px;
      display: flex;
      justify-content: center;
      &:disabled {
        background-color: $hybrone_background_color;
        span {
          svg {
            path {
              fill: $hybrone_disabled_color !important;
            }
          }
        }
      }
    }
  }
}
</style>
