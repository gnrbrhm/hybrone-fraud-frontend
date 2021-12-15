<template>
  <div class="header">
    <ServiceFilter
      @onUpdateTable="handleUpdate"
      @onhandleFiltredData="handleFiltred"
      @onhandleFiltredParam="handleFiltredParam"
    ></ServiceFilter>
  </div>
</template>

<script>
import ServiceFilter from '@/components/service/service-filter.vue'
export default {
  name: 'ServiceHeader',
  components: {
    ServiceFilter
  },
  methods: {
    handleFiltredParam(val) {
      this.$emit('onhandleFiltredParam', val)
    },
    handleUpdate(val) {
      console.log(val)
      this.$emit('onUpdateTable', val)
    },
    handleFiltred(val) {
      console.log(val)
      this.$emit('onFiltred', val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.header {
  padding: 2px 20px 12px 23px;

  background-color: $hybrone_header_background_color;
}
</style>
