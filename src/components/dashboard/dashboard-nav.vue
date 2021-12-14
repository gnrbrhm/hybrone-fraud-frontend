<template>
  <div class="header-content">
    <router-link
      v-for="device_type in device_types"
      :key="device_type.id"
      :to="parentRoute + prefixRoute"
      active-class="nav-active"
    >
      <!-- :to="'/dashboard' + device_type.route" -->

      <el-button v-if="device_type.valid" class="__nav-button">
        <span>{{ device_type.label }}</span>
      </el-button>
    </router-link>
  </div>
</template>

<script>
import { DEVICE_TYPES } from "@/constant";
export default {
  name: "DashboardNav",
  data() {
    return { device_types: {} };
  },
  computed: {
    prefixRoute() {
      if (this.$route.name != "DeviceLastSignals") return "";
      else {
        return "/last-signals";
      }
    },
    parentRoute() {
      if (this.$route.name == "Dashboard") {
        return "/" + this.$route.path.split("/")[1];
      } else if (
        this.$route.name == "DeviceDetail" ||
        this.$route.name == "DeviceLastSignals"
      ) {
        let new_path = this.$route.path.split("/");
        new_path.pop();
        return new_path.join("/");
      } else {
        let new_path = this.$route.path.split("/");
        new_path.pop();
        new_path.pop();
        return new_path.join("/");
      }
    },
  },
  methods: {},
  created() {
    this.device_types = { ...DEVICE_TYPES };
  },
  mounted() {
    console.log("Dashboard Nav", this.$route);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.header-content {
  display: flex;
  margin-bottom: 25px;
  a {
    text-decoration: none;
  }
  .nav-active {
    button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 16px 32px;

      position: static;
      min-width: auto;
      height: 51px;
      left: 0px;
      bottom: 0px;

      /* Hybrone Light Blue */

      background: $hybrone_light_blue;
      box-shadow: 0px 2px 4px rgba(91, 134, 245, 0.05);
      border-radius: 4px;

      /* Inside Auto Layout */

      margin: 0px 10px;
      span {
        display: flex;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: center;
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        text-align: center;

        margin: 0px;

        color: #ffffff !important;
      }
    }
  }
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    text-decoration: none;

    position: static;
    min-width: auto;
    height: 51px;
    left: 0px;
    bottom: 0px;

    /* Hybrone Light Blue */

    background: $hybrone_background_color;
    box-shadow: 0px 2px 4px rgba(91, 134, 245, 0.05);
    border-radius: 4px;
    margin: 0px 10px;
    span {
      display: flex;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      text-decoration: none;
      align-items: center;
      font-family: Inter, sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      text-align: center;

      margin: 0px;

      color: #444444 !important;
    }
  }
}
</style>
