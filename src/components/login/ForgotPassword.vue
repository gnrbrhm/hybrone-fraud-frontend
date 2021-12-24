<template>
  <div class="login-form">
    <img
      class="top_logo"
      src="@/assets/logo/sentinel-logo.svg"
      alt="hybrone logo"
    />
    <span v-if="!is_send_email" class="error-label">{{
      'Lütfen sisteme kayıtlı mail adresinizi giriniz.'
    }}</span>
    <span v-else class="success-label">
      Şifre sıfırlama bilgisi kayıtlı email adresinize<br />
      gönderilmiştir.Lütfen mail kutunuzu kontrol ediniz.
    </span>
    <el-form
      v-if="!is_send_email"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="300"
    >
      <span class="label">KULLANICI MAİL ADRESİ</span>
      <el-form-item prop="email">
        <el-input id="email" type="email" v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('ruleForm')"
          ><span>ŞİFREMİ SIFIRLA</span></el-button
        >
      </el-form-item>
    </el-form>
    <div v-else class="password-change-user-dialog-content">
      <el-form
        :model="reset_password_form"
        :rules="rules"
        ref="reset_password_form"
        label-width="300"
        class="form"
      >
        <span class="label">SECRET KEY</span>
        <el-form-item prop="current_password">
          <el-input
            id="current_password"
            type="current_password"
            v-model="reset_password_form.current_password"
          ></el-input>
        </el-form-item>
        <span class="label">YENİ ŞİFRE</span>
        <el-form-item prop="new_password">
          <el-input
            id="new_password"
            height="50px"
            v-model="reset_password_form.new_password"
          ></el-input>
        </el-form-item>
        <span class="label">YENİ ŞİFRE TEKRAR</span>
        <el-form-item prop="confirm_new_password">
          <el-input
            id="confirm_new_password"
            height="50px"
            v-model="reset_password_form.confirm_new_password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="action-button-group">
            <el-button
              v-if="this.$route.query.is_random_password"
              class="canceled-button"
              @click="handleCloseCreateUserDialog"
              :style="
                this.$route.query.is_random_password
                  ? 'justify-content: center;'
                  : ''
              "
              ><span> Vazgeç</span></el-button
            >
            <el-button
              class="apply-button"
              @click="resetUserPasswordSubmitForm('reset_password_form')"
              ><span> Oluştur</span></el-button
            >
          </div>
        </el-form-item>
      </el-form>
      <div v-if="is_send_email" class="go-to-login-form">
        <el-button v-if="is_change_password" @click="gotoLogin"
          ><span>OTURUM AÇ</span></el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ForgotPassword',
  data() {
    return {
      is_change_password: false,
      is_send_email: false,
      ruleForm: {
        email: ''
      },
      reset_password_form: {
        current_password: '',
        new_password: '',
        confirm_new_password: ''
      },
      rules: {
        current_password: [
          {
            required: true,
            message: 'Lütfen email ile gönderilen secret key giriniz !',
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
            message: 'Lütfen yeni şifrenizi giriniz.',
            trigger: 'blur'
          }
        ],
        confirm_new_password: [
          {
            required: true,
            message: 'Lütfen yeni şifrenizi tekrar giriniz.',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      forgotUserPassword: 'auth/forgotUserPassword',
      resetUserPassword: 'auth/resetUserPassword'
    }),
    resetUserPasswordSubmitForm(form) {
      console.log(this.$refs[form])
      this.$refs[form].validate((valid) => {
        if (valid) {
          let result = this.resetUserPassword({
            secret: this.reset_password_form.current_password,
            password: this.reset_password_form.new_password
          })
          console.log(result)
          if (result.status == 200) {
            this.is_send_email = true
            this.reset_password_form.current_password = ''
            this.reset_password_form.new_password = ''
            this.reset_password_form.confirm_new_password = ''
          }
        }
      })
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.forgotUserPassword({ email: this.ruleForm.email })) {
            this.is_send_email = true
          }
        }
      })
    },
    gotoLogin() {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px;

  /* Inside Auto Layout */

  flex: none;
  align-self: stretch;
  flex-grow: 0;
  margin: 0;
}
.login-form .error-label {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #eb5757;
}
.login-form .success-label {
  @extend .error-label;
  color: $hybrone_light_blue;
}
.login-form .remember-me {
  display: flex;
  min-width: 100%;
  min-height: 60px;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
}
.forgot-password {
  margin-top: 130px;
}
.login-form img {
  margin-bottom: 50px;
}
.login-form button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;

  position: static;
  width: 300px;
  height: 51px;
  left: 0px;
  bottom: 0px;

  /* Hybrone Light Blue */

  background: $hybrone_light_blue;
  box-shadow: 0px 2px 4px rgba(91, 134, 245, 0.05);
  border-radius: 4px;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 1;
  margin: 0px 10px;
  span {
    display: flex;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    text-align: center;

    left: 0px;
    bottom: 0px;
    margin: 0px;

    color: #ffffff !important;
  }
}
.login-form span {
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 73.91%;

  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  font-feature-settings: 'zero' on;

  /* Gray Dark */

  color: #444444;
  display: flex;
  margin-bottom: 6px;
}
.go-to-login-form {
  margin-top: 70px;
  button {
    max-width: 300px;
    max-height: 51px;
    left: 0px;
    bottom: 0px;
    /* Hybrone Light Blue */

    background: #007db7;
    box-shadow: 0px 2px 4px rgba(91, 134, 245, 0.05);
    border-radius: 4px;
  }
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
