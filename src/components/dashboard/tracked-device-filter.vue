<template>
  <div class="tracked-filter-content">
    <span class="tracked-device-title">Takip Edilen Cihazlar</span>
    <div class="__action">
      <el-autocomplete
        class="sentinel-input input-filter"
        v-model="search_key"
        :fetch-suggestions="querySearch"
        placeholder="ID Giriniz"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>
      <el-button class="sentinel-button" @click="onSubmit">
        <SvgIconAdd></SvgIconAdd>
      </el-button>
      <el-button
        class="sentinel-button"
        :disabled="isSelected"
        @click="deleteButton"
      >
        <SvgIconDelete :status="isSelected"></SvgIconDelete>
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SvgIconAdd from '@/assets/icons/dashboard/svg-icon-add.vue'
import SvgIconDelete from '@/assets/icons/dashboard/svg-icon-delete.vue'
export default {
  name: 'TrackedDeviceFilter',
  components: { SvgIconDelete, SvgIconAdd },
  data() {
    return {
      search_key: '',
      search_ids: null,
      selected_device: null
    }
  },
  computed: {
    getSelectedRows() {
      return this.$store.state.dataTable.selectedRows
    },
    isSelected() {
      return !(this.$store.state.dataTable.selectedRows.length > 0)
    }
  },
  methods: {
    ...mapActions({
      /*
		Bu Kısım Prosec Hırsız Alarm Paneli Senaryosuna Uygundur.
		
        getFilterPremises: 'premise/getFilterPremises',
        updateDevice: 'device/updateDevice',
        getProsecDevicesByFilter: 'device/getProsecDevicesByFilter', */
      getVguardDeviceById: 'device/getVguardDeviceById',
      getVguardDevices: 'device/getVguardDevices',
      updateTrackedVguardDevice: 'device/updateTrackedVguardDevice'
    }),
    onSubmit() {
      let tracked_payload = {
        device_id: this.selected_device,
        is_tracked: true
      }
      let result = this.updateTrackedStatus(tracked_payload)
      if (result) {
        this.search_key = ''
      }
    },
    deleteButton() {
      if (this.getSelectedRows.length > 0) {
        this.getSelectedRows.forEach((item) => {
          let un_tracked_payload = { device_id: item.id, is_tracked: false }
          this.updateTrackedStatus(un_tracked_payload)
        })
      }
    },
    updateTrackedStatus(payload) {
      let change_tracked_status = this.updateTrackedVguardDevice({
        ...payload
      })
      return change_tracked_status.then((r) => {
        this.$emit('onCreateTrackedPremise')
        return r
      })
    },
    querySearch(queryString, cb) {
      if (queryString.length > 0) {
        this.handleOnChange(queryString)
      } else {
        this.search_ids = []
      }
      return cb(this.search_ids)
    },
    async handleOnChange(val) {
      this.search_ids = []
      let device = this.getVguardDevices({
        page: 1,
        limit: 5,
        custom_premise_id: val
      })
      device.then((r) => {
        r.forEach((item) => {
          let result = {
            label: item.premise.custom_premise_id,
            value: item.premise.custom_premise_id,
            data: { ...item, is_tracked: true }
          }
          this.search_ids.push(result)
        })
      })
    },
    handleSelect(device) {
      this.selected_device = device.data.id
      //   let tracked_device = this.getVguardDeviceById(device.data.id)
      //   tracked_device.then((r) => {
      //     this.selected_device = { ...r, is_tracked: true }
      //   })
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.tracked-filter-content {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  align-content: center;
  flex-wrap: nowrap;
  padding: 15px;
  .__action {
    display: flex;
    align-items: stretch;
    justify-content: flex-end;
    align-content: center;
    flex-wrap: nowrap;
  }

  .tracked-device-title {
    display: flex;
    align-items: stretch;
    justify-content: flex-end;
    align-content: center;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;

    /* Gray Dark */

    color: #444444;
  }
  .input-filter {
    @extend .sentinel-input;
    max-width: 196px !important;
    height: 50px;
    margin-right: 15px !important;
  }
  .el-button .el-button--default {
    &:hover {
      background-color: #007db7;
    }
  }
}
</style>
