import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isFolded: false
  },
  mutations: {
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
