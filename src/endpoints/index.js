export default {
  token: {
    url: '/user/login',
    method: 'POST',
    data: {
      username: '',
      password: ''
    }
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
    url: '/premises/',
    method: 'GET',
    params: {
      premise_id: null
    }
  },
  createPremise: {
    url: '/premises/',
    method: 'POST',
    data: {
      premise: null
    }
  },
  updatePremise: {
    url: '/premises/',
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
    url: '/devices/',
    method: 'GET',
    params: { premis_id: null }
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
    url: '/prosec/devices',
    method: 'POST',
    data: { prosec_device: null }
  },
  updateDevice: {
    url: '/prosec/devices',
    method: 'PUT',
    data: { prosec_device: null }
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
  }
}
