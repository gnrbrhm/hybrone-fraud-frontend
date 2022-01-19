<template>
  <div class="premise-filter">
    <div class="premise-search">
      <div class="component">
        <span>İSTASYON KODU</span>
        <el-input
          class="sentinel-input"
          v-model="custom_premise_id"
          placeholder="ID/LOKASYON GİRİNİZ"
        ></el-input>
      </div>
      <div class="component">
        <el-button class="sentinel-button" type="default" @click="handleSearch">
          <SvgIconSearch></SvgIconSearch>
        </el-button>
      </div>
    </div>
    <div class="component">
      <span>YENİ</span>
      <router-link
        :disabled="!this.getPermissions['location_create']"
        :to="{ name: 'CreatePremise' }"
      >
        <el-button class="sentinel-button">
          <SvgIconAdd></SvgIconAdd>
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import SvgIconAdd from '@/assets/icons/premises/svg-icon-add'
import SvgIconSearch from '@/assets/icons/list/svg-icon-search.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'PremiseFilter',
  components: {
    SvgIconSearch,
    SvgIconAdd
  },
  data() {
    return {
      custom_premise_id: ''
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: 'auth/getPermissions'
    })
  },
  methods: {
    handleSearch() {
      this.$emit('onPremiseFilteredData', {
        custom_premise_id: this.custom_premise_id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.premise-filter {
  display: flex;
  max-height: 100px;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-top: 21px;
  margin-bottom: 18px;
  .premise-search {
    display: flex;
    justify-content: space-between;
    .component {
      &:nth-child(2n) {
        margin-top: 20px;
      }
    }
  }
  .component {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: self-end;
    justify-content: space-between;
    flex-wrap: nowrap;
    margin-right: 10px;
    &:nth-child(1) {
      margin-left: 23px;
    }
    span {
      @extend .sentinel-label;
    }
    input {
      @extend .sentinel-input;
    }
    button {
      display: flex;
      max-width: 50px;
      justify-content: center;

      span {
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        text-align: center;

        /* Gray Dark */

        color: #444444;
      }
    }
  }

  a[disabled='disabled'] {
    pointer-events: none;
    opacity: 0.4;
  }
}
</style>
