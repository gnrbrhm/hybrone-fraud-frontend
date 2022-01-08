<template>
  <div class="create-premise-form">
    <el-form :model="premiseForm" :rules="premiseRules" ref="createPremise">
      <div class="form-row">
        <div class="premise-form-content">
          <span class="premise-form-content-label"> İSTASYON KODU </span>
          <el-form-item prop="custom_premise_id">
            <el-input
              style="width: 330px"
              class="sentinel_input"
              type="text"
              v-model="premiseForm.custom_premise_id"
            ></el-input>
          </el-form-item>
        </div>
        <div class="premise-form-content">
          <span class="premise-form-content-label">MAĞAZA ADI</span>
          <el-form-item prop="custom_premise_name">
            <el-input
              style="width: 330px"
              class="sentinel_input"
              type="text"
              v-model="premiseForm.custom_premise_name"
            ></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="form-row">
        <div class="premise-form-content">
          <span class="premise-form-content-label">İL</span>
          <el-form-item prop="location.city_id">
            <el-select
              style="width: 330px"
              class="sentinel_select"
              type="text"
              filterable
              v-model="premiseForm.location.city_id"
              placeholder="Seçiniz"
              @change="getProvince"
            >
              <el-option
                v-for="item in cities"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="premise-form-content">
          <span class="premise-form-content-label">İLÇE</span>
          <el-form-item prop="location.province_id">
            <el-select
              style="width: 330px"
              class="sentinel_input"
              type="text"
              filterable
              placeholder="Seçiniz"
              v-model="premiseForm.location.province_id"
            >
              <el-option
                v-for="item in provinces"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>

      <div class="premise-form-content">
        <span class="premise-form-content-label">AÇIK ADRES</span>
        <el-form-item prop="location.address">
          <el-input
            type="textarea"
            class="sentinel_input"
            style="width: 100%"
            :autosize="{ minRows: 2, maxRows: 5 }"
            v-model="premiseForm.location.address"
          ></el-input>
        </el-form-item>
      </div>
      <div class="premise-form-content">
        <span class="premise-form-content-label">AÇIKLAMA</span>
        <el-form-item prop="description">
          <el-input
            type="textarea"
            style="width: 100%"
            class="sentinel_input"
            :autosize="{ minRows: 2, maxRows: 5 }"
            v-model="premiseForm.description"
          ></el-input>
        </el-form-item>
      </div>
      <div class="call-defination" disabled="disabled" v-if="false">
        <span class="call-title">Yönlendirme Tanımlamaları</span>
        <div class="call-defination__header"></div>
        <div class="call-defination__content">
          <div class="call-names">
            <span>YÖNLENDİRME ADI</span>
            <el-input
              style="width: 207px; margin-bottom: 15px"
              class="sentinel_input"
              type="text"
              v-model="premiseForm.custom_premise_id"
            ></el-input>
            <el-input
              style="width: 207px; margin-bottom: 15px"
              class="sentinel_input"
              type="text"
              v-model="premiseForm.custom_premise_id"
            ></el-input>
            <el-input
              style="width: 207px; margin-bottom: 15px"
              class="sentinel_input"
              type="text"
              v-model="premiseForm.custom_premise_id"
            ></el-input>
            <el-input
              style="width: 207px; margin-bottom: 15px"
              class="sentinel_input"
              type="text"
              v-model="premiseForm.custom_premise_id"
            ></el-input>
          </div>
          <div class="call-number">
            <span>YÖNLENDİRME NUMARASI</span>
            <el-input
              style="width: 207px; margin-bottom: 15px"
              class="sentinel_input"
              type="text"
              v-model="premiseForm.custom_premise_id"
            ></el-input>
            <el-input
              style="width: 207px; margin-bottom: 15px"
              class="sentinel_input"
              type="text"
              v-model="premiseForm.custom_premise_id"
            ></el-input>
            <el-input
              style="width: 207px; margin-bottom: 15px"
              class="sentinel_input"
              type="text"
              v-model="premiseForm.custom_premise_id"
            ></el-input>
            <el-input
              style="width: 207px; margin-bottom: 15px"
              class="sentinel_input"
              type="text"
              v-model="premiseForm.custom_premise_id"
            ></el-input>
          </div>
          <div class="button-color">
            <span>BUTON RENGİ</span>
            <el-input
              style="width: 207px; margin-bottom: 15px"
              class="sentinel_input"
              type="text"
              v-model="premiseForm.custom_premise_id"
            ></el-input>
            <el-input
              style="width: 207px; margin-bottom: 15px"
              class="sentinel_input"
              type="text"
              v-model="premiseForm.custom_premise_id"
            ></el-input>
            <el-input
              style="width: 207px; margin-bottom: 15px"
              class="sentinel_input"
              type="text"
              v-model="premiseForm.custom_premise_id"
            ></el-input>
            <el-input
              style="width: 207px; margin-bottom: 15px"
              class="sentinel_input"
              type="text"
              v-model="premiseForm.custom_premise_id"
            ></el-input>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { bus } from '@/main'

