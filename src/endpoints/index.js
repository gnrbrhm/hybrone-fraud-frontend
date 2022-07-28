export default {
  getUsers: {
    method: 'GET',
    url: '/user/list'
  },
  getUsersByFiltered: {
    method: 'GET',
    url: '/user/list',
    params: {}
  },
  createUser: {
    method: 'POST',
    url: '/user/create',
    data: {}
  },
  token: {
    url: '/user/login',
    method: 'POST',
    data: {
      username: '',
      password: ''
    }
  },
  deleteUser: {
    method: 'DELETE',
    url: '/user/delete',
    data: {}
  },
  updateUserPermission: {
    url: '/user/permission/update',
    method: 'PUT',
    data: {}
  },
  forgotUserPasswordReset: {
    url: 'user/forgot/password/reset',
    method: 'POST',
    data: {}
  },
  forgotUserPassword: {
    url: '/user/forgot/password',
    method: 'POST',
    data: {}
  },
  changeUserPassword: {
    url: '/user/change/password/with/verify',
    method: 'POST',
    data: {}
  },
  logout: {
    method: 'GET',
    url: '/user/logout'
  },
  getPremises: {
    url: '/premises/',
    method: 'GET',
    params: {
      page: 1,
      limit: 20,
      premise_id: null,
      area_id: 1
    }
  },
  deletePremise: {
    method: 'DELETE',
    url: '/premises'
  },
  getTrackedPremises: {
    url: '/prosec/devices',
    method: 'GET',
    params: { is_tracked: true }
  },
  createTrackedDevice: {
    url: '/prosec/devices',
    method: 'PUT',
    data: { prosec_device: null }
  },
  getPremiseById: {
    url: '/premises',
    method: 'GET',
    params: {
      premise_id: null
    }
  },
  createPremise: {
    url: '/premises',
    method: 'POST',
    data: {
      premise: null
    }
  },
  updatePremise: {
    url: '/premises',
    method: 'PATCH',
    data: {
      premise: null
    }
  },
  getCities: {
    url: '/cities/',
    method: 'GET'
  },
  getProvince: {
    url: '/provinces',
    method: 'GET',
    params: { city_id: null }
  },
  getPremiseDevice: {
    url: 'vguard/devices/',
    method: 'GET',
    params: { premise_id: null }
  },
  createMultipleVguardDevice: {
    method: 'POST',
    url: '/vguard/devices/multiplecreate/'
  },
  getDeviceModels: {
    url: '/device-models/',
    method: 'GET'
  },
  getDeviceBrands: {
    url: '/device-brands/',
    method: 'GET'
  },
  getDeviceModelsById: {
    url: '/device-models/',
    method: 'GET'
  },
  getProsecDevices: {
    url: '/prosec/devices',
    method: 'GET'
  },
  getVguardDevices: {
    url: '/vguard/devices',
    method: 'GET'
  },
  getVguardDevicesForExcel: {
    url: '/vguard/devices',
    method: 'GET',
    responseType: 'blob'
  },
  updateTrackedVguardDevice: {
    url: '/vguard/device/tracked/update',
    method: 'POST',
    data: {}
  },
  getVguardDevicesForMap: {
    url: '/vguard/device/list/for/map',
    method: 'GET'
  },
  refreshVguardDevice: {
    url: '/vguard/device/data/refresh',
    method: 'POST',
    data: {}
  },
  resetVguardDeviceSceneChange: {
    url: '/vguard/device-scene-change-reset',
    method: 'POST',
    data: {}
  },
  getVguardDeviceById: {
    url: '/vguard/devices',
    method: 'GET'
  },
  getVguardDeviceChannelSnapshot: {
    url: '/vguard/device-snapshot',
    method: 'POST',
    responseType: 'blob',
    data: {}
  },
  getVguardDeviceChannelRecord: {
    url: '/vguard/device/download/record',
    method: 'POST',
    responseType: 'blob',
    data: {}
  },
  getProsecDeviceById: {
    url: '/prosec/devices',
    method: 'GET'
  },
  getProsecDeviceByPremiseId: {
    url: '/prosec/devices',
    method: 'GET',
    params: { custom_premise_id: null }
  },
  createDevice: {
    url: '/vguard/devices',
    method: 'POST',
    data: { vguard_device: null }
  },
  updateDevice: {
    url: '/vguard/devices',
    method: 'PUT',
    data: { vguard_device: null }
  },
  deleteProsecDevice: {
    url: '/prosec/devices',
    method: 'DELETE'
  },
  getProsecDeviceLastSignals: {
    url: 'prosec/signals',
    method: 'GET',
    params: { page: 1, limit: 20 }
  },
  getVguardDeviceChannelsEvents: {
    url: '/vguard/channel/events',
    method: 'GET',
    params: { page: 1, limit: 20 }
  },
  downloadProsecDeviceLastSignals: {
    url: 'prosec/signals',
    method: 'GET',
    responseType: 'blob',
    params: { response_type: 'excel' }
  },
  getDashboardData: {
    url: '/prosec/dashboard-report',
    method: 'GET'
  },
  getVguardDashboardData: {
    url: '/vguard/devices/dashboard/report',
    method: 'GET',
    params: {}
  },
  /**
   * LOGS ENDPOINTS
   */
  getLogRecords: {
    url: '/user-activities',
    method: 'GET',
    params: { page: 1, limit: 10 }
  },
  getLogsListDownload: {
    method: 'GET',
    url: '/user-activities',
    responseType: 'blob',
    params: { start_time: '', finish_time: '', response_type: 'excel' }
  },
  /**
   * CREATE REPORT
   */
  getDeviceReport: {
    method: 'GET',
    url: 'prosec/device-report',
    responseType: 'blob',
    params: {}
  },
  getDeviceVguardReport: {
    method: 'GET',
    url: 'vguard/devices',
    responseType: 'blob',
    params: {}
  },
  /**
   * SERVICE ENDPOINTS
   */

  getServices: {
    method: 'GET',
    url: '/tickets',
    params: {}
  },
  createService: {
    method: 'POST',
    url: '/tickets',
    data: null
  },
  getTicketsListDownload: {
    method: 'GET',
    url: '/tickets',
    responseType: 'blob',
    params: { response_type: 'excel' }
  },
  updateServiceStatus: {
    method: 'POST',
    url: '/tickets/statusupdate',
    data: {}
  },
  getSettings: {
    method: 'GET',
    url: '/settings'
  },
  updateSettings: {
    method: 'PUT',
    url: '/settings',
    data: {}
  },
  getFraudDashboardData: {
    method: 'GET',
    url: '/dashboard',
    data: {}
  },
  getFraudStores: {
    method: 'GET',
    url: '/stores/fraudextended',
    data: {}
  },
  getFraudRegisterActivity: {
    method: 'GET',
    url: '/register-activities',
    payload: {}
  },
  getFraudCashiers: {
    method: 'GET',
    url: '/cahiers',
    payload: {}
  },
  getAICheck: {
    method: 'GET',
    url: '/configs/project/0'
  },
  updateAICheck: {
    method: 'PATCH',
    url: '/configs/62e0cb534d6813b1484a0d2a'
  }
}
