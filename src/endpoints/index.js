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
    url: '/forgot/password/reset',
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
  getVguardDeviceById: {
    url: '/vguard/devices',
    method: 'GET'
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
  }
}
