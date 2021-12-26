<template>
  <div class="container">
    <div class="header">
      <span class="settings-title">Ayarlar</span>
    </div>
    <div class="content">
      <!-- Sorgulama Periyodu -->
      <div class="process-logs">
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
      <!-- Cihaz Listesi İçe Aktar -->
      <div class="process-logs">
        <div class="chart-title">Cihaz Listesi İçe Aktar</div>
        <span class="span-text"
          >Hazırlanan XLS formatındaki listeyi sisteme
          aktarabilirsiniz.Tekrarlanan veriler aktarılmayacaktır.</span
        >
        <div class="chart-actions">
          <!-- <el-upload
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
          </el-upload> -->
          <el-button
            class="save-button logs"
            type="primary"
            @click="handleImportDevice"
            >İçeri Aktar</el-button
          >
          <!-- @click="uploadFiles" -->
        </div>
        <!-- Sorgulama Periyodu -->
        <!-- Sorgulama Periyodu -->
      </div>
      <!-- Cihaz Listesi Dışa Aktar -->
      <div class="process-logs">
        <div class="chart-title">Cihaz Listesini Dışa Aktar</div>
        <span class="span-text"
          >Cihaz listesini XLS / CSV formatlarında yedekleyebilirsiniz.</span
        >
        <div class="chart-actions">
          <el-button
            class="save-button logs"
            type="primary"
            @click="getBackupFile"
            >Dışa Aktar</el-button
          >
        </div>
      </div>
      <!-- İşlem Logları -->
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
      <!-- Kullanıcı Yetki Yönetimi -->
      <div class="process-logs">
        <div class="chart-title">Kullanıcılar</div>
        <span class="span-text"
          >Sistem kullanıcılarını listeleyebilir, yetkilerini düzenleyebilir,
          kullanıcı ekleyip kaldırabilirsiniz.</span
        >
        <div class="chart-actions">
          <el-button
            class="save-button logs"
            type="primary"
            @click="onClicksUsers"
            >Kullanıcılar</el-button
          >
        </div>
      </div>
      <!-- Şifre Değiştirme-->
      <div class="process-logs">
        <div class="chart-title">Şifre Değiştir</div>
        <span class="span-text">Kullanıcı şifrenizi değiştirebilirsiniz.</span>
        <div class="chart-actions">
          <el-button
            class="save-button logs"
            type="primary"
            @click="changeUserPassword"
            >Şifre Değiştir</el-button
          >
        </div>
      </div>
    </div>
    <!-- İmport Device -->
    <el-dialog
      class="dialog-popup"
      width="510px"
      :visible.sync="dialogImportDevicePopupVisible"
    >
      <div class="password-change-user-dialog-content">
        <div class="span-title">
          İçeri aktarmak istediğiniz XLS dosyasını seçiniz.
        </div>
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
          <span class="label">DOSYA SEÇ</span>
          <el-input v-if="isEmpyt" type="primary" class="select-file-input"
            ><el-button slot="append" width="44px" height="39px"
              ><SvgIconFileUpload></SvgIconFileUpload></el-button
          ></el-input>
          <div width="50px" slot="tip" class="el-upload__tip"></div>
        </el-upload>
        <div class="form">
          <div class="action-button-group">
            <el-button
              class="canceled-button"
              @click="() => (this.dialogImportDevicePopupVisible = false)"
              ><span> Vazgeç</span></el-button
            >
            <el-button
              class="apply-button"
              @click="handleImportDevicePopupApply"
              ><span>Aktar</span></el-button
            >
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- İmport Device Confirm -->
    <el-dialog
      class="dialog-popup"
      width="510px"
      :visible.sync="dialogImportDeviceConfirmPopupVisible"
    >
      <div class="password-change-user-dialog-content">
        <div class="span-title">
          Lokasyon bilgileri güncellenecek, devam etmek istediğinize emin
          misiniz?
        </div>
        <div class="form">
          <div class="action-button-group">
            <el-button
              class="canceled-button"
              @click="
                () => (this.dialogImportDeviceConfirmPopupVisible = false)
              "
              ><span> Vazgeç</span></el-button
            >
            <el-button class="apply-button" @click="uploadFiles"
              ><span>Aktar</span></el-button
            >
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- İmport Device Progress Bar -->
    <el-dialog
      class="dialog-popup"
      width="510px"
      :visible.sync="dialogImportDeviceProgressPopupVisible"
    >
      <div class="password-change-user-dialog-content">
        <div class="span-title">Lokasyon bilgileri güncelleniyor...</div>
        <div class="form">
          <el-progress
            :percentage="percentage"
            :color="customColor"
          ></el-progress>
        </div>
      </div>
    </el-dialog>
    <!-- Import Device Error -->
    <el-dialog
      class="dialog-popup"
      width="510px"
      :visible.sync="dialogImportDeviceErrorPopup"
    >
      <div class="password-change-user-dialog-content">
        <div class="span-text__error">Lokasyon bilgileri güncellenemedi.</div>
        <div class="form">
          <div class="action-button-group">
            <el-button
              class="apply-button"
              @click="() => (this.dialogImportDeviceErrorPopup = false)"
              ><span>Tamam</span></el-button
            >
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- Import Device Error -->
    <el-dialog
      class="dialog-popup"
      width="510px"
      :visible.sync="dialogImportDeviceSuccessPopup"
    >
      <div class="password-change-user-dialog-content">
        <div class="span-text">Lokasyon bilgileri güncellendi.</div>
        <div class="form">
          <div class="action-button-group">
            <el-button
              class="apply-button"
              @click="() => (this.dialogImportDeviceSuccessPopup = false)"
              ><span>Tamam</span></el-button
            >
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- Result İmport Device Table 
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
    </el-dialog>-->
    <!-- Password Reset Dialog -->
    <el-dialog
      class="dialog-popup"
      width="500px"
      :visible.sync="passwordResetDialogVisible"
    >
      <div class="password-change-user-dialog-content">
        <div class="span-title">
          Yeni kullanıcı için aşağıdaki bilgileri giriniz.
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="300"
          class="form"
          :show-close="!this.$route.query.is_random_password"
          :close-on-press-escape="!this.$route.query.is_random_password"
        >
          <span class="label">MEVCUT ŞİFRE</span>
          <el-form-item prop="name">
            <el-input
              id="current_password"
              type="password"
              v-model="ruleForm.current_password"
            ></el-input>
          </el-form-item>
          <span class="label">YENİ ŞİFRE</span>
          <el-form-item prop="new_password">
            <el-input
              id="new_password"
              type="password"
              height="50px"
              v-model="ruleForm.new_password"
            ></el-input>
          </el-form-item>
          <span class="label">YENİ ŞİFRE TEKRAR</span>
          <el-form-item prop="confirm_new_password">
            <el-input
              id="confirm_new_password"
              type="password"
              height="50px"
              v-model="ruleForm.confirm_new_password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div
              class="action-button-group"
              :style="
                this.$route.query.is_random_password
                  ? 'justify-content: center;'
                  : ''
              "
            >
              <el-button
                v-if="!this.$route.query.is_random_password"
                class="canceled-button"
                @click="handleCloseCreateUserDialog"
                ><span> Vazgeç</span></el-button
              >
              <el-button
                class="apply-button"
                @click="changeUserPasswordSubmitForm('ruleForm')"
                ><span> Oluştur</span></el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import endpoints from '@/endpoints'
