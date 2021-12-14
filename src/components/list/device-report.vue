<template>
  <div class="report-content">
    <div class="content">
      <span class="span-label">LİSTE</span>
      <el-select
        style="width: 100%"
        v-model="list_val"
        placeholder="Seçiniz"
        clearable
      >
        <el-option
          v-for="item in list_options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="content">
      <span class="span-label">TÜR</span>
      <el-select
        style="width: 100%"
        v-model="type"
        placeholder="Seçiniz"
        clearable
      >
        <el-option
          v-for="item in type_options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="content">
      <span class="span-label">FORMAT</span>
      <el-select
        style="width: 100%"
        v-model="response_type"
        placeholder="Seçiniz"
        clearable
      >
        <el-option
          v-for="item in format_options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="content">
      <span class="span-label">BAŞLANGIÇ ZAMANI</span>
      <el-date-picker
        style="width: 100%"
        v-model="start_time"
        type="datetime"
        placeholder="Tarih ve Saat seçiniz"
      >
      </el-date-picker>
    </div>
    <div class="content">
      <span class="span-label">BİTİŞ ZAMANI</span>
      <el-date-picker
        style="width: 100%"
        v-model="finish_time"
        type="datetime"
        placeholder="Tarih ve Saat seçiniz"
      >
      </el-date-picker>
    </div>
    <!-- <div class="save-button">
      <el-button type="primary" @click="handleOnSaveClick">Kaydet</el-button>
    </div> -->
  </div>
</template>

<script>
import { ACTIONS_FIELDS } from "@/constant";
import endpoints from "@/endpoints";
import { bus } from "@/main.js";

export default {
  name: "DeviceReport",
  data() {
    return {
      list_val: "",
      type: "",
      response_type: "",
      start_time: "",
      finish_time: "",
      type_options: [],
      format_options: [],
      list_options: [],
    };
  },
  computed: {
    getSelectedRowsPremiseId() {
      let selected_premise_ids = [];
      this.$store.state.dataTable.selectedRows.forEach((item) => {
        selected_premise_ids.push(item.premise_id);
      });
      return selected_premise_ids;
    },
  },
  methods: {
    handleReportSubmit() {
      let devicesPremiseID = [];
      let currentDate = new Date();
      if (this.start_time == "" || this.end_time == "") {
        let end_time = new Date();
        let start_time = new Date();
        start_time.setDate(end_time.getDate() - 30);
        this.end_time = end_time.toISOString();
        this.start_time = start_time.toISOString();
      }
      if (this.list_val != "all")
        devicesPremiseID = this.getSelectedRowsPremiseId;
      else devicesPremiseID = [];
      this.$api({
        ...endpoints.getDeviceReport,
        params: {
          response_type: this.response_type,
          report_type: this.type,
          start_time: this.start_time,
          finish_time: this.finish_time,
          premise_id: devicesPremiseID.join(),
        },
      }).then((r) => {
        if (r.status == 200) {
          console.log(r);
          const url = window.URL.createObjectURL(new Blob([r.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            "Cihaz-raporlari-" +
              currentDate.getFullYear() +
              ("0" + (currentDate.getMonth() + 1)).slice(-2) +
              ("0" + currentDate.getDate()).slice(-2) +
              ("0" + currentDate.getHours()).slice(-2) +
              ("0" + currentDate.getMinutes()).slice(-2) +
              ("0" + currentDate.getSeconds()).slice(-2) +
              "." +
              (this.response_type == "excel" ? "xlsx" : this.response_type)
          );
          // link.setAttribute('download', 'file.xlsx')
          document.body.appendChild(link);
          link.click();
          if (r.status) {
            this.$emit("onClose");
            this.list_val = "";
            this.start_time = "";
            this.finish_time = "";
            this.type = "";
            this.response_type = "";
          }
        }
      });
    },
  },
  created() {
    this.list_options = [...ACTIONS_FIELDS["REPORT"][0]["list"]["options"]];
    this.type_options = [...ACTIONS_FIELDS["REPORT"][0]["type"]["options"]];
    this.format_options = [...ACTIONS_FIELDS["REPORT"][0]["format"]["options"]];
  },
  mounted() {
    bus.$on("onReportSubmit", (val) => this.handleReportSubmit(val));
  },
};
</script>

<style></style>
