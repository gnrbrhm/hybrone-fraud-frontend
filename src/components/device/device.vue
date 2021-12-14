<template>
  <div>
    <CreateHapDevice :is_update="is_update"></CreateHapDevice>
	<DeviceCreateUpdateButtonGroup></DeviceCreateUpdateButtonGroup>
  </div>
</template>

<script>
import CreateHapDevice from "@/components/device/hap/create-hap-device";
import DeviceCreateUpdateButtonGroup from "@/components/device/device-create-update-button-group";
import { mapActions } from "vuex";
export default {
  name: "Device",
  components: { CreateHapDevice,DeviceCreateUpdateButtonGroup },
  data() {
    return {
      is_update: false,
    };
  },
  methods: {
    ...mapActions({
      getDeviceBrands: "model/getDeviceBrands",
      getDeviceModels: "model/getDeviceModels",
    }),
  },
  created() {
    if (this.$route.params.device_id) {
      this.is_update = true;
    }
    let brands = this.getDeviceBrands();
    brands.then((r) => {
      console.log(r.data.data);
    });
    let models = this.getDeviceModels();
    models.then((r) => {
      console.log(r.data.data);
    });
  },
};
</script>

<style></style>
