<template>
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.9999 2.52501C8.1124 2.52501 2.5249 8.11251 2.5249 15C2.5249 21.8875 8.1124 27.475 14.9999 27.475C21.8874 27.475 27.4749 21.8875 27.4749 15C27.4749 8.11251 21.8874 2.52501 14.9999 2.52501ZM14.9999 24.975C9.4999 24.975 5.0249 20.5 5.0249 15C5.0249 9.50001 9.4999 5.02501 14.9999 5.02501C20.4999 5.02501 24.9749 9.50001 24.9749 15C24.9749 20.5 20.4999 24.975 14.9999 24.975ZM10.3124 16.875L15.9374 6.25V13.125H19.6874L14.2374 23.75V16.875H10.3124Z"
      :fill="changeColor"
    />
  </svg>
</template>

<script>
export default {
  name: 'SvgIconEnergy',
  props: {
    status: { type: Boolean }
  },
  computed: {
    changeColor() {
      if (this.status == 1) {
        return '#6FCF97'
      } else {
        if (this.status == 0) return '#B7B7B7'
        else return '#EB5757'
      }
    }
  }
}
</script>

<style></style>
