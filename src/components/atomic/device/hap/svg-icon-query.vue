<template>
  <img
    v-if="status"
    src="@/assets/icons/table/svg-icon-query-true.svg"
    alt="Normal"
  />
  <img
    v-else
    src="@/assets/icons/table/svg-icon-query-false.svg"
    alt="Ulaşılamadı"
  />
</template>

<script>
export default {
  name: 'SvgIconQuery',
  props: {
    status: { type: Boolean, default: null }
  }
}
</script>

<style></style>
