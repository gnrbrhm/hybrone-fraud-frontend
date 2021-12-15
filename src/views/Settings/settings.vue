<template>
  <div class="container">
    <div class="header">
      <span class="settings-title">Ayarlar</span>
    </div>
    <div class="content">
      <div v-if="false" class="period">
        <div class="chart-title">Sorgulama Periyodu</div>
        <span class="span-text"
          >Cihaz Durumlarını otomatik olarak sorgulama prediyodunu
          belirleyebilirsiniz.</span
        >
        <div class="chart-actions">
          <el-select
            v-model="query_result"
            @change="onhandleChangePeriod"
            placeholder="Seçiniz"
          >
            <el-option
              v-for="item in query_state_option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button class="save-button" type="primary" @click="onhandleSave"
            >Kaydet</el-button
          >
        </div>
      </div>
      <div v-if="false" class="import-file">
        <div class="chart-title">Cihaz Listesi İçe Aktar</div>
        <span class="span-text"
          >Hazırlanan XLS formatındaki listeyi sisteme
          aktarabilirsiniz.Tekrarlanan veriler aktarılmayacaktır.</span
        >
        <div class="chart-actions">
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            accept=".xlsx"
            :file-list="fileList"
            :on-change="handleChange"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
          >
            <el-button v-if="isEmpyt" type="primary" class="select-file-button"
              >Dosya Seç</el-button
            >
            <div width="50px" slot="tip" class="el-upload__tip"></div>
          </el-upload>
          <el-button
            :disabled="importDisabled"
            class="save-button"
            type="primary"
            @click="uploadFiles"
            >İçeri Aktar</el-button
          >
        </div>
      </div>
      <div class="process-logs">
        <div class="chart-title">İşlem Logları</div>
        <span class="span-text"
          >Gerçekleştirilen tüm kullanıcı işlemlerinizi listeleyebilir, rapor
          oluşturabilirsiniz.</span
        >
        <div class="chart-actions">
          <el-button
            class="save-button logs"
            type="primary"
            @click="onClicksLogs"
            >Loglar</el-button
          >
        </div>
      </div>
      <!-- <div class="process-logs">
        <div class="chart-title">Sistemi Yedekle</div>
        <span class="span-text">Tüm sistemin yedeğini alabilirsiniz.</span>
        <div class="chart-actions">
          <el-button
            class="save-button logs"
            type="primary"
            @click="getBackupFile"
            >Yedekle</el-button
          >
        </div>
      </div> -->
      <!-- <div class="process-logs">
        <div class="chart-title">Yedeklenen Veriyi Geri Yükle</div>
        <span class="span-text"
          >Yedeklenen verilerinizi geri yükleyebilirsiniz.</span
        >
        <div class="chart-actions">
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            :file-list="backupList"
            :on-change="handleBackupChange"
            :on-remove="handleBackupRemove"
          >
            <el-button
              v-if="isBackupEmpyt"
              type="primary"
              class="select-file-button"
              >Dosya Seç</el-button
            >

            <div width="50px" slot="tip" class="el-upload__tip"></div>
          </el-upload>
          <el-button
            :disabled="backupDisabled"
            class="save-button"
            type="primary"
            @click="uploadBackupFiles"
            >Geri Yükle</el-button
          >
        </div>
      </div> -->
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
        <span class="status">Eklenmeyen kayıtlar</span>
        <el-table
          class="error-record-table"
          stripe
          :data="resultTable"
          style="width: 100%"
        >
          <el-table-column prop="row" label="Sıra" width="60px">
          </el-table-column>
          <el-table-column prop="id" label="ATM ID" width="80px">
          </el-table-column>
          <el-table-column prop="description" label="Açıklama" width="auto">
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
import endpoints from '@/endpoints'
import SvgIconSettingDownload from '@/assets/icons/settings/svg-icon-settings-download.vue'
import store from '../../store'

