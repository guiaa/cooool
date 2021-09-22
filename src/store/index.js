import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userupdate: 0
  },
  mutations: {
    updatestateUser (state) {
      state.userupdate = 1
    }
  },
  actions: {
  },
  modules: {
  }
})
