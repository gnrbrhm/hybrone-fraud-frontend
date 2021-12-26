<template>
  <svg
    v-if="status"
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.1493 2.91667V18.0833H2.98258V2.91667H18.1493ZM18.1493 0.75H2.98258C1.79092 0.75 0.815918 1.725 0.815918 2.91667V18.0833C0.815918 19.275 1.79092 20.25 2.98258 20.25H18.1493C19.3409 20.25 20.3159 19.275 20.3159 18.0833V2.91667C20.3159 1.725 19.3409 0.75 18.1493 0.75ZM12.8843 10.3483L9.63425 14.5408L7.31592 11.735L4.06592 15.9167H17.0659L12.8843 10.3483Z"
      fill="#444444"
    />
  </svg>
  <svg
    v-else
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.1493 2.91667V18.0833H2.98258V2.91667H18.1493ZM18.1493 0.75H2.98258C1.79092 0.75 0.815918 1.725 0.815918 2.91667V18.0833C0.815918 19.275 1.79092 20.25 2.98258 20.25H18.1493C19.3409 20.25 20.3159 19.275 20.3159 18.0833V2.91667C20.3159 1.725 19.3409 0.75 18.1493 0.75ZM12.8843 10.3483L9.63425 14.5408L7.31592 11.735L4.06592 15.9167H17.0659L12.8843 10.3483Z"
      fill="#A0A0A0"
    />
  </svg>
</template>

<script>
export default {
  name: 'SvgIconSnapshot',
  props: {
    status: { type: Boolean, default: null }
  },
  computed: {
    changeColor() {
      if (this.status) {
        return '#6FCF97'
      } else {
        if (this.status === null) return '#DADADA'
        else return '#EB5757'
      }
    }
  }
}
</script>

<style></style>
