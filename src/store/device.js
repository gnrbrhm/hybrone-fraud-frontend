import Vue from 'vue'
import endpoints from '@/endpoints'
export default {
  namespaced: true,
  state: { device: {}, device_model: {}, devices: [] },
  getters: {
    getDevice: (state) => {
      return state.device
    }
  },
  mutations: {
    SET_DEVICES: (state, prosec_devices) => {
      state.devices = prosec_devices
    },
    SET_DEVICE: (state, prosec_device) => {
      state.device = prosec_device
    }
  },
  actions: {
    getDevices({ commit }, params) {
      const device = Vue.prototype.$api({
        ...endpoints.getProsecDevices,
        params: { page: 1, limit: 10, ...params }
      })
      return device.then((r) => {
        commit('SET_DEVICES', r.data.data.paginated)

        this.dispatch(
          'pagination/setCurrentPage',
          r.data.data.paginated.to / r.data.data.paginated.per_page
        )
        this.dispatch(
          'pagination/setCurrentLimit',
          r.data.data.paginated.per_page
        )
        this.dispatch(
          'pagination/setTotalRecord',
          r.data.data.paginated.total_record
        )
        return r.data.data.paginated.records
      })
    },
    getProsecDevicesByFilter(_, custom_premise_id) {
      const device = Vue.prototype.$api({
        ...endpoints.getProsecDeviceByPremiseId,
        params: { ...custom_premise_id }
      })
      return device.then((r) => {
        return r.data.data.paginated.records
      })
    },
    async getProsecDeviceById({ commit }, device_id) {
      const device = Vue.prototype.$api({
        ...endpoints.getProsecDeviceById,
        url: '/prosec/devices/' + device_id,
        params: { page: 1, limit: 10 }
      })
      return device.then((r) => {
        commit('SET_DEVICE', r.data.data.prosec_device)
        return r.data.data.prosec_device
      })
    },
    async getProsecDeviceLastSignals(_, payload) {
      // let device_id = null
      // payload.device_id ?  device_id = payload.device_id : device_id = ''
      Object.keys(payload).forEach((item) => {
        if (payload[item] == '') delete payload[item]
      })
      const last_signals = Vue.prototype.$api({
        ...endpoints.getProsecDeviceLastSignals,
        // url:"prosec/signals/"+device_id,
        params: { ...endpoints.getProsecDeviceLastSignals.params, ...payload }
      })
      return last_signals.then((r) => {
        this.dispatch(
          'pagination/setCurrentPage',
          r.data.data.pagination.to / r.data.data.pagination.per_page
        )
        this.dispatch(
          'pagination/setCurrentLimit',
          r.data.data.pagination.per_page
        )
        this.dispatch(
          'pagination/setTotalRecord',
          r.data.data.pagination.total_record
        )
        return r.data.data.pagination.records
      })
    },
    async downloadProsecDeviceLastSignals(_, payload) {
      Object.keys(payload).forEach((item) => {
        if (payload[item] == '') delete payload[item]
      })
      const last_signals = Vue.prototype.$api({
        ...endpoints.downloadProsecDeviceLastSignals,
        params: {
          ...endpoints.downloadProsecDeviceLastSignals.params,
          ...payload
        }
      })
      return last_signals.then((r) => {
        if (r.status) return r.data
      })
    },
    createDevice(_, payload) {
      const device = Vue.prototype.$api({
        ...endpoints.createDevice,
        data: { prosec_device: payload }
      })
      return device.then((r) => {
        if (r.status) {
          return r.data
        }
      })
    },
    updateDevice(_, payload) {
      const device = Vue.prototype.$api({
        ...endpoints.updateDevice,
        url: '/prosec/devices/' + payload.id,
        data: { prosec_device: payload }
      })
      return device.then((r) => {
        if (r.status) {
          return r.data
        }
      })
    },
    deleteDevice(_, device_id) {
      const deleted_device = Vue.prototype.$api({
        ...endpoints.deleteProsecDevice,
        url: endpoints.deleteProsecDevice.url + '/' + device_id
      })
      return deleted_device.then((r) => {
        return r
      })
    }
  }
}
