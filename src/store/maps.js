export default {
  namaspaced: true,
  state: {
    currentLocation: {},
    selectedLocation: {}
  },
  getters: {
    getCurrentLocation: (state) => {
      return state.currentLocation
    },
    getSelectedLocation: (state) => {
      return state.selectedLocation
    }
  },
  mutations: {
    SET_LOCATION(state, location) {
      state.currentLocation = location
    },
    RESET_LOCATION(state, location) {
      state.currentLocation = location
    },
    SET_SELECTED_LOCATION(state, selectedLocation) {
      state.selectedLocation = selectedLocation
    }
  },
  actions: {
    setLocation({ commit }, location) {
      console.log('Map Store', location)
      commit('SET_LOCATION', location)
    },
    resetLocation({ commit }, location) {
      console.log('Map Store', location)
      commit('SET_LOCATION', {})
    },
    setSelectedLocation({ commit }, location) {
      commit('SET_SELECTED_LOCATION', location)
      console.log('selectedLocation', location)
    }
  }
}
