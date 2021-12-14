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
      d="M13.986 0C6.258 0 0 6.272 0 14C0 21.728 6.258 28 13.986 28C21.728 28 28 21.728 28 14C28 6.272 21.728 0 13.986 0ZM13.9998 25.2003C7.8118 25.2003 2.7998 20.1883 2.7998 14.0003C2.7998 7.81229 7.8118 2.80029 13.9998 2.80029C20.1878 2.80029 25.1998 7.81229 25.1998 14.0003C25.1998 20.1883 20.1878 25.2003 13.9998 25.2003ZM12.6006 7H14.7006V14.35L21.0006 18.088L19.9506 19.81L12.6006 15.4V7Z"
      fill="#444444"
    />
  </svg>
</template>

<script>
export default {
  name: "SvgIconTime",
  props: {
    status: { type: Boolean, default: null },
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
