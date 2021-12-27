<template>
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.829 0.5H2.7179C1.36731 0.5 0.273438 1.59387 0.273438 2.94446V20.0556C0.273438 21.4061 1.36731 22.5 2.7179 22.5H19.829C21.1796 22.5 22.2734 21.4061 22.2734 20.0555V2.94446C22.2734 1.59387 21.1796 0.5 19.829 0.5ZM14.9401 10.2778C14.9401 11.6283 13.8462 12.7223 12.4956 12.7223H10.0512V15.1667H14.9401V17.6111H7.60677V12.7223C7.60677 11.3717 8.70064 10.2778 10.0512 10.2778H12.4957V7.83333H7.60677V5.38887H12.4956C13.8462 5.38887 14.9401 6.4828 14.9401 7.83333V10.2778Z"
      :fill="changeColor"
    />
  </svg>
</template>

<script>
export default {
  name: 'SvgIconSecondChannel',
  props: {
    status: { type: Boolean, default: null }
  },
  computed: {
    changeColor() {
      if (this.status) {
        return '#6FCF97'
      } else {
        if (this.status == null) return '#DADADA'
        else return '#EB5757'
      }
    }
  }
}
</script>

<style></style>
