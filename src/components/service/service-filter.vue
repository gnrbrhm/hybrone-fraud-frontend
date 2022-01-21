<template>
  <div class="container">
    <div class="location">
      <span class="label">İSTASYON KODU</span>
      <el-input
        class="sentinel-input"
        type="search"
        v-model="filter_data.custom_premise_id"
      ></el-input>
    </div>
    <div v-if="false" class="status">
      <span class="label">Durum</span>
      <el-select
        class="sentinel-input"
        style="width: 100%"
        v-model="filter_data.status_code"
        placeholder="Seçiniz"
        clearable
      >
        <el-option
          v-for="item in status_option"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <!-- <div class="state">
      <span class="label">ARIZA TİPİ</span>
      <el-select
        style="width: 100%"
        v-model="filter_data.ticket_type"
        placeholder="Seçiniz"
        clearable
      >
        <el-option
          v-for="item in state_option"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div> -->
    <div class="date-range">
      <span class="label">TARİH ARALIĞI</span>
      <el-date-picker
        class="sentinel-date-time-input"
        @change="handleChangeDate"
        v-model="date_val"
        type="daterange"
        range-separator="-"
        start-placeholder="Başlangıç Tarihi"
        end-placeholder="Bitiş Tarihi"
      >
      </el-date-picker>
    </div>
    <el-button class="search-button" @click="onFilteredDataClick">
      <SvgIconSearch></SvgIconSearch>
    </el-button>
    <div class="actions">
      <div>
        <span class="label">Tamamla</span>
        <el-button
          class="sentinel-button"
          :disabled="
            this.getSelectedRows.length <= 0 ||
            !this.getPermissions['service_status_finished']
          "
          @click="handleAllDoneClick"
          type="info"
        >
          <SvgIconServiceAllDone></SvgIconServiceAllDone>
        </el-button>
      </div>
      <div>
        <span class="label">İçeri Aktar</span>
        <el-upload
          class="upload-demo"
          :auto-upload="false"
          accept=".xlsx"
          :file-list="fileList"
          :on-change="handleChange"
        >
          <el-button
            class="sentinel-button"
            :disabled="!this.getPermissions['service_data_import']"
            type="info"
          >
            <SvgIconServiceImport></SvgIconServiceImport>
          </el-button>
        </el-upload>
      </div>

      <div>
        <span class="label">Rapor</span>
        <el-button
          class="sentinel-button"
          :disabled="!this.getPermissions['service_report_create_and_download']"
          type="info"
          @click="onDownloadTicketList"
        >
          <SvgIconListRaport class="svg-icon"></SvgIconListRaport>
        </el-button>
      </div>
    </div>
    <el-dialog
      class="dialog-popup"
      width="600"
      :visible.sync="dialogImportVisible"
    >
      <div class="dialog-content">
        <SvgIconSettingDownload></SvgIconSettingDownload>
        <span class="event">İçe Aktarılıyor...</span>
        <span class="file-name">{{ this.filename }}</span>
        <el-button class="error-button">İptal</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="dialog-popup"
      width="600"
      :visible.sync="dialogTableVisible"
    >
      <div class="dialog-content-information">
        <span class="information">{{
          import_result.success_count +
          '/' +
          import_result.total_count +
          ' Kayıt Eklendi'
        }}</span>
        <span class="statuses">Eklenmeyen kayıtlar</span>
        <el-table
          class="error-record-table"
          stripe
          :data="resultTable"
          style="width: 100%"
        >
          <el-table-column prop="row" label="Sıra" width="200">
          </el-table-column>
          <el-table-column prop="id" label="İstasyon ID" width="300">
          </el-table-column>
          <el-table-column prop="description" label="Açıklama" width="150">
          </el-table-column>
        </el-table>
        <div class="bottom">
          <el-button
            class="close-button"
            type="primary"
            @click="closeDialogHandle"
            >Kapat</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Vue from 'vue'

