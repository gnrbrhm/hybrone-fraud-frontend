<template>
  <svg
    width="25"
    height="26"
    viewBox="0 0 25 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.4896 2.58337C6.73959 2.58337 2.08334 7.25004 2.08334 13C2.08334 18.75 6.73959 23.4167 12.4896 23.4167C18.25 23.4167 22.9167 18.75 22.9167 13C22.9167 7.25004 18.25 2.58337 12.4896 2.58337ZM12.5 21.3334C7.89584 21.3334 4.16668 17.6042 4.16668 13C4.16668 8.39587 7.89584 4.66671 12.5 4.66671C17.1042 4.66671 20.8333 8.39587 20.8333 13C20.8333 17.6042 17.1042 21.3334 12.5 21.3334ZM11.4583 7.79171H13.0208V13.2605L17.7083 16.0417L16.9271 17.323L11.4583 14.0417V7.79171Z"
      :fill="changeColor"
    />
  </svg>
</template>

<script>
export default {
  name: "SvgIconDateTime",
  props: {
    status: { type: Boolean },
  },
  computed: {
    changeColor() {
      if (this.status == 1) {
        return "#6FCF97";
      } else {
        if (this.status == 0) return "#B7B7B7";
        else return "#EB5757";
      }
    },
  },
};
</script>

<style></style>
