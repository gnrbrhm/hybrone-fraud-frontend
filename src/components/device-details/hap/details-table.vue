<template>
  <el-table
    ref="detailsTable"
    :data="data"
    :header-cell-style="{ color: '#444444' }"
    style="width: 100%; max-height: calc(100vh - 180px); overflow: auto"
    stripe
    highlight-current-row
    height="600px"
  >
    <el-table-column
      property="id"
      label="BÖLGE"
      min-width="35"
      align="center"
    ></el-table-column>
    <el-table-column
      property="name"
      label="BÖLGE ADI"
      min-width="35"
      align="center"
    ></el-table-column>
    <el-table-column
      property="type_name"
      label="BÖLGE TİPİ"
      min-width="35"
      align="center"
    ></el-table-column>
    <el-table-column
      property="partition_name"
      label="BÖLÜM"
      min-width="35"
      align="center"
    ></el-table-column>
    <el-table-column
      property="alarm"
      label="ALARM"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope">
        <SvgIconAlarm
          :status="getDevice.communication == 0 ? 0 : scope.row.alarm"
        ></SvgIconAlarm>
      </template>
    </el-table-column>
    <el-table-column
      property="sabotage"
      label="SABOTAJ"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope">
        <SvgIconSabotage
          :status="getDevice.communication == 0 ? 0 : scope.row.sabotage"
        ></SvgIconSabotage>
      </template>
    </el-table-column>
    <el-table-column
      property="trouble"
      label="HATA"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope">
        <SvgIconFault
          :status="getDevice.communication == 0 ? 0 : scope.row.trouble"
        ></SvgIconFault>
      </template>
    </el-table-column>
    <el-table-column
      property="by_pass"
      label="BY-PASS"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope">
        <el-switch
          :disabled="true"
          v-model="scope.row.value"
          active-color="#1CEA87"
          inactive-color="#F2994A"
        >
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      property="off"
      label="DEVRE DIŞI"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope">
        <el-switch
          :disabled="true"
          v-model="scope.row.value2"
          active-color="#1CEA87"
          inactive-color="#F2994A"
        >
        </el-switch>
      </template>
    </el-table-column>
    <!-- <el-table-column
      property="camera"
      label="KAMERA"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope">
        <SvgIconFault
          :disabled="true"
          :status="getDevice.communication == 0 ? 0 : scope.row.fault"
        ></SvgIconFault>
      </template> 
    </el-table-column>-->
  </el-table>
</template>

<script>
import SvgIconAlarm from '@/components/atomic/device/hap/svg-icon-alarm.vue'
import SvgIconFault from '@/components/atomic/device/hap/svg-icon-fault.vue'
import SvgIconSabotage from '@/components/atomic/device/hap/svg-icon-sabotage.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'DetailsTable',
  components: {
    SvgIconAlarm,
    SvgIconFault,
    SvgIconSabotage
  },
  data() {
    return {}
  },
  props: {
    data: { default: [] }
  },
  computed: {
    ...mapGetters({
      getDevice: 'device/getDevice'
    })
  }
}
</script>

<style></style>
