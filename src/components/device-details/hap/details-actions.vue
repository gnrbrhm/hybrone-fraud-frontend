<template>
  <div class="details-actions">
    <div v-if="isLastSignals" class="component">
      <span>Geçmiş</span>
      <el-button @click="openSignalsHistory">
        <SvgIconHistory></SvgIconHistory>
      </el-button>
    </div>
    <div v-else class="component">
      <span>Özet</span>
      <el-button @click="openDeviceDetails">
        <SvgIconSummary></SvgIconSummary>
      </el-button>
    </div>
    <div v-if="!isLastSignals" class="component">
      <span>Rapor</span>
      <el-button @click="downloadSignalsHistory"
        ><SvgIconListRaport></SvgIconListRaport
      ></el-button>
    </div>
    <div v-if="false" class="component">
      <span>Servis</span>
      <el-button @click="openServiceModal"
        ><SvgIconService></SvgIconService
      ></el-button>
    </div>
    <div v-if="false" class="component">
      <span>Yenile</span>
      <el-button><SvgIconRefresh></SvgIconRefresh></el-button>
    </div>
  </div>
</template>

<script>
import SvgIconRefresh from '@/assets/icons/list/svg-icon-refresh.vue'
import SvgIconService from '@/assets/icons/list/svg-icon-service.vue'
import SvgIconSummary from '@/assets/icons/list/svg-icon-summary.vue'
import SvgIconHistory from '@/assets/icons/device-details/hap/svg-icon-history'
import SvgIconListRaport from '@/assets/icons/services/svg-icon-list-rapor'
export default {
  name: 'DetailsActions',
  components: {
    SvgIconListRaport,
    SvgIconHistory,
    SvgIconService,
    SvgIconRefresh,
    SvgIconSummary
  },
  computed: {
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
    openDeviceDetails() {
      this.$router.go(-1)
    },
    downloadSignalsHistory() {
      this.$emit('downloadSignalsHistory')
    }
  }
}
</script>

<style lang="scss" scoped>
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
    margin-right: 10px;

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
    }
  }
}
</style>
