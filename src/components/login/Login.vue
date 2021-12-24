<template>
  <div class="container">
    <div class="right-box">
      <FormLogin v-if="['Login'].includes(this.$route.name)"></FormLogin>
      <ForgotPassword v-else></ForgotPassword>
    </div>
    <div class="left-box">
      <SentinelAvatar></SentinelAvatar>
    </div>
  </div>
</template>

<script>
import FormLogin from './FormLogin.vue'
import ForgotPassword from './ForgotPassword.vue'
import SentinelAvatar from './SentinelAvatar.vue'
export default {
  name: 'Login',
  components: {
    FormLogin,
    SentinelAvatar,
    ForgotPassword
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;
  margin-left: -90px;

  .right-box {
    display: flex;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    width: 50%;
  }
  .left-box {
    width: 50%;
    height: 100vh;
    display: flex;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    background: #2c3357;
  }
}
</style>
