<template>
  <svg
    v-if="status"
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.0561523 11.5C0.0561523 17.5751 4.98102 22.5 11.0562 22.5C17.1313 22.5 22.0562 17.5751 22.0562 11.5C22.0562 5.42487 17.1313 0.5 11.0562 0.5C4.98102 0.5 0.0561523 5.42487 0.0561523 11.5ZM20.0562 11.5C20.0562 16.4706 16.0267 20.5 11.0562 20.5C6.08559 20.5 2.05615 16.4706 2.05615 11.5C2.05615 6.52944 6.08559 2.5 11.0562 2.5C16.0267 2.5 20.0562 6.52944 20.0562 11.5Z"
      :fill="changeColor"
    />
  </svg>
  <svg
    v-else
    width="22"
    height="23"
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.056 0.666748C5.07599 0.666748 0.222656 5.52008 0.222656 11.5001C0.222656 17.4801 5.07599 22.3334 11.056 22.3334C17.036 22.3334 21.8893 17.4801 21.8893 11.5001C21.8893 5.52008 17.036 0.666748 11.056 0.666748ZM11.056 20.1667C6.2785 20.1667 2.38933 16.2776 2.38933 11.5001C2.38933 6.72258 6.2785 2.83342 11.056 2.83342C15.8335 2.83342 19.7227 6.72258 19.7227 11.5001C19.7227 16.2776 15.8335 20.1667 11.056 20.1667ZM16.4727 10.4167H5.63933V12.5834H16.4727V10.4167Z"
      :fill="changeColor"
    />
  </svg>
</template>

<script>
export default {
  name: 'SvgIconChannelStatus',
  props: {
    status: { type: Boolean, default: null }
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
