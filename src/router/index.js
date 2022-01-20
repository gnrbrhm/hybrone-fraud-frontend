import Vue from 'vue'
import VueRouter from 'vue-router'
import MiddlewareAuth from './middleware-auth'
import store from '../store'
// import i18n from '../plugins/i18n'
import { APP_NAME } from '../constant'
import { version } from '../../package'

import Auth from '../views/Auth/auth.vue'
import Dashboard from '../views/Dashboard/dashboard.vue'
import Tracked from '../views/Tracked/tracked.vue'
import List from '../views/List/list.vue'
import Maps from '../views/Map/maps.vue'
import Services from '../views/Services/services.vue'
import Premises from '../views/Premises/premises.vue'
import CreatePremise from '../views/Premises/create-premise.vue'
// import DeviceLastSignals from "../views/Devices/Hap/device-last-signals.vue";
import CreateDevice from '../views/Devices/Hap/create-device.vue'
import DeviceDetail from '../views/Devices/Hap/device-detail.vue'
import Settings from '../views/Settings/settings.vue'
import Logs from '../views/Settings/logs.vue'
import UserPermissions from '../views/Settings/user-permissions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Auth,
    meta: {
      layout: 'anon'
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: Auth,
    meta: {
      layout: 'anon'
    }
  },
  {
    path: '/tracked',
    name: 'Tracked',
    beforeEnter: MiddlewareAuth,
    meta: {
      layout: 'auth'
    },
    component: Tracked
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    beforeEnter: MiddlewareAuth,
    children: [
      {
        path: 'panel',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          layout: 'auth'
        }
      },
      {
        path: 'camera',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          layout: 'auth'
        }
      }
    ],
    meta: {
      layout: 'auth'
    },
    component: Dashboard
  },
  {
    path: '/list',
    name: 'List',
    beforeEnter: MiddlewareAuth,
    children: [
      {
        path: 'panel',
        name: 'List',
        component: List,
        meta: {
          layout: 'auth'
        }
      },
      {
        path: 'camera',
        name: 'List',
        component: List,
        meta: {
          layout: 'auth'
        }
      }
    ],
    meta: {
      layout: 'auth'
    },
    component: List
  },
  {
    path: '/list/panel/:device_id',
    name: 'DeviceDetail',
    beforeEnter: MiddlewareAuth,
    children: [
      {
        path: 'last-signals',
        name: 'DeviceLastSignals',
        meta: {
          layout: 'auth'
        }
      }
    ],
    meta: {
      layout: 'auth'
    },
    component: DeviceDetail
  },
  // {
  //   path: "/device-detail/:device_id/last-signals",
  //   name: "DeviceLastSignals",
  //   beforeEnter: MiddlewareAuth,
  //   meta: {
  //     layout: "auth",
  //   },
  //   component: DeviceLastSignals,
  // },
  {
    path: '/services',
    name: 'Services',
    beforeEnter: MiddlewareAuth,
    meta: {
      layout: 'auth'
    },
    component: Services
  },
  {
    path: '/map',
    name: 'Maps',
    beforeEnter: MiddlewareAuth,
    meta: {
      layout: 'auth'
    },
    component: Maps
  },
  {
    path: '/premises',
    name: 'Premises',
    beforeEnter: MiddlewareAuth,
    meta: {
      layout: 'auth'
    },
    component: Premises
  },
  {
    path: '/premises/update-premise/:id',
    name: 'UpdatePremise',
    beforeEnter: MiddlewareAuth,
    meta: {
      layout: 'auth'
    },
    component: CreatePremise
  },
  {
    path: '/premises/create-premise/',
    name: 'CreatePremise',
    beforeEnter: MiddlewareAuth,
    meta: {
      layout: 'auth'
    },
    component: CreatePremise
  },
  /*
	   Bu bölüm iyi planlanmalı
	   */
  {
    path: '/premises/create-device/:premise_id',
    name: 'CreateDevice',
    beforeEnter: MiddlewareAuth,
    meta: {
      layout: 'auth'
    },
    component: CreateDevice
  },
  {
    path: '/premises/update-device/:premise_id/:device_id',
    name: 'UpdateDevice',
    beforeEnter: MiddlewareAuth,
    meta: {
      layout: 'auth'
    },
    component: CreateDevice
  },
  {
    path: '/settings',
    name: 'Settings',
    beforeEnter: MiddlewareAuth,
    meta: {
      layout: 'auth'
    },
    component: Settings
  },
  {
    path: '/settings/logs',
    name: 'Logs',
    beforeEnter: MiddlewareAuth,
    meta: {
      layout: 'auth'
    },
    component: Logs
  },
  {
    path: '/settings/users',
    name: 'UserPermissions',
    beforeEnter: MiddlewareAuth,
    meta: {
      layout: 'auth'
    },
    component: UserPermissions
  }
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  //   const lang = to.query.lang

  //   if (lang && store.state.locale.locales.includes(lang)) {
  //     i18n.locale = lang
  //     store.dispatch('locale/setLang', lang)
  //   }
  console.log(process)
  document.title = APP_NAME + ' - ' + 'v' + version
  next()
})

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error)
}

export default router