import SvgIconFileUpload from '@/assets/icons/settings/svg-icon-file-upload.vue'
import store from '../../store'
import { mapActions } from 'vuex'
export default {
  name: 'Settings',
  components: {
    SvgIconFileUpload
  },
  data() {
    return {
      passwordResetDialogVisible: false || this.$route.query.is_random_password,
      is_random_password: false,
      dialogImportDevicePopupVisible: false,
      dialogImportDeviceConfirmPopupVisible: false,
      dialogImportDeviceProgressPopupVisible: false,
      dialogImportDeviceErrorPopup: false,
      dialogImportDeviceSuccessPopup: false,
      customColor: '#007DB7',
      percentage: 0,
      ruleForm: {
        current_password: '',
        new_password: '',
        confirm_new_password: ''
      },
      rules: {
        current_password: [
          {
            required: true,
            message: 'Lütfen adı giriniz !',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 50,
            message: 'Length should be 3 to 5',
            trigger: 'blur'
          }
        ],
        new_password: [
          {
            required: true,
            message: 'Lütfen soyadı giriniz.',
            trigger: 'blur'
          }
        ],
        confirm_new_password: [
          {
            required: true,
            message: 'Lütfen email giriniz.',
            trigger: 'blur'
          }
        ]
      },
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
          label: '5 Dakika',
          value: '5'
        },
        {
          label: '10 Dakika',
          value: '10'
        },
        {
          label: '15 Dakika',
          value: '15'
        },
        {
          label: '30 Dakika',
          value: '30'
        },
        {
          label: '1 Saat',
          value: '60'
        },
        {
          label: '3 Saat',
          value: '24'
        },
        {
          label: '5 Saat',
          value: '300'
        },
        {
          label: '12 Saat',
          value: '720'
        }
      ],
      resultTable: []
    }
  },
  methods: {
    ...mapActions({
      changeUserPasswordVerify: 'auth/changeUserPasswordVerify'
    }),
    handleImportDevicePopupApply() {
      this.dialogImportDevicePopupVisible = false
      this.dialogImportDeviceConfirmPopupVisible = true
    },
    changeUserPasswordSubmitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let result = this.changeUserPasswordVerify({
            old_password: this.ruleForm.current_password,
            new_password: this.ruleForm.new_password
          })
          console.log(result)
          if (result.status == 200) {
            this.passwordResetDialogVisible = false
            this.ruleForm.current_password = ''
            this.ruleForm.new_password = ''
            this.ruleForm.confirm_new_password = ''
          }
        }
      })
    },
    changeUserPassword() {
      this.passwordResetDialogVisible = true
    },
    onClicksUsers() {
      this.$router.push({ name: 'UserPermissions' })
    },
    handleImportDevice() {
      this.dialogImportDevicePopupVisible = true
    },
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
      let token = store.state.auth.user.token
      let perc = 0
      const config = {
        headers: {
          'Content-Type':
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          Authorization: `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          perc = Math.round((event.loaded * 100) / event.total)
          console.log('onUploadProgress', perc)
        }
      }
      const form = new FormData()
      form.append('excel', this.fileList[0].raw, this.fileList[0].name)
      axios
        .post('http://34.79.135.127:3000/api/v1/premises/excel', form, config)
        .then((r) => {
          console.log(r)
          if (r.status == 200) {
            this.dialogImportDeviceConfirmPopupVisible = false
            this.dialogImportDeviceProgressPopupVisible = true
            this.percentage = perc
            this.import_result = { ...r.data.data }
            this.import_result.total_count =
              parseInt(this.import_result.fail_count) +
              parseInt(this.import_result.success_count)
            this.resultTable = r.data.data.failed_rows
            this.dialogImportDeviceSuccessPopup = true
          } else {
            alert('else')
            this.dialogImportDeviceErrorPopup = true
          }
        })
        .catch(() => {
          this.dialogImportDeviceConfirmPopupVisible = false
          this.dialogImportDeviceProgressPopupVisible = false
          this.dialogImportDeviceErrorPopup = true
        })
      //   setTimeout(() => {
      //     this.dialogImportVisible = false
      //     this.dialogTableVisible = true
      //   }, 1500)
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
    if (this.$route.query.is_random_password) {
      this.is_random_password = this.$route.query.is_random_password
    }
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
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;

  /* Gray Dark */

  color: #444444;
  @extend .sentinel-label;
}
.process-logs .span-text {
  @extend .sentinel-label;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: flex-start;
  align-self: flex-start;
  margin-top: 20px;
  /* Gray Dark */

  color: #444444;
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
.password-change-user-dialog-content {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  max-width: 376px;
  .span-title {
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 25px;
  }
  .span-text {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;

    /* Gray Dark */

    color: #444444;
    &__error {
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 21px;
      display: flex;
      align-items: center;
      text-align: center;
      color: #e04141;
    }
  }
  .form {
    display: flex;
    flex-direction: column;
    align-content: center;
    min-width: 276px;
    span {
      display: flex;
      justify-content: flex-start;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      font-feature-settings: 'zero' on;
      margin-bottom: 4px;

      /* Gray Dark */

      color: #444444;
    }
    input {
      min-width: 100% !important;
    }
    .action-button-group {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .canceled-button {
        width: 120px;
        height: 39px;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          text-align: center;

          /* Hybrone Blue */

          color: #2c3357 !important;

          text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
        }
      }
      .apply-button {
        background: $hybrone_light_blue;
        box-shadow: 0px 2px 4px rgba(91, 134, 245, 0.05);
        border-radius: 4px;
        width: 120px;
        display: flex;
        height: 39px;
        align-items: center;
        justify-content: center;
        span {
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          text-align: center;

          /* White */

          color: #ffffff;
        }
      }
    }
  }
}
</style>
