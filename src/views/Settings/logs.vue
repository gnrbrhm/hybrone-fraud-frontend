<template>
  <div class="content">
    <LogsFilter class="filter" @onHandleFiltre="handleFilter"></LogsFilter>
    <DataTable :data="data"></DataTable>
    <DataTablePagination
      class="bottom"
      @onChangeCurrentPage="handleChangePagination"
      @onChangeSize="handleChangePagination"
    ></DataTablePagination>
    <!-- :paginate="pagination" -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import LogsFilter from '@/components/settings/logs-filter.vue'
import DataTable from '@/components/atomic/data-table.vue'
import DataTablePagination from '@/components/atomic/data-table-pagination.vue'
export default {
  name: 'Logs',
  components: {
    DataTable,
    DataTablePagination,
    LogsFilter
  },
  data() {
    return {
      data: [],
      filterData: {},
      is_filtered: false
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
      getLogRecords: 'logs/getLogRecords'
    }),
    handleFilter(val) {
      this.is_filtered = true
      this.filterData = {
        start_time: val[0],
        finish_time: val[1]
      }
      this.getUserActivities({ limit: 10, page: 1, ...this.filterData })
    },
    handleChangePagination() {
      this.data = []
      this.getUserActivities({
        page: this.getCurrentPage,
        limit: this.getCurrentLimit,
        ...this.filterData
      })
    },
    async getUserActivities(payload) {
      let logs = this.getLogRecords(payload)
      return logs.then((r) => {
        return r.forEach((record) => {
          let row = {
            user: record.user ? record.user.username : 'Kullanıcı Atanmamış',
            description: record.activity,
            created_at: moment(record.created_at).format('DD.MM.YYYY HH:mm')
          }
          this.data.push(row)
        })
      })
    }
  },
  created() {
    this.getUserActivities({
      page: 1,
      limit: 20
    })
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0px 0px 0px 13px;
  .bottom {
    position: relative;
    padding: 34px;
    min-height: 25px;
    background: rgba(160, 160, 160, 0.1);
  }
}
</style>
