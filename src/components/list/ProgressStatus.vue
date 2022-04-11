<template>
  <div class="progress-container">
    <div class="right">
      <span>%{{ ((100 / data.total) * data.fraud).toFixed(2) }}</span>
    </div>
    <div class="left">
      <el-progress
        :percentage="(100 / data.total) * data.fraud"
        :color="errorColors"
        :format="format"
      ></el-progress>
      <el-progress
        :percentage="(100 / data.total) * data.analysis"
        :color="customColorMethod('success')"
        :format="format"
      ></el-progress>
      <el-progress
        :percentage="(100 / data.total) * data.suspicion"
        :color="customColorMethod('suspicion')"
        :format="format"
      ></el-progress>
      <el-progress
        :percentage="(100 / data.total) * data.total"
        :color="customColorMethod('total')"
        :format="format"
      ></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressStatus',
  data() {
    return {
      errorColors: [
        { color: '#E04141', percentage: 100 },
        { color: '#E0414100', percentage: 0 }
      ]
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    format(percentage) {
      // return percentage === 100 ? 'Full' : `${percentage}%`;
      return ''
    },
    customColorMethod(status) {
      if (status == 'total') {
        return '#ECECEC'
      } else if (status == 'suspicion') {
        return '#444444'
      } else if (status == 'success') {
        return '#6FCF97'
      } else if (status == 'failed') {
        return [
          { color: '#E04141', percentage: 100 },
          { color: '#E0414100', percentage: 0 }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
.progress-container {
  display: flex;
  flex-direction: row;
  max-width: 260px;
  .left {
    width: 80%;
    flex-direction: column;
  }
  .right {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-family: 'Roboto';
      font-style: normal !important;
      font-weight: 500 !important;
      font-size: 14px !important;
      line-height: 16px !important;
      display: flex;
      align-items: center;
      text-align: right;
      letter-spacing: -0.387234px;
      color: #e04141;
    }
  }
  .el-progress-bar__outer {
    background-color: #ffffff;
  }
  .el-progress--line {
    width: 100%;
  }
  .el-progress .el-progress--line {
    width: 80%;
    margin: 0px;
  }
}
</style>
