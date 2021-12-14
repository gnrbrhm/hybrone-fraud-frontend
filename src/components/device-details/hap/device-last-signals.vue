<template>
  <div class="container">
    <DeviceDetailsLastSignalsFilter
      @onFilteredData="handleFilteredData"
    ></DeviceDetailsLastSignalsFilter>
    <DataTable :data="data"></DataTable>
    <DataTablePagination
      @onChangeCurrentPage="handleChangePagination"
      @onChangeSize="handleChangePagination"
      class="bottom"
    ></DataTablePagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DataTable from '@/components/atomic/data-table.vue'
import DataTablePagination from '@/components/atomic/data-table-pagination.vue'
import DeviceDetailsLastSignalsFilter from '@/components/device-details/hap/details-last-signals-filter.vue'

export default {
  name: 'DeviceLastSignals',
  components: {
    DataTable,
    DataTablePagination,
    DeviceDetailsLastSignalsFilter
  },
  data() {
    return {
      data: [],
      device_id: this.$route.params.device_id,
      filtered_data: {}
    }
  },
  computed: {
    ...mapGetters({
      getCurrentPage: 'pagination/getCurrentPage',
      getCurrentLimit: 'pagination/getCurrentLimit'
    })
  },
  methods: {
    ...mapActions({
      getProsecDeviceLastSignals: 'device/getProsecDeviceLastSignals'
    }),
    handleChangePagination() {
      this.data = []
      this.filtered_data.page = this.getCurrentPage
      this.filtered_data.limit = this.getCurrentLimit
      console.log('FilterData', this.filtered_data)
      this.getProsecDeviceSignalsHistory({
        ...this.filtered_data
      })
    },
    handleFilteredData(payload) {
      this.data = []
      this.filtered_data = { page: 1, limit: 20, ...payload }
      this.$emit('filterData', this.filtered_data)
      //   console.log("filterData", this.filtered_data);
      this.getProsecDeviceSignalsHistory(payload)
    },
    getProsecDeviceSignalsHistory(payload) {
      let device_signals = this.getProsecDeviceLastSignals({
        device_id: this.device_id,
        ...payload
      })
      device_signals.then((r) => {
        console.log('Last Signals', r)
        this.data = r
      })
    }
  },
  created() {
    //   this.device_id = this.$route.params.device_id;
  },
  mounted() {
    // console.log("mounted last signals");
    this.getProsecDeviceSignalsHistory()
  }
}
</script>

<style lang="scss" scoped>
.container {
  justify-content: space-between !important;
  height: 75vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  // padding: 0px 0px 0px 13px;
  .bottom {
    position: relative;
    padding: 34px;
    min-height: 25px;
    background: rgba(160, 160, 160, 0.1);
  }
}
</style>