// import endpoints from "@/endpoints";
import SvgIconServiceAllDone from '@/assets/icons/services/svg-icon-service-all-done.vue'
import SvgIconSearch from '@/assets/icons/list/svg-icon-search.vue'
import SvgIconSettingDownload from '@/assets/icons/settings/svg-icon-settings-download.vue'
import SvgIconListRaport from '@/assets/icons/services/svg-icon-list-rapor'
import SvgIconServiceImport from '@/assets/icons/services/svg-icon-service-import.vue'
import store from '../../store'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ServiceFilter',
  components: {
    SvgIconListRaport,
    SvgIconServiceImport,
    SvgIconSettingDownload,
    SvgIconServiceAllDone,
    SvgIconSearch
  },
  data() {
    return {
      is_selected: false,
      import_result: {
        total_count: null,
        fail_count: null,
        success_count: null
      },
      filtered_device: false,
      fileList: [],
      filename: '',
      dialogImportVisible: false,
      dialogTableVisible: false,
      date_val: '',
      filter_data: {
        // start_time: '',
        // finish_time: '',
        // ticket_type: ''
      },
      device_id: '',
      resultTable: [],
      status_option: [
        {
          label: 'Tamamlandı',
          value: 1
        },
        {
          label: 'Açık / Beklemede',
          value: 2
        }
      ],
      state_option: [
        {
          label: 'Tüm Durumlar',
          value: 'Tüm Durumlar'
        },
        {
          label: 'Açık',
          value: 'Açık'
        },
        {
          label: 'Genel Kontrol (Bakım)',
          value: 'Genel Kontrol (Bakım)'
        },
        {
          label: 'Genel Arıza',
          value: 'Genel Arıza'
        },
        {
          label: 'Batarya Hatası',
          value: 'Batarya Hatası'
        },
        {
          label: 'İletişim Hatası',
          value: 'İletişim Hatası'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: 'auth/getPermissions'
    }),
    getSelectedRows() {
      return this.$store.state.dataTable.selectedRows
    },
    getServiceIds() {
      let service_ids = []
      this.getSelectedRows.forEach((item) => {
        service_ids.push(item.id)
        console.log(item)
      })
      return service_ids
    }
  },
  methods: {
    ...mapActions({
      getTicketDownloadList: 'service/getTicketDownloadList',
      updateServiceStatus: 'service/updateServiceStatus'
    }),
    async handleAllDoneClick() {
      let done_service = await this.updateServiceStatus({
        ids: this.getServiceIds,
        status_code: 1
      })
      console.log('Done Service', done_service)
      if (done_service.status == 200) this.$emit('onUpdateTable', true)
    },
    closeDialogHandle() {
      this.fileList = []
      this.dialogTableVisible = false
    },
    handleChangeDate(val) {
      if (val != null) {
        this.filter_data.start_time = moment(val[0])
          .add(3, 'hours')
          ._d.toISOString()
        // .toISOString()
        this.filter_data.finish_time = moment(val[1])
          .add(3, 'hours')
          ._d.toISOString()

        console.log(this.filter_data.start_time)
        console.log(this.filter_data.finish_time)
        // .toISOString()
        // let start_time = new Date(val['0'])
        // let finish_time = new Date(val['1'])

        // if (start_time.getDate() == finish_time.getDate()) {
        //   start_time.setDate(start_time.getDate() + 1)
        //   finish_time.setDate(finish_time.getDate() + 1)
        // }
        // start_time = start_time.toISOString()
        // finish_time = finish_time.toISOString()
        // this.filter_data.start_time = start_time
        // this.filter_data.finish_time = finish_time
      } else {
        this.filter_data.start_time = ''
        this.filter_data.finish_time = ''
      }
    },
    onFilteredDataClick() {
      console.log(this.filter_data)
      Object.keys(this.filter_data).forEach((element) => {
        if (this.filter_data[element] == '') {
          console.log('Element', element)
          delete this.filter_data[element]
        }
      })
      this.$emit('onhandleFiltredParam', this.filter_data)
    },

    handleChange(file, fileList) {
      this.filename = file.name
      this.fileList.push(file)
      if (fileList.length > 0) {
        this.importDisabled = false
        this.isEmpyt = false
      }
      this.uploadFiles()
    },
    uploadFiles() {
      this.dialogImportVisible = true
      let token = store.state.auth.user.token
      const config = {
        headers: {
          'Content-Type':
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          Authorization: `Bearer ${token}`
        }
      }
      const form = new FormData()
      form.append('excel', this.fileList[0].raw, this.fileList[0].name)
      axios
        .post(
          // 'https://sentinel-api-hybrone-prod.apps.ocp3.akbank.com/api/v1/tickets/import/',
          // 'https://sentinel-api-hybrone-qa.apps.ocptest3.akbank.com/api/v1/tickets/import/',
          'http://10.100.0.34:3000/api/v1/tickets/import',
          //   'http://34.79.135.127:3000/api/v1/tickets/import',
          // 'http://10.81.102.51:3000/api/v1/tickets/import',
          form,
          config
        )
        .then((r) => {
          this.import_result = { ...r.data.data }
          this.import_result.total_count =
            parseInt(this.import_result.fail_count) +
            parseInt(this.import_result.success_count)
          this.resultTable = r.data.data.failed_rows
        })
        .catch((error) => {
          Vue.notify({
            text: error.response.data.message,
            group: 'error-template',
            type: 'error'
          })
        })
      setTimeout(() => {
        this.dialogImportVisible = false
        this.dialogTableVisible = true
        this.$emit('onUpdateTable', true)
      }, 750)
    },
    getDownloadExcel(data) {
      let currentDate = new Date()
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        'Teknik-servis ' +
          currentDate.getFullYear() +
          ('0' + (currentDate.getMonth() + 1)).slice(-2) +
          ('0' + currentDate.getDate()).slice(-2) +
          ('0' + currentDate.getHours()).slice(-2) +
          ('0' + currentDate.getMinutes()).slice(-2) +
          ('0' + currentDate.getSeconds()).slice(-2) +
          '.xlsx'
      )
      document.body.appendChild(link)
      link.click()
    },

    onDownloadTicketList() {
      // this.$api({
      //   ...endpoints.getTicketsListDownload,
      //   params: { response_type: "excel", ...this.filter_data },
      // }).then((r) => {
      let download_list = this.getTicketDownloadList(this.filter_data)
      download_list.then((r) => {
        this.getDownloadExcel(r)
      })
    }
  },
  created() {
    if (this.$route.params.premise_id) {
      console.log(this.$route.params.premise_id)
      this.filter_data.search = this.$route.params.premise_id
      this.onFilteredDataClick(this.$route.params.premise_id)
    }
  },
  mounted() {
    console.log('Seçili Satırlar', this.getSelectedRows)
    this.is_selected = this.getSelectedRows.length > 0
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 20px;
  align-items: flex-end;
  height: 85px;

  // margin-bottom: 36px;
  // padding-left: 23px;
}
// .actions {
//   display: flex;
//   justify-content: flex-end;

