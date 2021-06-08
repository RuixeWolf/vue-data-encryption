import request from '@/utils/request'

/**
 * 用户注册 API
 * @param {{ userName: string; password: string; nickName?: string; avatar?: string; email?: string; phone?: string; }} registerData
 * - 用户注册数据（密码使用 RSA 加密）
 * @returns {Promise<Record<string, unknown>>} 注册响应
 */
export function register (registerData) {
  return request({
    method: 'POST',
    url: '/user/register',
    data: registerData
  })
}

/**
 * 用户登录 API
 * @param {{ user: string; password: string; }} loginData
 * - 用户登录数据（密码使用 RSA 加密）
 * @returns {Promise<Record<string, unknown>>} 登录响应
 */
export function login (loginData) {
  return request({
    method: 'POST',
    url: '/user/login',
    data: loginData
  })
}

/**
 * 用户退出登录 API
 * @returns {Promise<Record<string, unknown>>} 退出登录响应
 */
export function logout () {
  return request({
    method: 'GET',
    url: '/user/logout'
  })
}

/**
 * 获取用户信息 API
 * @returns {Promise<Record<string, unknown>>} 用户信息响应
 */
export function getInfo () {
  return request({
    method: 'GET',
    url: '/user/info'
  })
}

/**
 * 修改用户信息 API
 * @param {{ nickName?: string; avatar?: string; email?: string; phone?: string; }} userInfo
 * - 需要修改的用户信息
 * @returns {Promise<Record<string, unknown>>} 用户信息响应
 */
export function editInfo (userInfo) {
  return request({
    method: 'POST',
    url: '/user/info',
    data: userInfo
  })
}

/**
 * 修改用户密码 API
 * @param {{ oldPassword: string; newPassword: string }} passwordData
 * - 旧密码与新密码（密码使用 RSA 加密）
 * @returns {Promise<Record<string, unknown>>}
 */
export function modifyPassword (passwordData) {
  return request({
    method: 'POST',
    url: '/user/modifypassword',
    data: passwordData
  })
}

/**
 * 用户账号注销 API
 * @param {{ password: string }} cancellationData
 * - 账号密码（密码使用 RSA 加密）
 * @returns {Promise<Record<string, unknown>>}
 */
export function accountCancellation (cancellationData) {
  return request({
    method: 'POST',
    url: '/user/cancellation',
    data: cancellationData
  })
}
