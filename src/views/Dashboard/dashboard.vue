<template>
  <div class="container">
    <FraudIndicators></FraudIndicators>
    <!-- <DashboardNav></DashboardNav>
    <TrackedDevice></TrackedDevice>-->
  </div>
</template>

<script>
import DashboardNav from '@/components/dashboard/dashboard-nav'
import FraudIndicators from '@/components/dashboard/fraud/indicators'
import TrackedDevice from '@/components/dashboard/tracked-device'
export default {
  name: 'Dashbaord',
  components: {
    FraudIndicators
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-height: 100%;
  margin: 27px 38px 12px 32px;
}
</style>
