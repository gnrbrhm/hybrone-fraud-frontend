<template>
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.16875 1.875H9.83125L13.125 5.16875V9.83125L9.83125 13.125H5.16875L1.875 9.83125V5.16875L5.16875 1.875ZM9.31251 11.875L11.875 9.31249V5.68749L9.31251 3.12499H5.68751L3.12501 5.68749V9.31249L5.68751 11.875H9.31251ZM7.50001 9.375C7.15483 9.375 6.87501 9.65482 6.87501 10C6.87501 10.3452 7.15483 10.625 7.50001 10.625C7.84518 10.625 8.12501 10.3452 8.12501 10C8.12501 9.65482 7.84518 9.375 7.50001 9.375ZM8.12501 4.37501H6.87501V8.75001H8.12501V4.37501Z"
      fill="#F2994A"
    />
  </svg>
</template>

<script>
export default {
  name: 'SvgIconWarning',
  props: { status: { type: Boolean, default: false } },
  computed: {
    changeColor() {
      if (this.status) {
        return 'rgba(242, 153, 74, 0.50)'
      } else {
        return '#F2994A'
      }
    }
  }
}
</script>

<style></style>