import endpoints from '@/endpoints'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CreateForm',
  data() {
    return {
      counter: 0,
      formName: 'createPremise',
      cities: [],
      provinces: [],
      premiseForm: {
        custom_premise_id: '',
        area_id: 1,
        custom_premise_name: '',
        location: {
          long: null,
          lat: null,
          address: '',
          city_id: null,
          province_id: null
        },
        description: ''
      },
      premiseRules: {
        custom_premise_id: [
          {
            required: true,
            message: 'Lütfen İSTASYON KODU giriniz!',
            trigger: 'blur'
          }
        ],
        custom_premise_name: [
          {
            required: true,
            message: 'Lütfen mağaza adı giriniz!',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: 'Lütfen açıklama giriniz!',
            trigger: 'blur'
          }
        ],
        location: {
          city_id: [
            {
              required: true,
              message: 'Lütfen şehir seçiniz.',
              trigger: 'change'
            }
          ],
          province_id: [
            {
              required: true,
              message: 'Lütfen ilçe seçiniz.',
              trigger: 'change'
            }
          ],
          address: [
            {
              required: true,
              message: 'Lütfen açık adres giriniz.',
              trigger: 'blur'
            }
          ]
        }
      },
      is_update_request: false
    }
  },
  computed: {
    ...mapGetters({
      getSelectedLocation: 'getSelectedLocation',
      getCurrentPremise: 'premise/getCurrentPremise',
      getSelectedRow: 'dataTable/getSelectedRow'
    })
  },
  methods: {
    ...mapActions({
      setSelectedRow: 'dataTable/setSelectedRow',
      getPremise: 'premise/getPremise',
      getPremises: 'premise/getPremises',
      createPremise: 'premise/createPremise',
      updatePremise: 'premise/updatePremise',
      setLocation: 'map/setLocation',
      getPremiseById: 'premise/getPremiseById'
    }),
    getCities() {
      const cities = this.$api({
        ...endpoints.getCities
      })
      return cities.then((r) => {
        this.cities = r.data.data.cities
      })
    },
    getProvince(val) {
      let provinces = null
      if (val) {
        provinces = this.$api({
          ...endpoints.getProvince,
          params: { city_id: val }
        })
      } else {
        provinces = this.$api({
          ...endpoints.getProvince
        })
      }
      provinces.then((r) => {
        this.provinces = r.data.data.provinces
      })
    },
    async submitCreateForm(val) {
      this.premiseForm.location.lat = this.getSelectedLocation.lat
      this.premiseForm.location.long = this.getSelectedLocation.long
      if (val) {
        this.$refs[this.formName].validate((valid) => {
          if (valid) {
            if (this.is_update_request) {
              this.updateCreateForm(this.premiseForm)
            } else {
              const res = this.createPremise(this.premiseForm)
              //   if (res.status == 201) {
              //     this.$router.push('/premises')
              //     this.setLocation({})
              //   }
              res.then((r) => {
                if (r.status == 201) {
                  this.$router.push('/premises')
                  this.setLocation({})
                }
              })
            }
          } else {
            return false
          }
        })
      }
    },
    updateCreateForm(val) {
      let payload = { premise: { ...val }, premise_id: this.$route.params.id }
      if (val) {
        const updatePremise = this.updatePremise(payload)

        updatePremise.then((r) => {
          if (r.status == 200) {
            this.$router.push({ name: 'Premises' })
            this.clearPremiseForm()
          }
        })
      }
    },
    clearPremiseForm(val) {
      val.forEach((item) => {
        switch (typeof val[item]) {
          case 'string':
            val[item] = ''
            break
          case 'number':
            val[item] = 0

            break
          case 'object':
            this.clearPremiseForm(val[item])

            break

          default:
            break
        }
      })
    },
    async fillPremiseForm() {
      if (this.$route.params.id) {
        this.is_update_request = true
        this.provinces = this.getProvince(
          this.getCurrentPremise.location.city_id
        )
        this.provinces = this.getProvince(
          this.getCurrentPremise.location.city_id
        )
        this.premiseForm.custom_premise_id =
          this.getCurrentPremise.custom_premise_id
        this.premiseForm.custom_premise_name =
          this.getCurrentPremise.custom_premise_name
        this.premiseForm.description = this.getCurrentPremise.description
        this.premiseForm.location.city_id =
          this.getCurrentPremise.location.city_id
        this.premiseForm.location.province_id =
          this.getCurrentPremise.location.province_id
        this.premiseForm.location.address =
          this.getCurrentPremise.location.address
        this.premiseForm.location.lat = this.getCurrentPremise.location.lat
        this.premiseForm.location.long = this.getCurrentPremise.location.long
      }
    }
  },
  created() {
    if ((this.getCurrentPremise = {} && this.$route.params.id)) {
      this.getPremiseById(this.$route.params.id)
      this.fillPremiseForm()
    }
    this.cities = this.getCities()
  },
  mounted() {
    bus.$on('onClickSave', (val) => this.submitCreateForm(val))
    this.fillPremiseForm()
  },
  destroyed() {
    this.setSelectedRow({})
    this.clearPremiseForm()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.create-premise-form {
  display: flex;
  width: 100%;
  margin-right: 30px;
  margin-left: 30px;
  .form-row {
    display: flex;
    width: 100%;
    flex-direction: row;
    margin-bottom: 20px;
    .premise-form-content {
      max-width: 100%;
      padding-right: 50px;
    }
  }
  .premise-form-content-label {
    @extend .sentinel-label;
    display: flex;
    align-self: flex-start;
    font-feature-settings: 'zero' on;
    margin-bottom: 5px !important;
  }
  .sentinel_input {
    @extend .sentinel-input;
    input {
      height: 50px;
      max-width: 316px !important;
    }
  }
  .call-defination {
    display: flex;
    flex-direction: column;
    .call-title {
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      align-self: flex-start;
      margin-bottom: 22px;
    }

    &__content {
      display: flex;
      flex-direction: row;

      justify-content: space-between;
      span {
        @extend .sentinel-label;
      }
      .call-names {
        display: flex;
        flex-direction: column;
        margin-right: 22px;
        span {
          align-self: flex-start;
        }
      }
      .call-number {
        @extend .call-names;
      }
      .button-color {
        @extend .call-names;
      }
    }
  }
  .call-defination[disabled='disabled'] {
    pointer-events: none;
    opacity: 0.4;
  }
}
</style>