//   div:first-child {
//     margin-right: 20px;
//   }
// }
// .actions button {
//   @extend .sentinel-button;
//   background-color: $hybrone_background_color;
//   align-items: center;
//   width: 50px;
//   height: 50px;
//   padding: 0px;
// }
// .actions button span {
//   display: flex;
//   justify-content: center;
// }
.actions {
  display: flex;
  flex-direction: row;
  align-content: left;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;
  grid-column: 7;
  div:nth-child(1) {
    margin-right: 20px;
  }
  div:nth-child(2) {
    margin-right: 10px;
  }
  span {
    @extend .sentinel-label;
  }
  button {
    @extend .sentinel-button;
    height: 50px;
    width: 50px;
    padding: 0px;
    &:nth-child(1) {
      //   margin-right: 20px;
    }
    span {
      display: flex;
      justify-content: center;
    }
    &:hover {
      background-color: $hybrone_light_blue;
      svg {
        path {
          fill: $hybrone_background_color;
        }
      }
    }
    &:focus {
      background-color: $hybrone_light_blue;
      border-color: $hybrone_avatar_background;
      svg {
        path {
          fill: $hybrone_background_color;
        }
      }
    }
    &:disabled {
      background-color: #fff;

      svg {
        path {
          fill: $hybrone_disabled_color;
        }
      }
    }
  }
}

.container span {
  @extend .sentinel-label;

  display: flex;
  align-items: center;

  color: #000000;
}
.dialog-content {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: 1fr auto 1fr;
  grid-gap: 10px;
}
.dialog-content svg {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin: auto;
}
.event {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  margin: auto;

  color: #000000;
  grid-column: 2;
  grid-row: 2;
}
.file-name {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: auto;

  color: #000000;
  grid-column: 2;
  grid-row: 3;
}
.error-button {
  grid-column: 2;
  grid-row: 4;
  width: 124.61px;
  height: 40px;
  display: flex;
  justify-content: center;
  background: #ed2f2f;
  margin: auto;
}
.date-range span {
  font-family: Roboto;
  font-style: normal;
  font-weight: 200;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: #000000;
}
.information {
  grid-column: 2;
  grid-row: 1;
  font-family: Roboto !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 24px !important;
  line-height: 28px !important;
  display: flex;
  justify-content: center;
  color: #000000;
}
.dialog-content-information {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 10px;
}
.statuses {
  grid-column: 2;
  grid-row: 2;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;

  color: #000000;
}
.error-record-table {
  grid-column: 2;
  grid-row: 3;
}
.close-button {
  width: 124.61px;
  height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  grid-column: 2;
}
.bottom {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column: 2;
  grid-row: 4;
}

.label {
  @extend .sentinel-label;
}
.search-button {
  @extend .sentinel-button;
  width: 50px;
  height: 50px;
  margin-top: 15px;
  padding: initial;
  &:hover {
    background-color: $hybrone_background_color;
    border-color: $hybrone_light_blue;
  }
}
</style>
