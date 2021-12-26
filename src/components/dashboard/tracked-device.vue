<template>
  <div class="tracked-device">
    <TrackedDeviceFilter
      :disabledDeleteButton="selectedRow"
      @onCreateTrackedPremise="handleCreateTrackedPremise"
    ></TrackedDeviceFilter>
    <DataTable :data="table_data" @onSelectRow="handleSelectRow"></DataTable>
  </div>
</template>

<script>
import TrackedDeviceFilter from '@/components/dashboard/tracked-device-filter'
import DataTable from '@/components/atomic/data-table.vue'
import { mapActions } from 'vuex'
export default {
  name: 'TrackedDevice',
  components: { TrackedDeviceFilter, DataTable },
  data() {
    return {
      selectedRow: false,
      table_data: []
    }
  },
  methods: {
    ...mapActions({
      getTrackedVguard: 'premise/getTrackedVguard'
    }),
    handleSelectRow(val) {
      this.selectedRow = val
    },
    handleCreateTrackedPremise() {
      this.fillDataTable()
    },
    fillDataTable() {
      let tracked_premises = this.getTrackedVguard({
        page: 1,
        limit: 5,
        is_tracked: true
      })
      tracked_premises.then((r) => {
        console.log('Response Data', r)
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
.tracked-device {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #fff;
  width: 100%;
  height: 409px;
  border: 0.5px solid #c3c3c3;
  border-radius: 10px;
}
</style>
