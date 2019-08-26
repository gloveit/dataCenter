import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Home from './views/home/Home.vue'
import Login from './logo'
import Content from './views/home/com/home_content'
import { RouterConfig } from './config/rouer_config'
import store from './store/index'
import _ from 'lodash'
import $ from 'jquery'
import ErrorPage from './views/error/index'
import { getPermissionsList } from '@/api/login.js'
Vue.use(Router)
let routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/home/content',
    children: [
      {
        path: 'content',
        component: Content,
        meta: {
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorPage
  }
]
const router = new Router({
  routes,
  mode: 'history',
  srcollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
})
router.beforeEach((to, from, next) => {
  if (window.localStorage.getItem('token')) {
    if (to.path === '/login') {
      next({ path: '/home' })
    } else {
      store.commit('CHANGEFLAGE', false)
      store.dispatch('getList')
      if (to.path !== '/home/content') {
        store.commit('CHANGEHOMEPAGE', false)
        // 进行判断用户是前进还是后退
        /**
         * 思路：由于局限性前端无法拿到用户的操作记录会出现以下两种种情况
         * 第一种， 用户直接用浏览器的前进后退按钮
         * 第二种，直接输入网址跳转
         */
        let history = window.localStorage.getItem('routerList')
          ? JSON.parse(window.localStorage.getItem('routerList'))
          : [
            {
              path: '/home/content',
              name: '首页'
            }
          ]
        let back = false // 后退
        let refresh = false // 刷新
        let len = history.length
        for (let i = 0; i < len; i++) {
          let h = history[i]
          if (h.path === to.path) {
            if (i === len - 1) {
              history[i]['name'] = to.meta.title
              refresh = true
            } else {
              back = true
            }
            break
          }
        }
        if (back) {
          // 后退，把历史纪录的最后一项删除
          let newList = history.filter((item, i) => {
            return history.length - 1 !== i
          })
          store.commit('CHANGEBREAD', newList)
        } else if (refresh) {
          // 刷新，不做其他操作
          store.commit('CHANGEBREAD', history)
        } else {
          // 前进，添加一条历史纪录
          // this.historyFlag = 'forward'
          var item = {
            path: to.path,
            name: to.meta.title
          }
          history.push(item)
          store.commit('CHANGEBREAD', history)
        }
      }
      if (store.state.Home.routers.length === 0) {
        // 初始化路由，对路由进行权限分配
        getPermissionsList().then(data => {
          if (data && data.length > 0) {
            // 将后台路由权限注入进去
            let appRouters = []
            data.forEach(item => {
              let newRouter = RouterConfig(item.name)
              if (item.ishome === 'true' && !$.isEmptyObject(newRouter)) {
                appRouters.push(newRouter)
                routes[2].children.push(newRouter)
              } else if (
                item.ishome === 'false' &&
                !$.isEmptyObject(newRouter)
              ) {
                appRouters.push(newRouter)
                routes.push(newRouter)
              }
            })
            router.addRoutes(routes)
            store.commit('SETROUTERS', appRouters)

            const redirect = decodeURIComponent(to.path)
            if (to.path === redirect) {
              next({ ...to, replace: true })
            } else {
              next({ path: redirect })
            }
          }
        })
      } else if (to.path === '/home/content') {
        store.commit('CHANGEBREAD', [
          {
            path: '/home/content',
            name: '首页'
          }
        ])
        store.commit('CHANGEHOMEPAGE', true)
        _.get(routes, '[2].children', []).forEach(item => {
          if (item.path !== 'content') {
            _.set(item, 'meta.keepAlive', false)
          }
        })
        router.addRoutes(routes)
        next()
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
export default router
