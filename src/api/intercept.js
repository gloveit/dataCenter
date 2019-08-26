import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import { Notification } from 'ant-design-vue'
import Router from 'vue-router'
Vue.prototype.notification = Notification
Vue.use(Router)
// axios拦截器的请求设置
axios.interceptors.request.use(
  config => {
    // 这里的config包含每次请求的内容
    // 判断localStorage中是否存在api_token
    if (localStorage.getItem('api_token')) {
      //  存在将api_token写入 request header
      config.headers.apiToken = `${localStorage.getItem('api_token')}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// axios拦截器的响应设置
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)

// 检查http状态码返回是否正常
function checkStatus (response) {
  // 如果http状态码正常，则直接返回数据
  if (
    response &&
    (response.status === 200 ||
      response.status === 304 ||
      response.status === 400)
  ) {
    return response
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    Notification.error({
      message: 'error',
      description: res.msg
    })
  }
  if (res.data && res.data.status === 'error') {
    // alert(res.data.error_msg)
    if (
      res.data.msg &&
      res.data.msg === '未登陆!' &&
      window.localStorage.getItem('token')
    ) {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('routerList')
      Notification.error({
        message: 'error',
        description: '登陆失效，2s后跳转至登陆界面'
      })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else if (window.localStorage.getItem('token')) {
      Notification.error({
        message: 'error',
        description: res.data.msg
      })
    }
  }
  return res.data
}
// 请求方式的配置
export default {
  post (url, data) {
    // post
    return axios({
      method: 'post',
      baseURL: '/serve',
      url,
      // data: JSON.stringify(data),
      data: qs.stringify(data),
      timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  post1 (url, data) {
    return axios({
      method: 'post',
      baseURL: '/serve',
      url,
      // data: JSON.stringify(data),
      data: JSON.stringify(data),
      timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'content-type': 'application/json; charset=utf-8'
      }
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  get (url, params) {
    // get
    return axios({
      method: 'get',
      baseURL: '/serve',
      url,
      params, // get 请求时带的参数
      timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  }
}
