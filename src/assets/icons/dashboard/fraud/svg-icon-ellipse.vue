<template>
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.0049 20.0098C15.5305 20.0098 20.0098 15.5305 20.0098 10.0049C20.0098 4.47935 15.5305 0 10.0049 0C4.47935 0 0 4.47935 0 10.0049C0 15.5305 4.47935 20.0098 10.0049 20.0098ZM10.0049 15.007C12.7677 15.007 15.0074 12.7673 15.0074 10.0045C15.0074 7.24172 12.7677 5.00204 10.0049 5.00204C7.24211 5.00204 5.00244 7.24172 5.00244 10.0045C5.00244 12.7673 7.24211 15.007 10.0049 15.007Z"
      :fill="changeColor"
    />
  </svg>
</template>

<script>
export default {
  name: 'SvgIconEllipse',
  props: {
    color: { type: String, default: null }
  },
  computed: {
    changeColor() {
      if (this.color == 'green') return '#6FCF97'
      else if (this.color === 'grey') return '#C4C4C4'
      else if (this.color === 'blue') return '#007DB7'
      else return '#E04141'
    }
  }
}
</script>

<style></style>
