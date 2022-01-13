import router from '../router'
import moment from 'moment-timezone'
import endpoints from '@/endpoints'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    user: {}
  },
  getters: {
    isLoggedIn: (state) => !!state.user.token,
    getPermissions: (state) => state.user.data.user.permission
  },
  mutations: {
    SET_TOKEN(state, data) {
      state.user.token = data
      console.log(state.user.token)
    },
    SET_AUTH_USER(state, data) {
      console.log(data)
      state.user = data
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    setAuthUser({ commit }, data) {
      let payload = { ...data }
      console.log(payload)
      let lang = navigator.language.split('-')[0].toLocaleUpperCase()
      let timezone = moment.tz.guess()
      if (!payload.language) {
        payload.language = lang
      }
      if (!payload.timezone) {
        payload.timezone = timezone
      }
      if (!payload.currency) {
        payload.currency = 'TRY'
      }
      this.dispatch('locale/setLang', payload.language)
      commit('SET_AUTH_USER', payload)
      commit('SET_TOKEN', payload.data.token)
    },
    async getUsers(_, payload) {
      let users = Vue.prototype.$api({
        ...endpoints.getUsers
      })
      return users.then((r) => {
        if (r.status == 200) return r
      })
    },
    async getUsersByFiltered(_, payload) {
      let users = Vue.prototype.$api({
        ...endpoints.getUsersByFiltered,
        params: { ...payload }
      })
      return users.then((r) => {
        if (r.status == 200) return r
      })
    },
    createUser(_, payload) {
      let user = Vue.prototype.$api({
        ...endpoints.createUser,
        data: payload
      })
      return user.then((r) => {
        if (r.status == 201) return r
      })
    },
    deleteUser(_, payload) {
      console.log('PAyload', payload)
      let user = Vue.prototype.$api({
        ...endpoints.deleteUser,
        data: payload
      })
      return user.then((r) => {
        console.log('R', r)
        if (r.status == 201) return r
      })
    },
    updateUserPermission(_, payload) {
      let result = Vue.prototype.$api({
        ...endpoints.updateUserPermission,
        data: payload
      })
      return result.then((r) => {
        console.log('R', r)
        if (r.status) {
          return r.data
        }
      })
    },
    resetUserPassword(_, payload) {
      let result = Vue.prototype.$api({
        ...endpoints.forgotUserPasswordReset,
        data: payload
      })
      return result
      //   .then((r) => {
      //     console.log('R', r)
      //     if (r.status) {
      //       return r
      //     }
      //   })
    },
    changeUserPasswordVerify(_, payload) {
      console.log('STORE')
      let result = Vue.prototype.$api({
        ...endpoints.changeUserPassword,
        data: payload
      })
      return result.then((r) => {
        if (r.status) {
          return r
        }
      })
    },
    forgotUserPassword(_, payload) {
      let request = Vue.prototype.$api({
        ...endpoints.forgotUserPassword,
        data: { ...payload }
      })
      return request.then((r) => {
        return r.status == 200
      })
    },
    logout({ commit }) {
      Vue.prototype
        .$api({
          ...endpoints.logout
        })
        .then((r) => {
          if (r.status == 200) {
            commit('SET_AUTH_USER', {})
            router.push({ name: 'Login' })
          }
        })
    }
  }
}
