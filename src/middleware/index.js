import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import store from '../store'
import Qs from 'qs'
import leaflet from 'leaflet'
// import leaflet_cluster from 'leaflet.markercluster'

const clientInstance = (baseURL) =>
  axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 40000,
    paramsSerializer: (params) =>
      Qs.stringify(params, {
        skipNulls: true,
        arrayFormat: 'repeat'
      })
  })
// ec2-3-121-236-159
const cyclops = clientInstance('http://34.79.135.127:3000/api/v1/')
const fraud = clientInstance('http://3.70.144.38:3000/')
const map = 'http://34.79.135.127:8081/tile/{z}/{x}/{y}.png'

const clients = [cyclops, fraud]

clients.forEach((client) => {
  client.interceptors.request.use((config) => {
    config.url == '/register-activities'
      ? (config.params = encodeURI(config.params))
      : config.params
    console.log(encodeURI(config.params))
    config.headers['Login-Type'] = 'account'

    if (!config.url.includes('token')) {
      let token = store.state.auth.user.token
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  })

  client.interceptors.response.use(
    (response) => {
      const {
        data: { message, status }
      } = response

      if (message) {
        Vue.notify({
          text: message,
          group: status ? 'success-template' : 'error-template',
          type: status ? 'success' : 'error'
        })
      }
      console.log('Response', response)
      //   if ([202].includes(response.status)) {
      //     // router.push({ name: 'Settings', query: { is_random_password: true } })
      //     router.push({ name: 'Settings' })
      //   }
      return response
    },
    (error) => {
      const {
        response: {
          data: { message },
          config: { url },
          status
        }
      } = error

      if (message) {
        Vue.notify({
          text: message,
          group: 'error-template',
          type: 'error'
        })
      }

      if (url != '/login' && [403].includes(status)) {
        router.push({ name: 'Login' })
        store.dispatch('auth/logout')
      }

      return error
    }
  )
})

export default {
  install() {
    Vue.prototype['$api'] = cyclops
    Vue.prototype['$fraud'] = fraud
    Vue.prototype['$map'] = map
    Vue.prototype['$leaflet'] = leaflet
  }
}
