<template>
  <div class="fraud-indicator-content">
    <div class="left-sidebar">
      <div class="store-count">
        <div class="ellipse">
          <SvgIconStore></SvgIconStore>
        </div>
        <div class="info">
          <span class="label">Mağaza Sayısı</span>
          <span class="value">{{ dashboardData.storeCount }}</span>
        </div>
      </div>
      <div class="casier-count">
        <div class="ellipse">
          <SvgIconCase></SvgIconCase>
        </div>
        <div class="info">
          <span class="label">Kasa Sayısı</span>
          <span class="value">1298</span>
        </div>
      </div>
      <div class="fraud-percentage">
        <span class="title">En Yüksek Kayıp/Kaçak Oranları</span>

        <!-- v-for="dashboardData.storeFraudCounts in  store"
          :key="item.id" -->
        <div class="row">
          <span class="label"
            >{{ Object.keys(dashboardData.storeFraudCounts)[0].split('/')[0]
            }}<br />{{
              Object.keys(dashboardData.storeFraudCounts)[0].split('/')[1]
            }}</span
          >
          <el-progress
            :format="{ color: '#ffd700', backgroundColor: '#ffd700' }"
            style="width: 185px"
            :color="'#E04141'"
            :text-inside="true"
            :stroke-width="33"
            :percentage="
              (100 /
                dashboardData.storeFraudCounts[
                  Object.keys(dashboardData.storeFraudCounts)[0]
                ].total) *
              dashboardData.storeFraudCounts[
                Object.keys(dashboardData.storeFraudCounts)[0]
              ].fraud
            "
          ></el-progress>
        </div>
        <div class="row">
          <span class="label">Akşehir<br />Konya</span>
          <el-progress
            style="width: 185px"
            :color="'#E35454'"
            :text-inside="true"
            :stroke-width="33"
            :percentage="70"
          ></el-progress>
        </div>
        <div class="row">
          <span class="label">Akşehir<br />Konya</span>
          <el-progress
            style="width: 185px"
            :color="'#E66767'"
            :text-inside="true"
            :stroke-width="33"
            :percentage="70"
          ></el-progress>
        </div>
        <div class="row">
          <span class="label">Akşehir<br />Konya</span>
          <el-progress
            style="width: 185px"
            :color="'#E97A7A'"
            :text-inside="true"
            :stroke-width="33"
            :percentage="70"
          ></el-progress>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="title">İşlem Detayları</div>
      <div class="charts">
        <el-progress
          class="first-circular"
          type="circle"
          :percentage="0"
          width="346"
          :show-text="false"
          :stroke-width="12"
        >
        </el-progress>
        <el-progress
          class="second-circular"
          type="circle"
          width="294"
          :percentage="100"
          status="success"
          :show-text="false"
          :stroke-width="12"
        ></el-progress>
        <el-progress
          class="third-circular"
          type="circle"
          width="242"
          :percentage="100"
          status="exception"
          :show-text="false"
          :stroke-width="12"
        ></el-progress>
      </div>
      <div class="percentage">
        <div class="ellipse">
          <SvgIconFraud></SvgIconFraud>
        </div>
        <span>KAÇAK ORANI / TOPLAM İŞLEM</span>
        <p>
          %{{
            (
              (100 / dashboardData.totalFraudCounts.notAnnotatedCount) *
              dashboardData.totalFraudCounts.annotatedCount
            ).toFixed(2)
          }}
        </p>
      </div>
      <div class="information">
        <div class="col">
          <span class="label">Kayıp/Kaçak İşlem Sayısı</span>
          <SvgIconEllipse :color="'red'"></SvgIconEllipse>
          <span class="value">{{
            dashboardData.totalFraudCounts.annotatedFraudCount
          }}</span>
        </div>
        <div class="col">
          <span class="label">Analiz Edilen İşlem Sayısı</span>
          <SvgIconEllipse :color="'green'"></SvgIconEllipse>
          <span class="value">{{
            dashboardData.totalFraudCounts.annotatedCount
          }}</span>
        </div>
        <div class="col">
          <span class="label">Şüpheli İşlem Sayısı</span>
          <SvgIconEllipse :color="'grey'"></SvgIconEllipse>
          <span class="value">{{
            dashboardData.totalFraudCounts.modelSuspectCount
          }}</span>
        </div>
        <div class="col">
          <span class="label">Toplam İşlem Sayısı</span>
          <SvgIconEllipse :color="'blue'"></SvgIconEllipse>
          <div></div>
          <span class="value">{{
            dashboardData.totalFraudCounts.totalActivityCount
          }}</span>
        </div>
      </div>
    </div>
    <div class="right-sidebar">
      <div class="mission-details">
        <div class="title">Görev Detayları</div>
        <div class="indicator">
          <el-progress
            type="circle"
            :color="'#6fcf97'"
            :stroke-width="8"
            width="76"
            :percentage="61"
          ></el-progress>
          <div class="info">
            <span class="label">Tamamlanan</span>
            <span class="value-success">786</span>
          </div>
        </div>
        <div class="indicator">
          <el-progress
            type="circle"
            :color="'#e04141'"
            :stroke-width="8"
            width="76"
            :percentage="39"
          ></el-progress>
          <div class="info">
            <span class="label">Bekleyen</span>
            <span class="value-warning">538</span>
          </div>
        </div>
      </div>
      <div class="most-fraud">
        <div class="title">En Çok Yapılan Şüpheli İşlemler</div>
        <div class="row">
          <span class="label">Fiş İptali</span>
          <el-progress
            style="width: 185px"
            :color="'#5D3186'"
            :text-inside="true"
            :stroke-width="33"
            :percentage="
              (100 / dashboardData.activityFraudCounts.CANCEL.total) *
              dashboardData.activityFraudCounts.CANCEL.fraud
            "
          ></el-progress>
        </div>
        <div class="row">
          <span class="label">Ürün İade</span>
          <el-progress
            style="width: 185px"
            :color="'#6D399D'"
            :text-inside="true"
            :stroke-width="33"
            :percentage="
              (100 / dashboardData.activityFraudCounts.RETURN.total) *
              dashboardData.activityFraudCounts.RETURN.fraud
            "
          ></el-progress>
        </div>
        <div class="row">
          <span class="label">Fiyat Gör</span>
          <el-progress
            style="width: 185px"
            :color="'#7C41B3'"
            :text-inside="true"
            :stroke-width="33"
            :percentage="
              (100 / dashboardData.activityFraudCounts.PRICEQUERY.total) *
              dashboardData.activityFraudCounts.PRICEQUERY.fraud
            "
          ></el-progress>
        </div>
        <!-- <div class="row">
          <span class="label">Elle Barkod <br />Giriş</span>
          <el-progress
            style="width: 185px"
            :color="'#8C49CA'"
            :text-inside="true"
            :stroke-width="33"
            :percentage="70"
          ></el-progress>
        </div> -->
        <div class="row">
          <span class="label">Satış</span>
          <el-progress
            style="width: 185px"
            :color="'#9B51E0'"
            :text-inside="true"
            :stroke-width="33"
            :percentage="
              (100 / dashboardData.activityFraudCounts.SALE.total) *
              dashboardData.activityFraudCounts.SALE.fraud
            "
          ></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIconCase from '@/assets/icons/dashboard/fraud/svg-icon-case'
