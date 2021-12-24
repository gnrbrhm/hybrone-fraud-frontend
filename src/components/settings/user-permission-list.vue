<template>
  <div>
    <div class="permission-list-container">
      <div class="permission-header">
        <div class="title">YETKİLER</div>
        <el-button @click="() => (userPasswordAsk = true)" type="danger"
          >Kullanıcıyı Sil</el-button
        >
      </div>
      <div
        class="permissions-table"
        :disabled="this.current_user ? false : true"
      >
        <div v-for="item in permission_list" :key="item">
          <div v-if="item != 'IS_ADMIN'" class="permission-title">
            {{ item }}
          </div>
          <hr v-if="item != 'IS_ADMIN'" />
          <div
            class="permission"
            v-for="(index, value, key) in user_permissions[item]"
            :key="key"
          >
            <span class="span-text">{{ index.label }}</span>
            <!-- <span class="span-text">{{ index }}</span> -->
            <el-switch
              v-if="index.key == 'is_admin'"
              :key="key"
              :value="value"
              active-color="#007DB7"
              inactive-color="#B4BBBB"
              v-model="permission_value[index.key]"
              @change="handleChangePermission(index.key)"
            ></el-switch>
            <el-switch
              v-else
              :disabled="permission_value.is_admin"
              :key="key"
              :value="value"
              active-color="#007DB7"
              inactive-color="#B4BBBB"
              v-model="permission_value[index.key]"
              @change="handleChangePermission(index.key)"
            ></el-switch>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="createDialogVisible" width="500px">
      <!-- @close="handleCloseCreateUserDialog" -->
      <div class="create-user-dialog-content">
        <div class="span-title">
          Yeni kullanıcı için aşağıdaki bilgileri giriniz.
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="300"
          class="form"
        >
          <span class="label">ADI</span>
          <el-form-item prop="name">
            <el-input id="name" type="name" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <span class="label">SOYADI</span>
          <el-form-item prop="surname">
            <el-input
              id="surname"
              height="50px"
              v-model="ruleForm.surname"
            ></el-input>
          </el-form-item>
          <span class="label">EMAİL</span>
          <el-form-item prop="email">
            <el-input
              id="email"
              height="50px"
              v-model="ruleForm.email"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="action-button-group">
              <el-button
                class="canceled-button"
                @click="handleCloseCreateUserDialog"
                ><span> Vazgeç</span></el-button
              >
              <el-button
                class="apply-button"
                @click="createUserSubmitForm('ruleForm')"
                ><span> Oluştur</span></el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="userPasswordAsk" width="500px" height="274px">
      <!-- @close="handleCloseCreateUserDialog" -->
      <div class="create-user-dialog-content">
        <div class="span-title">
          Kullaınıcı için tüm yetkiler tanımlanacaktır. Onaylamak için şifrenizi
          giriniz.
        </div>
        <el-form
          :model="ruleForm2"
          :rules="rulesApply"
          ref="ruleForm2"
          label-width="300"
          class="form"
        >
          <span class="label">ŞİFRE</span>
          <el-form-item prop="auth_password">
            <el-input
              id="auth_password"
              v-model="ruleForm2.auth_password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="action-button-group">
              <el-button
                class="canceled-button"
                @click="handleCloseCreateUserDialog"
                ><span> Vazgeç</span></el-button
              >
              <el-button
                class="apply-button"
                @click="deleteUserApply('ruleForm2')"
                ><span> Evet</span></el-button
              >
              <!--            <el-button class="apply-button" @click="deleteUser('ruleForm2')"
                ><span> Evet</span></el-button
              > -->
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { USER_PERMISSIONS } from '@/constant.js'
import { mapActions, mapGetters } from 'vuex'
import { bus } from '@/main.js'

