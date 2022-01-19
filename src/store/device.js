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
        ...endpoints.getVguardDevices,
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
    getDevicesExcelExport({ commit }, params) {
      const device = Vue.prototype.$api({
        ...endpoints.getProsecDevices,
        params: { page: 1, limit: 20, response_type: 'excel' }
      })
      return device.then((r) => {
        return r.data.data.paginated.devices
      })
    },
    getVguardDevices({ commit }, params) {
      const device = Vue.prototype.$api({
        ...endpoints.getVguardDevices,
        params: { page: 1, limit: 10, ...params }
      })
      return device.then((r) => {
        commit('SET_DEVICES', r.data.data.paginated)

        this.dispatch(
          'pagination/setCurrentPage',
          r.data.data.paginated.per_page / r.data.data.paginated.per_page
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
    getVguardDevicesExcelExport({ commit }, params) {
      const device = Vue.prototype.$api({
        ...endpoints.getVguardDevicesForExcel,
        params: { page: 1, limit: 10, ...params }
      })
      return device.then((r) => {
        return r
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
    async getVguardDeviceById({ commit }, device_id) {
      const device = Vue.prototype.$api({
        ...endpoints.getProsecDeviceById,
        url: '/vguard/devices/' + device_id,
        params: { page: 1, limit: 10 }
      })
      return device.then((r) => {
        commit('SET_DEVICE', r.data.data.vguard_device)
        return r.data.data.vguard_device
      })
    },
    async updateTrackedVguardDevice(_, payload) {
      const device = Vue.prototype.$api({
        ...endpoints.updateTrackedVguardDevice,
        data: payload
      })
      return device.then((r) => {
        return r
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
    async getVguardDeviceChannelsEvents(_, payload) {
      Object.keys(payload).forEach((item) => {
        if (payload[item] == '') delete payload[item]
      })
      const last_signals = Vue.prototype.$api({
        ...endpoints.getVguardDeviceChannelsEvents,
        params: {
          ...endpoints.getVguardDeviceChannelsEvents.params,
          ...payload
        }
      })
      return last_signals.then((r) => {
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
    async getVguardDevicesForMap(_, payload) {
      const device = Vue.prototype.$api({
        ...endpoints.getVguardDevicesForMap,
        params: { ...payload }
      })
      let result = []
      await device.then((r) => {
        console.log(r.data.data.vguard_devices)
        result = r.data.data.vguard_devices
      })
      return result
    },
    async refreshVguardDeviceData(_, payload) {
      const refresh = Vue.prototype.$api({
        ...endpoints.refreshVguardDevice,
        data: { ...payload }
      })
      return await refresh.then((r) => {
        console.log('refreshVguardDeviceData', r)
        if (r.status) return r
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
    async getVguardDeviceChannelSnapshot(_, payload) {
      let snapshot = Vue.prototype.$api({
        ...endpoints.getVguardDeviceChannelSnapshot,
        data: { ...payload }
      })
      return snapshot
    },
    async getVguardDeviceChannelRecord(_, payload) {
      let record = Vue.prototype.$api({
        ...endpoints.getVguardDeviceChannelRecord,
        data: { ...payload }
      })
      return record
    },
    async createMultipleVguardDevice(_, payload) {
      let multiple_create = Vue.prototype.$api({
        ...endpoints.createMultipleVguardDevice,
        data: { ...payload }
      })
      return multiple_create.then((r) => {
        return r
      })
    },
    createDevice(_, payload) {
      const device = Vue.prototype.$api({
        ...endpoints.createDevice,
        data: { vguard_device: payload }
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
        url: '/vguard/devices/' + payload.id,
        data: { vguarddevice: payload }
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
