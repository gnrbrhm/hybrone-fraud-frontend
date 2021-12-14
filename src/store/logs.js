import Vue from "vue";
import endpoints from "@/endpoints";
export default {
  namespaced: true,
  state: {
    logs: [],
  },
  getters: {
    getLogRecords: (state) => {
      return state.logs;
    },
  },
  mutations: {
    SET_LOG_RECORD: (state, logs) => {
      state.logs = logs;
    },
  },
  actions: {
    getLogRecords({ commit }, params) {
      let logs = Vue.prototype.$api({
        ...endpoints.getLogRecords,
        params: { ...params },
      });
      return logs.then((r) => {
        commit("SET_LOG_RECORD", r.data.data.pagination.records);
        this.dispatch(
          "pagination/setCurrentPage",
          r.data.data.pagination.to / r.data.data.pagination.per_page
        );
        this.dispatch(
          "pagination/setCurrentLimit",
          r.data.data.pagination.per_page
        );
        this.dispatch(
          "pagination/setTotalRecord",
          r.data.data.pagination.total_record
        );
        console.log("Store", r.data.data.pagination.records);
        return r.data.data.pagination.records;
      });
    },
    getLogListDownload(_, params) {
      let logs = Vue.prototype.$api({
        ...endpoints.getLogsListDownload,
        params: { ...params },
      });
      return logs.then((r) => {
        return r;
      });
    },
  },
};
