<template>
  <div class="create-hap-device-form">
    <p>Genel Bilgiler</p>
    <div class="general-information">
      <div class="component">
        <span>CİHAZ TİPİ</span>
        <el-select
          v-model="hardware_type"
          class="input"
          placeholder="Seçiniz"
          @change="handleHardwareTypeChange"
        >
          <el-option
            v-for="item in hardware_options"
            placeholder="Seçiniz"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="component">
        <span>MARKA</span>
        <el-select
          v-model="brand_type"
          class="input"
          placeholder="Seçiniz"
          @change="handleBrandTypeChange"
        >
          <el-option
            v-for="item in brand_options"
            placeholder="Seçiniz"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="component">
        <span>MODEL</span>
        <el-select v-model="model_type" class="input" placeholder="Seçiniz">
          <el-option
            v-for="item in model_options"
            placeholder="Seçiniz"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="general-information-2">
      <div class="component">
        <span>SERİ NUMARASI</span>
        <el-input v-model="subscriber" class="input"> </el-input>
      </div>
      <div class="component">
        <span>ENVANTER NUMARASI</span>
        <el-input v-model="inventory_number" class="input"> </el-input>
      </div>
    </div>
    <p v-if="false">Bağlantı Bilgileri</p>
    <div v-if="false" class="connection-information">
      <div class="component">
        <span>KULLANICI ADI</span>
        <el-input v-model="username" class="input"> </el-input>
      </div>
      <div class="component">
        <span>ŞİFRE</span>
        <el-input type="passsword" v-model="password" class="input"> </el-input>
      </div>
      <div class="component">
        <span>IP ADRESİ</span>
        <el-input type="passsword" v-model="ip_address" class="input">
        </el-input>
      </div>
      <div class="component">
        <span>PORT</span>
        <el-input type="passsword" v-model="port_number" class="input">
        </el-input>
      </div>
    </div>
    <p>Özellik Bilgileri</p>
    <div class="description-information">
      <div class="component">
        <span>BÖLGE SAYISI</span>
        <el-select
          v-model="zone_count"
          placeholder="Seçiniz"
          class="input"
          @change="handleZoneCountChange"
        >
          <el-option
            v-for="item in zones"
            placeholder="Seçiniz"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </div>
      <div class="component">
        <span>BÖLÜM SAYISI</span>
        <el-select
          v-model="partion_count"
          placeholder="Seçiniz"
          class="input"
          @change="handlePartionCountChange"
        >
          <el-option
            v-for="item in partions"
            placeholder="Seçiniz"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </div>
      <div class="component">
        <span v-if="false">ÇIKIŞ SAYISI</span>
        <el-select
          v-if="false"
          v-model="input_count"
          placeholder="Seçiniz"
          class="input"
        >
          <el-option
            v-for="item in inputs"
            placeholder="Seçiniz"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <p v-if="isVisiblePartion">Bölüm Listesi</p>
    <div v-if="isVisiblePartion" class="partion-information">
      <div
        class="partion-input"
        v-for="(item, index) in partion"
        :key="item.key"
      >
        <p>{{ index + 1 }}</p>
        <div class="component">
          <span v-if="index == 0">BÖLÜM ADI</span>
          <el-input v-model="partion[index].name"> </el-input>
        </div>
      </div>
    </div>
    <p v-if="isVisibleZone">Bölge Listesi</p>
    <div v-if="isVisibleZone" class="zone-information">
      <div class="zone-input" v-for="(item, index) in zone" :key="index">
        <p>{{ index + 1 }}</p>
        <div class="component">
          <span v-if="index == 0">DURUM</span>
          <el-select
            v-model="zone[index].state"
            placeholder="Seçiniz"
            class="state-selectbox"
          >
            <el-option
              v-for="item in state_options"
              placeholder="Seçiniz"
              :key="item.key"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="component">
          <span v-if="index == 0">BÖLGE ADI</span>
          <el-input
            v-model="zone[index].name"
            class="zone-name"
            :disabled="is_update"
          >
          </el-input>
        </div>
        <div class="component">
          <span v-if="index == 0">BÖLGE TİPİ</span>
          <el-select
            v-model="zone[index].type"
            placeholder="Seçiniz"
            class="zone-type"
          >
            <el-option
              v-for="item in zone_type_options"
              placeholder="Seçiniz"
              :key="item.key"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="component">
          <span v-if="index == 0">BÖLÜM</span>
          <el-select
            v-model="zone[index].prosec_partition_id"
            placeholder="Seçiniz"
            class="zone-partion"
            @change="handleChangePartion2"
          >
            <el-option
              v-for="(item, index) in partion"
              placeholder="Seçiniz"
              :key="item.key"
              :label="item.name"
              :value="parseInt(index + 1)"
            >
            </el-option>
          </el-select>
        </div>
        <div class="component" v-if="false">
          <span v-if="index == 0">İLİŞKİLİ KAYIT CİHAZI</span>
          <el-select
            v-model="zone[index].device"
            placeholder="Seçiniz"
            class="related-record-device"
          >
            <el-option
              v-for="item in state"
              placeholder="Seçiniz"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="component" v-if="false">
          <span v-if="index == 0">KANAL</span>
          <el-select
            v-model="zone[index].channel"
            placeholder="Seçiniz"
            class="zone-channel"
          >
            <el-option
              v-for="item in state"
              placeholder="Seçiniz"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- <div :class="is_update ? 'footer-bottom-update' : 'footer-bottom-create'">
      <el-button
        v-if="is_update"
        class="footer-bottom-update__dangerous"
        @click="onDelete"
        >SİL</el-button
      >
      <el-button
        class="footer-bottom-update__success"
        type="primary"
        @click="onSubmit"
        >{{ is_update ? "GÜNCELLE" : "KAYDET" }}</el-button
      >
    </div> -->
  </div>
