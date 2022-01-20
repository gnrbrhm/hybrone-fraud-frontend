<template>
  <div class="report-content">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="auto"
      class="demo-ruleForm"
    >
      <div class="content">
        <span class="span-label">LİSTE</span>
        <el-form-item prop="list_val">
          <el-select
            style="width: 100%"
            v-model="ruleForm.list_val"
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
        </el-form-item>
      </div>
      <div class="content">
        <el-form-item prop="type">
          <span class="span-label">TÜR</span>
          <el-select
            style="width: 100%"
            v-model="ruleForm.type"
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
        </el-form-item>
      </div>
      <div class="content">
        <span class="span-label">FORMAT</span>
        <el-form-item prop="response_type">
          <el-select
            style="width: 100%"
            v-model="ruleForm.response_type"
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
        </el-form-item>
      </div>
      <div class="content">
        <span class="span-label">BAŞLANGIÇ ZAMANI</span>
        <el-form-item prop="start_time">
          <el-date-picker
            style="width: 100%"
            v-model="ruleForm.start_time"
            type="datetime"
            placeholder="Tarih ve Saat seçiniz"
          >
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="content">
        <span class="span-label">BİTİŞ ZAMANI</span>
        <el-form-item prop="finish_time">
          <el-date-picker
            style="width: 100%"
            v-model="ruleForm.finish_time"
            type="datetime"
            placeholder="Tarih ve Saat seçiniz"
          >
          </el-date-picker>
        </el-form-item>
      </div>
      <!-- <div class="save-button">
      <el-button type="primary" @click="handleOnSaveClick">Kaydet</el-button>
    </div> -->
    </el-form>
  </div>
</template>

<script>
import { ACTIONS_FIELDS } from '@/constant'
import endpoints from '@/endpoints'
import { bus } from '@/main.js'

export default {
  name: 'DeviceReport',
  data() {
    return {
      ruleForm: {
        list_val: '',
        type: '',
        response_type: '',
        start_time: '',
        finish_time: ''
      },
      rules: {
        list_val: [
          { required: true, message: 'Cihaz seçimi yapınız', trigger: 'change' }
        ],
        type: [
          { required: true, message: 'Rapor türü seçiniz', trigger: 'change' }
        ],
        response_type: [
          {
            required: true,
            message: 'İndirmek istediğiniz formatı seçiniz.',
            trigger: 'change'
          }
        ],
        start_time: [
          {
            type: 'date',
            required: true,
            message: 'Başlangıç tarihi giriniz.',
            trigger: 'change'
          }
        ],
        finish_time: [
          {
            type: 'date',
            required: true,
            message: 'Bitiş tarihi giriniz.',
            trigger: 'change'
          }
        ]
      },
      list_val: '',
      type: '',
      response_type: '',
      start_time: '',
      finish_time: '',
      type_options: [],
      format_options: [],
      list_options: []
    }
  },
  computed: {
    getSelectedRowsPremiseId() {
      let selected_premise_ids = []
      this.$store.state.dataTable.selectedRows.forEach((item) => {
        selected_premise_ids.push(item.id)
      })
      return selected_premise_ids
    }
  },
  methods: {
    handleReportSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let devicesPremiseID = []
          let currentDate = new Date()
          if (this.start_time == '' || this.end_time == '') {
            let end_time = new Date()
            let start_time = new Date()
            start_time.setDate(end_time.getDate() - 30)
            this.end_time = end_time.toISOString()
            this.start_time = start_time.toISOString()
          }
          if (this.list_val != 'all')
            devicesPremiseID = this.getSelectedRowsPremiseId
          else devicesPremiseID = []
          this.$api({
            ...endpoints.getDeviceVguardReport,
            params: {
              response_type: this.ruleForm.response_type,
              report_type: this.ruleForm.type,
              start_time: this.ruleForm.start_time,
              finish_time: this.ruleForm.finish_time,
              device_id: devicesPremiseID.join(),
              page: 1,
              limit: 20
            }
          }).then((r) => {
            if (r.status == 200) {
              console.log(r)
              const url = window.URL.createObjectURL(new Blob([r.data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute(
                'download',
                'Cihaz-raporlari-' +
                  currentDate.getFullYear() +
                  ('0' + (currentDate.getMonth() + 1)).slice(-2) +
                  ('0' + currentDate.getDate()).slice(-2) +
                  ('0' + currentDate.getHours()).slice(-2) +
                  ('0' + currentDate.getMinutes()).slice(-2) +
                  ('0' + currentDate.getSeconds()).slice(-2) +
                  '.' +
                  (this.response_type == 'excel' ? 'xlsx' : this.response_type)
              )
              // link.setAttribute('download', 'file.xlsx')
              document.body.appendChild(link)
              link.click()
              if (r.status) {
                this.$emit('onClose')
                this.list_val = ''
                this.start_time = ''
                this.finish_time = ''
                this.type = ''
                this.response_type = ''
              }
            }
          })
        }
      })
    }
  },
  created() {
    this.list_options = [...ACTIONS_FIELDS['REPORT'][0]['list']['options']]
    this.type_options = [...ACTIONS_FIELDS['REPORT'][0]['type']['options']]
    this.format_options = [...ACTIONS_FIELDS['REPORT'][0]['format']['options']]
  },
  mounted() {
    bus.$on('onReportSubmit', (val) => this.handleReportSubmit(val))
  },
  destroy() {
    bus.$on('onReportSubmit')
  }
}
</script>

<style></style>
