<template>
  <svg
    width="19"
    height="24"
    viewBox="0 0 19 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.9375 2.36462C7.9375 1.50004 8.63542 0.802124 9.5 0.802124C10.3646 0.802124 11.0625 1.50004 11.0625 2.36462V3.58337C14.3333 4.29171 16.7917 7.20837 16.7917 10.698V16.948L18.875 19.0313V20.073H0.125V19.0313L2.20833 16.948V10.698C2.20833 7.20837 4.66667 4.29171 7.9375 3.58337V2.36462ZM9.5 5.48962C12.375 5.48962 14.7083 7.82296 14.7083 10.698V17.9896H4.29167V10.698C4.29167 7.82296 6.625 5.48962 9.5 5.48962ZM7.42708 21.125C7.42708 22.2709 8.35417 23.198 9.5 23.198C10.6458 23.198 11.5729 22.2709 11.5729 21.125H7.42708ZM10.5417 7.57296V11.7396H8.45833V7.57296H10.5417ZM10.5417 15.9063V13.823H8.45833V15.9063H10.5417Z"
      :fill="changeColor"
    />
  </svg>
</template>

<script>
export default {
  name: "SvgIconAlarm",
  props: {
    status: {
      type: Object,
      default: () => {
        return {};
      },
    },
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
  mounted() {
    console.log("mounted", this.status);
  },
};
</script>

<style></style>
