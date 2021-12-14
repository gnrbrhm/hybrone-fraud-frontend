import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./auth";
import dataTable from "./dataTable";
import maps from "./maps";
import premise from "./premise";
import model from "./model";
import device from "./device";
import pagination from "./pagination";
import logs from "./logs";
import service from "./service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    dataTable,
    maps,
    premise,
    model,
    device,
    pagination,
    logs,
    service,
    // locale,
  },
  plugins: [
    createPersistedState({
      paths: ["auth"],
    }),
  ],
});
