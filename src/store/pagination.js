export default {
  namespaced: true,
  state: {
    current_page: 1,
    current_limit: 20,
    selectedPage: null,
    selectedLimit: null,
    total_record: 100,
  },
  getters: {
    getCurrentPage: (state) => {
      return state.current_page;
    },
    getCurrentLimit: (state) => {
      return state.current_limit;
    },
    getSelectedLimit: (state) => {
      return state.selected_limit;
    },
    getSelectedPage: (state) => {
      return state.selected_page;
    },
    getTotalRecord: (state) => {
      return state.total_record;
    },
  },
  mutations: {
    SET_CURRENT_PAGE: (state, current_page) => {
      state.current_page = current_page;
    },
    SET_CURRENT_LIMIT: (state, current_limit) => {
      state.current_limit = current_limit;
    },
    SET_SELECTED_PAGE: (state, selected_page) => {
      state.selected_page = selected_page;
    },
    SET_SELECTED_LIMIT: (state, selected_limit) => {
      state.selected_limit = selected_limit;
    },
    SET_TOTAL_RECORD: (state, total_record) => {
      state.total_record = total_record;
    },
  },
  actions: {
    setCurrentPage({ commit }, current_page) {
      commit("SET_CURRENT_PAGE", current_page);
    },
    setCurrentLimit({ commit }, current_limit) {
      commit("SET_CURRENT_LIMIT", current_limit);
    },
    setSelectedPage({ commit }, selected_page) {
      commit("SET_SELECTED_PAGE", selected_page);
    },
    setSelectedLimit({ commit }, selected_limit) {
      commit("SET_SELECTED_LIMIT", selected_limit);
    },
    setTotalRecord({ commit }, total_record) {
      commit("SET_TOTAL_RECORD", total_record);
    },
  },
};
