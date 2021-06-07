import axios from 'axios'
// import { ElMessage } from 'element-plus'
import { getStorageItem } from '@/utils/webStorage'

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
    const res = response.data

    // TODO: 处理 token 异常

    return res
  },

  // onRejected
  error => {
    console.error('Error in Axios response.')
    console.error(error)
    return Promise.reject('请求失败，请检查网络连接')
  }
)

export default service
