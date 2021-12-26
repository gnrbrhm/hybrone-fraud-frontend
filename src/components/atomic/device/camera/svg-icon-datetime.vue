<template>
  <svg
    width="22"
    height="23"
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.989 0.5C4.917 0.5 0 5.428 0 11.5C0 17.572 4.917 22.5 10.989 22.5C17.072 22.5 22 17.572 22 11.5C22 5.428 17.072 0.5 10.989 0.5ZM11 20.3C6.138 20.3 2.2 16.362 2.2 11.5C2.2 6.638 6.138 2.7 11 2.7C15.862 2.7 19.8 6.638 19.8 11.5C19.8 16.362 15.862 20.3 11 20.3ZM9.9 6H11.55V11.775L16.5 14.712L15.675 16.065L9.9 12.6V6Z"
      :fill="changeColor"
    />
  </svg>
</template>

<script>
export default {
  name: 'SvgIconDateTime',
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
