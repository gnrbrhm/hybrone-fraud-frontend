<template>
  <div class="action-content">
    <div class="content">
      <span class="span-label">RAPORLANAMASIN (KRONİK HATA)</span>
      <el-select v-model="chronic_fault" placeholder="Seçiniz" clearable>
        <el-option
          v-for="item in fault_options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="content">
      <span class="span-label">LOKASYON DEVRE DIŞI BIRAKILSIN</span>
      <el-select v-model="location_off" placeholder="Seçiniz" clearable>
        <el-option
          v-for="item in location_off_options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { ACTIONS_FIELDS } from '@/constant'

export default {
  name: 'DeviceActions',
  data() {
    return {
      chronic_fault: null,
      fault_options: [],
      location_off: null,
      location_off_options: []
    }
  },
  created() {
    this.fault_options = [
      //   ...ACTIONS_FIELDS["ACTIONS"],
      ...ACTIONS_FIELDS['ACTIONS'][0]['cronic_fault']['options']
    ]
    this.location_off_options = [
      //   ...ACTIONS_FIELDS["ACTIONS"],
      ...ACTIONS_FIELDS['ACTIONS'][0]['location_off']['options']
    ]
    console.log(this.fault_options)
  }
}
</script>

<style></style>
