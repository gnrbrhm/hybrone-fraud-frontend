<template>
  <div>
    <div id="nav">
      <img
        src="@/assets/logo/hybrone_logo.png"
        width="72"
        height="65"
        style="margin: 20px 14px 20px 14px; margin-bottom: 30px"
        alt="Hybrone"
      />
      <div class="navigation">
        <router-link
          class="link-box"
          v-for="nav in navigation"
          :key="nav.id"
          :to="nav.route"
          active-class="nav-active"
          :disabled="!nav.disabled"
        >
          <SvgIconTracked
            style="color: #ffffff"
            v-if="nav.label == 'Takip'"
          ></SvgIconTracked>
          <Dashboard v-else-if="nav.label == 'Dashboard'"></Dashboard>
          <SvgIconList v-else-if="nav.label == 'Liste'"></SvgIconList>
          <SvgIconMaps v-else-if="nav.label == 'Harita'"></SvgIconMaps>
          <SvgIconServices
            v-else-if="nav.label == 'Servisler'"
          ></SvgIconServices>
          <SvgIconStation
            v-else-if="nav.label == 'İstasyonlar'"
          ></SvgIconStation>
          <SvgIconSettings v-else-if="nav.label == 'Ayarlar'"></SvgIconSettings>

          <span v-if="nav.label != 'Çıkış'">{{ nav.label }}</span></router-link
        >
      </div>
      <div class="oto-query">
        <span
          >Otomatik <br />
          Sorgu</span
        >
        <el-switch
          active-color="#007DB7"
          inactive-color="#ff4949"
          v-model="auto_query"
          @click="handleAutoReloadClick"
        >
        </el-switch>
      </div>
      <div @click="logoutFunc()">
        <SvgIconLogout></SvgIconLogout>
        <span>Çıkış</span>
      </div>
    </div>
  </div>
</template>

<script>
import { NAVIGATON } from '@/constant'
import SvgIconTracked from '@/assets/icons/navigation/tracked.vue'
import Dashboard from '@/assets/icons/navigation/dashboard.vue'
import SvgIconList from '@/assets/icons/navigation/svg-icon-list.vue'
import SvgIconServices from '@/assets/icons/navigation/svg-icon-services.vue'
import SvgIconMaps from '@/assets/icons/navigation/svg-icon-maps.vue'
import SvgIconSettings from '@/assets/icons/navigation/svg-icon-settings.vue'
import SvgIconLogout from '@/assets/icons/navigation/svg-icon-logout.vue'
// import SvgIconPremise from '@/assets/icons/navigation/svg-icon-premise.vue'
import SvgIconStation from '@/assets/icons/navigation/svg-icon-station.vue'
import { mapActions, mapGetters } from 'vuex'
// import auth from '../../store/auth'
export default {
  name: 'Sidebar',
  components: {
    SvgIconTracked,
    Dashboard,
    SvgIconList,
    SvgIconServices,
    SvgIconMaps,
    SvgIconSettings,
    SvgIconLogout,
    SvgIconStation
    // SvgIconPremise
  },
  data() {
    return {
      auto_query: false,
      navigation: {}
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: 'auth/getPermissions'
    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    handleAutoReloadClick() {
      console.log('AutoReload')
    },
    logoutFunc() {
      this.logout()
    }
  },

  created() {
    var body = document.body,
      html = document.documentElement

    var height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    console.log('Client Width', html.clientWidth)
    console.log('Client Height', html.clientHeight)
    console.log('Screen Width', screen.width)
    console.log('Screen Height', height)
    this.navigation = { ...NAVIGATON }
    Object.keys(this.navigation).forEach((item) => {
      if (this.navigation[item].label == 'Harita') {
        console.log(item)
        this.navigation[item].disabled =
          this.getPermissions['device_show_in_map']
      }
    })
  },
  mounted() {
    console.log('Sidebar', this.getPermissions['device_show_in_map'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
$sidebar_width: 100px;
$high: 1920px;
#nav {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background-color: #ffffff;
  // background-color: #e5e5e5;
  width: $sidebar_width;
  height: 100vh;
  left: 0px;
  top: 0px;
  border-right: 2px solid #007db7;

  // img {
  //   width: 100px;
  //   @media screen and (min-width: $high) {
  //     width: $high * 10/100;
  //     // height:
  //   }
  // }
  div {
    margin-bottom: 10px;
  }
  span {
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: 500 !important;
    margin-top: 8px;
    padding: auto;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    text-decoration: none;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0);

    font-weight: bold;
    color: #2c3e50;
  }

  .link-box {
    display: flex;
    width: 100px;
    height: 97px;
    left: 0px;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    // @media screen and (min-width: $high) {
    //   width: $high * 10/100;
    // }

    &:hover {
      svg {
        path {
          color: $hybrone_background_color !important;
        }
      }
    }

    span {
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 500 !important;
      margin-top: 8px;
      padding: auto;
      font-size: 12px;
      line-height: 14px;
      display: flex;
      align-items: center;
      text-align: center;
      text-decoration: none;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0);

      font-weight: bold;
      color: #2c3e50;
      /* Hybrone Blue */
    }
    &:nth-child(1) {
      margin-top: auto;
    }
    &:nth-child(9) {
      margin-top: auto;
      display: flex;
    }

    /* Hybrone Light Blue */

    // &.router-link-exact-active {
    //   background-color: #007db7 !important;
    //   color: #007db7 !important;
    //   svg {
    //     path {
    //       fill: $hybrone_background_color;
    //     }
    //   }
    //   span {
    //     background-color: rgba(0, 0, 0, 0);
    //     color: #ffffff;
    //   }
    // }
  }
}
#nav .navigation a[disabled='disabled'] {
  pointer-events: none;
  opacity: 0.4;
}

// .router-link-active {
//   svg {
//     path {
//       fill: $hybrone_background_color;
//     }
//   }
// }
.nav-active {
  background-color: #007db7 !important;

  svg {
    path {
      fill: $hybrone_background_color !important;
    }
  }

  span {
    background-color: rgba(0, 0, 0, 0);
    color: $hybrone_background_color !important;
  }
}
// .nav-active .router-link-active {
//   svg {
//     path {
//       fill: $hybrone_background_color;
//     }
//   }
// }
// .link-box .nav-active .router-link-active {
//   background-color: #007db7 !important;
//   svg {
//     path {
//       fill: $hybrone_background_color;
//     }
//   }
//   span {
//     background-color: rgba(0, 0, 0, 0);
//     color: $hybrone_background_color !important;
//   }
// }
</style>
