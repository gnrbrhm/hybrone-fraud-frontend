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
      getCurrentLimit: 'pagination/getCurrentLimit'
    })
  },
  methods: {
    ...mapActions({
      getDevices: 'device/getDevices'
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
      await this.fillDataTable(val)
    },
    handleModalClose(val) {
      this.modal_visible = val
    },
    async fillDataTable(params) {
      let devices = this.getDevices({ page: 1, limit: 20, ...params })
      devices.then((r) => {
        this.table_data = r
      })
    }
  },
  created() {
    this.fillDataTable()
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
