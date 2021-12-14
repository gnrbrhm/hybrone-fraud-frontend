<template>
  <div>
    <svg
      v-if="onChangeSvg == 1"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="lock_24px">
        <path
          id="icon/action/lock_24px"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17 8.5H18C19.1 8.5 20 9.4 20 10.5V20.5C20 21.6 19.1 22.5 18 22.5H6C4.9 22.5 4 21.6 4 20.5V10.5C4 9.4 4.9 8.5 6 8.5H7V6.5C7 3.74 9.24 1.5 12 1.5C14.76 1.5 17 3.74 17 6.5V8.5ZM12 3.5C10.34 3.5 9 4.84 9 6.5V8.5H15V6.5C15 4.84 13.66 3.5 12 3.5ZM6 20.5V10.5H18V20.5H6ZM14 15.5C14 16.6 13.1 17.5 12 17.5C10.9 17.5 10 16.6 10 15.5C10 14.4 10.9 13.5 12 13.5C13.1 13.5 14 14.4 14 15.5Z"
          fill="#6FCF97"
        />
      </g>
    </svg>

    <svg
      v-else-if="onChangeSvg == 2"
      width="16"
      height="22"
      viewBox="0 0 16 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14 7.5H13V5.5C13 2.74 10.76 0.5 8 0.5C5.24 0.5 3 2.74 3 5.5H5C5 3.84 6.34 2.5 8 2.5C9.66 2.5 11 3.84 11 5.5V7.5H2C0.9 7.5 0 8.4 0 9.5V19.5C0 20.6 0.9 21.5 2 21.5H14C15.1 21.5 16 20.6 16 19.5V9.5C16 8.4 15.1 7.5 14 7.5ZM2 19.5V9.5H14V19.5H2ZM10 14.5C10 15.6 9.1 16.5 8 16.5C6.9 16.5 6 15.6 6 14.5C6 13.4 6.9 12.5 8 12.5C9.1 12.5 10 13.4 10 14.5Z"
        fill="#EB5757"
      />
    </svg>
    <svg
      v-else-if="onChangeSvg == 0"
      width="16"
      height="22"
      viewBox="0 0 16 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 7.5H14C15.1 7.5 16 8.4 16 9.5V19.5C16 20.6 15.1 21.5 14 21.5H2C0.9 21.5 0 20.6 0 19.5V9.5C0 8.4 0.9 7.5 2 7.5H3V5.5C3 2.74 5.24 0.5 8 0.5C10.76 0.5 13 2.74 13 5.5V7.5ZM8 2.5C6.34 2.5 5 3.84 5 5.5V7.5H11V5.5C11 3.84 9.66 2.5 8 2.5ZM2 19.5V9.5H14V19.5H2ZM10 14.5C10 15.6 9.1 16.5 8 16.5C6.9 16.5 6 15.6 6 14.5C6 13.4 6.9 12.5 8 12.5C9.1 12.5 10 13.4 10 14.5Z"
        fill="#B7B7B7"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "SvgIconBattery",
  data() {
    return {
      selectedSvg: 0,
    };
  },
  props: {
    status,
  },
  computed: {
    onChangeSvg() {
      if (this.status == 1) {
        return 1;
      } else {
        if (this.status == 0) return 0;
        else if (this.status == 2) return 2;
        else return 1;
      }
    },
  },
  mounted() {
    console.log("mounted", this.onChangeSvg);
  },
};
</script>

<style></style>
