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
      d="M4.39583 4.89587V7.84379C11.7187 7.84379 17.6562 13.7813 17.6562 21.1042H20.6042C20.6042 12.1563 13.3437 4.89587 4.39583 4.89587ZM6.66666 16.5625C5.41251 16.5625 4.39583 17.5792 4.39583 18.8334C4.39583 20.0875 5.41251 21.1042 6.66666 21.1042C7.92081 21.1042 8.93749 20.0875 8.93749 18.8334C8.93749 17.5792 7.92081 16.5625 6.66666 16.5625ZM4.39583 13.7396V10.7917C10.0937 10.7917 14.7083 15.4063 14.7083 21.1042H11.7604C11.7604 17.0417 8.45833 13.7396 4.39583 13.7396Z"
      :fill="changeColor"
    />
  </svg>
</template>

<script>
export default {
  name: 'SvgIconCommunication',
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
