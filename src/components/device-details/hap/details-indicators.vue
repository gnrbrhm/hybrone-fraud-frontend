<template>
  <div class="details-indicators">
    <Indicator></Indicator>
    <!-- v-for="item in indicators_array"
      :key="item.key"
      :data="item" -->
  </div>
</template>

<script>
import { INDICATORS } from '@/constant'
import Indicator from '@/components/device-details/hap/indicator'
export default {
  name: 'DetailsIndicators',
  components: { Indicator },
  data() {
    return {
      indicators_array: []
    }
  },
  created() {
    this.indicators_array = [...INDICATORS]
  }
}
</script>

<style lang="scss" scoped>
.details-indicators {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
