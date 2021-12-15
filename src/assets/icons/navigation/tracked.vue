<template>
  <svg
    width="38"
    height="26"
    viewBox="0 0 38 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.625 0.75H21.625V4.25H0.625V0.75ZM0.625 7.75H21.625V11.25H0.625V7.75ZM0.625 18.25H14.625V14.75H0.625V18.25ZM37.375 13L34.75 10.375L25.1425 20L19.875 14.75L17.25 17.375L25.1425 25.25L37.375 13Z"
      fill="#2C3357"
    />
  </svg>
</template>

<script>
export default {
  name: 'SvgIconTracked',
  props: {
    active: {
      type: Boolean
    }
  },
  watch: {
    active: function (val) {
      console.log(val)
    }
  }
}
</script>

<style></style>
