import Vue from 'vue'
import Vuex from 'vuex'
import Home from './modules/home'
import Breadcrumb from './modules/breadcrumb'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Home,
    Breadcrumb
  },
  mutations: {},
  actions: {}
})
