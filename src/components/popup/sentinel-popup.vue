<template>
  <el-dialog
    title="Shipping address"
    style="border-top-left-radius: 20px"
    :custom-class="'mypopup'"
    :visible.sync="visibleDialog"
    width="1200px"
    :before-close="handleClose"
  >
    <div class="popup-container">
      <div class="popup-container-title">
        <div class="popup-container-title-content">
          <span class="label">İŞLEM</span>
          <span class="value">{{
            this.RegisterActivityType[data.activityType]
          }}</span>
        </div>
        <div class="popup-container-title-content">
          <span class="label">FİŞ NO</span>
          <span class="value">{{ data.details.receiptNo || '-' }}</span>
        </div>
        <div class="popup-container-title-content">
          <span class="label">KASA</span>
          <span class="value">{{ data.posCode }}</span>
        </div>
        <div class="popup-container-title-content">
          <span class="label">KASİYER</span>
          <span class="value">{{ data.cashier.fullName }}</span>
        </div>
        <div class="popup-container-title-content">
          <span class="label">ID</span>
          <span class="value">{{ data.storeCode }}</span>
        </div>
        <div class="popup-container-title-content">
          <span class="label">LOKASYON</span>
          <span class="value">{{ data.cashier.storeName }}</span>
        </div>
        <div v-if="getAutoQuery" class="popup-container-title-content">
          <span class="label">ŞÜPHELİ İŞLEM DURUMU</span>
          <span class="value">{{
            data.modelPrediction
              ? formatAIPercents(data.modelPrediction.predictionConfidence)
              : '-'
          }}</span>
        </div>
        <div class="popup-container-title-content">
          <span class="label">İŞLEM ZAMANI</span>
          <span class="value">{{ formatDateTime(data.date) }}</span>
        </div>
      </div>
      <div class="popup-container-content">
        <div class="popup-container-content-receipt-detail">
          <span>FİŞ DETAYI</span>
          <div class="popup-container-content-receipt-detail-table">
            <el-table
              :data="data.details.lines"
              style="width: 99%"
              :header-cell-style="{
                fontWeight: 500,
                fontSize: '14px',
                color: '#444444'
              }"
              :row-style="{
                fontWeight: 400,
                fontSize: '18px',
                color: '#444444'
              }"
              height="100%"
            >
              <el-table-column
                property="productName"
                label="ÜRÜN"
                width="300"
              ></el-table-column>
              <el-table-column property="vatPercent" label="KDV" width="75">
                <template slot-scope="scope">
                  {{ '%' + scope.row.vatPercent * 10 }}
                </template></el-table-column
              >

              <el-table-column property="totalPrice" label="TUTAR" width="75">
                <template slot-scope="scope">
                  {{ scope.row.totalPrice + '₺' }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="popup-container-content-receipt-detail-general-sum">
            <div class="popup-container-content-receipt-detail-general-sum-row">
              <span>TOPLAM KDV</span>
              <span>{{ calculateVatTotal().toFixed(2) }}</span>
            </div>
            <div class="popup-container-content-receipt-detail-general-sum-row">
              <span>TOPLAM </span>
              <span>{{
                data.details.payments && data.details.payments.length > 0
                  ? data.details.payments[0].amount
                  : '0'
              }}</span>
            </div>
            <hr />
            <div class="popup-container-content-receipt-detail-general-sum-row">
              <span
                class="popup-container-content-receipt-detail-general-sum-row-payment-type"
                >{{
                  data.details.payments && data.details.payments.length > 0
                    ? data.details.payments[0].paymentName
                    : ''
                }}</span
              >
              <span>{{
                data.details.payments && data.details.payments.length > 0
                  ? data.details.payments[0].amount
                  : '0'
              }}</span>
            </div>
          </div>
        </div>
        <div class="popup-container-content-analysis">
          <span>OLAY KAYDI</span>
          <!-- :src="video1" v-if="" -->
          <!-- :src="require('/58656242.mp4')" -->
          <!-- :src="'../../../assets/videos/' + data.details.id + '.mp4'" -->
          <!-- :src="require('@/assets/videos/' + data.details.id + '.mp4')" -->
          <!-- <videoPlayer
            class="video-player-box"
            ref="videoPlayer"
            :options="playerOptions"
          ></videoPlayer> -->

          <video
            width="400"
            muted="true"
            :src="require(`@/assets/media/${data.details.id}.mp4`)"
            controls
          ></video>
          <!-- <img
            v-if="show_play_image"
            @click="changeImage(show_play_image)"
            :src="require(`@/assets/play-button.webp`)"
          />
          <img
            v-else
            @click="changeImage(show_play_image)"
            :src="'http://10.81.102.56:9011/video_feed'"
          /> -->
          <div class="popup-container-content-analysis-description">
            <span>AÇIKLAMA</span>
            <el-input
              type="textarea"
              :rows="6"
              placeholder="Lütfen açıklama giriniz "
              v-model="textarea"
            >
            </el-input>
          </div>
          <div class="popup-container-content-analysis-actions">
            <div
              v-if="this.$route.name != 'Missions'"
              class="popup-container-content-analysis-actions-group"
            >
              <span>KAÇAK</span>
              <el-button size="small" type="success">{{
                data.adminAnnotation.annotationType == undefined
                  ? 'Bekliyor'
                  : data.adminAnnotation.annotationType == 1
                  ? 'Evet'
                  : 'Hayır'
              }}</el-button>
            </div>
            <div
              v-if="this.$route.name != 'Missions'"
              class="popup-container-content-analysis-actions-group"
            >
              <span>PERSONEL</span>
              <el-button size="small">{{
                data.adminAnnotation.sentinelUserName
              }}</el-button>
            </div>
            <div
              class="popup-container-content-analysis-actions-popup-controls"
            >
              <el-button
                v-if="this.$route.name != 'Missions'"
                class="popup-container-content-analysis-actions-popup-controls-update sentinel-button"
                size="medium"
                >DÜZENLE</el-button
              >

              <el-select
                v-if="this.$route.name != 'StoreDetail'"
                v-model="selectedAnnotation"
                class="popup-container-content-analysis-actions-popup-controls-update sentinel-input"
                style="width: 100%; margin-right: 20px"
                placeholder="Seçiniz"
                clearable
              >
                <el-option
                  v-for="item in status_option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option
              ></el-select>
              <el-button
                v-if="this.$route.name != 'StoreDetail'"
                class="popup-container-content-analysis-actions-popup-controls-close sentinel-button"
                size="medium"
                @click="onSubmit"
                >KAYDET</el-button
              >
              <el-button
                class="popup-container-content-analysis-actions-popup-controls-close sentinel-button"
                size="medium"
                @click="() => handleClose()"
                >KAPAT</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { dateTimeChange } from '@/utils.js'
import { mapGetters, mapActions } from 'vuex'
import store from '@/store/index.js'
import { aIFraudTreshold } from '@/utils.js'
// import video1 from '@/assets/videos/58656242.mp4'
// import { videoPlayer } from 'vue-video-player'

export default {
  name: 'SentinelPopup',
  //   components: { videoPlayer },
  data() {
    return {
      show_play_image: true,
      visibleDialog: false,
      playerOptions: {
        // videojs options

        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
          }
        ],
        poster: '/static/images/author.jpg'
      },
      textarea: '',
      RegisterActivityType: {
        0: 'SATIŞ',
        1: 'İADE',
        2: 'FİŞ İPTAL',
        3: 'FİYAT SORGULAMA'
      },
      status_option: [
        { label: 'Evet', value: 1 },
        { label: 'Hayır', value: 0 }
      ],
      selectedAnnotation: 0
    }
  },
  props: {
    dialogTableVisible: { type: Boolean, default: false },
    data: { type: Object, default: () => {} }
  },
  computed: {
    ...mapGetters({
      getAutoQuery: 'auth/getAutoQuery'
    })
  },
  watch: {
    data: function (val) {
      this.selectedAnnotation = val.adminAnnotation?.annotationType
      this.textarea = val.adminAnnotation?.description
    },
    dialogTableVisible: function (val) {
      console.log('Watch Popup DAta', val)
      this.visibleDialog = val
    }
  },

  methods: {
    ...mapActions({
      setAnnotationTask: 'shopies/setAnnotationTask'
    }),
    changeImage(val) {
      this.show_play_image = !val
    },
    formatDateTime: (val) => {
      return dateTimeChange(val)
    },
    formatAIPercents: (val) => {
      return aIFraudTreshold(val)
    },
    calculateVatTotal() {
      let totalVat = 0
      if (this.data.details.lines !== undefined) {
        this.data.details.lines.forEach((line) => {
          totalVat += line.totalPrice * line.vatTotal
        })
      }
      return totalVat
    },
    handleClose() {
      this.visibleDialog = false
      this.$emit('onClose')
      console.log('onClose')
    },
    onSubmit() {
      this.setAnnotationTask({
        annotationType: this.selectedAnnotation,
        description: this.textarea,
        sentinelUserId: store.state.auth.user.data.user.id.toString(),
        sentinelUserName: store.state.auth.user.data.user.username,
        id: this.data.id
      })
      this.handleClose()
    }
  },
  mounted() {
    console.log('Mounted Popup', store.state.auth.autoQuery)
    console.log('Mounted Popup', this.getAutoQuery)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';
.el-dialog {
  border-top-left-radius: 20px !important;
  border-top-right-radius: 20px !important;
  padding: 0;
  .el-dialog__header {
    display: none;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: $hybrone_header_background_color;
  }
  .el-dialog__body {
    padding: 0;
  }
}
.popup-container {
  display: flex;
  flex-direction: column;
  &-title {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    height: 100px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: $hybrone_header_background_color;
    &-content {
      //   width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      text-align: center;
      .label {
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
      }
      .value {
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;
      }
    }
  }
  &-content {
    display: flex;
    flex-direction: row;
    padding: 36px;
    height: 650px;
    &-receipt-detail {
      display: flex;
      flex-direction: column;
      width: 45%;
      &-table {
        width: 452px;
        height: 545px;
        left: 207px;
        top: 213px;

        /* Hybrone Blue */

        border: 1px solid #2c3357;
        border-radius: 5px;
      }
      &-general-sum {
        display: flex;
        flex-direction: column;
        padding: 20px 20px 0 20px;
        width: 75%;
        hr {
          width: 100%;
        }
        &-row {
          font-weight: 400 !important;
          font-size: 18px !important;
          line-height: 21px !important;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          &-payment-type {
            font-weight: 500 !important;
            font-size: 18px !important;
            line-height: 21px !important;
          }
        }
      }
      span {
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
      }
    }
    &-analysis {
      display: flex;
      flex-direction: column;
      width: 55%;
      //   background-color: blue;
      video {
        width: 638px;
        height: 359px;
        background-color: #2c3357;
      }
      //   img:nth-child(2n) {
      //     width: 498px;
      //     height: 359px;
      //   }
      //   img:nth-child(2n + 1) {
      //     width: 638px;
      //     height: 359px;
      //   }
      span {
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
      }
      &-description {
        margin-top: 30px;
        textarea {
          border: 1px solid #2c3357;
          border-radius: 5px;
        }
      }
      &-actions {
        width: 355px;
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        &-group {
          display: flex;
          flex-direction: column;
          margin-right: 25px;
          span {
            font-weight: 500;
            font-size: 12px;
            line-height: 14px;
            padding-bottom: 9px;
          }
        }
        &-popup-controls {
          margin-left: 113px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          min-width: 100%;
          &-update {
            background-color: #ffffff;
            &:hover {
              background-color: $hybrone_light_blue;
              color: #ffffff !important;
            }
          }
          &-close {
            background-color: #ffffff;
            &:hover {
              background-color: $hybrone_light_blue;
              color: #ffffff !important;
            }
          }
        }
      }
    }
  }
}
</style>
