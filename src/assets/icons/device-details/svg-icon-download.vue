<template>
  <svg
    v-if="status"
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.5265 10.25H17.1932V3.75H10.6932V10.25H6.35986L13.9432 17.8333L21.5265 10.25ZM12.8599 12.4167V5.91667H15.0265V12.4167H16.294L13.9432 14.7675L11.5924 12.4167H12.8599ZM6.35986 20H21.5265V22.1667H6.35986V20Z"
      fill="#444444"
    />
  </svg>
  <svg
    v-else
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.5265 10.25H17.1932V3.75H10.6932V10.25H6.35986L13.9432 17.8333L21.5265 10.25ZM12.8599 12.4167V5.91667H15.0265V12.4167H16.294L13.9432 14.7675L11.5924 12.4167H12.8599ZM6.35986 20H21.5265V22.1667H6.35986V20Z"
      fill="#A0A0A0"
    />
  </svg>
</template>

<script>
export default {
  name: 'SvgIconDownload',
  props: {
    status: { type: Boolean, default: false }
  },
  computed: {
    changeColor() {
      if (this.status) {
        return '#6FCF97'
      } else {
        if (this.status === null) return '#DADADA'
        else return '#EB5757'
      }
    }
  }
}
</script>

<style></style>
