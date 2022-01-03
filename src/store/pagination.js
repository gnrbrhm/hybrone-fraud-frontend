export default {
  namespaced: true,
  state: {
    current_page: 1,
    current_limit: 20,
    selectedPage: null,
    selectedLimit: null,
    total_record: 100
  },
  getters: {
    getCurrentPage: (state) => {
      return state.current_page
    },
    getCurrentLimit: (state) => {
      return state.current_limit
    },
    getSelectedLimit: (state) => {
      return state.selected_limit
    },
    getSelectedPage: (state) => {
      return state.selected_page
    },
    getTotalRecord: (state) => {
      return state.total_record
    }
  },
  mutations: {
    SET_CURRENT_PAGE: (state, current_page) => {
      state.current_page = current_page
    },
    SET_CURRENT_LIMIT: (state, current_limit) => {
      state.current_limit = current_limit
    },
    SET_SELECTED_PAGE: (state, selected_page) => {
      state.selected_page = selected_page
    },
    SET_SELECTED_LIMIT: (state, selected_limit) => {
      state.selected_limit = selected_limit
    },
    SET_TOTAL_RECORD: (state, total_record) => {
      state.total_record = total_record
    }
  },
  actions: {
    setCurrentPage({ commit }, current_page) {
      if (
        !isNaN(current_page) &&
        current_page != null &&
        current_page != undefined
      )
        commit('SET_CURRENT_PAGE', current_page)
      else commit('SET_CURRENT_PAGE', 1)
    },
    setCurrentLimit({ commit }, current_limit) {
      if (
        !isNaN(current_limit) &&
        current_limit != null &&
        current_limit != undefined &&
        current_limit != 0
      )
        commit('SET_CURRENT_LIMIT', current_limit)
      else commit('SET_CURRENT_LIMIT', 20)
    },
    setSelectedPage({ commit }, selected_page) {
      if (
        !isNaN(selected_page) &&
        selected_page != null &&
        selected_page != undefined
      )
        commit('SET_SELECTED_PAGE', selected_page)
      else commit('SET_SELECTED_PAGE', 1)
    },
    setSelectedLimit({ commit }, selected_limit) {
      if (
        !isNaN(selected_limit) &&
        selected_limit != null &&
        selected_limit != undefined &&
        selected_limit != 0
      )
        commit('SET_SELECTED_LIMIT', selected_limit)
      else commit('SET_SELECTED_LIMIT', 20)
    },
    setTotalRecord({ commit }, total_record) {
      if (
        !isNaN(total_record) &&
        total_record != null &&
        total_record != undefined
      )
        commit('SET_TOTAL_RECORD', total_record)
      // else commit('SET_SELECTED_LIMIT', 20)
    }
  }
}
