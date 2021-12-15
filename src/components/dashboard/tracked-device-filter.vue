<template>
  <div class="tracked-filter-content">
    <span class="tracked-device-title">Takip Edilen Cihazlar</span>
    <div class="__action">
      <el-autocomplete
        class="input-filter"
        v-model="search_key"
        :fetch-suggestions="querySearch"
        placeholder="ID Giriniz"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>
      <el-button @click="onSubmit">
        <img src="@/assets/icons/dashboard/svg-icon-add.svg" alt="Ekle" />
      </el-button>
      <el-button :disabled="isSelected" @click="deleteButton">
        <SvgIconDelete :status="isSelected"></SvgIconDelete>
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SvgIconDelete from '@/assets/icons/dashboard/svg-icon-delete.vue'
export default {
  name: 'TrackedDeviceFilter',
  components: { SvgIconDelete },
  data() {
    return {
      search_key: '',
      search_ids: null,
      selected_premise: null
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
      getFilterPremises: 'premise/getFilterPremises',
      updateDevice: 'device/updateDevice',
      getProsecDevicesByFilter: 'device/getProsecDevicesByFilter',
      getProsecDeviceById: 'device/getProsecDeviceById'
    }),
    onSubmit() {
      console.log(this.selected_premise)
      let new_tracked_device = this.updateDevice(this.selected_premise)
      new_tracked_device.then((r) => {
        // if (r.status) {
        console.log(r)
        this.$emit('onCreateTrackedPremise')
        this.search_key = ''
        // }
      })
    },
    deleteButton() {
      if (this.getSelectedRows.length > 0) {
        this.getSelectedRows.forEach((item) => {
          console.log(item)
          let un_tracked_payload = null
          let un_tracked_device = this.getProsecDeviceById(item.id)

          un_tracked_device.then((r) => {
            un_tracked_payload = { ...r, is_tracked: false }
            let delete_tracked_device = this.updateDevice({
              ...un_tracked_payload
            })
            delete_tracked_device.then((r) => {
              console.log('UntrackedDevice', r)
              this.$emit('onCreateTrackedPremise')
            })
          })
        })
      }
      /*
        Burada Takip edilen cihazlardan
        Çıkış Endpointine gidilecek ...
     */
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
      console.log('val', val)
      let device = this.getProsecDevicesByFilter({
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
      console.log('Device', device)
      let tracked_device = this.getProsecDeviceById(device.data.id)
      tracked_device.then((r) => {
        console.log('R', r)
        this.selected_premise = { ...r, is_tracked: true }
      })
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
