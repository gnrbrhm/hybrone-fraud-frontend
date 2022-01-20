<template>
  <div class="detail-header-content">
    <div class="header-element">
      <router-link :to="{ name: 'Premises' }">
        <BackArrow></BackArrow>
      </router-link>
      <span class="title">{{
        title ? 'Yeni İstasyon Ekle' : 'İstasyon Güncelle'
      }}</span>
    </div>
    <div class="header-element"></div>
  </div>
</template>

<script>
import BackArrow from '@/components/atomic/back-arrow.vue'
export default {
  name: 'CreateHeader',
  components: { BackArrow },
  props: {
    title: { type: Boolean, default: true }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.detail-header-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 18px;
  max-height: 150px;
  .header-element {
    display: flex;
    justify-content: space-between;
    &:nth-child(1) {
      flex-direction: column;
      padding-top: 28.5px;
      padding-bottom: 51px;
      a {
        display: flex;
        justify-content: flex-start;
      }
      div {
        &:nth-child(2) {
          justify-content: flex-end;
          margin-top: 25px;
        }
      }
      span {
        margin-top: 55px;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
      }
    }
    &:nth-child(2) {
      // display: grid;
      // grid-template-rows: repeat(3, 0.35fr);
      // // grid-gap: 10px;
      // align-items: baseline !important;
      // min-height: auto;
      // div {
      //   &:nth-child(1) {
      //     display: flex !important;
      //     align-items: flex-end !important;
      //     grid-row: 3;
      //     margin-bottom: 0px !important;
      //     margin-top: 45px !important;
      //   }
      // }
    }
  }
}
</style>
