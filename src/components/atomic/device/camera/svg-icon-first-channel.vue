<template>
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.8629 0.5H2.98949C1.65766 0.5 0.578979 1.59387 0.578979 2.94446V20.0556C0.578979 21.4061 1.65766 22.5 2.98949 22.5H19.863C21.1947 22.5 22.2734 21.4061 22.2734 20.0555V2.94446C22.2734 1.59387 21.1947 0.5 19.8629 0.5ZM13.8367 17.6111H11.4262V7.83333H9.01569V5.38887H13.8367V17.6111H13.8367Z"
      :fill="changeColor"
    />
  </svg>
</template>

<script>
export default {
  name: 'SvgIconFirstChannels',
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
