<template>
  <div class="create-premise-content">
    <CreateHeader :title="this.$route.name === 'CreatePremise'"></CreateHeader>
    <div class="form">
      <CreateForm></CreateForm>
      <CreateMap></CreateMap>
    </div>
    <div class="form-bottom">
      <el-button type="primary" @click="handleOnSaveClick">{{
        this.$route.name === 'CreatePremise' ? 'KAYDET' : 'GÜNCELLE'
      }}</el-button>
    </div>
  </div>
</template>

<script>
import CreateHeader from '@/components/premises/create-header.vue'
import CreateMap from '@/components/premises/create-map.vue'
import CreateForm from '@/components/premises/create-form.vue'
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import { bus } from '@/main'
export default {
  name: 'CreatePremise',
  components: { CreateHeader, CreateForm, CreateMap },
  data() {
    return {
      is_update: false
    }
  },
  computed: {
    ...mapGetters({
      getSelectedLocation: 'getSelectedLocation'
    })
  },
  methods: {
    ...mapActions({
      getPremiseById: 'premise/getPremiseById'
    }),
    handleOnSaveClick() {
      bus.$emit('onClickSave', true)
      if (this.getSelectedLocation.lat) {
        bus.$emit('onClickSave', true)
      } else {
        Vue.notify({
          text: 'Lütfen Harita Üzerinden Seçin Yapınız',
          group: 'error-template',
          type: 'error'
        })
      }
    }
  },
  created() {
    console.log(this.$route.params)
    if (this.$route.params.id) {
      this.is_update = true
      this.getPremiseById(this.$route.params.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.create-premise-content {
  padding: 18px;
  .form {
    display: flex;
    width: 100%;
    flex-direction: row;
    order: 2;
    justify-content: space-between;
  }
  .form-bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 35px;
    button {
      @extend .sentinel-button;
      background-color: $hybrone_light_blue;
    }
  }
}
</style>
