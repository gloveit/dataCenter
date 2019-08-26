// import Serve from '@/api/intercept.js'
const state = {
  breadList: [
    {
      path: '/home/content',
      name: '首页'
    }
  ]
}
const mutations = {
  CHANGEBREAD (state, data) {
    window.localStorage.setItem('routerList', JSON.stringify(data))
    state.breadList = data
  }
}
const actions = {}
const getters = {}

const homeStore = {
  state,
  mutations,
  actions,
  getters
}
export default homeStore
