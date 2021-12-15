<template>
  <div class="create-hap-device">
    <DeviceHeader></DeviceHeader>
    <CreateHapDeviceForm></CreateHapDeviceForm>
  </div>
</template>

<script>
import DeviceHeader from '@/components/device/device-header'
import CreateHapDeviceForm from '@/components/device/hap/create-hap-device-form.vue'
export default {
  name: 'CreateHapDevice',
  components: { DeviceHeader, CreateHapDeviceForm },
  props: {
    is_update: {
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.create-hap-device {
  margin: 27px 38px 12px 32px;
}
</style>
