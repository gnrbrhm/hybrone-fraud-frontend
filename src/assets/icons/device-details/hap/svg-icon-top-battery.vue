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
      d="M15.0004 2.52501C8.11289 2.52501 2.52539 8.11251 2.52539 15C2.52539 21.8875 8.11289 27.475 15.0004 27.475C21.8879 27.475 27.4754 21.8875 27.4754 15C27.4754 8.11251 21.8879 2.52501 15.0004 2.52501ZM15.0004 24.975C9.50039 24.975 5.02539 20.5 5.02539 15C5.02539 9.50001 9.50039 5.02501 15.0004 5.02501C20.5004 5.02501 24.9754 9.50001 24.9754 15C24.9754 20.5 20.5004 24.975 15.0004 24.975ZM10.3129 16.875L15.9379 6.25V13.125H19.6879L14.2379 23.75V16.875H10.3129Z"
      :fill="changeColor"
    />
  </svg>
</template>

<script>
export default {
  name: "SvgIconTopBattery",
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
