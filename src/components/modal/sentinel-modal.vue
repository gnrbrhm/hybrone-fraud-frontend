<template>
  <el-drawer
    :withHeader="false"
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleClose"
    custom-class="drawer"
    size="300px"
  >
    <span class="close-icon" @click="handleClose">
      <SvgClose />
    </span>
    <div class="form-content">
      <div class="title">
        <span>{{ title }}</span>
      </div>
      <div v-if="type === 'action'">
        <div class="content">
          <DeviceActions @onClose="handleClose"></DeviceActions>
        </div>
      </div>
      <div v-else-if="type === 'report'">
        <div class="content">
          <DeviceReport @onClose="handleClose"></DeviceReport>
        </div>
      </div>
      <div v-else-if="type === 'service'">
        <div class="content">
          <DeviceService @onClose="handleClose"></DeviceService>
        </div>
      </div>

      <div class="save-button">
        <el-button type="primary" @click="handleOnSaveClick">{{
          type === 'action'
            ? 'Güncelle'
            : type === 'report'
            ? 'Oluştur'
            : 'Kaydet'
        }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import SvgClose from '@/assets/icons/list/svg-icon-close.vue'
import DeviceActions from '@/components/list/device-actions'
import DeviceReport from '@/components/list/device-report'
import DeviceService from '@/components/list/device-service'
import { bus } from '@/main.js'

export default {
  name: 'SentinelModal',
  components: {
    SvgClose,
    DeviceActions,
    DeviceReport,
    DeviceService
  },
  data() {
    return {
      title: null
    }
  },
  watch: {
    type: function (value) {
      switch (value) {
        case 'action':
          this.title = 'İşlemler'
          break
        case 'report':
          this.title = 'Raporlama'
          break
        case 'service':
          this.title = 'Servis'
          break
      }
    }
  },
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: null
    }
  },
  methods: {
    handleClose() {
      console.log('OnClose Triggered')
      this.$emit('onClose', false)
    },
    handleOnSaveClick() {
      switch (this.type) {
        case 'report':
          bus.$emit('onReportSubmit', true)
          break
        case 'service':
          bus.$emit('onSubmitService', true)
          break
        case 'actions':
          break

        default:
          break
      }
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';

.el-drawer.ltr,
.el-drawer.rtl,
.el-drawer__container {
  top: 64px !important;
  bottom: 29px !important;
  height: 781px !important;
  border-radius: 20px 0px 0px 20px;
}

.form-content {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  overflow-y: auto;
  max-height: 84vh;
  padding-bottom: 16px;
  box-sizing: border-box;
  height: 100%;
  .content {
    margin-bottom: 12px;
    .span-label {
      font-family: Roboto;
      font-style: normal;
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
      display: flex;
      align-items: center;
      margin-bottom: 4px;
    }
  }
  .title {
    text-align: right;
    padding: 54px 0;
    span {
      font-family: Roboto;
      font-style: normal;
      font-weight: 300;
      font-size: 24px;
      line-height: 28px;
    }
  }
  .save-button {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: auto;
    padding-top: 22px;
  }
}

.close-icon {
  position: absolute !important;
  top: 48px !important;
  display: inline-flex !important;
  left: -20px !important;
  cursor: pointer !important;
  z-index: 2002 !important;
}
</style>
