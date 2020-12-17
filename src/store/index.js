import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: JSON.parse(localStorage.getItem("userData")) || null,
    isFolded: false
  },
  mutations: {
    login(state, data) {
      localStorage.setItem("userData", JSON.stringify(data));
      state.userData = data;
    },

    logout(state) {
      localStorage.removeItem("userData");
      state.userData = null;
    },

    // 更改菜单折叠状态
    toggleFold(state) {
      state.isFolded = !state.isFolded;
    }
  },
  actions: {
  },
  modules: {
  }
})
