import axios from 'axios'
import { getStorageItem } from '@/utils/webStorage'
import vueStore from '@/store'
import vueRouter from '@/router'

// 创建 Axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  // onFulfilled
  request => {
    // 添加请求 token
    const authToken = getStorageItem('authToken')
    if (authToken) {
      request.headers['Authorization'] = authToken
    }
    return request
  },

  // onRejected
  () => {
    console.error('XHR Error in Axios Request')
    return Promise.reject(new Error('请求失败，请检查网络连接'))
  }
)

// 响应拦截器
service.interceptors.response.use(
  // onFulfilled
  response => {
    // 返回响应数据
    const res = response.data
    return res
  },

  // onRejected
  error => {
    // ERR_INTERNET_DISCONNECTED
    if (!error.response) {
      console.error('XHR Error: Internet Disconnected')
      return Promise.reject(new Error('请求失败，请检查网络连接'))
    }

    // 获取 HTTP 状态
    const status = error.response.status
    const statusText = error.response.statusText

    // 处理服务器异常 HTTP 5XX
    if (/^5\d{2}$/.test(status)) {
      console.error(`XHR Error: ${statusText}`)
      return Promise.reject(new Error('无法处理请求，请稍后再试'))
    }

    // 获取响应数据与数据状态码（非 HTTP 状态码）
    const res = error.response.data
    const statusCode = res.statusCode

    // 处理 token 异常
    if ([10000, 10001, 10002, 10003].includes(statusCode)) {
      // Token 失效，清除登录信息并转至用户登录页面
      vueStore.commit('user/SET_LOGIN_STATUS', false)
      vueRouter.replace({ name: 'userLogin' })
      console.error('XHR Error:', res.message)
      return Promise.reject(new Error('登录信息失效，请重新登录'))
    }

    // Default case
    console.error('XHR Error in Axios Response')
    return Promise.reject(new Error('请求失败，请稍后再试'))
  }
)

export default service
