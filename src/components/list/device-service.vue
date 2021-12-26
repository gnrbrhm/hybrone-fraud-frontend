<template>
  <div class="report-content">
    <el-form
      :model="ruleForm"
      :rules="ruleForm"
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
    getSelectedRowsPremiseId() {
      let selected_premise_ids = []
      this.$store.state.dataTable.selectedRows.forEach((item) => {
        selected_premise_ids.push(item.premise_id)
      })
      return selected_premise_ids
    }
  },
  methods: {
    ...mapActions({
      createService: 'service/createService'
    }),
    handleServiceSubmit(val) {
      console.log('RuleForm', this.ruleForm)
      let premise_id = this.$route.params.device_id
        ? this.$route.params.device_id
        : this.getSelectedRowsPremiseId[0]

      let service = this.createService({
        ...this.ruleForm,
        // premise_id: this.getSelectedRowsPremiseId.join(),
        premise_id: parseInt(premise_id),
        status_code: 3
      })
      service.then((r) => {
        console.log(r)
        if (r.status == 200) this.$emit('onClose')
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
  }
}
</script>

<style></style>
