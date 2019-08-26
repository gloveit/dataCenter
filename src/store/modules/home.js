import _ from 'lodash'
import Serve from '@/api/intercept.js'
const state = {
  list: [],
  menuList: [],
  flagDrag: false,
  fixedData: [],
  routers: [],
  isHomePage: true,
  scrolltop: 0
}
const mutations = {
  GETLIST (state, data) {
    state.list = data
  },
  GETMENULIST (state, data) {
    state.menuList = data
  },
  CHANGEFLAGE (state, data) {
    state.flagDrag = data
  },
  FIXEDDATA (state, data) {
    state.fixedData = data
  },
  SETROUTERS (state, data) {
    state.routers = data
  },
  CHANGEHOMEPAGE (state, data) {
    state.isHomePage = data
  },
  SAVEHOMESCROLL (state, data) {
    state.scrolltop = data
  }
}
const actions = {
  getList ({ commit }) {
    Serve.get('config/sysmenu').then(data => {
      let newList = _.sortBy(data, item => {
        return item.seq
      })
      let muneList = _.sortBy(data, item => {
        return item.seq
      })
      commit('GETLIST', newList)
      commit('GETMENULIST', muneList)
    })
  }
}
const getters = {}

const homeStore = {
  state,
  mutations,
  actions,
  getters
}
export default homeStore
