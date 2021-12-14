import Vue from 'vue'
import endpoints from '@/endpoints'
export default {
  namespaced: true,
  state: {
    currrentPremise: {},
    tracked_premise: [],
    users: []
  },
  getters: {
    getCurrentPremise: (state) => {
      return state.currrentPremise
    },
    getPremiseUsers: (state) => {
      return state.users
    }
  },
  mutations: {
    SET_CURRENT_PREMISE(state, premise) {
      console.log('Store Premise', premise)
      state.currrentPremise = premise
    },
    SET_PREMISE_USERS(state, users) {
      state.users = users
    }
  },
  actions: {
    setCurrentPremise({ commit }, premise) {
      commit('SET_CURRENT_PREMISE', premise)
    },
    getPremiseById({ commit }, premise_id) {
      const premise = Vue.prototype.$api({
        ...endpoints.getPremiseById,
        url: '/premises/' + premise_id
      })
      return premise.then((r) => {
        if (r.status == 200) {
          commit('SET_CURRENT_PREMISE', r.data.data)
          if (r.status == 200) {
            return r.data.data.premise
          }
        }
      })
    },
    getPremises(_, payload) {
      const premise = Vue.prototype.$api({
        ...endpoints.getPremises,
        params: { page: 1, limit: 20, ...payload }
      })
      return premise.then((r) => {
        if (r.status == 200) {
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
          return r.data.data.pagination.records //Pagination keyleri device ile farklı
        }
      })
    },
    getFilterPremises(_, filter_data) {
      const premise = Vue.prototype.$api({
        ...endpoints.getPremises,
        params: { page: 1, limit: 10, ...filter_data }
      })
      return premise.then((r) => {
        if (r.status == 200) {
          return r.data.data.premises
        }
      })
    },
    createPremise(_, payload) {
      const newPremise = Vue.prototype.$api({
        ...endpoints.createPremise,
        data: {
          premise: payload
        }
      })
      return newPremise.then((r) => {
        if (r.status == 201) {
          return r
        }
      })
    },
    deletePremise(premise_id) {
      const deletePremise = Vue.prototype.$api({
        ...endpoints.deletePremise,
        query: { premise_id: premise_id }
      })
      deletePremise.then((r) => {
        return r.data
      })
    },
    updatePremise(_, payload) {
      return Vue.prototype.$api({
        ...endpoints.updatePremise,
        url: '/premises/' + payload.premise_id,
        data: { premise: payload.premise }
      })
    },
    getPremiseDevice({ commit }, premise_id) {
      let premise_devices = Vue.prototype.$api({
        ...endpoints.getPremiseDevice,
        params: { page: 1, limit: 20, premise_id: premise_id }
      })
      return premise_devices.then((r) => {
        if (r.data.data.users.length > 0)
          commit('SET_PREMISE_USERS', r.data.data.users)

        return r.data.data.pagination.records
      })
    },
    getTrackedPremises(_, payload) {
      const tracked_premise = Vue.prototype.$api({
        ...endpoints.getTrackedPremises,
        url: 'prosec/devices/',
        params: payload
      })
      return tracked_premise.then((r) => {
        if (r.status == 200) {
          return r.data.data.paginated.records
        }
      })
    }
  }
}
