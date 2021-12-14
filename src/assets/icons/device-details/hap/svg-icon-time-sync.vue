<template>
  <svg
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.38477 7.38501V12.3375C19.6873 12.3375 29.6623 22.3125 29.6623 34.615H34.6148C34.6148 19.5825 22.4173 7.38501 7.38477 7.38501ZM11.1998 26.985C9.0928 26.985 7.38477 28.6931 7.38477 30.8C7.38477 32.907 9.0928 34.615 11.1998 34.615C13.3067 34.615 15.0148 32.907 15.0148 30.8C15.0148 28.6931 13.3067 26.985 11.1998 26.985ZM7.38477 22.2425V17.29C16.9573 17.29 24.7098 25.0425 24.7098 34.615H19.7573C19.7573 27.79 14.2098 22.2425 7.38477 22.2425Z"
      :fill="changeColor"
    />
  </svg>
</template>

<script>
export default {
  name: "SvgIconTimeSync",
  props: {
    status: { type: Boolean, default: null },
  },
  computed: {
    changeColor() {
      if (this.status) {
        return "#6FCF97";
      } else {
        if (this.status == null) return "#DADADA";
        else return "#EB5757";
      }
    },
  },
};
</script>

<style></style>
