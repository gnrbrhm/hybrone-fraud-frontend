<template>
  <svg
    width="22"
    height="23"
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 6C7.96402 6 5.5 8.46402 5.5 11.5C5.5 14.536 7.96402 17 11 17C14.036 17 16.5 14.536 16.5 11.5C16.5 8.46396 14.036 6 11 6Z"
      :fill="changeColor"
    />
    <path
      d="M11 0.5C4.92251 0.5 0 5.42251 0 11.5C0 17.5774 4.92251 22.4999 11 22.4999C17.0774 22.4999 22 17.5775 22 11.5C22 5.42246 17.0775 0.5 11 0.5ZM11 20.3C6.138 20.3 2.19996 16.362 2.19996 11.5C2.19996 6.63794 6.138 2.70002 11 2.70002C15.862 2.70002 19.8 6.63799 19.8 11.5C19.8 16.362 15.862 20.3 11 20.3Z"
      :fill="changeColor"
    />
  </svg>
</template>

<script>
export default {
  name: 'SvgIconRecord',
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
