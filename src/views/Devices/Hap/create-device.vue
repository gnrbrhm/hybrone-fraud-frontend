<template>
  <div>
    <Device></Device>
  </div>
</template>

<script>
import Device from '@/components/device/device'
export default {
  name: 'CreateDevice',
  components: { Device },
  data() {
    return {
      is_update: false
    }
  },
  created() {
    if (this.$route.params.device_id) {
      this.is_update = true
    }
  }
}
</script>

<style></style>
