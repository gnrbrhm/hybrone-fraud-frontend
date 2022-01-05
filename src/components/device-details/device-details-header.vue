<template>
  <div :class="getRouteForClass">
    <div class="first-component">
      <div class="header-element">
        <div @click="handleBackClick">
          <BackArrow></BackArrow>
        </div>
      </div>
      <!-- @onDownloadSignalsHistory="handleDownloadSignalsHistory" -->
      <div class="header-element">
        <DeviceDetailsTitle
          @onServiceModal="openServiceModal"
        ></DeviceDetailsTitle>
        <!-- <DashboardNav></DashboardNav> -->
      </div>
    </div>
    <div class="header-element">
      <DeviceDetailsInformation
        :data="premise_information"
      ></DeviceDetailsInformation>
    </div>
  </div>
</template>

<script>
import DeviceDetailsTitle from '@/components/device-details/device-details-title.vue'

import BackArrow from '@/components/atomic/back-arrow.vue'
import DeviceDetailsInformation from '@/components/device-details/device-details-information.vue'
// import DashboardNav from '@/components/dashboard/dashboard-nav.vue'
export default {
  name: 'DeviceDetailsHeader',
  components: { DeviceDetailsTitle, DeviceDetailsInformation, BackArrow },
  data() {
    return {}
  },
  props: {
    premise_information: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    getRouteForClass: function () {
      if (!this.$route.path.split('/').includes('last-signals')) {
        return 'detail-header-content'
      } else {
        return 'table-filter-header '
        // return 'detail-header-content'
      }
    }
  },
  watch: {
    premise_information: function (value) {
      console.log('DeviceDetailHeader', value)
    }
  },
  methods: {
    handleBackClick() {
      this.$router.go(-1)
    },
    openServiceModal() {
      this.$emit('openServiceModal', true)
    }
  },
  mounted() {
    console.log('HEADER', this.$route.path.split('/').includes('last-signals'))
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.detail-header-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  //   padding: 0 34px 0 26px !important;
  .first-component {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 24px;
    .header-element {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .header-element {
    display: flex;
    justify-content: space-between;

    &:nth-child(1) {
      flex-direction: column;
      padding-top: 28.5px;
      div {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
      }
      div {
        &:nth-child(2) {
          justify-content: flex-end;
          margin-top: 25px;
        }
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
.table-filter-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 36px 0 23px !important;

  background-color: $hybrone_header_background_color;
  .first-component {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 24px;
    .header-element {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .header-element {
    display: flex;
    justify-content: space-between;

    &:nth-child(1) {
      flex-direction: column;
      padding-top: 28.5px;
      display: flex;
      justify-content: flex-start;
      div {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
      }
      div {
        &:nth-child(2) {
          justify-content: flex-end;
          margin-top: 25px;
        }
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
