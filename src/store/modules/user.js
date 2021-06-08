import * as userApi from '@/apis/user'
import { getStorageItem, setStorageItem, removeStorageItem } from '@/utils/webStorage'

// Init state data
const logged = getStorageItem('logged')

/**
 * 用户 Vuex module
 * @type {import('vuex').Module}
 */
const userModule = {
  namespaced: true,

  state: {
    // 用户登录状态
    logged: logged || false

  },

  mutations: {
    // 设置用户登录状态
    SET_LOGIN_STATUS: (state, loginStatus) => {
      if (loginStatus) {
        // 已登录
        setStorageItem('logged', true)
      } else {
        // 已登出
        removeStorageItem('authToken')
        removeStorageItem('logged')
      }
      state.logged = loginStatus
    }

  },

  actions: {
    // 用户登录
    login ({ commit }, loginData) {
      return new Promise((resolve, reject) => {
        userApi.login(loginData).then(res => {
          if (res.success) {
            // 登录成功，保存请求 token
            setStorageItem('authToken', res.data.authToken)
            commit('SET_LOGIN_STATUS', true)
            resolve(res.message || '登录成功')
          } else {
            // 登录失败
            reject(res.message || '登录失败')
          }
        }).catch(err => {
          // 请求失败
          reject(err || '请求失败')
        })
      })
    },

    // 用户退出登录
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        userApi.logout().then(res => {
          if (res.success) {
            // 退出登录成功
            commit('SET_LOGIN_STATUS', false)
            resolve(res.message || '已退出登录')
          } else {
            reject(res.message || '退出登录失败')
          }
        }).catch(err => {
          reject(err || '请求失败')
        })
      })
    }

  }
}

export default userModule
