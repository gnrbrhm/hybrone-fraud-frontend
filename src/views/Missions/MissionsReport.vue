<template>
  <div class="container">
    <MissionFilter
      class="top"
      @onActionClick="handleActionClick"
      @onFilteredData="handleFilteredData"
    ></MissionFilter>
    <DataTable class="data-layer" :data="table_data"></DataTable>
    <DataTablePagination
      class="bottom"
      @onChangeCurrentPage="handleChangePagination"
      @onChangeSize="handleChangePagination"
    ></DataTablePagination>
    <SentinelPopup
      @onclose="handlePopupClose"
      :dialogTableVisible="popupVisible"
      :data="selectedRowData"
    >
    </SentinelPopup>
  </div>
</template>

<script>
import DataTable from '@/components/atomic/data-table.vue'
import DataTablePagination from '@/components/atomic/data-table-pagination.vue'
import MissionFilter from '@/components/missions/missions-filter.vue'
import SentinelPopup from '@/components/popup/sentinel-popup'
import axios from 'axios'
import { bus } from '@/main.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MissionsReport',
  components: {
    MissionFilter,
    DataTable,
    DataTablePagination,
    SentinelPopup
  },
  data() {
    return {
      modal_type: null,
      selectedAction: '',
      modal_visible: false,
      table_data: [],
      popupVisible: false
    }
  },
  computed: {
    ...mapGetters({
      getCurrentPage: 'pagination/getCurrentPage',
      getCurrentLimit: 'pagination/getCurrentLimit'
    }),
    getSelectedRows() {
      return this.$store.state.dataTable.selectedRows
    }
  },
  methods: {
    ...mapActions({
      refreshVguardDeviceData: 'device/refreshVguardDeviceData',
      getShopies: 'shopies/getShopies'
    }),
    openReceiptPopop(val) {
      console.log('openReceiptPopop Tetiklendi ::::::')
      this.selectedRowData = val
      this.popupVisible = true
    },
    handlePopupClose() {
      console.log('Close Tetiklendi ::::::', this.popupVisible)
      this.$forceUpdate()
      this.popupVisible = false
    },
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
      console.log('Gelen Datalar', params)
      let shopies = await axios
        .get(
          'http://ec2-3-68-193-146.eu-central-1.compute.amazonaws.com:3000/register-activities',
          {
            params: {
              filter: {
                offset: 0,
                limit: 20,
                order: 'date DESC',
                where: {
                  date: {
                    between: [
                      '2022-03-13T20:55:03.187Z',
                      '2022-03-17T20:55:03.187Z'
                    ]
                  },
                  activityType: 0,
                  posCode: '5688_2',
                  storeCode: '5688',
                  userCode: '26365'
                },
                include: ['cashier', 'store']
              }
            }
          }
        )
        .then((r) => {
          console.log('Filtred Data', r)
          this.table_data = r.data
        })
      console.log('FillDataTable', shopies)
    },
    async refreshVguardDeviceAndData() {
      let refresh = null
      let selected_devices_integer = []
      if (this.$route.params.device_id) {
        refresh = this.refreshVguardDeviceData({
          device_id: [parseInt(this.$route.params.device_id)]
        })
      } else {
        this.getSelectedRows.forEach((row) => {
          console.log(row)
          selected_devices_integer.push(row.id)
          //   selected_devices_integer.push(parseInt(row.id))
        })
        refresh = await this.refreshVguardDeviceData({
          device_id: selected_devices_integer
        })
      }
      if (refresh.status == 200) {
        this.handleChangePagination()
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
    bus.$on('onServiceSorting', (val) => this.fillDataTable(val))
    bus.$on('storeOpenModal', (val) => this.openReceiptPopop(val))
  },
  destroyed() {
    bus.$off('onSelectedDevicesRefresh')
    bus.$off('onServiceSorting')
    bus.$off('onServiceSorting')
    bus.$off('storeOpenModal')
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
