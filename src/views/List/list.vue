<template>
  <div class="container">
    <ListFilter
      class="top"
      @onActionClick="handleActionClick"
      @onFilteredData="handleFilteredData"
    ></ListFilter>
    <DataTable class="data-layer" :data="table_data"></DataTable>
    <DataTablePagination
      class="bottom"
      @onChangeCurrentPage="handleChangePagination"
      @onChangeSize="handleChangePagination"
    ></DataTablePagination>
    <SentinelModal
      @onClose="handleModalClose"
      :drawer="modal_visible"
      :type="modal_type"
    ></SentinelModal>
  </div>
</template>

<script>
import DataTable from '@/components/atomic/data-table.vue'
import DataTablePagination from '@/components/atomic/data-table-pagination.vue'
import ListFilter from '@/components/list/list-filter'
import SentinelModal from '@/components/modal/sentinel-modal.vue'

import { bus } from '@/main.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'List',
  components: {
    ListFilter,
    DataTable,
    DataTablePagination,
    SentinelModal
  },
  data() {
    return {
      modal_type: null,
      selectedAction: '',
      modal_visible: false,
      table_data: []
    }
  },
  computed: {
    ...mapGetters({
      getCurrentPage: 'pagination/getCurrentPage',
      getCurrentLimit: 'pagination/getCurrentLimit',
      getSelectedRows() {
        return this.$store.state.dataTable.selectedRows
      }
    })
  },
  methods: {
    ...mapActions({
      refreshVguardDeviceData: 'device/refreshVguardDeviceData',
      getVguardDevices: 'device/getVguardDevices'
    }),
    handleChangePagination() {
      this.fillDataTable({
        page: this.getCurrentPage,
        limit: this.getCurrentLimit
      })
    },
    handleActionClick(val) {
      this.modal_visible = true
      switch (val) {
        case 'action':
          this.modal_type = 'action'
          break
        case 'report':
          this.modal_type = 'report'
          break
        case 'service':
          this.modal_type = 'service'
          break
      }
    },
    async handleFilteredData(val) {
      console.log('LİSt', val)
      await this.fillDataTable(val)
    },
    handleModalClose(val) {
      this.modal_visible = val
    },
    async fillDataTable(params) {
      let devices = this.getVguardDevices({ page: 1, limit: 20, ...params })
      devices.then((r) => {
        this.table_data = r
      })
    },
    refreshVguardDeviceAndData() {
      console.log('REFRESH TRİGERED')
      let refresh = this.refreshVguardDeviceData({
        device_id: [parseInt(this.$route.params.device_id)]
      })
      let selected_devices_integer = []
      this.getSelectedRows.forEach((row) => {
        console.log(row)
        this.selected_devices_integer.push(parseInt(row))
      })
      if (refresh.status == 200) {
        this.getDeviceDetails(this.$route.params.device_id)
      }
      //   refresh.then((r) => {
      //     if (r.status == 200) {
      //       this.getDeviceDetails(this.$route.params.device_id)
      //     }
      //   })
    }
  },
  created() {
    this.fillDataTable()
  },
  mounted() {
    bus.$on('onSelectedDevicesRefresh', this.refreshVguardDeviceAndData)
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex !important;
  flex-direction: column;
  min-height: 100vh;
}
.data-layer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  // min-width: 100% !important;
  margin-left: 12px;
}
.bottom {
  padding: 34px;
  min-height: 25px;
  background: rgba(160, 160, 160, 0.1);
}
</style>
