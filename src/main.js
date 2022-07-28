import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import Vue from 'vue'
import App from './App.vue'
import api from './middleware'
import './registerServiceWorker'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import lang from 'element-ui/lib/locale/lang/tr-TR.js'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/base.scss'

import Notifications from 'vue-notification'
import VueApexCharts from 'vue-apexcharts'

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

locale.use(lang)
Vue.use(VueApexCharts)
Vue.use(Notifications)
export const bus = new Vue()

Vue.use(api)
Vue.use(ElementUI)
Vue.use(VueVideoPlayer)
Vue.config.productionTip = false

new Vue({
  api,
  router,
  store,
  created() {
    // Prevent blank screen in Electron builds
    if (process.env.IS_ELECTRON) this.$router.push('/')
  },
  render: (h) => h(App)
}).$mount('#app')
