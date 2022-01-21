<template>
  <div class="device-create-container">
    <div class="device-header">
      <router-link :to="{ name: 'Premises' }">
        <BackArrow />
      </router-link>
      <div class="header-title">
        <span>{{ premise_name }}</span>
        <span>{{ premise_id }}</span>
      </div>
    </div>
    <div class="device-create-body">
      <h2>
        {{ is_update ? 'Vguard/VG-4C1A-LRU' : 'Yeni Cihaz' }}
      </h2>

      <el-form
        ref="device-create-form"
        :model="form"
        label-position="top"
        hide-required-asterisk
        :rules="rules"
      >
        <h3>Genel Bilgiler</h3>
        <div class="form-section">
          <el-form-item
            prop="name"
            class="sentinel-input device-form-item"
            label="CİHAZ ADI"
          >
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item
            prop="hardware_type_id"
            class="sentinel-input device-form-item"
            label="CİHAZ TİPİ"
          >
            <el-select v-model="form.hardware_type_id">
              <el-option
                v-for="item in hardware_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            prop="device_brand_id"
            class="sentinel-input device-form-item"
            label="MARKA"
          >
            <el-select v-model="form.device_brand_id">
              <el-option
                v-for="item in brand_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            prop="device_model_id"
            class="sentinel-input device-form-item"
            label="MODEL"
          >
            <el-select v-model="form.device_model_id">
              <el-option
                v-for="item in model_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            prop="serial_number"
            class="sentinel-input device-form-item"
            label="SERI NUMARASI"
          >
            <el-input v-model="form.serial_number"></el-input>
          </el-form-item>

          <el-form-item
            prop="inventory_number"
            class="sentinel-input device-form-item"
            label="ENVANTER NUMARASI"
          >
            <el-input v-model="form.inventory_number"></el-input>
          </el-form-item>
        </div>

        <h3>Bağlantı Bilgileri</h3>
        <div class="form-section full-width">
          <el-form-item
            prop="username"
            class="sentinel-input device-form-item"
            label="KULLANICI ADI"
          >
            <el-input v-model="form.username"></el-input>
          </el-form-item>

          <el-form-item
            prop="password"
            class="sentinel-input device-form-item"
            label="ŞİFRE"
          >
            <el-input v-model="form.password"></el-input>
          </el-form-item>

          <el-form-item
            prop="host"
            class="sentinel-input device-form-item"
            label="IP ADRESI"
          >
            <el-input v-model="form.host"></el-input>
          </el-form-item>

          <el-form-item
            prop="port"
            class="sentinel-input device-form-item"
            label="PORT"
          >
            <el-input type="number" v-model="form.port"></el-input>
          </el-form-item>
        </div>

        <h3>Kanal Listesi</h3>

        <div
          class="form-section no-margin"
          v-for="(channel, index) in form.channels"
          :key="index"
        >
          <el-form-item
            class="sentinel-input device-form-item"
            :label="index === 0 ? 'KANAL ADI' : null"
          >
            <el-input disabled v-model="channel.channel_name"></el-input>
          </el-form-item>

          <el-form-item
            class="sentinel-input device-form-item"
            :label="index === 0 ? 'DURUM' : null"
          >
            <el-select v-model="channel.status">
              <el-option
                v-for="item in channel_statuses"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            class="sentinel-input device-form-item"
            :label="index === 0 ? 'ÖZELLİKLER' : null"
          >
            <el-select v-model="channel.category">
              <el-option
                v-for="item in channel_category"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BackArrow from '@/components/atomic/back-arrow.vue'
