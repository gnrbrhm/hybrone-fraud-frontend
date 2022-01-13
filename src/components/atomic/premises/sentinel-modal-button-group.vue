<template>
  <div class="location-bottom">
    <el-button @click="deleteClick">SİLE</el-button>
    <el-button @click="handleUpdate()">DÜZENLE</el-button>
  </div>
</template>

<script>
export default {
  name: 'TabButtonGroup',
  methods: {
    deleteClick() {
      console.log(this.getSelectedRow)
    },
    handleUpdate() {
      this.$router.push({
        name: 'UpdatePremise',
        params: { id: this.getSelectedRow.id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.location-bottom {
  display: flex;
  margin-top: 10%;
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;
  // margin-bottom: 7px; justify-content:space-between; den sonra gerek kalmadı

  button {
    @extend .sentinel-button__settings;
    &:nth-child(2n + 1) {
      background-color: $hybrone_error_red;
      color: $hybrone_background_color;
      &:hover {
        border-color: $hybrone_error_red;
        color: $hybrone_error_red;
        background-color: $hybrone_background_color;
      }
    }
    &:nth-child(2n) {
      color: #fff;
      background-color: $hybrone_light_blue;
      &:hover {
        border-color: $hybrone_light_blue;
        color: $hybrone_light_blue;
        background-color: $hybrone_background_color;
      }
    }
  }
}
</style>
