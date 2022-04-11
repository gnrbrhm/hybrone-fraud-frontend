<template>
  <div id="app" :style="{ height: screenSize }">
    <!--   Succes Notify -->
    <notifications
      group="success-template"
      :duration="1500"
      :width="500"
      position="top right"
    >
      <template slot="body" slot-scope="props">
        <div class="success-template">
          <div class="success-template-icon">
            <SvgIconNotification></SvgIconNotification>
          </div>
          <div class="success-template-content">
            <div class="success-template-text" v-html="props.item.text"></div>
          </div>
        </div>
      </template>
    </notifications>
    <!--   Error Notify -->
    <notifications
      group="error-template"
      :duration="1500"
      :width="500"
      position="top right"
    >
      <template slot="body" slot-scope="props">
        <div class="error-template">
          <div class="error-template-icon">
            <SvgIconNotificationFalse></SvgIconNotificationFalse>
          </div>
          <div class="error-template-content">
            <div class="error-template-text" v-html="props.item.text"></div>
          </div>
        </div>
      </template>
    </notifications>
    <component class="layout" :is="layouts[layoutName]"></component>
  </div>
</template>
<script>
import anon from '@/layouts/anon'
import auth from '@/layouts/auth'
import blank from '@/layouts/blank'
import SvgIconNotification from '@/assets/icons/notification/svg-icon-notification.vue'
import SvgIconNotificationFalse from '@/assets/icons/notification/svg-icon-notification-false.vue'

export default {
  components: { SvgIconNotification, SvgIconNotificationFalse },
  computed: {
    layoutName() {
      return this.$route.meta.layout || 'blank'
    },
    screenSize() {
      var html = document.documentElement
      return html.clientHeight
    }
  },
  data() {
    return {
      layouts: {
        anon,
        auth,
        blank
      }
    }
  },
  created() {},
  mounted() {
    // if (
    //   ['List', 'Dashboard', 'DeviceDetail'].includes(this.$route.name) &&
    //   this.state.user.auto_reload
    // )
    //   setInterval(() => {
    //     window.location.reload(true)
    //   }, 180000)
    // window.on('beforeunload', alert('Do you really want to close?'))
  }
}
</script>

<style lang="scss">
body {
  margin: 0px;
  // max-height: 100vh;
}
.layout {
  background: #ffffff;
  padding-left: 90px;
  // min-height: 100vh;
}
.page-inner {
  padding: 0px 0px 0px 13px;
}
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  margin: 0px !important;
  padding: 0px !important;
  // min-height: 100vh;
  min-width: 100vw;
}
.error-template {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: left;
  font-size: 13px;
  // margin: 5px;
  margin-left: auto;
  margin-bottom: 0;
  align-items: center;
  justify-content: center;
  width: 279px;
  height: 51px;
  &,
  & > div {
    box-sizing: border-box;
  }

  background: linear-gradient(90deg, #e54d42 0%, #b82e24 100%);
  box-shadow: -4px 4px 20px rgba(209, 60, 22, 0.5);
  border-radius: 10px 0px 0px 10px;
  color: #ffffff;

  .error-template-icon {
    // flex: 0 1 auto;

    color: #15c371;
    font-size: 32px;
    padding: auto;
  }
  .error-template-close {
    // flex: 0 1 auto;
    padding: 0 20px;
    font-size: 16px;
    opacity: 0.2;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .error-template-content {
    padding: 10px;
    color: #ffffff;
    // flex: 1 0 auto;
    .error-template-title {
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 600;
    }
  }
  &.error {
    // background: url("/assets/notification/svg_icon_done.svg") !important;
    width: 279px;
    height: 51px;
    padding: 15px;
    border-radius: 10px 0px 0px 10px;

    background: linear-gradient(90deg, #e54d42 0%, #b82e24 100%);
    box-shadow: -4px 4px 20px rgba(209, 60, 22, 0.5);
    border-radius: 10px 0px 0px 10px;
    color: #ffffff;
  }
}
.success-template {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: left;
  font-size: 13px;
  // margin: 5px;
  margin-left: auto;
  margin-bottom: 0;
  align-items: center;
  width: 279px;
  height: 51px;
  &,
  & > div {
    box-sizing: border-box;
  }
  background: linear-gradient(90deg, #6cca93 0%, #56df8f 100%);
  box-shadow: -4px 4px 20px rgba(0, 192, 81, 0.5);
  border-radius: 10px 0px 0px 10px;

  .success-template-icon {
    // flex: 0 1 auto;
    color: #15c371;
    font-size: 32px;
    padding: 0px 0px 10px 10px;
  }
  .success-template-close {
    // flex: 0 1 auto;
    padding: 0 20px;
    font-size: 16px;
    opacity: 0.2;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .success-template-content {
    padding: 10px;
    color: #ffffff;

    // flex: 1 0 auto;
    .success-template-title {
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 10px;

      font-weight: 600;
    }
  }
  &.error {
    // background: url("/assets/notification/svg_icon_done.svg") !important;
    width: 279px;
    height: 51px;
    padding: 15px;
    border-radius: 10px 0px 0px 10px;

    background: linear-gradient(90deg, #e54d42 0%, #b82e24 100%);
    box-shadow: -4px 4px 20px rgba(209, 60, 22, 0.5);
    border-radius: 10px 0px 0px 10px;
    color: #ffffff;
  }
}
</style>
