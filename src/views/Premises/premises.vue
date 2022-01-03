<template>
  <div class="container">
    <PremiseFilter
      @onPremiseFilteredData="handlePremiseFilteredData"
    ></PremiseFilter>
    <div class="content">
      <DataTable :data="table_data" class="data-layer"></DataTable>
      <TabPage class="tab-page"></TabPage>
    </div>
    <DataTablePagination
      @onChangeCurrentPage="handleChangePagination"
      @onChangeSize="handleChangePagination"
      class="bottom"
    ></DataTablePagination>
  </div>
</template>

<script>
import DataTable from '@/components/atomic/data-table.vue'
import TabPage from '@/components/atomic/premises/tab-page.vue'
import PremiseFilter from '@/components/premises/premise-filter.vue'
import DataTablePagination from '@/components/atomic/data-table-pagination.vue'
import { mapActions, mapGetters } from 'vuex'
import { bus } from '@/main.js'

export default {
  name: 'Premises',
  components: {
    DataTable,
    PremiseFilter,
    TabPage,
    DataTablePagination
  },
  data() {
    return {
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
      getPremise: 'premise/getPremise',
      getPremises: 'premise/getPremises',
      createPremise: 'premise/createPremise',
      setSelectedRow: 'dataTable/setSelectedRow'
    }),
    handleChangePagination(val) {
      console.log('Pagination Triggered', this.getCurrentPage)
      console.log('Pagination Triggered', this.getCurrentLimit)
      this.fillDataTable({
        page: this.getCurrentPage,
        limit: this.getCurrentLimit
      })
    },
    handlePremiseFilteredData(val) {
      this.fillDataTable(val)
    },
    async fillDataTable(params) {
      let listPremises = this.getPremises({
        page: this.getCurrentPage,
        limit: this.getCurrentLimit,
        ...params
      })
      await listPremises.then((r) => {
        this.table_data = r
        console.log(this.table_data)
      })
    }
  },
  created() {
    this.fillDataTable()
  },
  mounted() {
    bus.$on('onDeletePremise', this.handlePremiseFilteredData)
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex !important;
  flex-direction: column;
  justify-content: space-between !important;
  margin-left: 15px;
  min-height: 100vh;
  .content {
    max-width: 100%;
    display: flex;
    flex-direction: row;
    .data-layer {
      max-width: 70%;
    }
    // .tab-page {
    //   max-width: 30%;
    // }
  }
  .bottom {
    padding: 15px;
    min-height: 50px;
    background: rgba(160, 160, 160, 0.1);
  }
}
</style>
