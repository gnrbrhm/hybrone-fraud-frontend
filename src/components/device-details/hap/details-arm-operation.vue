<template>
  <div class="details-arm-operation" :disabled="disabled">
    <span >BÖLGE</span>
    <el-select
      v-model="hardware_type"
      class="zones-input"
      placeholder="Seçiniz"
      height="51px"
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
    <div class="status" >
      <SvgIconOpen :state="armed_status"></SvgIconOpen>
      <span class="status-description">
        {{ !armed_status ? "Sistem Devre Dışı" : "Sistem Ev Dışı Devrede" }}
      </span>
    </div>
    <div class="armed-action" >
      <div class="action">
        <SvgIconActionOutHome></SvgIconActionOutHome>
        <div class="description">
          <span class="action-description-title">Ev Dışı</span>
          <span class="action-description-text">Devreye Al</span>
        </div>
      </div>
      <div class="action">
        <SvgIconActionInHome></SvgIconActionInHome>
        <div class="description">
          <span class="action-description-title">Ev İçi</span>
          <span class="action-description-text">Devreye Al</span>
        </div>
      </div>
    </div>
    <div class="out-controller" >
      <div class="out-controller__title">Çıkış Kontrolü</div>
      <div class="out-controller__content"></div>
    </div>
  </div>
</template>

<script>
import SvgIconOpen from "@/components/atomic/device/hap/svg-icon-open.vue";
import SvgIconActionOutHome from "@/components/atomic/device/hap/svg-icon-action-out-home.vue";
import SvgIconActionInHome from "@/components/atomic/device/hap/svg-icon-action-in-home.vue";
export default {
  name: "DetailsArmOperation",
  components: {
    SvgIconOpen,
    SvgIconActionOutHome,
    SvgIconActionInHome,
  },
  data() {
    return {
      armed_status: false,
    };
  },
  props: {
    disabled: { type: Boolean, default: true },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.details-arm-operation {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  margin-bottom: 20px;

  span {
    @extend .sentinel-label;
    align-self: flex-start;
  }
  .zones-input {
    @extend .sentinel-input;
    width: 100% !important;
    height: 51px !important;
  }
  .status {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;

    justify-content: space-evenly;
    border-radius: 5px;
    width: 100%;
    height: 100px;
    background-color: $hybrone_error_red;
    .status-description {
      @extend .sentinel-label;
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 24px;
      line-height: 28px;
      color: #ffffff;
      margin-top: 15px;
      //   white-space: pre;
    }
  }
  .armed-action {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    // flex-wrap: wrap;
    .action {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      // align-content: center;
      width: 100%;
      min-height: 70px !important;
      border: 1px solid #2c3357;
      box-sizing: border-box;
      border-radius: 5px;
      .description{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 40px;
        .action-description-title {
          font-weight: 500;
          font-size: 18px;
          line-height: 21px;
        }
        .action-description-text {
          @extend .action-description-title;
          font-weight: 300;
          font-size: 15px;
        }
      }
      &:nth-child(1) {
        margin-right: 15px;
      }
    }
  }
  .out-controller {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 250px;
    margin-top: 25px;
    margin-bottom: 10px;
    border: 0.5px solid #2c3357;
    box-sizing: border-box;
    border-radius: 10px;
    &__title {
      @extend .sentinel-label;
      display: flex;
      justify-content: flex-start;
      margin-left: 14px;
      margin-top: 20px;
      margin-bottom: 18.5px;
      font-weight: 300;
      font-size: 18px;
      line-height: 21px;
    }
  }
}
/*
Bu Kısma Tekrardan dönülecek

**/
.details-arm-operation[disabled="disabled"] {
  pointer-events: none;
  opacity: 0.4;
}
</style>
