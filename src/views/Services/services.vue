<template>
  <div class="page-inner service-container">
    <ServiceHeader
      @onUpdateTable="handleUpdate"
      @onFiltred="handleFiltred"
      @onhandleFiltredParam="handleFilterParam"
    ></ServiceHeader>
    <DataTable :data="data"></DataTable>
    <DataTablePagination
      class="bottom"
      @onChangeSize="handlePaginateCurrentPage"
      @onChangeCurrentPage="handlePaginateCurrentPage"
    ></DataTablePagination>
  </div>
</template>

<script>
import endpoints from '@/endpoints'
import moment from 'moment'
import ServiceHeader from '@/components/service/service-header.vue'
import DataTable from '@/components/atomic/data-table.vue'
import DataTablePagination from '@/components/atomic/data-table-pagination.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Service',
  components: {
    ServiceHeader,
    DataTable,
    DataTablePagination
  },
  data() {
    return {
      is_filtered: false,
      filter_param: {},
      paginate: {
        limit: 10,
        page: 1
      },
      data: []
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
      getServices: 'service/getServices'
    }),
    handleUpdate() {
      this.getTicketsPagination()
    },
    handleFilterParam(val) {
      this.is_filtered = Object.keys(val).length > 0
      this.filter_param = val
      this.getTicketsPagination({
        ...this.filter_param,
        page: this.getCurrentPage,
        limit: this.getCurrentLimit
      })
    },

    handlePaginateCurrentPage() {
      this.data = []
      this.getTicketsPagination({
        ...this.filter_param,
        page: this.getCurrentPage,
        limit: this.getCurrentLimit
      })
    },
    mapingTableData(records) {
      this.data = []
      records.forEach((el) => {
        let ticket = {
          id: el.id,
          premise_id: el.premise.custom_premise_id,
          location: el.premise.location
            ? el.premise.location.city.name +
              '/' +
              el.premise.location.province.name
            : '',
          premise_name: el.premise.custom_premise_name,
          // device: el.premise.devices[0]
          //   ? el.premise.devices[0].device_model.name +
          //     "/" +
          //     el.premise.devices[0].device_brand.name
          //   : "",
          fault_type: el.ticket_type,
          service_state: el.status_code == 1 ? 'Tamamlandı' : 'Açık',
          status_code: el.status_code,
          start_time: el.start_time,
          created_at: el.created_at,
          finish_time: el.finish_time,
          ticket_finished_time: el.ticket_finished_time
        }
        this.data.push(ticket)
      })
    },
    getTicketsPaginationFilter(limit, page, premise_id) {
      this.data = []
      this.$api({
        ...endpoints.getTicketsPagination,
        params: {
          limit: limit,
          page: page,
          search: premise_id
        }
      }).then((r) => {
        if (r.data.data.pagination.records)
          this.mapingTableData(r.data.data.pagination.records)
        this.paginate = r.data.data.pagination
        delete this.paginate.records
      })
    },

    getTicketsPagination(payload) {
      let services = this.getServices(payload)
      services.then((r) => {
        this.mapingTableData(r)
      })
    }
  },
  created() {
    if (this.$route.params.premise_id) {
      // this.getTicketsPaginationFilter(
      //   this.paginate.limit,
      //   this.paginate.page,
      //   this.$route.params.premise_id
      // )
    } else {
      //   let services = this.getServices({ page: 1, limit: 20 });
      //   services.then((r) => {
      //     this.mapingTableData(r);
      //   });
      this.getTicketsPagination({
        limit: this.getCurrentLimit,
        page: this.getCurrentPage
      })
    }
  }
}
</script>

<style scoped lang="scss">
.service-container {
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.bottom {
  padding: 34px 34px 16px 34px;
  min-height: 50px;
  background: rgba(160, 160, 160, 0.1);
}
</style>
