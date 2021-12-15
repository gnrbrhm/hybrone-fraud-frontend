<template>
  <div class="card-content">
    <div class="card-icon"><SvgIconPerson></SvgIconPerson></div>
    <div class="person-content">
      <div>
        <span class="person-name">Ahmet Yılmaz</span>
        <span class="person-title">Bölge Sorumlusu</span>
      </div>
      <span class="person-phone-number">0532 532 53 54</span>
    </div>
  </div>
</template>

<script>
import SvgIconPerson from '@/assets/icons/premises/svg-icon-person'
export default {
  name: 'PersonsCard',
  components: { SvgIconPerson }
}
</script>

<style lang="scss" scoped>
.card-content {
  display: flex;
  align-content: center;

  flex-direction: row;
  justify-content: center;
  .card-icon {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .person-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.5);
    width: 365px;
    height: 50px;
    /* Gray Medium */

    border: 1px solid #a0a0a0;
    box-sizing: border-box;
    border-radius: 5px;
    .person-name {
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      display: flex;
      align-items: center;
      margin-left: 13px;

      color: #000000;
    }
    .person-title {
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
      /* identical to box height */
      margin-left: 13px;

      display: flex;
      align-items: center;

      color: #000000;
    }
    .person-phone-number {
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      display: flex;
      align-items: center;
      text-align: right;
      margin-right: 20px;
      /* Gray Dark */

      color: #444444;
    }
  }
}
</style>
