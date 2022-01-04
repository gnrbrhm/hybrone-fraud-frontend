<template>
  <!-- Liste Dashboard Tracked Device  -->
  <el-table
    v-loading="loading"
    v-if="['List', 'Dashboard'].includes(this.$route.name)"
    ref="singleTable"
    class="data-table"
    :data="data"
    style="width: 99%; max-height: calc(100vh - 180px); overflow: none"
    @row-dblclick="handleDBClick"
    :header-cell-style="
      this.$route.name == 'List'
        ? { background: '#f5f5f5', color: '#444444' }
        : { color: '#444444' }
    "
    @selection-change="handleSelectionChange"
    :row-class-name="rowClassName"
    height="100%"
  >
    <el-table-column type="selection" width="55"> </el-table-column>

    <el-table-column
      header-align="left"
      prop="premise.custom_premise_id"
      label="İSTASYON KODU"
      width="180"
    >
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="premise.custom_premise_name"
      label="MAĞAZA ADI"
    >
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="premise.location.city.name"
      label="LOKASYON"
      width="180"
    >
    </el-table-column>

    <!--   <el-table-column
      header-align="left"
      prop="description"
      label="Açıklama"
      width="300"
    >
    </el-table-column> -->
    <el-table-column
      header-align="left"
      prop="device_brand.name"
      label="CİHAZ"
      width="180"
    >
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="device_state"
      label="CİHAZ DURUMLARI"
    >
      <template slot-scope="scope">
        <ul>
          <li class="device-channel-icon">
            <SvgIconFirstChannels
              :status="
                scope.row.is_active == true && scope.row.events.length > 0
                  ? scope.row.events[0]
                    ? scope.row.events[0].is_active
                    : null
                  : null
              "
            ></SvgIconFirstChannels>
          </li>
          <li class="device-channel-icon">
            <SvgIconSecondChannel
              :status="
                scope.row.is_active == true && scope.row.events.length > 0
                  ? scope.row.events[1]
                    ? scope.row.events[1].is_active
                    : null
                  : null
              "
            ></SvgIconSecondChannel>
          </li>
          <li class="device-channel-icon">
            <SvgIconThirdChannel
              :status="
                scope.row.is_active == true && scope.row.events.length > 0
                  ? scope.row.events[2]
                    ? scope.row.events[2].is_active
                    : null
                  : null
              "
            ></SvgIconThirdChannel>
          </li>
          <li class="device-channel-icon">
            <SvgIconFourthChannel
              :status="
                scope.row.is_active == true && scope.row.events.length > 0
                  ? scope.row.events[3]
                    ? scope.row.events[3].is_active
                    : null
                  : null
              "
            ></SvgIconFourthChannel>
          </li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column header-align="left" prop="state" label="">
      <template slot-scope="scope">
        <ul>
          <li class="device-state-icon">
            <SvgIconCommunication
              :status="
                scope.row.is_active == true ? !scope.row.network_error : null
              "
            ></SvgIconCommunication>
          </li>
          <li class="device-state-icon">
            <SvgIconDisk
              :status="
                scope.row.is_active == true ? !scope.row.disk_error : null
              "
            ></SvgIconDisk>
          </li>
          <li class="device-state-icon">
            <SvgIconRecord
              :status="
                scope.row.is_active == true ? !scope.row.record_error : null
              "
            ></SvgIconRecord>
          </li>
          <li class="device-state-icon">
            <SvgIconDateTime
              :status="
                scope.row.is_active == true ? !scope.row.datetime_error : null
              "
            ></SvgIconDateTime>
          </li>
        </ul>
      </template>
    </el-table-column>
    <!-- <el-table-column
      align="center"
      prop="has_service"
      label="Servis"
      width="180"
    >
      <template slot-scope="scope">
        <SvgIconServiceRequest
          :is_ticket="scope.is_active"
        ></SvgIconServiceRequest>
      </template>
    </el-table-column> -->
    <el-table-column
      align="left"
      prop="updated_at"
      label="SON SİNYAL"
      width="180"
    >
      <template slot-scope="scope">
        {{
          scope.row.last_signal == null ||
          scope.row.last_signal == '0001-01-01T00:00:00Z' ||
          scope.row.last_signal == '0001-01-01T01:55:52+01:55'
            ? 'Bilgi Alınamadı'
            : formattedDatetime(scope.row.last_signal)
        }}
      </template>
    </el-table-column>
    <!-- <el-table-column header-align="center" prop="last_state" label="Sorgu">
      <template slot-scope="scope">
        <SvgIconQuery :status="scope.is_active"></SvgIconQuery>
      </template>
    </el-table-column> -->
  </el-table>
  <!-- Mekanlar -->
  <el-table
    v-loading="loading"
    v-else-if="['Premises'].includes(this.$route.name)"
    ref="singleTable"
    :data="data"
    :header-cell-style="{ color: '#444444' }"
    style="width: 97%; max-height: calc(100vh - 180px);  margin-left 20px; overflow: scroll;"
    stripe
    highlight-current-row
    @current-change="handleCurrentChange"
    :row-class-name="rowClassName"
  >
    <el-table-column
      property="custom_premise_id"
      label="İSTASYON KODU"
      min-width="50"
    ></el-table-column>
    <el-table-column
      property="location.city.name"
      label="LOKASYON"
      min-width="100"
      align="center"
    ></el-table-column>

    <el-table-column
      property="created_at"
      label="OLUŞTURULMA ZAMANI"
      min-width="100"
      align="right"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.created_at) }}
      </template>
    </el-table-column>
  </el-table>
  <!--Servisler-->
  <el-table
    v-loading="loading"
    v-else-if="['Services'].includes(this.$route.name)"
    ref="singleTable"
    :data="data"
    :header-cell-style="
      this.$route.name === 'Services'
        ? { background: '#f5f5f5', color: '#444444' }
        : ''
    "
    style="width: 100%; max-height: calc(100vh - 180px); overflow: none"
    stripe
    highlight-current-row
    @selection-change="handleSelectionChange"
    height="100%"
  >
    <el-table-column type="selection" width="55"> </el-table-column>
    <el-table-column property="premise_id" label="İSTASYON KODU" min-width="55">
    </el-table-column>
    <el-table-column property="location" label="LOKASYON" min-width="80">
    </el-table-column>

    <el-table-column
      property="premise_name"
      label="İSTASYON ADI"
      min-width="80"
    >
      <!-- <template slot-scope="scope">
        {{ scope.custom_premise_id }}
      </template> -->
    </el-table-column>
    <el-table-column property="fault_type" label="Arıza Tipi" min-width="150">
    </el-table-column>
    <el-table-column property="service_state" label="Durum" min-width="80">
    </el-table-column>
    <!---->
    <el-table-column
      property="started_at"
      label="BAŞLANGIÇ TARİHİ"
      min-width="100"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      property="ended_at"
      label="BİTİŞ TARİHİ"
      min-width="100"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      align="right"
      property="created_at"
      label="OLUŞTURULMA TARİHİ"
      min-width="100"
      show-overflow-tooltip
    >
    </el-table-column>
  </el-table>
  <!--Logs Kullanıcı İşlemleri-->
  <el-table
    v-loading="loading"
    v-else-if="['Logs'].includes(this.$route.name)"
    ref="singleTable"
    class="data-table"
    :data="data"
    stripe
    style="width: 99%; max-height: calc(100vh - 180px); overflow: none"
    height="100%"
  >
    <el-table-column header-align="left" prop="user" label="Kullanıcı">
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="description"
      label="Olay Açıklaması"
    >
    </el-table-column>

    <el-table-column
      header-align="left"
      prop="created_at"
      label="Oluşturulma Zamanı"
    >
    </el-table-column>
  </el-table>
  <!--Geçmiş Sinyaller Kullanıcı İşlemleri-->
  <el-table
    v-loading="loading"
    v-else-if="['DeviceLastSignals'].includes(this.$route.name)"
    ref="singleTable"
    class="data-table"
    :data="data"
    stripe
    style="width: 99%; max-height: calc(100vh - 180px); overflow: none"
    height="100%"
    :header-cell-style="
      this.$route.name === 'DeviceLastSignals'
        ? { background: '#f5f5f5', color: '#444444' }
        : ''
    "
  >
    <el-table-column type="selection" width="55"> </el-table-column>
    <el-table-column header-align="left" prop="channel_id" label="KANAL">
      <template slot-scope="scope">
        <SvgIconFirstChannel
          :status="true"
          :device_id="scope.row.channel_id"
        ></SvgIconFirstChannel>
      </template>
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="channel_id"
      label="DURUM"
      width="450"
    >
    </el-table-column>
    <!-- <el-table-column header-align="left" prop="signal_type.sub_category" label="KATEGORİ">
    </el-table-column> -->
    <el-table-column header-align="left" prop="channel_id" label="OLAY KAYDI">
      <template slot-scope="scope">
        <SvgIconDownload
          @click.native.prevent="downloadEventRecord(scope.row.event_id)"
          :status="scope.row.is_active"
        ></SvgIconDownload>
      </template>
    </el-table-column>
    <!-- <el-table-column
      header-align="left"
      prop="signal_type.description"
      label="OLAY AÇIKLAMASI"
    >
    </el-table-column> -->
    <el-table-column
      prop="channel_id"
      header-align="right"
      align="right"
      label="OLAY ZAMANI"
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.updated_at) }}
      </template>
    </el-table-column>
  </el-table>
  <!--Kullanıcı Tablosu İşlemleri-->
  <el-table
    v-loading="loading"
    v-else-if="['UserPermissions'].includes(this.$route.name)"
    ref="singleTable"
    class="data-table"
    :data="data"
    stripe
    highlight-current-row
    style="width: 99%; min-height: calc(100vh - 180px); overflow: none"
    height="100%"
    :header-cell-style="
      this.$route.name !== 'UserPermissions'
        ? { background: '#f5f5f5', color: '#444444' }
        : { color: '#444444' }
    "
    @current-change="handleCurrentChange"
    :row-class-name="rowClassName"
  >
    <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
    <el-table-column header-align="left" prop="name" label="ADI SOYADI">
      <!-- <template slot-scope="scope"
        >{{ scope.row.user.name + '' + scope.row.user.surname }}
      </template> -->
    </el-table-column>
    <!-- <el-table-column header-align="left" prop="signal_type.sub_category" label="KATEGORİ">
    </el-table-column> -->
    <el-table-column header-align="left" prop="username" label="EMAİL ADRESİ">
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="permission_grup"
      label="YETKİ GRUBU"
    >
      <template slot-scope="scope">
        {{ getTitle(scope.row.type)[0].label }}
      </template>
    </el-table-column>
    <el-table-column
      prop="created_at"
      header-align="right"
      align="right"
      label="OLUŞTURULMA ZAMANI"
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.created_at) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import SvgIconDownload from '@/assets/icons/device-details/svg-icon-download.vue'
// import SvgIconArmed from '@/components/atomic/device/hap/svg-icon-armed.vue'
import SvgIconFirstChannels from '@/components/atomic/device/camera/svg-icon-first-channel'
import SvgIconSecondChannel from '@/components/atomic/device/camera/svg-icon-second-channel'
import SvgIconThirdChannel from '@/components/atomic/device/camera/svg-icon-third-channel'
import SvgIconFourthChannel from '@/components/atomic/device/camera/svg-icon-fourth-channel'
import SvgIconDisk from '@/components/atomic/device/camera/svg-icon-disk'
import SvgIconRecord from '@/components/atomic/device/camera/svg-icon-record'
import SvgIconDateTime from '@/components/atomic/device/camera/svg-icon-datetime'
import SvgIconFirstChannel from '@/assets/icons/device-details/svg-icon-first-channel.vue'
import SvgIconAlarm from '@/components/atomic/device/hap/svg-icon-alarm.vue'
import SvgIconFault from '@/components/atomic/device/hap/svg-icon-fault.vue'
import SvgIconSabotage from '@/components/atomic/device/hap/svg-icon-sabotage.vue'
import SvgIconCommunication from '@/components/atomic/device/hap/svg-icon-communication.vue'
import SvgIconEnergy from '@/components/atomic/device/hap/svg-icon-energy.vue'
// import SvgIconServiceRequest from "@/components/atomic/device/hap/svg-icon-is-service-request.vue";
import SvgIconBattery from '@/components/atomic/device/hap/svg-icon-battery.vue'
// import SvgIconQuery from "@/components/atomic/device/hap/svg-icon-query.vue";

