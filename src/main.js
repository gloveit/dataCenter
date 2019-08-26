import Vue from 'vue'
import App from './local_provider.vue'
import router from './router'
import store from './store/index'
import './assets/iconfont/iconfont.css'
import '@/components/antd/use'
// import VueAMap from 'vue-amap'
import '@/api/intercept.js'
import './map/map.js'
import './derective/baseDerective.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
