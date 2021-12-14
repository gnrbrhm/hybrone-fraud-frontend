<template>
  <div class="details-hap-zones">
    <span class="title">Bölgeler</span>
    <DetailsTable :data="device_zones"></DetailsTable>
  </div>
</template>

<script>
import DetailsTable from "@/components/device-details/hap/details-table.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DetailsHapZones",
  components: { DetailsTable },
  data() {
    return {
      data: [],
      device_zones: [],
      modal_type: null,
      selectedAction: "",
      modal_visible: false,
    };
  },
  
  props: {
    table_data: {
      default: [],
    },
    watch: {
      table_data: function (val) {
        console.log("TableData", val);
      },
    },
  },
  computed: {
    ...mapGetters({
      getProsecDevice: "device/getDevice",
    }),
  },
  methods: {
    ...mapActions({
      getProsecDeviceById: "device/getProsecDeviceById",
    }),
    async getDeviceDetails(device_id) {
      return await this.getProsecDeviceById(device_id);
    },
    getPartionsZones(prosec_device) {
      console.log("ProsecDevice", prosec_device);
      prosec_device.partitions.forEach((partition) => {
        console.log("Partion", partition);
        let partion_name = partition.name;
        partition.zones.forEach((zone) => {
          zone = { ...zone, partition_name: partion_name };
          this.device_zones.push(zone);
        });
      });
      this.device_zones = this.device_zones.sort((a, b) => {
        return a.id.localeCompare(b.id);
      });
      console.log("Zone Array", this.device_zones);
    },
  },
  mounted() {
    let prosec_device = this.getDeviceDetails(this.$route.params.device_id);
    prosec_device.then((r) => {
      this.getPartionsZones(r);
    });
  },
};
</script>

<style lang="scss" scoped>
.details-hap-zones {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-basis: auto;
  // min-width: 100%;
  min-height: 425px;
  // min-height: calc(100% * 405px / 1680px);
  border: 0.5px solid #2c3357;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  .title {
    display: flex;
    align-self: flex-start !important;
    margin-top: 24px;
    margin-left: 24px;
    align-self: end;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    color: #444444;
  }
}
</style>
