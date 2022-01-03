<template>
  <div @click="handleContainerClick" class="devices-content">
    <div id="card" class="card" v-if="IsOwnDevice">
      <DeviceCard
        v-for="device in devices"
        :key="device.id"
        :data="device"
        @selectedDevice="handleSelectedDevice"
        :selected_device_id="selectedDevice"
      ></DeviceCard>
    </div>
    <span v-else>İlgili mekanda herhangi bir cihaz kaydı bulunmamaktadır.</span>
    <!-- <div class="sentinel-location-bottom"> -->
    <div class="devices-bottom">
      <el-button :disabled="!selectedDevice" @click="handleUpdate()"
        >DÜZENLE</el-button
      >
      <el-button :disabled="!!selectedDevice" @click="handleCreateDevice()"
        >YENİ EKLE</el-button
      >
    </div>
  </div>
</template>

<script>
import { bus } from '@/main.js'
// import { PREMISE_DEVICES } from "@/constant";
import DeviceCard from '@/components/premises/device-card'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PremiseDevices',
  components: {
    DeviceCard
  },
  data() {
    return {
      counter: 0,
      devices: [],
      selectedDevice: null
    }
  },
  computed: {
    ...mapGetters({
      getSelectedRow: 'dataTable/getSelectedRow'
    }),
    IsOwnDevice() {
      return this.devices || this.devices != null ? true : false
    }
  },
  methods: {
    ...mapActions({
      getPremiseDevice: 'premise/getPremiseDevice'
    }),
    handleContainerClick(e) {
      if (
        document.getElementById('card') &&
        document.getElementById('card').contains(e.target)
      ) {
        console.log(this.selectedDevice)
      } else {
        console.log(this.selectedDevice)
        this.selectedDevice = null
      }
      console.log(e)
      console.log('Container Click')
    },
    handleCreateDevice() {
      console.log(this.getSelectedRow.id)
      this.$router.push({
        name: 'CreateDevice',
        params: { premise_id: this.getSelectedRow.id }
      })
    },
    handleUpdate() {
      this.$router.push({
        name: 'UpdateDevice',
        params: {
          device_id: this.selectedDevice,
          premise_id: this.getSelectedRow.id
        }
      })
    },
    handleSelectedDevice(device_id) {
      this.selectedDevice = device_id
    },
    async handleCurrentChangeRowPremise(val) {
      console.log(this.counter++)
      this.devices = []
      const { data } = await this.$api.get(`vguard/devices`, {
        params: {
          premise_id: val,
          page: 1,
          limit: 20
        }
      })

      console.log('****', data, '*****')

      this.devices = data.data.paginated.records
      this.selectedDevice = this.devices[0].id
    },
    refreshCounter() {
      console.log(this.counter++)
    }
  },

  mounted() {
    bus.$on('onCurrentChangeRowPremise', (val) => {
      this.handleCurrentChangeRowPremise(val.id)
      // this.handleCurrentChangeRowPremise(this.premise_id);
    })
  },
  destroyed() {
    bus.$off('onCurrentChangeRowPremise')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.devices-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 708px;
  border: 1px solid black;
  border-top: 1px solid transparent;
  border-radius: 0px 0px 0px 10px;
  background-color: $hybrone_background_color;
  .card {
    overflow: auto;
    background-color: $hybrone_background_color;
  }
  span {
    @extend .sentinel-label;
    align-self: center;
    margin-top: 30%;
    margin-bottom: 100%;
  }
  .devices-title {
    display: flex;
    justify-content: flex-start;
    margin: 29px 0px 15px 22px;
  }
}
.devices-bottom {
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 23px;
  margin-top: 20px;
  background-color: $hybrone_background_color;
  button {
    @extend .sentinel-button__settings;
    &:nth-child(2n + 1) {
      background-color: $hybrone_background_color;
      &:disabled {
        background-color: $hybrone_disabled_color;
        color: $hybrone_background_color;
      }
    }
    &:nth-child(2n) {
      color: #fff;
      &:hover {
        border-color: $hybrone_border_color;
        color: $hybrone_light_blue;
        background-color: $hybrone_background_color;
      }
      &:disabled {
        background-color: $hybrone_disabled_color;
        color: $hybrone_background_color;
      }
    }
  }
}
</style>
