import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currencies: []
  },
  mutations: {
    setCurrencies(state, array) {
      state.currencies = array;
    },
  },
  actions: {
    getAllCurrencies() {
      axios.get('https://api.brobler.com/v1/currencies')
        .then((res) => {
          const currencies = res.data;
          commit('setCurrencies', currencies);
        })
    },
  },
  modules: {
  }
})