import endpoints from '@/endpoints'
import { bus } from '@/main.js'
export default {
  name: 'CreateVguardDevice',
  components: {
    BackArrow
  },
  props: ['is_update'],
  data() {
    return {
      premise_name: '',
      premise_id: '',
      form: {
        name: '',
        hardware_type_id: 3,
        device_brand_id: 3,
        device_model_id: 3,
        serial_number: '',
        inventory_number: '',
        username: '',
        password: '',
        host: '',
        port: '',
        channels: [
          {
            channel_name: 'Kanal 1',
            channel_id: 1,
            status: '',
            category: ''
          },
          {
            channel_name: 'Kanal 2',
            channel_id: 2,
            status: '',
            category: ''
          },
          {
            channel_name: 'Kanal 3',
            channel_id: 3,
            status: '',
            category: ''
          },
          {
            channel_name: 'Kanal 4',
            channel_id: 4,
            status: '',
            category: ''
          }
        ]
      },
      hardware_options: [
        {
          label: 'Kayıt Cihazı',
          value: 3
        }
      ],
      brand_options: [
        {
          label: 'Vguard',
          value: 3
        }
      ],
      model_options: [
        {
          label: 'VG-4C1A-LRU',
          value: 3
        }
      ],
      channel_statuses: [
        {
          label: 'Aktif',
          value: true
        },
        {
          label: 'Pasif',
          value: false
        }
      ],
      channel_category: [
        {
          label: 'Kabin',
          value: 'kabin'
        },
        {
          label: 'Tank',
          value: 'tank'
        }
      ],
      rules: {
        name: {
          required: true,
          message: 'Bu alan zorunlu',
          trigger: 'blur'
        },
        hardware_type_id: {
          required: true,
          message: 'Bu alan zorunlu',
          trigger: 'blur'
        },
        device_brand_id: {
          required: true,
          message: 'Bu alan zorunlu',
          trigger: 'blur'
        },
        device_model_id: {
          required: true,
          message: 'Bu alan zorunlu',
          trigger: 'blur'
        },
        serial_number: {
          required: true,
          message: 'Bu alan zorunlu',
          trigger: 'blur'
        },
        inventory_number: {
          required: true,
          message: 'Bu alan zorunlu',
          trigger: 'blur'
        },
        username: {
          required: true,
          message: 'Bu alan zorunlu',
          trigger: 'blur'
        },
        // password: {
        //   required: true,
        //   message: 'Bu alan zorunlu',
        //   trigger: 'blur'
        // },
        host: {
          required: true,
          message: 'Bu alan zorunlu',
          trigger: 'blur'
        },
        port: {
          required: true,
          message: 'Bu alan zorunlu',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    ...mapActions({
      createDevice: 'device/createDevice'
    }),
    validate() {
      let isValid = false

      const isChannelsValid = this.form.channels.every((c) => {
        return c.status !== null && c.status !== false
          ? c.category && c.channel_id && c.channel_name
          : true
      })

      if (!isChannelsValid) {
        console.log('channel valid degil')
        this.$message({
          type: 'error',
          message: 'Tüm kanal bilgileri girilmelidir.'
        })
        return false
      }

      this.$refs['device-create-form'].validate((valid) => {
        if (valid) {
          isValid = true
        } else {
          console.log('validation error')
          isValid = false
        }
      })

      return isValid
    },
    createPayload() {
      return {
        vguard_device: {
          ...this.form,
          port: parseInt(this.form.port),
          premise_id: parseInt(this.$route.params.premise_id),
          disk_count: 1,
          streams: []
        }
      }
    },
    onSubmit() {
      if (this.validate()) {
        this.$api
          .post('/vguard/devices', this.createPayload())
          .then((res) => {
            this.$router.push({ name: 'Premises' })
          })
          .catch((err) => console.log(err))
      }
    },
    onUpdate() {
      if (this.validate()) {
        this.$api
          .patch(
            '/vguard/devices/' + this.$route.params.device_id,
            this.createPayload()
          )
          .then((res) => {
            this.$router.push({ name: 'Premises' })
          })
          .catch((err) => console.log(err))
      }
    },
    onDelete() {
      this.$confirm('Cihazı silmek istediğinize emin misiniz?', {
        confirmButtonText: 'Sil',
        cancelButtonText: 'Vazgeç',
        type: 'error'
      }).then(() => {
        this.$api
          .delete('vguard/devices/' + this.$route.params.device_id)
          .then(() => {
            this.$router.push({ name: 'Premises' })
          })
          .catch((err) => console.log(err))
      })
    },
    async getDevice(device_id) {
      try {
        const { data } = await this.$api('/vguard/devices/' + device_id)
        return data.data.vguard_device
      } catch (err) {
        console.log(err)
      }
    }
  },
  created() {
    this.$api({
      ...endpoints.getPremiseById,
      url: '/premises/' + this.$route.params.premise_id,
      params: {
        page: 1,
        limit: 1
      }
    })
      .then((res) => {
        const { custom_premise_name, custom_premise_id } = res.data.data.premise

        this.premise_name = custom_premise_name
        this.premise_id = custom_premise_id
      })
      .catch((err) => console.log(err))

    if (this.is_update) {
      const device_id = this.$route.params.device_id

      this.getDevice(device_id).then((device) => {
        Object.keys(this.form).forEach((field) => {
          if (field !== 'channels') {
            this.form[field] = device[field]
          }
        })

        if (device.channels) {
          device.channels.forEach((c, index) => {
            Object.keys(this.form.channels[0]).forEach((field) => {
              this.form.channels[index][field] = c[field]
            })
          })
        }
      })
    }
  },
  mounted() {
    bus.$on('buttonGroupClick', (param) => {
      switch (param) {
        case 'onCreate':
          this.onSubmit()
          break
        case 'onUpdate':
          this.onUpdate()
          break
        case 'onDelete':
          this.onDelete()
          break
        default:
          break
      }
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';

.device-create-container {
  padding: 24px 32px;
}
.device-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-title {
    span {
      display: block;
      color: $hybrone_light_blue;

      &:first-child {
        font-size: 34px;
        font-weight: 500;
      }

      &:last-child {
        text-align: right;
        font-size: 24px;
      }
    }
  }
}

.device-create-body {
  h2 {
    font-weight: normal;
    font-size: 24px;
  }

  h3 {
    font-size: 14px;
    font-weight: 500;
  }

  .form-section {
    margin-bottom: 50px;
    display: flex;
    flex-flow: wrap;
    max-width: 775px;
    gap: 24px;

    &.no-margin {
      margin-bottom: 12px;
    }

    &.full-width {
      max-width: unset;
    }

    label {
      font-size: 12px;
    }
  }
}

.device-form-item {
  width: 234px;
  // margin-bottom: 0 !important;

  label {
    padding: 0 !important;
    line-height: normal;
  }

  input {
    @extend .sentinel-input;
  }
}
</style>
