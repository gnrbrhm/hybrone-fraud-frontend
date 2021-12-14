<template>
  <div class="device-header">
    <div class="header-element">
      <router-link :to="{ name: 'Premises' }">
        <BackArrow></BackArrow>
      </router-link>
      <span class="title">{{
        is_update ? 'Yeni Cihaz Ekle' : 'Cihaz Güncelle'
      }}</span>
    </div>
    <div class="header-element">
      <DeviceDetailsInformation
        :data="premise_information"
      ></DeviceDetailsInformation>
    </div>
  </div>
</template>

<script>
import BackArrow from '@/components/atomic/back-arrow.vue'
import DeviceDetailsInformation from '@/components/device-details/device-details-information.vue'
import { mapActions } from 'vuex'
export default {
  name: 'DeviceHeader',
  components: { BackArrow, DeviceDetailsInformation },
  data() {
    return {
      is_update: true,
      premise_information: { id: null, province_name: null, city_name: null }
    }
  },
  methods: {
    ...mapActions({
      getPremiseById: 'premise/getPremiseById'
    })
  },
  created() {
    console.log('Premise_id', this.$route.params.premise_id)
    if (this.$route.params.device_id) {
      this.is_update = false
    }
    if (this.$route.params.premise_id) {
      let premise_information = this.getPremiseById(
        this.$route.params.premise_id
      )
      premise_information.then((r) => {
        this.premise_information.city_name = r.location.city.name
        this.premise_information.province_name = r.location.province.name
        this.premise_information.id = r.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.device-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 18px;
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
