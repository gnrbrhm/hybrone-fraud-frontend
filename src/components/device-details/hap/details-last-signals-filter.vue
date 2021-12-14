<template>
  <div class="last-signals-filter-container">
    <div class="component">
      <span>SİNYAL TİPİ</span>
      <el-select
        style="width: 100%"
        v-model="signals_code"
        multiple
        collapse-tags
        placeholder="Seçiniz"
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
      <span>BAŞLANGIÇ </span>
      <el-date-picker
        style="width: 100%"
        v-model="filtered_data.start_time"
        type="date"
        placeholder="Başlangıç tarihi seçiniz"
      >
      </el-date-picker>
    </div>

    <div class="component">
      <span>BİTİŞ </span>
      <el-date-picker
        style="width: 100%"
        v-model="filtered_data.finish_time"
        type="date"
        placeholder="Bitiş tarihi seçiniz"
        @change="handleDateTimeChange"
      >
      </el-date-picker>
    </div>
    <div class="component">
      <el-button type="info" class="search-button" @click="onFilteredDataClick">
        <SvgIconSearch></SvgIconSearch>
      </el-button>
    </div>
    <div class="component">
      <el-button @click="handleClearFilterData">Temizle</el-button>
    </div>
  </div>
</template>

<script>
import { SIGNALS_TYPES } from '@/constant'
import SvgIconSearch from '@/assets/icons/list/svg-icon-search.vue'
import Vue from 'vue'

export default {
  name: 'DeviceDetailsLastSignalsFilter',
  components: { SvgIconSearch },
  data() {
    return {
      signals_code: [],
      filtered_data: {
        signal_code: [],
        start_time: null,
        finish_time: null
      },
      status_options: []
    }
  },
  methods: {
    handleDateTimeChange(val) {
      if (this.filtered_data.start_time > val) {
        Vue.notify({
          text: 'Lütfen bitiş tarihinin başlangıç tarihinden sonra olduğuna emin olunuz !',
          group: 'error-template',
          type: 'error'
        })
        this.filtered_data.finish_time = null
      }
    },
    onFilteredDataClick() {
      this.filtered_data.signal_code = this.signals_code.join()
      // 	Object.keys(this.filtered_data).forEach((item) => {
      // 		if(Array.isArray(this.filtered_data[item])){
      // 			this.filtered_data.signal_code = this.filtered_data[item].join();
      // 		}
      //   });
      this.$emit('onFilteredData', this.filtered_data)
    },
    handleClearFilterData() {
      Object.keys(this.filtered_data).forEach((item) => {
        this.filtered_data[item] = ''
      })
      this.signals_code = []
      this.$emit('onFilteredData', {})
    }
  },
  created() {
    this.status_options = [...SIGNALS_TYPES]
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.last-signals-filter-container {
  display: flex;
  flex-direction: row;
  //   background: rgba(160, 160, 160, 0.1);
  background: $hybrone_header_background_color;

  max-width: 100%;
  border-radius: 10px;
  align-content: left;
  justify-content: flex-start;
  // justify-content: flex-start;
  align-items: center;
  height: 85px;
  padding-left: 29px;
  .component {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: self-end;
    justify-content: space-between;
    flex-wrap: nowrap;
    margin-right: 10px;
    height: 65px;
    &:nth-child(0) {
      margin-left: 23px;
    }
  }
  //   display: flex;
  //   flex-direction: row;
  //   align-content: left;
  //   align-items: center;
  //   justify-content: flex-start;

  span {
    @extend .sentinel-label;
  }
  input {
    @extend .sentinel-input;
  }
  button {
    margin-top: 15px;
    @extend .sentinel-button;

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
  .search-button {
    // @extend .sentinel-button;
    width: 50px;
    height: 50px;
    margin-top: 15px;
    padding: initial;
    // &:hover {
    //   background-color: $hybrone_background_color;
    //   border-color: $hybrone_light_blue;
    // }
  }
}
</style>
