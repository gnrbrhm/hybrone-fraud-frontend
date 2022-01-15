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
        <span class="span-label">DURUM</span>

        <el-form-item prop="ticket_type">
          <el-select
            style="width: 100%"
            v-model="ruleForm.ticket_type"
            placeholder="Seçiniz"
            clearable
          >
            <el-option
              v-for="item in state_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="content">
        <span class="span-label">PLANLANAN BAŞLANGIÇ ZAMANI</span>
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
        <span class="span-label">PLANLANAN BİTİŞ ZAMANI</span>
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
      <div class="content">
        <span class="span-label">AÇIKLAMA</span>
        <el-form-item>
          <el-input
            type="textarea"
            :rows="4"
            placeholder=""
            v-model="ruleForm.description"
          >
          </el-input>
        </el-form-item></div
    ></el-form>
    <!-- <div class="save-button">
      <el-button type="primary" @click="onSubmit('ruleForm')">Kaydet</el-button>
    </div> -->
  </div>
</template>

<script>
import { ACTIONS_FIELDS } from '@/constant'
import { bus } from '@/main.js'
import { mapActions } from 'vuex'
export default {
  name: 'DeviceReport',
  data() {
    return {
      rules: {
        ticket_type: [
          { required: true, message: 'Durum Seçiniz', trigger: 'change' }
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
        ],
        description: [
          {
            required: true,
            message: 'Lütfen açıklama giriniz.',
            trigger: 'blur'
          }
        ]
      },
      ruleForm: {
        ticket_type: '',
        start_time: '',
        finish_time: '',
        description: ''
      }
    }
  },
  computed: {
    getSelectedRowsDeviceIds() {
      let selected_device_ids = []
      this.$store.state.dataTable.selectedRows.forEach((item) => {
        selected_device_ids.push(parseInt(item.id))
      })
      return selected_device_ids
    },
    getSelectedRowPremiseId() {
      return this.$store.state.dataTable.selectedRow.premise_id
    }
  },
  methods: {
    ...mapActions({
      createService: 'service/createService'
    }),
    formClean() {
      Object.keys(this.ruleForm).forEach((key) => {
        this.ruleForm[key] = ''
      })
    },
    handleServiceSubmit(val) {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          console.log('Valid', valid)
          console.log('premiseId', this.getSelectedRowPremiseId)
          let device_id = []
          this.$route.params.device_id
            ? device_id.push(this.getSelectedRowPremiseId)
            : (device_id = this.getSelectedRowsDeviceIds)

          let service = this.createService({
            ...this.ruleForm,
            // device_id: this.getSelectedRowsDeviceIds.join(),
            device_id: device_id,
            status_code: 2
          })
          console.log('SERVİCE STAUS', service)
          //   if (service.status == 201) {
          this.formClean()
          this.$emit('onClose')
          //   }
        }
      })
    }
  },
  created() {
    this.state_options = [...ACTIONS_FIELDS['SERVICE'][0]['state']['options']]
  },
  mounted() {
    console.log('Seçilen Mekanlar', this.getSelectedRowsPremiseId)
    bus.$on('onSubmitService', (val) => {
      this.handleServiceSubmit(val)
    })
  },
  destroyed() {
    bus.$off('onSubmitService')
  }
}
</script>

<style></style>
