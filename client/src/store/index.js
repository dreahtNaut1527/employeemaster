import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    isLoggedIn: false,
    darkMode: false,
    searchData: '',
    emplcode: '',
    isEmpEdit: false,
    isConnect: true,
    themeColor: ''
  },
  plugins: [
    createPersistedState() 
  ],
  mutations: {
    CHANGE_USER_INFO: (state, data) => {
      state.userInfo = data
    },
    CHANGE_USER_LOGGING: (state, data) => {
      state.isLoggedIn = data
    },
    CHANGE_THEME: (state, data) => {
      state.darkMode = data
    },
    CHANGE_SEARCHING: (state, data) => {
      state.searchData = data
    },
    CHANGE_EMPLCODE: (state, data) => {
      state.emplcode = data
    },
    CHANGE_EMP_EDIT: (state, data) => {
      state.isEmpEdit = data
    },
    CHANGE_CONNECTION: (state, data) => {
      state.isConnect = data
    },
    CHANGE_THEMECOLOR: (state, data) => {
      state.themeColor = data
    }
  },
  actions: {

  },
  modules: {

  }
})
