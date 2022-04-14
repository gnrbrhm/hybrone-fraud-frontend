import Vue from 'vue'
import endpoints from '@/endpoints'
import axios from 'axios'
export default {
  namespaced: true,
  state: { shop: {}, device_model: {}, devices: [] },
  getters: {
    getShopy: (state) => {
      return state.shop
    }
  },
  mutations: {
    SET_SHOPIES: (state, prosec_devices) => {
      state.devices = prosec_devices
    },
    SET_SHOP: (state, prosec_device) => {
      state.device = prosec_device
    }
  },
  actions: {
    async getShopies({ commit }, params) {
      const shop = await Vue.prototype.$fraud({
        ...endpoints.getFraudStores
        // params: { page: 1, limit: 10, ...params }
      })
      console.log('Mağaza Listesi', shop)
      return shop
      //   return shop.then((r) => {
      //     commit('SET_SHOPIES', r.data.data.paginated)

      //     this.dispatch(
      //       'pagination/setCurrentPage',
      //       r.data.data.paginated.to / r.data.data.paginated.per_page
      //     )
      //     this.dispatch(
      //       'pagination/setCurrentLimit',
      //       r.data.data.paginated.per_page
      //     )
      //     this.dispatch(
      //       'pagination/setTotalRecord',
      //       r.data.data.paginated.total_record
      //     )
      //     return r.data.data.paginated.records
      //   })
    },
    async getFraudRegisterActivity({ commit }, params) {
      const register = await axios.get(
        // 'http://ec2-3-68-193-146.eu-central-1.compute.amazonaws.com:3000/register-activities?filter=%7B%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%201%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%7D%2C%0A%20%20%22include%22%3A%20%5B%20%22cashier%22%2C%20%22store%22%20%5D%0A%7D'
        'http://ec2-3-68-193-146.eu-central-1.compute.amazonaws.com:3000/register-activities',
        {
          params: {
            filter: {
              offset: 0,
              limit: 20,
              order: 'date DESC',
              where: {
                date: {
                  between: [
                    '2022-03-13T20:55:03.187Z',
                    '2022-03-17T20:55:03.187Z'
                  ]
                },
                activityType: 0,
                posCode: '5688_2',
                storeCode: '5688',
                userCode: '26365'
              },
              include: ['cashier', 'store']
            }
          }
        }
      )
      //   const register = await Vue.prototype.$fraud({
      //     ...endpoints.getFraudRegisterActivity,
      //     params: { ...params }
      //   })
      //   console.log('İşlem Listesi', register)
      return register
    },
    async getFraudDashboardData({ commit }, params) {
      const dashboard = await axios.get(
        'http://ec2-3-68-193-146.eu-central-1.compute.amazonaws.com:3000/dashboard'
      )
      // 'http://ec2-3-68-193-146.eu-central-1.compute.amazonaws.com:3000/stores/fraudextended?filter=%7B%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22order%22%3A%20%22string%22%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22id%22%3A%20true%2C%0A%20%20%20%20%22hakmarId%22%3A%20true%2C%0A%20%20%20%20%22code%22%3A%20true%2C%0A%20%20%20%20%22name%22%3A%20true%2C%0A%20%20%20%20%22districtId%22%3A%20true%2C%0A%20%20%20%20%22cityId%22%3A%20true%2C%0A%20%20%20%20%22receiptHeader1%22%3A%20true%2C%0A%20%20%20%20%22receiptHeader2%22%3A%20true%2C%0A%20%20%20%20%22receiptHeader3%22%3A%20true%2C%0A%20%20%20%20%22receiptHeader4%22%3A%20true%2C%0A%20%20%20%20%22receiptHeader5%22%3A%20true%0A%20%20%7D%0A%7D'

      return dashboard
    }
  }
}