import SvgIconStore from '@/assets/icons/dashboard/fraud/svg-icon-store'
import SvgIconFraud from '@/assets/icons/dashboard/fraud/svg-icon-fraud'
import SvgIconEllipse from '@/assets/icons/dashboard/fraud/svg-icon-ellipse'
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'FraudIndicators',
  data() {
    return {
      dashboardData: null
    }
  },
  components: { SvgIconFraud, SvgIconEllipse, SvgIconStore, SvgIconCase },
  methods: {
    ...mapActions({
      getFraudDashboardData: 'shopies/getFraudDashboardData'
    }),
    async fillDataTable() {
      let { data } = await this.getFraudDashboardData()

      console.log('Dashboard Data', data)
      this.dashboardData = data.data
    }
  },
  created() {
    this.fillDataTable()
  }
}
</script>

<style lang="scss">
.fraud-indicator-content {
  display: flex;
  flex-direction: row;
  //   justify-content: space-between;
  margin-top: 108px;
  max-width: 100%;
  min-height: 100%;
  gap: 33px;
  //   background-color: #e54d42;
  //   padding: 0 34px 0 34px;
  .left-sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 297px;
    min-height: 100% !important;
    gap: 28px;
    // background-color: #42e586;

    .store-count {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 297px;
      min-height: 126px;
      background: #ffffff;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      .ellipse {
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        width: 68px;
        height: 68px;
        border-radius: 34px;
        background: #f6f6f6;
      }
      .info {
        display: flex;
        flex-direction: column;
        .label {
          font-weight: 400;
          font-size: 12px;
          line-height: 14px;
        }
        .value {
          font-weight: 700;
          font-size: 48px;
          line-height: 56px;
          color: #007db7;
        }
      }
    }
    .casier-count {
      @extend .store-count;
      .info {
        .value {
          color: #6fcf97;
        }
      }
    }
    .fraud-percentage {
      @extend .store-count;
      flex-direction: column;
      width: 297px;
      min-height: 279px;
      .title {
        margin-top: 23px;
        margin-left: 18px;
        display: flex;
        justify-content: flex-start;
        width: 100%;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
      }
      .row {
        margin-left: 18px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        min-width: 100%;
        .label {
          font-weight: 400;
          font-size: 10px;
          line-height: 12px;
        }
      }
    }
  }
  .center {
    width: 100%;
    height: 586px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 9px 0 0 19px;
    .title {
      display: flex;
      align-items: center;
      width: 296px;
      height: 34px;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
    }
    .charts {
      .first-circular {
        position: absolute;
        left: 594px +109px;
        top: 184px;
        z-index: 9997;
      }
      .second-circular {
        position: absolute;
        left: 620.05px+109px;
        top: 210.05px;
        z-index: 9998;
      }
      .third-circular {
        position: absolute;
        left: 646.11px+109px;
        top: 236.11px;
        z-index: 9999;
      }
    }
    .percentage {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      position: absolute;
      width: 216.57px;
      height: 216.57px;
      left: 659.13px +109px;
      top: 249.13px;
      .ellipse {
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        width: 68px;
        height: 68px;
        border-radius: 34px;
        background: #f6f6f6;
      }
      span {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
      }
      p {
        margin: 0;
        font-style: normal;
        font-weight: 700;
        font-size: 48px;
        color: #e04141;
      }
    }
    .information {
      position: relative;
      top: 406px;
      left: 28%;
      margin: 0px;
      width: 350px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .col {
        width: 70%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        .label {
          width: 156.95px;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
        }
        .value {
          font-weight: 500;
          font-size: 18px;
          line-height: 21px;
        }
      }
    }
  }
  .right-sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 297px;
    min-height: 100% !important;
    gap: 28px !important;

    // background-color: #cde542;
    .mission-details {
      display: flex;
      flex-direction: column;
      width: 297px;
      height: 279px;
      background: #ffffff;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      .title {
        margin-top: 9px;
        margin-left: 18px;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
      }
      .indicator {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;

        width: 100%;
        height: 100%;
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          .label {
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
          }
          .value {
            font-weight: 700 !important;
            font-size: 36px;
            line-height: 42px;
            &-success {
              color: #6fcf97;
              font-weight: 700 !important;
              font-size: 36px;
              line-height: 42px;
            }
            &-warning {
              color: #e04141;
              font-weight: 700 !important;
              font-size: 36px;
              line-height: 42px;
            }
          }
        }
      }
    }
    .most-fraud {
      //   @extend .store-count;
      display: flex;
      flex-direction: column;
      width: 297px;
      height: 279px;
      background: #ffffff;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      gap: 6px;
      .title {
        margin-top: 23px;
        margin-left: 18px;
        display: flex;
        justify-content: flex-start;
        width: 100%;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
      }
      .row {
        // margin-left: 18px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        min-width: 100%;
        .label {
          font-weight: 400;
          font-size: 10px;
          line-height: 12px;
        }
      }
    }
  }
}
.el-progress-bar .el-progress-bar__outer {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  .el-progress-bar__inner {
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
    // border-radius: 0px;
  }
}
.el-progress-bar__innerText {
  &-zero {
    @extend .el-progress-bar__innerText;
    color: #e04141;
  }
}
</style>