export default {
  name: 'Settings',
  components: {
    SvgIconSettingDownload
  },
  data() {
    return {
      import_result: {
        total_count: null,
        fail_count: null,
        success_count: null
      },
      setting: { name: 'QueryPeriod', value: this.query_result },
      dialogImportVisible: false,
      dialogTableVisible: false,
      isEmpyt: true,
      isBackupEmpyt: true,
      query_result: '',
      fileList: [],
      backupList: [],
      filename: '',
      backupname: '',
      importDisabled: true,
      backupDisabled: true,
      query_state_option: [
        {
          label: 'Kapalı',
          value: 'closed'
        },
        {
          label: '1 Saat',
          value: '1'
        },
        {
          label: '3 Saat',
          value: '3'
        },
        {
          label: '6 Saat',
          value: '6'
        },
        {
          label: '12 Saat',
          value: '12'
        },
        {
          label: '24 Saat',
          value: '24'
        }
      ],
      resultTable: []
    }
  },
  methods: {
    getBackupFile() {
      this.$api({
        ...endpoints.getBackupFiles
      }).then((r) => {
        const url = window.URL.createObjectURL(new Blob([r.data]))
        const link = document.createElement('a')
        link.href = url
        // link.setAttribute('download', 'file.xlsx')
        document.body.appendChild(link)
        link.click()
      })
    },
    handleRemove() {
      setTimeout(() => {
        this.isEmpyt = true
        this.importDisabled = true
        this.fileList = []
      }, 500)
    },
    handleBackupRemove() {
      setTimeout(() => {
        this.isBackupEmpyt = true
        this.backupDisabled = true
        this.backupList = []
      }, 500)
    },
    onhandleChangePeriod(val) {
      this.setting.value = val
    },
    onhandleSave() {
      this.updateQueryPeriod()
    },
    onClicksLogs() {
      this.$router.push('/settings/logs')
    },
    handleChange(file, fileList) {
      this.filename = file.name
      this.fileList.push(file)
      console.log(file)
      console.log(fileList)
      if (fileList.length > 0) {
        this.importDisabled = false
        this.isEmpyt = false
      }
    },
    handleBackupChange(file, fileList) {
      this.backupname = file.name
      this.backupList.push(file)
      console.log(file)
      console.log(fileList)
      if (this.backupList.length > 0) {
        this.backupDisabled = false
        this.isBackupEmpyt = false
      }
    },
    uploadFiles() {
      this.$confirm('Toplu cihaz ekleme işlemi için emin misiniz ?', {
        confirmButtonText: 'Evet',
        cancelButtonText: 'Hayır'
      }).then(() => {
        let token = store.state.auth.user.token
        const config = {
          headers: {
            'Content-Type':
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            Authorization: `Bearer ${token}`
          }
        }
        this.dialogImportVisible = true
        const form = new FormData()
        form.append('excel', this.fileList[0].raw, this.fileList[0].name)
        axios
          .post(
            'https://sentinel-api-hybrone-prod.apps.ocp3.akbank.com/api/v1/premises/excel',
            // 'http://10.81.102.51:3000/api/v1/premises/excel',
            // 'https://sentinel-api-hybrone-qa.apps.ocptest3.akbank.com/api/v1/premises/excel',
            // 'http://192.168.3.202:3000/api/v1/premises/excel',
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
        setTimeout(() => {
          this.dialogImportVisible = false
          this.dialogTableVisible = true
        }, 1500)
      })
    },
    uploadBackupFiles() {
      this.$confirm(
        this.backupname + 'isimli yedeği yüklemek istediğinize emin misiniz ?',
        {
          confirmButtonText: 'Evet',
          cancelButtonText: 'Hayır'
        }
      ).then(() => {
        let token = store.state.auth.user.token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        const form = new FormData()
        form.append('zip', this.backupList[0].raw, this.backupList[0].name)
        axios
          .post(
            'https://sentinel-api-hybrone-prod.apps.ocp3.akbank.com/api/v1/premises/excel',
            // 'http://10.81.102.51:3000/api/v1/premises/excel',
            // 'https://sentinel-api-hybrone-qa.apps.ocptest3.akbank.com/api/v1/premises/excel',
            // 'http://192.168.3.202:3000/api/v1/premises/excel',
            form,
            config
          )
          .then((r) => {
            console.log(r)
            //Buraya bir şeyler gelicek
          })
        setTimeout(() => {
          this.backupList = []
          this.backupname = ''
        }, 1500)
      })
    },
    closeDialogHandle() {
      this.dialogTableVisible = false
    },
    updateQueryPeriod() {
      this.$api({
        ...endpoints.updateSettings,
        data: { setting: { ...this.setting } }
      }).then((r) => {
        console.log(r)
        if (r.status == 200) {
          this.$message({
            type: 'success',
            message: 'Periyot güncelleme başarılı'
          })
        }
      })
    },
    getSettings() {
      this.$api({
        ...endpoints.getSettings
      }).then((r) => {
        console.log(r)
        this.query_result = r.data.data.settings[0].value
      })
    }
  },
  created() {
    this.getSettings()
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.container {
  min-height: 100vh;
  margin: 27px 38px 12px 32px;
}
.header {
  @extend .sentinel-label;
  margin-top: 80px;
  margin-bottom: 40px;
}
.content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
}
.period,
.process-logs,
.import-file {
  border: 1px solid #c3c3c3;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 225px;
}
.settings-title {
  grid-row: 2;
  // font-family: Roboto;
  // font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #000000;
  @extend .sentinel-label;
}
.chart-title {
  // font-family: Roboto;
  // font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: #000000;
  @extend .sentinel-label;
}
.span-text {
  // font-family: Roboto;
  // font-style: normal;
  font-weight: 200;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  @extend .sentinel-label;
}
.chart-actions {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}
.save-button {
  @extend .sentinel-button__settings;
  &.logs:only-child {
    margin-left: auto;
  }
}
.select-file-button {
  @extend .save-button;
  background: #7d30df;
  border-color: #7d30df;

  &:hover,
  &:focus,
  &:active {
    background-color: #7d30df;
    border-color: #7d30df;
    opacity: 0.8;
  }
}
.hour-period {
  width: auto;
  grid-column: 1;
}
button span {
  color: #ffffff !important;
}
.upload-demo {
  display: flex;
  justify-content: center;
  // width: 50px !important;
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
.error-button:hover {
  background: #880808;
}
.dialog-content-information {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 10px;
}
.information {
  grid-column: 2;
  grid-row: 1;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  justify-content: center;
  color: #000000;
}
.status {
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
.bottom {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column: 2;
  grid-row: 4;
}
.close-button {
  width: 124.61px;
  height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  grid-column: 2;
}
</style>