import { PERSONAL_TITLES } from '@/constant.js'
import { bus } from '@/main.js'
import { dateTimeChange } from '@/utils.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'DataTable',
  data() {
    return {
      multiple_selection: [],
      bus: {},
      loading: true
    }
  },
  components: {
    SvgIconDownload,
    // SvgIconArmed,
    SvgIconFirstChannel,
    SvgIconFirstChannels,
    // SvgIconAlarm,
    SvgIconSecondChannel,
    SvgIconThirdChannel,
    SvgIconFourthChannel,
    // SvgIconSabotage,
    // SvgIconFault,
    SvgIconCommunication,
    // SvgIconEnergy,
    // SvgIconBattery,
    SvgIconDisk,
    SvgIconRecord,
    SvgIconDateTime
    // SvgIconServiceRequest,
    // SvgIconQuery,
  },
  props: {
    data: {
      default: []
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: 'auth/getPermissions'
    })
  },
  watch: {
    data: function (val) {
      console.log(' Wacher val', val)
      if (val) {
        this.loading = false
      } else {
        if (
          [
            'Dashboard',
            'List',
            'Premises',
            'DeviceLastSignals'
            // 'UserPermissions'
          ].includes(this.$route.name)
        )
          this.loading = false
        else this.loading = true
      }
      if (val && this.$route.name == 'Premises') this.setCurrent(val[0])
    }
  },
  methods: {
    ...mapActions({
      setSelectedRows: 'dataTable/setSelectedRows',
      setSelectedRow: 'dataTable/setSelectedRow'
      // setLocation: "map/setLocation",
    }),
    getTitle(val) {
      return PERSONAL_TITLES.filter((item) => {
        return item.key === val
      })
    },
    formattedDatetime(val) {
      //   console.log(val)
      return dateTimeChange(val)
    },
    handleDBClick(val) {
      if (
        ['List', 'Dashboard'].includes(this.$route.name)
        // && this.getPermissions['device_show_in_dashboard']
      ) {
        this.$router.push({
          name: 'DeviceDetail',
          params: { device_id: val.id }
        })
        this.setSelectedRow(val)
      }
    },
    rowClassName({ row }) {
      return this.$refs.singleTable.selection.find(
        (element) => element.id == row.id
      )
        ? 'selected-row'
        : ''
    },
    handleSelectionChange(val) {
      this.setSelectedRows(val)
    },
    async setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
      this.setSelectedRow(row)
    },
    handleCurrentChange(row) {
      if (this.$route.name === 'Premises') {
        this.setSelectedRow(row)
        let location = {
          lat: row.location.lat,
          long: row.location.long
        }
        this.$store.dispatch('setLocation', {
          location: { ...location }
        })
        bus.$emit('onCurrentChangeRowPremise', row)
      } else {
        console.log('Else', row)
        this.setSelectedRow(row)
        bus.$emit('onCurrentChangeRowPremise', row)
      }
    },
    downloadEventRecord(val) {
      this.$emit('onDownloadEventRecord', val)
    }
  },
  created() {},
  mounted() {
    console.log('Mounted Data TAble', this.getTitle(this.data[0].type.label))
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';

.data-table {
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  align-items: center;
  color: #000000;
  // margin-top: 10px;
}
.data-table ul {
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  grid-gap: 5px;
  padding: 0px !important;
  margin: 0px;
}
.el-table .selected-row {
  background-color: $hybrone_selection_table_color !important;
  td {
    &:nth-child(1) {
      border-left: 10px solid $hybrone_light_blue !important;
    }
  }
}
.el-table .current-row {
  background-color: $hybrone_selection_table_color !important;
  td {
    &:nth-child(1) {
      border-left: 10px solid $hybrone_light_blue !important;
    }
  }
}
</style>