</template>

<script>
// import { DEVICE_TYPES } from "@/constant";
import { bus } from "@/main.js";

import { HARDWARE_TYPES } from "@/constant";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateHapDeviceForm",
  data() {
    return {
      is_update: !!this.$route.params.device_id,
      inventory_number: null,
      subscriber: null,
      username: null,
      password: null,
      port_number: null,
      ip_address: null,

      zone_count: null,
      zone: [
        {
          number: null,
          state: null,
          name: null,
          type: null,
          prosec_partition_id: null,
          device: null,
          channel: null,
        },
      ],
      partion: [
        {
          name: null,
          number: null,
          zones: [],
        },
      ],
      hardware_options: [],
      hardware_type: null,
      brand_options: [],
      brand_type: "",
      model_options: [],
      model_type: null,
      partions: [],
      zones: [],
      partion_count: null,
      state_options: [
        {
          label: "PASİF",
          value: false,
        },
        {
          label: "AKTİF",
          value: true,
        },
      ],
      zone_type_options: [
        { value: 1, label: "Manyetik Kontak" },
        { value: 2, label: "PIR Dedektör" },
        { value: 3, label: "Yangın Dedektörü" },
        { value: 4, label: "Su Baskını Dedektörü" },
        { value: 5, label: "Panik Butonu" },
        { value: 6, label: "Kurma/Çözme Bölgesi" },
        { value: 7, label: "Siren Sabotaj" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getDeviceBrands: "model/getDeviceBrands",
      getDeviceModels: "model/getDeviceModels",
    }),
    isVisiblePartion: function () {
      return this.partion_count > 0;
    },
    isVisibleZone: function () {
      return this.zone_count > 0;
    },
  },
  methods: {
    ...mapActions({
      createDevice: "device/createDevice",
      updateDevice: "device/updateDevice",
      deleteDevice: "device/deleteDevice",
      getProsecDeviceById: "device/getProsecDeviceById",
    }),
    // handleChangePartion2(val) {},
    onDelete() {
      if (this.is_update) {
        let deleted_device = this.deleteDevice(this.$route.params.device_id);
        deleted_device.then((r) => {
          if (r.status) {
            this.$router.go(-1);
          }
        });
      }
    },
    onSubmit() {
      let configured_partition = [];
      console.log(this.partion);
      this.partion.forEach((item, index) => {
        item.number = index + 1;
        configured_partition.push({
          id: item.number,
          name: item.name,
          number: index + 1,
          zones: [],
        });
      });
      console.log("Zone", this.zone);
      configured_partition.forEach((key) => {
        let related_zone = this.zone.filter((item, index) => {
          item.number = index + 1;
          return item.prosec_partition_id == key.id;
        });
        console.log("Related Zone", related_zone);
        // let related_zone2 = [];
        // related_zone.forEach((item, index) => {
        //   item.number = index + 1;
        //   related_zone2.push(item);
        // });
        if (!this.is_update) {
          delete related_zone.prosec_partition_id;
          delete key.id;
        }
        key.zones.push(...related_zone);
      });

      let prosec_device = {
        name: "PROSEC DEVICE EDITED",
        premise_id: parseInt(this.$route.params.premise_id),
        device_brand_id: this.brand_type,
        device_model_id: this.model_type,
        hardware_type_id: this.hardware_type,
        subscriber: this.subscriber,
        inventory_number: this.inventory_number,
        partitions: [...configured_partition],
      };
      if (this.is_update) {
        prosec_device = {
          ...prosec_device,
          id: parseInt(this.$route.params.device_id),
        };
        console.log(prosec_device);
        let pdu_request = this.updateDevice(prosec_device);
        pdu_request.then((r) => {
          if (r.status) this.$router.push({ name: "Premises" });
        });
      } else {
        console.log(prosec_device);

        let pdc_request = this.createDevice(prosec_device);
        pdc_request.then((r) => {
          if (r.status) this.$router.push({ name: "Premises" });
        });
      }
    },
    handlePartionCountChange(val) {
      this.partion = [];
      for (let index = 0; index < val; index++) {
        let partion_variable = {
          name: null,
        };
        this.partion.push(partion_variable);
      }
    },
    handleZoneCountChange(val) {
      this.zone = [];
      for (let index = 0; index < val; index++) {
        let zone_variable = {
          state: null,
          name: null,
          type: null,
          partion: null,
          device: null,
          channel: null,
        };
        this.zone.push(zone_variable);
      }
    },
    handleHardwareTypeChange(val) {
      this.brand_options = [];
      this.brand_type = "";
      this.model_options = [];
      this.model_type = "";
      let hardwareType = [...HARDWARE_TYPES].filter((item) => {
        return item.value == val;
      });
      console.log(hardwareType);
      this.brand_options = hardwareType[0].brands;

      this.model_options = hardwareType[0].brands[0].models;
      // console.log("HardwareTypes", hardwareType);
      console.log("Brands", this.brand_options);
      // console.log("Model", this.model_options);
      // this.brand_options = this.getHardwareTypesBrands(this.getDeviceBrands);
    },
    handleBrandTypeChange() {
      // this.model_options = this.getHardwareTypesBrands(this.getDeviceModels);
    },
    getHardwareTypesBrands(val) {
      let brand_options = [];
      let brand = null;
      val.forEach((item) => {
        brand = { value: item.id, label: item.name.toUpperCase() };
        brand_options.push(brand);
      });
      return brand_options;
    },
  },
  created() {
    // this.hardware_options = [...DEVICE_TYPES];
    this.hardware_options = [...HARDWARE_TYPES];
    for (let index = 0; index < 65; index++) {
      let optionData = {
        label: index == 0 ? "Yok" : index.toString(),
        key: index,
      };
      this.zones.push(optionData);
    }
    for (let index = 0; index < 16; index++) {
      let optionData = {
        label: index == 0 ? "Yok" : index.toString(),
        key: index,
      };
      this.partions.push(optionData);
    }
    if (this.$route.params.device_id) {
      let device = this.getProsecDeviceById(this.$route.params.device_id);
      let zone_count = null;
      device.then((r) => {
        console.log(r);
        this.handleHardwareTypeChange(r.hardware_type.id);
        this.inventory_number = r.inventory_number;
        this.subscriber = r.subscriber;
        this.hardware_type = r.hardware_type.id;
        this.brand_type = r.device_brand_id;
        this.model_type = r.device_model_id;
        this.partion = [];
        r.partitions.forEach((item, index) => {
          console.log("İtem", item);

          this.partion.push({
            name: item.name,
            number: parseInt(index + item.id),
            zones: item.zones,
          });
          console.log("partion", this.partion);
        });
        this.partion_count = r.partitions.length;
        let zones = [];
        // let uniounZone = [];
        r.partitions.reverse().forEach((item) => {
          // zones = [...zones, ...item.zones];
          zones = zones.concat(item.zones);
          zone_count += item.zones.length;
        });
        this.zone_count = zone_count;
        this.zone = zones.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      });
    }
  },
  mounted() {
	bus.$on("buttonGroupClick", (param) =>{	
		switch (param) {
			case "onCreate":
				this.onSubmit()
				break;
			case "onUpdate":
				this.onSubmit()
				break;
			case "onDelete":
				this.onDelete()
				break;
			default:
				break;
		}
	});
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.create-hap-device-form {
  flex-basis: max-content;
  margin-left: 18px;
  margin-right: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-height: 100vh !important;
// min-height: 100% !important;
  p {
    @extend .sentinel-label;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    align-self: flex-start;
  }
  .general-information {
    display: flex;
    flex-direction: row;
    input {
      @extend .sentinel-input;
      min-width: 234px !important;
    }
    .component {
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: self-end;
      justify-content: space-between;
      flex-wrap: nowrap;
      margin-right: 28px;
      span {
        @extend .sentinel-label;
        margin-bottom: 5px;
      }
      .input {
        @extend .sentinel-input;
        width: 234px !important;
      }
      button {
        margin-top: 12px;
        @extend .sentinel-input;
      }
      &:nth-child(0) {
        margin-left: 23px;
      }
    }
  }
  .general-information-2 {
    margin-top: 35px;
    margin-bottom: 35px;
    @extend .general-information;
  }
  .connection-information {
    margin-bottom: 35px;
    @extend .general-information;
  }
  .description-information {
    margin-bottom: 35px;
    @extend .general-information;
  }
  .partion-information {
    @extend .general-information;
    display: flex;
    flex-direction: column;
    min-height: 175px;
    // overflow: scroll;
    .partion-input {
      display: flex;
      align-items: center;
      flex-direction: row;
      p {
        @extend .sentinel-label; 
        display: flex;
        align-items: center;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        margin-right: 23px;
        padding-top: 15px;
      }
      .component {
        margin-bottom: 10px;
        span {
          @extend .sentinel-label;
        }
      }
    }
  }
  .zone-information {
    @extend .general-information;
    display: flex;
    flex-direction: column;
    min-height: 175px;
    // overflow: scroll;

    .zone-input {
      display: flex;
      flex-direction: row;
      align-items: center;

      p {
        @extend .sentinel-label;
        display: flex;
        align-items: center;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        margin-right: 23px;
        padding-top: 15px;
      }
      .component {
        margin-bottom: 10px;
        span {
          @extend .sentinel-label;
        }
        .state-selectbox {
          width: 104px;
          border-radius: 4px;

          /* Inside Auto Layout */

          flex: none;
          order: 1;
          align-self: stretch;
          flex-grow: 0;
          margin: 0px 0px;
        }
        .zone-name {
          @extend .state-selectbox;
          width: 234px;
        }
        .zone-type {
          @extend .zone-name;
        }
        .zone-partion {
          @extend .state-selectbox;
        }
        .related-record-device {
          @extend .zone-name;
        }
        .zone-channel {
          @extend .state-selectbox;
        }
      }
    }
  }
  .footer-bottom-update {
    display: flex;
    margin-top: 10px;
    justify-content:flex-end;
    &__dangerous {
      display: flex;
      justify-content: flex-start !important;
      color: $hybrone_background_color;
      background-color: $hybrone_error_red !important;
    }
    &__success {
      display: flex;
      justify-content: flex-end !important;
      color: $hybrone_background_color;
      background-color: $hybrone_light_blue !important;
    }
  }
  .footer-bottom-create {
    display: flex;
    margin-top: 10px;
    justify-content: flex-end !important;
    &__dangerous {
      display: flex;
      justify-content: flex-start !important;
      color: $hybrone_background_color;
      background-color: $hybrone_error_red !important;
    }
    &__success {
      display: flex;
      justify-content: flex-end !important;
      color: $hybrone_background_color;
      background-color: $hybrone_light_blue !important;
    }
  }
}
</style>
