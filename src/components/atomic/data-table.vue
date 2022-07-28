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
    @sort-change="handleServiceSorting"
    :row-class-name="rowClassName"
    height="100%"
  >
    <el-table-column type="selection" width="55"> </el-table-column>

    <el-table-column header-align="left" prop="code" label="ID" width="180">
      <template slot-scope="scope">
        <!-- <SvgIconWarning v-if="scope.row.show_warning"></SvgIconWarning> -->
        {{ scope.row.code }}
      </template>
    </el-table-column>

    <el-table-column
      header-align="left"
      prop="name"
      label="LOKASYON"
      width="180"
    >
      <template slot-scope="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column header-align="left" prop="code" label="KASA SAYISI">
      <template slot-scope="scope">
        <span class="case-count">
          {{ 2 || scope.row.receiptHeader3 }}
        </span>
      </template>
    </el-table-column>
    <el-table-column header-align="left" prop="code" label="TOPLAM İŞLEM">
      <template slot-scope="scope">
        <span class="total-count">
          {{
            scope.row.fraudCounts.totalActivityCount || scope.row.receiptHeader3
          }}
        </span>
      </template>
    </el-table-column>
    <el-table-column header-align="left" prop="code" label="ŞÜPHELİ İŞLEM">
      <template slot-scope="scope">
        <span class="suspicion-count">
          {{ scope.row.fraudCounts.notAnnotatedCount }}
        </span>
      </template>
    </el-table-column>
    <el-table-column header-align="left" prop="code" label="ANALİZ">
      <template slot-scope="scope">
        <span class="analysis-count">
          {{ scope.row.fraudCounts.modelSuspectCount }}
        </span>
      </template>
    </el-table-column>
    <el-table-column header-align="left" prop="code" label="KAÇAK">
      <template slot-scope="scope">
        <span class="fraud-count">
          {{ scope.row.fraudCounts.annotatedFraudCount }}
        </span>
      </template>
    </el-table-column>
    <el-table-column
      align="left"
      prop="updated_at"
      label="KAÇAK / TOPLAM İŞLEM"
      width="280"
    >
      <template slot-scope="scope">
        <!-- total: 53 || scope.row.receiptHeader3,
            suspicion: 25 || scope.row.receiptHeader3,
            analysis: 3 || scope.row.receiptHeader3,
            fraud: 5 || scope.row.receiptHeader3 -->
        <ProgressStatus
          :data="{
            total: scope.row.fraudCounts.totalActivityCount,
            suspicion: scope.row.fraudCounts.notAnnotatedCount,
            analysis: scope.row.fraudCounts.annotatedCount,
            fraud: scope.row.fraudCounts.annotatedFraudCount
          }"
        ></ProgressStatus>
      </template>
    </el-table-column>
  </el-table>
  <!-- Missions  -->
  <el-table
    v-loading="loading"
    v-else-if="['Missions'].includes(this.$route.name)"
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
    @sort-change="handleServiceSorting"
    :row-class-name="rowClassName"
    height="100%"
  >
    <el-table-column header-align="left" prop="code" label="FİŞ NO" width="180">
      <template slot-scope="scope">
        <!-- <SvgIconWarning v-if="scope.row.show_warning"></SvgIconWarning> -->
        {{ scope.row.details.receiptNo ? scope.row.details.receiptNo : '-' }}
      </template>
    </el-table-column>

    <el-table-column
      header-align="left"
      prop="name"
      label="LOKASYON"
      width="180"
    >
      <template slot-scope="scope">
        {{ scope.row.store.receiptHeader3 }}
      </template>
    </el-table-column>
    <el-table-column header-align="left" prop="code" label="KASA">
      <template slot-scope="scope">
        {{ scope.row.details.posCode }}
      </template>
    </el-table-column>
    <el-table-column header-align="left" prop="code" label="KASİYER">
      <template slot-scope="scope">
        {{ scope.row.cashier.fullName }}
      </template>
    </el-table-column>
    <el-table-column header-align="left" prop="code" label="İŞLEM">
      <template slot-scope="scope">
        {{ 0 || RegisterActivityType[scope.row.activityType] }}
      </template>
    </el-table-column>
    <!-- <el-table-column
      header-align="left"
      prop="code"
      label="ŞÜPHELİ İŞLEM DURUMU"
    >
      <template slot-scope="scope">
        {{
          scope.row.modelPrediction
            ? scope.row.modelPrediction.predictionConfiedence
            : '-'
        }}
      </template>
    </el-table-column> -->
    <el-table-column header-align="left" prop="code" label="KAÇAK">
      <template slot-scope="scope">
        <div
          :class="
            scope.row.adminAnnotation == undefined
              ? 'status-badge-wait'
              : scope.row.adminAnnotation.annotationType == 1
              ? 'status-badge-error'
              : 'status-badge-success'
          "
        >
          {{
            scope.row.adminAnnotation == undefined
              ? 'Bekliyor'
              : scope.row.adminAnnotation.annotationType == 1
              ? 'Evet'
              : 'Hayır'
          }}
        </div>
      </template>
    </el-table-column>
    <el-table-column header-align="left" prop="code" label="PERSONEL">
      <template slot-scope="scope">
        {{ getUsername || scope.row.adminAnnotation.sentinelUserName }}
      </template>
    </el-table-column>
    <el-table-column
      property="start_time"
      label="DURUM ZAMANI"
      min-width="100"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.date) }}
      </template>
    </el-table-column>
  </el-table>
  <!-- Missions Report -->
  <el-table
    v-loading="loading"
    v-else-if="['MissionsReport'].includes(this.$route.name)"
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
    @sort-change="handleServiceSorting"
    :row-class-name="rowClassName"
    height="100%"
  >
    <el-table-column header-align="left" prop="code" label="ID" width="180">
      <template slot-scope="scope">
        <!-- <SvgIconWarning v-if="scope.row.show_warning"></SvgIconWarning> -->
        {{ scope.row.details.receiptNo ? scope.row.details.receiptNo : '-' }}
      </template>
    </el-table-column>

    <el-table-column
      header-align="left"
      prop="name"
      label="LOKASYON"
      width="180"
    >
      <template slot-scope="scope">
        {{ scope.row.store.receiptHeader3 }}
      </template>
    </el-table-column>
    <el-table-column header-align="left" prop="code" label="KASA">
      <template slot-scope="scope">
        {{ scope.row.details.posCode }}
      </template>
    </el-table-column>
    <el-table-column header-align="left" prop="code" label="KASİYER">
      <template slot-scope="scope">
        {{ scope.row.cashier.fullName }}
      </template>
    </el-table-column>
    <el-table-column header-align="left" prop="code" label="İŞLEM">
      <template slot-scope="scope">
        {{ 0 || RegisterActivityType[scope.row.activityType] }}
      </template>
    </el-table-column>
    <!-- <el-table-column
      header-align="left"
      prop="code"
      label="ŞÜPHELİ İŞLEM DURUMU"
    >
      <template slot-scope="scope">
        {{
          scope.row.modelPrediction
            ? scope.row.modelPrediction.predictionConfiedence
            : '-'
        }}
      </template>
    </el-table-column> -->

    <el-table-column
      property="start_time"
      label="DURUM ZAMANI"
      min-width="100"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.date) }}
      </template>
    </el-table-column>
  </el-table>
  <!-- İstasyonlar -->
  <el-table
    v-loading="loading"
    v-else-if="['Premises'].includes(this.$route.name)"
    ref="singleTable"
    :data="data"
    :header-cell-style="{ color: '#444444' }"
    style="width: 97%; max-height: calc(100vh - 75px);  margin-left 20px; overflow: scroll;"
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

    <el-table-column
      property="premise_name"
      label="İSTASYON ADI"
      min-width="80"
    >
      <!-- <template slot-scope="scope">
        {{ scope.custom_premise_id }}
      </template> -->
    </el-table-column>
    <el-table-column property="location" label="LOKASYON" min-width="80">
    </el-table-column>
    <el-table-column property="fault_type" label="ARIZA TİPİ" min-width="150">
    </el-table-column>
    <el-table-column property="service_state" label="DURUM" min-width="80">
    </el-table-column>
    <!---->
    <el-table-column
      property="start_time"
      label="PLANLANAN BAŞLANGIÇ TARİHİ"
      min-width="100"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.start_time) }}
      </template>
    </el-table-column>
    <el-table-column
      property="finish_time"
      label="PLANLANAN BİTİŞ TARİHİ"
      min-width="100"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.finish_time) }}
      </template>
    </el-table-column>

    <el-table-column
      align="right"
      property="created_at"
      label="OLUŞTURULMA TARİHİ"
      min-width="100"
      show-overflow-tooltip
      ><template slot-scope="scope">
        {{ formattedDatetime(scope.row.created_at) }}
      </template>
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="ticket_finished_time"
      label="TAMAMLANMA ZAMANI"
      min-width="100"
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.ticket_finished_time) }}
      </template>
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
  <!--Geçmiş Sinyaller Kullanıcı İşlemleri
  <el-table
    v-loading="loading"
    v-else-if="['StoreDetail'].includes(this.$route.name)"
    ref="singleTable"
    class="data-table"
    :data="data"
    stripe
    style="width: 99%; max-height: calc(100vh - 180px); overflow: none"
    height="100%"
    :header-cell-style="
      this.$route.name === 'StoreDetail'
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
    <el-table-column header-align="left" prop="state" label="DURUM" width="450">
    </el-table-column>
     <el-table-column header-align="left" prop="signal_type.sub_category" label="KATEGORİ">
    </el-table-column> 
    <el-table-column header-align="left" prop="channel_id" label="OLAY KAYDI">
      <template slot-scope="scope">
        <SvgIconDownload
          @click.native.prevent="downloadEventRecord(scope.row)"
          :status="scope.row.is_active"
        ></SvgIconDownload>
      </template>
    </el-table-column>

    <el-table-column
      prop="channel_id"
      header-align="right"
      align="right"
      label="OLAY ZAMANI"
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.event_date) }}
      </template>
    </el-table-column>
    <el-table-column
      prop="channel_id"
      header-align="right"
      align="right"
      label="İŞLEMLER"
    >
      <template slot-scope="scope">
		  {{}}
        <el-button type="button" @click="(scope.row.id)"> Open Modal</el-button>
      </template>
    </el-table-column>
  </el-table>-->
  <!-- Fraud Analiz Tablosu -->
  <el-table
    v-loading="loading"
    v-else-if="['StoreDetail'].includes(this.$route.name)"
    ref="singleTable"
    class="data-table"
    :data="data"
    stripe
    style="width: 99%; max-height: calc(100vh - 180px); overflow: none"
    height="100%"
    @row-dblclick="handleDBClick"
    :header-cell-style="
      this.$route.name === 'StoreDetail'
        ? { background: '#f5f5f5', color: '#444444' }
        : ''
    "
  >
    <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
    <el-table-column
      header-align="left"
      prop="details.receiptNo"
      label="FİŞ NO"
    >
      <template slot-scope="scope">
        {{ scope.row.details.receiptNo ? scope.row.details.receiptNo : '-' }}
      </template>
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="posCode"
      label="KASA"
      width="450"
    >
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="cashier.fullName"
      label="KASİYER"
    >
    </el-table-column>
    <el-table-column header-align="left" prop="description" label="AÇIKLAMA">
    </el-table-column>
    <el-table-column header-align="left" label="KAÇAK">
      <template slot-scope="scope">
        <div
          :class="
            scope.row.adminAnnotation == undefined
              ? 'status-badge-wait'
              : scope.row.adminAnnotation.annotationType == 1
              ? 'status-badge-error'
              : 'status-badge-success'
          "
        >
          {{
            scope.row.adminAnnotation == undefined
              ? 'Bekliyor'
              : scope.row.adminAnnotation.annotationType == 1
              ? 'Evet'
              : 'Hayır'
          }}
        </div>
      </template>
    </el-table-column>
    <el-table-column header-align="left" prop="userCode" label="PERSONEL">
    </el-table-column>
    <el-table-column
      prop="channel_id"
      header-align="right"
      align="right"
      label="OLAY ZAMANI"
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.event_date) }}
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
import SvgIconBattery from '@/components/atomic/device/hap/svg-icon-battery.vue'
import SvgIconServiceRequest from '@/assets/icons/list/svg-icon-is-service-request'
import SvgIconDeviceInterface from '@/assets/icons/list/svg-icon-device-interface'
// import SvgIconWarning from '@/assets/icons/list/svg-icon-warning.vue'
import ProgressStatus from '@/components/list/ProgressStatus'
import { PERSONAL_TITLES } from '@/constant.js'
import { bus } from '@/main.js'
import { dateTimeChange } from '@/utils.js'
import { mapActions, mapGetters } from 'vuex'
import store from '@/store'
export default {
  name: 'DataTable',
  data() {
    return {
      RegisterActivityType: {
        0: 'SATIŞ',
        1: 'İADE',
        2: 'FİŞ İPTAL',
        3: 'FİYAT SORGULAMA'
      },
      multiple_selection: [],
      bus: {},
      loading: true
    }
  },
  components: {
    // SvgIconDownload,
    // SvgIconWarning,
    // SvgIconFirstChannel,
    // SvgIconFirstChannels,
    // SvgIconServiceRequest,
    // SvgIconDeviceInterface,
    ProgressStatus
    // SvgIconSecondChannel,
    // SvgIconThirdChannel,
    // SvgIconFourthChannel,
    // SvgIconSabotage,
    // SvgIconFault,
    // SvgIconCommunication,
    // SvgIconEnergy
    // SvgIconBattery,
    // SvgIconDisk,
    // SvgIconRecord,
    // SvgIconDateTime
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
    }),
    getUsername: () => {
      return 'hybrone'
    }
  },
  watch: {
    data: function (val) {
      console.log('DataTable Prop', val)
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
      setSelectedRow: 'dataTable/setSelectedRow',
      setCurrentPremise: 'premise/setCurrentPremise'
      // setLocation: "map/setLocation",
    }),
    getTitle(val) {
      return PERSONAL_TITLES.filter((item) => {
        return item.key === val
      })
    },
    formattedDatetime(val) {
      let result = val ? val.toString().split('-')[0] != '0001' : false
      if (result) return dateTimeChange(val)
      else if (['Services'].includes(this.$route.name))
        return 'Henüz Tamanlanmadı'
      else return 'Bilgi Alınamadı'
    },
    interfaceClickHandle(val) {
      console.log('https://' + val.row.host + ':' + val.row.port)
      if (process.env.IS_ELECTRON)
        require('electron').shell.openExternal(
          'http://' + val.row.host + ':' + val.row.port
        )
      else {
        let href = 'http://' + val.row.host + ':' + val.row.port
        window.open(href, '_blank')
      }
    },
    handleServiceSorting(val) {
      if (['List'].includes(this.$route.name)) {
        if (val.order === 'ascending') {
          bus.$emit('onServiceSorting', { state: 'is_service' })
        } else {
          bus.$emit('onServiceSorting', {})
        }
      }
      //    else {
      //     if (val.order === 'ascending') {
      //       bus.$emit('onTrackedServiceSorting', { is_service: true })
      //     } else {
      //       bus.$emit('onTrackedServiceSorting', {})
      //     }
      //   }
    },
    handleDBClick(val) {
      if (
        ['List', 'Dashboard'].includes(this.$route.name) &&
        this.getPermissions['device_show_in_dashboard']
        // && this.getPermissions['device_show_in_dashboard']
      ) {
        // this.$router.push({
        //   name: 'DeviceDetail',
        //   params: { device_id: val.id }
        // })
        console.log('DB Click', val)
        this.$router.push({
          name: 'StoreDetail',
          params: { store_id: val.code }
        })
        this.setSelectedRow(val)
      } else if (['StoreDetail', 'Missions'].includes(this.$route.name)) {
        bus.$emit('storeOpenModal', val)
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
      this.setSelectedRow({})
      if (this.$route.name === 'Premises') {
        this.setCurrentPremise(row)
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
        this.setSelectedRow(row)
        bus.$emit('onCurrentChangeRowPremise', row)
      }
    },
    downloadEventRecord(val) {
      this.$emit('onDownloadEventRecord', val)
    }
  },
  created() {},
  mounted() {}
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
.total-count {
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #a0a0a0;
}
.suspicion-count {
  @extend .total-count;
  color: #444444;
}
.analysis-count {
  @extend .total-count;
  color: #6fcf97;
}
.fraud-count {
  @extend .total-count;
  color: #e04141;
}
.status-badge {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 80px;
  min-height: 36px;
  border-radius: 5px;
  color: $hybrone_background_color !important;
  &-wait {
    @extend .status-badge;
    background: #a0a0a0 !important;
  }
  &-success {
    @extend .status-badge;

    background: #6fcf97 !important;
  }
  &-error {
    @extend .status-badge;

    background: #eb5757 !important;
  }
}
</style>
