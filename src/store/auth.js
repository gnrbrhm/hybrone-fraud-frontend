import router from "../router";
import moment from "moment-timezone";
import endpoints from "@/endpoints";
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    isLoggedIn: (state) => !!state.user.token,
  },
  mutations: {
    SET_TOKEN(state, data) {
      state.user.token = data;
      console.log(state.user.token);
    },
    SET_AUTH_USER(state, data) {
      console.log(data);
      state.user = data;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
    setAuthUser({ commit }, data) {
      let payload = { ...data };
      console.log(payload);
      let lang = navigator.language.split("-")[0].toLocaleUpperCase();
      let timezone = moment.tz.guess();
      if (!payload.language) {
        payload.language = lang;
      }
      if (!payload.timezone) {
        payload.timezone = timezone;
      }
      if (!payload.currency) {
        payload.currency = "TRY";
      }
      this.dispatch("locale/setLang", payload.language);
      commit("SET_AUTH_USER", payload);
      commit("SET_TOKEN", payload.data.token);
    },
    logout({ commit }) {
      Vue.prototype
        .$api({
          ...endpoints.logout,
        })
        .then((r) => {
          if (r.status == 200) {
            commit("SET_AUTH_USER", {});
            router.push({ name: "Login" });
          }
        });
    },
  },
};
