<template>
  <div
    :class="currentRouteName === 'Maps' ? 'map-filter-device' : 'list-device'"
  >
    <div class="filter">
      <div class="component">
        <span>ARAMA</span>
        <el-input
          class="sentinel-input"
          v-model="filtered_data.custom_premise_id"
          placeholder="Aranacak İfadeyi Giriniz..."
        ></el-input>
      </div>
      <!-- <div class="component">
        <span>CİHAZ TİPİ</span>
        <el-select
          v-model="hardware_type"
          placeholder="Seçiniz"
          @change="handleHardwareTypeChange"
        >
          <el-option
            v-for="item in hardware_options"
            placeholder="Seçiniz"
            :disabled="!item.valid"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </div> -->
      <div class="component">
        <span>DURUMLAR</span>
        <el-select
          v-model="filtered_data.state"
          multiple
          collapse-tags
          placeholder="Seçiniz"
          class="sentinel-input"
        >
          <el-option
            v-for="item in status_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="component">
        <el-button type="default" @click="handleSearch">
          <SvgIconSearch></SvgIconSearch>
        </el-button>
      </div>
      <div class="component">
        <el-button @click="handleClearFilterData">Temizle</el-button>
      </div>
      <div class="component">
        <span
          v-if="is_total_count_visible && currentRouteName !== 'Maps'"
          class="total_count"
        >
          {{ getTotalRecord }} Sonuç Bulundu</span
        >
      </div>
    </div>
    <div v-if="currentRouteName !== 'Maps'" class="actions">
      <div class="component">
        <span>YENİLE</span>
        <el-button
          :disabled="isSelected"
          @click="handleClickSelectedDevicesRefresh"
        >
          <SvgIconRefresh></SvgIconRefresh>
        </el-button>
      </div>
      <div v-if="false" class="component">
        <span>İŞLEM</span>
        <el-button :disabled="isSelected" @click="handleActionsClick('action')">
          <SvgIconAction></SvgIconAction>
        </el-button>
      </div>
      <div class="component">
        <span>SERVİS</span>
        <el-button
          :disabled="isSelected || !this.getPermissions['service_create']"
          @click="handleActionsClick('service')"
        >
          <SvgIconService></SvgIconService>
        </el-button>
      </div>
      <div class="component">
        <span>RAPOR</span>
        <el-button
          :disabled="
            isSelected ||
            !this.getPermissions['device_list_status_report_create']
              ? true
              : false
          "
          @click="handleActionsClick('report')"
        >
          <SvgIconReport></SvgIconReport>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIconSearch from '@/assets/icons/list/svg-icon-search.vue'
import SvgIconRefresh from '@/assets/icons/list/svg-icon-refresh.vue'
import SvgIconAction from '@/assets/icons/list/svg-icon-action.vue'
import SvgIconService from '@/assets/icons/list/svg-icon-service.vue'
import SvgIconReport from '@/assets/icons/list/svg-icon-report.vue'
import { DEVICE_TYPES, DEVICE_STATUS } from '@/constant'
import { mapGetters } from 'vuex'
import { bus } from '@/main.js'

