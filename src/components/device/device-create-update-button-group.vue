<template>
  <div
    class="button-group"
    v-if="['CreateDevice', 'UpdateDevice'].includes(this.$route.name)"
  >
    <div :class="is_update ? 'footer-bottom-update' : 'footer-bottom-create'">
      <el-button
        v-if="is_update"
        class="footer-bottom-update__dangerous"
        @click="onDelete"
        >SİL</el-button
      >
      <el-button
        v-if="!is_update"
        class="footer-bottom-create__success"
        type="primary"
        @click="onSubmit"
        >KAYDET</el-button
      >
      <el-button
        v-else
        class="footer-bottom-update__success"
        type="primary"
        @click="onSubmit"
        >GÜNCELLE</el-button
      >
    </div>
  </div>
</template>

<script>
import { bus } from '@/main.js'
export default {
  name: 'DeviceCreateUpdateButtonGroup',
  data() {
    return {
      is_update: !!this.$route.params.device_id
    }
  },
  methods: {
    onSubmit() {
      if (this.is_update) {
        bus.$emit('buttonGroupClick', 'onUpdate')
      } else {
        bus.$emit('buttonGroupClick', 'onCreate')
      }
    },
    onDelete() {
      bus.$emit('buttonGroupClick', 'onDelete')
    }
  },
  mounted() {
    console.log(this.is_update)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.button-group {
  margin: 27px 38px 12px 32px;
  .footer-bottom-update {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    &__dangerous {
      display: flex;
      justify-content: flex-start !important;
      color: $hybrone_background_color;
      background-color: $hybrone_error_red !important;
    }
    &__success {
      display: flex;
      justify-content: flex-end !important;
      color: $hybrone_background_color;
      background-color: $hybrone_light_blue !important;
    }
  }
  .footer-bottom-create {
    display: flex;
    margin-top: 10px;
    justify-content: flex-end !important;
    &__dangerous {
      display: flex;
      justify-content: flex-start !important;
      color: $hybrone_background_color;
      background-color: $hybrone_error_red !important;
    }
    &__success {
      display: flex;
      justify-content: flex-end !important;
      color: $hybrone_background_color;
      background-color: $hybrone_light_blue !important;
    }
  }
}
</style>
