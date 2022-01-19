<template>
  <div>
    <div class="premise-information-content">
      <span>Mekan Bilgileri</span>

      <span
        >Mekan ID :
        <p>{{ premise.custom_premise_id }}</p></span
      >
      <span
        >Mekan Adı:
        <p>{{ premise.custom_premise_name }}</p></span
      >
      <span
        >Açık Adres :
        <p>{{ premise.location.address }}</p></span
      >
      <span
        >İl / İlçe :
        <p>
          {{ premise.location.city.name }} /
          {{ premise.location.province.name }}
        </p></span
      >
      <span
        >Açıklama :
        <p>{{ premise.description }}</p></span
      >
    </div>
    <div v-if="false" class="premise-information-content">
      <span>Bölge Bilgileri</span>

      <span
        >Kod :
        <p>{{ premise.area.code }}</p></span
      >
      <span
        >Bölge Adı:
        <p>{{ premise.area.name }}</p></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'PremiseInformation',
  props: {
    premise: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
  // watch: {
  //   premise: (val) => {
  //     console.log("Watch", val);
  //   },
  // },
}
</script>

<style lang="scss" scoped>
.premise-information-content {
  margin-top: auto;
  span {
    height: 23px;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    padding: 5px 0px 5px 0px;

    color: #000000;
    &:nth-child(1) {
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: #000000;

      margin-top: 33px;
      margin-bottom: 25px;
    }
    p {
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      display: flex;
      align-items: center;

      color: #000000;
    }
  }
}
</style>
