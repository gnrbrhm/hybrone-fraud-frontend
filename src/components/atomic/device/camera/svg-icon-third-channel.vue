<template>
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.829 0.5H2.7179C1.36731 0.5 0.273438 1.59387 0.273438 2.94446V20.0556C0.273438 21.4061 1.36731 22.5 2.7179 22.5H19.829C21.1796 22.5 22.2734 21.4061 22.2734 20.0555V2.94446C22.2734 1.59387 21.1796 0.5 19.829 0.5ZM14.9401 9.66667C14.9401 10.6811 14.1212 11.5 13.1068 11.5C14.1212 11.5 14.9401 12.3189 14.9401 13.3333V15.1667C14.9401 16.5172 13.8462 17.6111 12.4956 17.6111H7.60677V15.1667H12.4956V12.7222H10.0512V10.2777H12.4956V7.83333H7.60677V5.38887H12.4956C13.8462 5.38887 14.9401 6.4828 14.9401 7.83333V9.66667Z"
      :fill="changeColor"
    />
  </svg>
</template>

<script>
export default {
  name: 'SvgIconThirdChannel',
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
