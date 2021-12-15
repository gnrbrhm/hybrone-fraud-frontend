<template>
  <div class="sentinel_notification">
    <SvgIconNotification></SvgIconNotification>
    <span>msg</span>
  </div>
</template>

<script>
import SvgIconNotification from '@/components/notification/notification.vue'
export default {
  name: 'Notification',
  components: {
    SvgIconNotification
  },
  props: {
    msg: {
      default: 'Deneme',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.sentinel_notification {
  position: absolute;
  width: 279px;
  height: 51px;
  left: 1161px;
  top: 52px;

  background: linear-gradient(90deg, #6cca93 0%, #56df8f 100%);
  box-shadow: -4px 4px 20px rgba(0, 192, 81, 0.5);
  border-radius: 10px 0px 0px 10px;
}
</style>
