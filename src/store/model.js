import Vue from 'vue'
import endpoints from '@/endpoints'
export default {
  namespaced: true,
  state: { model: {}, models: [], brand: {}, brands: [] },
  getters: {
    getDeviceModels: (state) => {
      return state.models
    },
    getDeviceModel: (state) => {
      return state.model
    },
    getDeviceBrands: (state) => {
      return state.brands
    },
    getDeviceBrand: (state) => {
      return state.brand
    }
  },
  mutations: {
    SET_DEVICE_MODELS: (state, models) => {
      state.models = models
    },
    SET_DEVICE_MODEL: (state, model) => {
      state.model = model
    },
    SET_DEVICE_BRANDS: (state, brands) => {
      state.brands = brands
    },
    SET_DEVICE_BRAND: (state, brand) => {
      state.brand = brand
    }
  },
  actions: {
    getDeviceModels({ commit }) {
      const models = Vue.prototype.$api({
        ...endpoints.getDeviceModels
      })
      return models.then((r) => {
        if (r.status == 200) {
          console.log(r)
          commit('SET_DEVICE_MODELS', r.data.data.device_models)
          return r
        }
      })
    },
    getDeviceModelId({ commit }, model_id) {
      const model = Vue.prototype.$api({
        ...endpoints.getDeviceModelsById,
        url: '/device-models/' + model_id
      })
      return model.then((r) => {
        commit('SET_DEVICE_MODEL', r.data.data.device_models)
        return r
      })
    },
    getDeviceBrands({ commit }) {
      const models = Vue.prototype.$api({
        ...endpoints.getDeviceBrands
      })
      return models.then((r) => {
        if (r.status == 200) {
          console.log(r)
          commit('SET_DEVICE_BRANDS', r.data.data.device_brands)
          return r
        }
      })
    }
  }
}
