<template>
  <div class="login-form">
    <img
      class="top_logo"
      src="@/assets/logo/sentinel-logo.svg"
      alt="hybrone logo"
    />
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300">
      <span class="label">KULLANICI ADI</span>
      <el-form-item prop="email">
        <el-input id="email" type="email" v-model="ruleForm.email"></el-input>
      </el-form-item>
      <span class="label">ŞİFRE</span>
      <el-form-item prop="password">
        <el-input
          id="password"
          height="50px"
          type="password"
          v-model="ruleForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('ruleForm')"
          ><span> OTURUM AÇ</span></el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import endpoints from "@/endpoints";
import { mapActions } from "vuex";
export default {
  name: "FormLogin",
  data() {
    return {
      ruleForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Lütfen mail adresi giriniz !",
            trigger: "blur",
          },
          {
            min: 3,
            max: 50,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Lütfen şifrenizi giriniz.",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      setAuthUser: "auth/setAuthUser",
    }),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { redirect } = this.$route.query;

          const getToken = this.$api({
            ...endpoints.token,
            data: {
              username: this.ruleForm.email,
              password: this.ruleForm.password,
            },
          });
          getToken
            .then((r) => {
              if (r.status == 200) {
                this.setAuthUser(r.data);
                if (redirect) {
                  this.$router.push({ name: redirect });
                } else {
                  this.$router.push({ name: "Dashboard" });
                }
              }
            })
            .catch((error) => console.error(error));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
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
.login-form img {
  margin-bottom: 90px;
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
  font-feature-settings: "zero" on;

  /* Gray Dark */

  color: #444444;
  display: flex;
  margin-bottom: 6px;
}
</style>