export default {
  name: 'ListFilter',
  components: {
    SvgIconSearch,
    SvgIconRefresh,
    SvgIconAction,
    SvgIconService,
    SvgIconReport
  },
  computed: {
    ...mapGetters({
      getPermissions: 'auth/getPermissions',
      getTotalRecord: 'pagination/getTotalRecord'
    }),

    isSelected() {
      return !(this.$store.state.dataTable.selectedRows.length > 0)
    },
    currentRouteName() {
      console.log(this.$route.name)
      return this.$route.name
    }
  },
  data() {
    return {
      is_total_count_visible: false,
      total_records: 0,
      hardware_type: '',
      filtered_data: {
        search: '',
        state: []
      },
      status_options: [],
      hardware_options: []
    }
  },
  methods: {
    handleClickSelectedDevicesRefresh() {
      bus.$emit('onSelectedDevicesRefresh')
    },
    handleHardwareTypeChange(val) {
      this.$router.push({ path: '/list/' + val.toLowerCase() })
    },
    handleClearFilterData() {
      Object.keys(this.filtered_data).forEach((item) => {
        this.filtered_data[item] = ''
      })
      this.$emit('onFilteredData', {})
      this.is_total_count_visible = false
    },
    handleActionsClick(val) {
      this.$emit('onActionClick', val)
    },
    handleSearch() {
      let state = ''
      Object.keys(this.filtered_data).forEach((item) => {
        if (this.filtered_data[item] == false) delete this.filtered_data[item]
      })
      if (this.filtered_data.state != undefined)
        state = this.filtered_data.state.join()

      this.$emit('onFilteredData', { ...this.filtered_data, state: state })
      this.is_total_count_visible = true
    }
  },
  created() {
    this.hardware_type = this.$route.path.split('/')[2].toUpperCase()
  },
  mounted() {
    console.log('Permissiion', this.getPermissions)
    this.hardware_options = [...DEVICE_TYPES].filter((item) => {
      return item.valid == true
    })
    this.status_options = [...DEVICE_STATUS]
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';

.list-device {
  display: flex;
  flex-direction: row;
  // background: $hybrone_background_color;
  background: $hybrone_header_background_color;
  max-width: 100%;
  border-radius: 10px;
  align-content: left;
  justify-content: space-between;
  // justify-content: flex-start;
  align-items: center;
  height: 85px;
  padding: 12px 20px 12px 36px;
  .component {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: self-end;
    justify-content: space-between;
    flex-wrap: nowrap;
    margin-right: 10px;
    &:nth-child(0) {
      margin-left: 230px;

      .sentinel-input {
        width: 275px !important;
      }
    }
    &:nth-child(5) {
      min-height: 100%;
      display: flex !important;
      align-items: flex-end !important;
      align-items: flex-end !important;
      justify-content: flex-end !important;
    }
    .total_count {
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      /* identical to box height */

      /* Hybrone Light Blue */
      margin-top: 40px;
      color: #007db7;
    }
  }

  .filter {
    display: flex;
    flex-direction: row;
    align-content: left;
    align-items: center;
    justify-content: flex-start;
    .component {
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: self-end;
      justify-content: space-between;
      flex-wrap: nowrap;
      margin-right: 10px;
      &:nth-child(0) {
        div {
          width: 275px !important;
        }
      }
    }

    span {
      @extend .sentinel-label;
    }
    input {
      @extend .sentinel-input;
    }
    button {
      margin-top: 19px;
      @extend .sentinel-input;

      span {
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        text-align: center;

        /* Gray Dark */

        color: #444444;
      }
    }
  }

  .actions {
    display: flex;
    flex-direction: row;
    align-content: left;
    align-items: center;
    justify-content: flex-start;
    span {
      @extend .sentinel-label;
      margin: 0px;
    }
    button {
      height: 50px;
      width: 50px;
      padding: 0px;
      span {
        display: flex;
        justify-content: center;
      }
      &:hover {
        background-color: $hybrone_light_blue;
        svg {
          path {
            fill: $hybrone_background_color;
          }
        }
      }
      &:focus {
        background-color: $hybrone_light_blue;
        border-color: $hybrone_avatar_background;
        svg {
          path {
            fill: $hybrone_background_color;
          }
        }
      }
      &:disabled {
        background-color: #fff;

        svg {
          path {
            fill: $hybrone_disabled_color;
          }
        }
      }
    }
  }
}
.map-filter-device {
  position: absolute;
  min-width: 93%;
  height: 85px;
  display: flex;
  flex-direction: row;
  align-content: left;
  justify-content: space-between;

  //   left: 150px;
  background: rgba(255, 255, 255, 0.75) !important;
  z-index: 9999;
  //   max-width: 1600px !important;
  padding: 0px;
  padding-left: 23px;
  margin-left: 14px;
  @extend .list-device;
  .filter {
    margin-right: 450px;
  }
}
</style>