export default {
  name: 'UserPermissionList',
  data() {
    return {
      ruleForm2: { auth_password: '' },
      rulesApply: {
        auth_password: [
          {
            required: true,
            message: 'Lütfen şifrenizi giriniz !',
            trigger: 'blur'
          }
        ]
      },
      ruleForm: {
        name: '',
        surname: '',
        email: '',
        admin_password: '1234567',
        is_admin: false
      },
      rules: {
        name: [
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
        surname: [
          {
            required: true,
            message: 'Lütfen soyadı giriniz.',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: 'Lütfen email giriniz.',
            trigger: 'blur'
          }
        ]
      },
      createDialogVisible: false,
      userPasswordAsk: false,
      is_admin_request: false,
      permission_list: [],
      user_permissions: {},
      permission_value: {
        is_admin: false,
        device_list_status_report_create: false,
        device_show_in_map: false,
        device_show_in_dashboard: false,
        device_show_event: false,
        device_events_status_report_create: false,
        take_snapshot: false,
        download_record: false,
        device_access_web_ui: false,
        location_create: false,
        location_edit: false,
        location_delete: false,
        device_create: false,
        device_edit: false,
        device_delete: false,
        service_create: false,
        service_delete: false,
        service_status_finished: false,
        service_report_create_and_download: false,
        service_data_import: false
      },
      current_user: {}
    }
  },
  computed: {
    getSelectedRows() {
      return this.$store.state.dataTable.selectedRow
    }
  },
  methods: {
    ...mapActions({
      updateUserPermission: 'auth/updateUserPermission',
      createUser: 'auth/createUser',
      deleteUser: 'auth/deleteUser'
    }),
    createUserSubmitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let result = this.createUser({
            name: this.ruleForm.name,
            surname: this.ruleForm.surname,
            email: this.ruleForm.email,
            admin_password: '1234567',
            is_admin: false,
            username: this.ruleForm.email
          })
          if (result) this.handleCloseCreateUserDialog()
        }
      })
    },
    deleteUserApply(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.is_admin_request) {
            this.handleisAdminRequest()
          } else {
            let result = this.deleteUser({
              id: this.current_user.id,
              auth_password: this.ruleForm2.auth_password
            })
            if (result) {
              this.userPasswordAsk = false
              this.ruleForm2.auth_password = ''
              this.$emit('deleteUser')
            }
          }
        }
      })
    },
    handleCloseCreateUserDialog() {
      this.ruleForm.name = ''
      this.ruleForm.surname = ''
      this.ruleForm.email = ''
      this.createDialogVisible = false
    },
    handleisAdminRequest() {
      let result = this.updateUserPermission({
        user_id: this.current_user.id,
        permission_name: 'is_admin',
        value: true
      })
    },
    handleChangePermission(value) {
      //   if (value == 'is_admin') {
      //     this.userPasswordAsk = true
      //     console.log(value)
      //   } else {
      let result = this.updateUserPermission({
        user_id: this.current_user.id,
        permission_name: value,
        value: this.permission_value[value]
      })
      //   }
      console.log('permission_name', value)
      console.log('device_id', this.current_user.id)
      console.log('value', this.permission_value[value])
      console.log('handleAutoReloadChange', this.permission_value)
    },
    getDeviceIdToArray(value) {
      console.log('funcr', value)
      let ids = []
      value.forEach((value) => ids.push(value.id))
      return ids
    },
    async resetPermissionValue() {
      Object.keys(this.permission_value).forEach((item) => {
        this.permission_value[item] = false
      })
      return true
    },
    handleSelectedUserChange(val) {
      this.current_user = val
      if (this.resetPermissionValue()) {
        Object.keys(this.current_user.permission).forEach((item) => {
          if (this.permission_value[item] != undefined)
            this.permission_value[item] = this.current_user.permission[item]
        })
        // console.log(this.current_user)
        // this.permission_value['is_admin'] = this.current_user.is_admin
      }
    }
  },
  created() {
    var map = new Map()
    this.permission_list = Object.keys(USER_PERMISSIONS)
    this.user_permissions = { ...USER_PERMISSIONS }
    // Object.keys(USER_PERMISSIONS).forEach((item) => {
    //   USER_PERMISSIONS[item].forEach((obj) => {
    //     map.set(obj.key, obj.value)
    //   })
    // })
    // this.permission_value = map
    // console.log(this.permission_value.get('is_admin'))
  },
  mounted() {
    console.log(this.getSelectedRow)
    bus.$on('onClickCreateUser', () => {
      this.createDialogVisible
        ? (this.createDialogVisible = false)
        : (this.createDialogVisible = true)
    })
    bus.$on('onCurrentChangeRowPremise', (val) => {
      this.handleSelectedUserChange(val)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.permission-list-container {
  display: flex;
  flex-direction: column;
  min-width: 400px;
  max-height: 900px;
  overflow: scroll;
  border: 1px solid $hybrone_border_color !important;
  border-radius: 10px 0px 0px 10px;
  padding: 20px;
  margin-left: 15px;
  .permission-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 25px;
    .title {
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      display: flex;
      align-items: center;

      /* Gray Dark */

      color: #444444;
    }
  }
  .permissions-table {
    .permission-title {
      display: flex;
      justify-content: flex-start;
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      /* identical to box height */

      display: flex;
      align-items: center;

      color: #252f40;
    }
    .permission {
      display: flex;
      flex-direction: row !important;
      justify-content: space-between;
      max-height: 20px;
      padding: 10px;
      .span-text {
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        /* identical to box height */

        display: flex;
        align-items: center;

        color: #252f40;
      }
    }
  }
}
.permissions-table[disabled='disabled'] {
  pointer-events: none;
  opacity: 0.4;
}
.create-user-dialog-content {
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

          color: #2c3357;

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
