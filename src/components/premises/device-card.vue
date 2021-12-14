<template>
  <div
    :id="'device-card-' + data.device.id"
    :class="
      selected_device_id == data.device.id
        ? 'device-card__selected'
        : 'device-card'
    "
    @click="handleCardClick(data.device.id)"
  >
    <div class="right">
      <span>{{
        getHardwareType(this.data.hardware_type.name.toUpperCase()).label
      }}</span>
    </div>
    <div class="left">
      <span
        >Marka:
        <p>{{ brand[0].label }}</p></span
      >
      <span
        >Model:
        <p>{{ brand[0].models[0].label }}</p></span
      >
      <span
        >Envanter No:
        <p>{{ data.device.inventory_number }}</p></span
      >
      <span
        >Seri No:
        <p>{{ data.device.subscriber }}</p></span
      >
    </div>
  </div>
</template>

<script>
import { DEVICE_TYPES } from '@/constant'
import { HARDWARE_TYPES } from '@/constant'
import { mapActions } from 'vuex'
export default {
  name: 'DeviceCard',
  data() {
    return {
      hardware_type: null,
      radio: null,
      model: null,
      brand: null
    }
  },
  props: {
    selected_device_id: {
      default: {}
    },
    data: {
      default: {}
    }
  },
  watch: {
    data: function (val) {
      console.log('Data', val)
    },
    watch: {
      function(val) {
        console.log(val == this.data.device.id)
      }
    }
  },
  computed: {},
  methods: {
    ...mapActions({
      getDeviceModelId: 'model/getDeviceModelId'
    }),
    getHardwareType(val) {
      return (this.hardware_type = [...DEVICE_TYPES].find((t) => {
        return t.key == val
      }))
    },
    handleCardClick(device_id) {
      console.log('Click !!', device_id)
      this.$emit('selectedDevice', device_id)
    }
  },
  // created() {
  // },
  mounted() {
    this.brand = [...HARDWARE_TYPES].find((t) => {
      return t.key == this.hardware_type.key
    }).brands
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.device-card {
  display: flex;
  flex-direction: column;
  justify-content: spa;
  background: $hybrone_background_color;
  border: 0.5px solid $hybrone_border_color;
  box-sizing: border-box;
  border-radius: 10px;
  margin: 33px;
  margin-bottom: 20px;
  min-width: 394px;
  min-height: 150px;

  &:hover {
    border: 0.5px solid $hybrone_light_blue;
    box-shadow: 40px $hybrone_light_blue;
  }
  //   &:active {
  //     border: 0.5px solid $hybrone_light_blue;
  //   }
  .left {
    margin-left: 23px;
    margin-top: 36px;
    span {
      width: 100%;
      height: 23px;
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 16px;
      display: flex;
      align-items: center;
      color: #000000;
      p {
        display: flex;
        align-items: flex-start;
        width: 50%;
        font-family: Roboto, sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        margin-left: 25px;

        color: #000000;
      }
    }
  }
  .right {
    display: flex;
    justify-content: flex-end;
    padding-top: 12px;
    width: 100%;
    span {
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;

      text-align: right;
      margin-right: 20px;
      margin-top: 12px;
      /* Gray Dark */

      color: #444444;
    }
  }
}
.device-card__selected {
  @extend .device-card;
  background: linear-gradient(
    90deg,
    hybrone_light_blue,
    0%,
    rgb(252, 252, 252) f 100%
  );
  box-shadow: -4px 4px 20px rgba(24, 121, 160, 0.5);
  border: 0.5px solid $hybrone_light_blue;
  box-shadow: 40px $hybrone_light_blue;
}
</style>
