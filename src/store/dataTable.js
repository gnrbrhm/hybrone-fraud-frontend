export default {
  namespaced: true,
  state: {
    selectedRows: [],
    selectedRow: {},
    data: []
  },
  getters: {
    getisSelected: (state) => {
      return !!state.selectedRows
    },
    getSelectedRow: (state) => {
      return state.selectedRow
    },
    getSelectedRows: (state) => {
      return state.selectedRows
    }
  },
  mutations: {
    SET_SELECTED_ROWS(state, rows) {
      console.log(rows)
      state.selectedRows = rows
    },
    SET_SELECTED_ROW(state, row) {
      state.selectedRow = row
    }
  },
  actions: {
    setSelectedRows({ commit }, rows) {
      commit('SET_SELECTED_ROWS', rows)
    },
    setSelectedRow({ commit }, row) {
      commit('SET_SELECTED_ROW', row)
    }
  }
}
