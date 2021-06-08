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
    // 添加请求 Token
    const authToken = getStorageItem('authToken')
    if (authToken) {
      request.headers['Authorization'] = authToken
    }
    return request
  },

  // onRejected
  error => {
    console.error('Error in Axios request.')
    console.error(error)
    return Promise.reject('请求失败，请检查网络连接')
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
    // 获取状态码
    const statusCode = error.response.data.statusCode

    // 处理 token 异常
    if ([10000, 10001, 10002, 10003].includes(statusCode)) {
      // Token 失效，清除登录信息并转至用户登录页面
      vueStore.commit('user/SET_LOGIN_STATUS', false)
      vueRouter.replace({ name: 'userLogin' })
      console.error(error.response.data.message)
      return Promise.reject('登录信息失效，请重新登录')
    }

    console.error('Error in Axios response.')
    return Promise.reject('请求失败，请检查网络连接')
  }
)

export default service
