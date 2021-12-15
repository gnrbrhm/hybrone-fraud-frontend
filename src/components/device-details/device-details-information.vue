<template>
  <div class="information">
    <span class="id">MAĞAZA ID</span>
    <span class="number">{{ data.premise.id }}</span>
    <hr />
    <span class="province">{{ data.premise.location.province.name }}</span>
    <span class="country">{{ data.premise.location.city.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'DeviceDetailsInformation',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.information {
  min-width: 140px;
  min-height: 150px;
  background: $hybrone_blue;
  border-radius: 0px 0px 10px 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 12px;
  box-sizing: border-box;
  .information-text {
    margin: auto;
    font-family: Roboto;
    font-style: normal;
    font-weight: 200;
    font-size: 12px;
    line-height: 14px;

    display: flex;
    align-items: center;
    text-align: center;

    color: $hybrone_background_color;
  }
  .id {
    @extend .information-text;
    font-weight: 300;
  }
  .number {
    @extend .information-text;
    font-weight: 500;
    font-size: 36px;
    line-height: 42px;
  }
  hr {
    width: 100%;
    border: none;
    border-top: 1px solid #c5c5c5;
  }
  .province {
    @extend .information-text;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
  }
  .country {
    @extend .information-text;
    font-weight: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;
    margin-top: 8px;
  }
}
</style>
