<template>
  <div class="persons-content">
    <span class="persons-title">Yetkili Kişiler</span>
    <div class="card">
      <PersonsCard></PersonsCard>
    </div>
    <div class="persons-bottom">
      <el-button>DÜZENLE</el-button>
      <el-button>YENİ EKLE</el-button>
    </div>
  </div>
</template>

<script>
import PersonsCard from '@/components/premises/person-card.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'PremisePersons',
  components: { PersonsCard },
  computed: {
    ...mapGetters({
      getPremiseUsers: 'premise/getPremiseUsers'
    })
  },
  mounted() {
    console.log('USERS', this.getPremiseUsers)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.persons-content {
  display: flex;
  flex-direction: column;
  height: 708px;
  border: 1px solid black;
  border-top: 1px solid transparent;
  border-radius: 0px 0px 0px 10px;
  .persons-title {
    display: flex;
    justify-content: flex-start;
    margin: 29px 0px 15px 22px;
  }
  .persons-bottom {
    display: flex;
    margin-top: auto;
    align-items: flex-end;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 23px;
    button {
      @extend .sentinel-button__settings;
      &:nth-child(2n + 1) {
        background-color: $hybrone_background_color;
      }
      &:nth-child(2n) {
        color: #fff;
        &:hover {
          border-color: $hybrone_border_color;
          color: $hybrone_light_blue;
          background-color: $hybrone_background_color;
        }
      }
    }
  }
}
</style>
