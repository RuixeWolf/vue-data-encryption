import request from '@/utils/request'
import { getAesSignatureByRecord } from '@/utils/aes'

/**
 * 用户注册 API
 * @param {{
 *  userName: string;
 *  password: string;
 *  clientAesKey: string;
 *  nickName?: string;
 *  avatar?: string;
 *  email?: string;
 *  phone?: string;
 * }} registerData - 用户注册数据
 * + clientAesKey 使用 RSA 加密
 * + password 使用 AES 加密
 * @returns {Promise<Record<string, unknown>>} 注册响应
 */
export function register (registerData) {
  return request({
    method: 'POST',
    url: '/v1/user/register',
    headers: {
      Signature: getAesSignatureByRecord(registerData)
    },
    data: registerData
  })
}

/**
 * 用户登录 API
 * @param {{
 *  user: string;
 *  password: string;
 *  clientAesKey: string;
 * }} loginData - 用户登录数据
 * + clientAesKey 使用 RSA 加密
 * + password 使用 AES 加密
 * @returns {Promise<Record<string, unknown>>} 登录响应
 */
export function login (loginData) {
  return request({
    method: 'POST',
    url: '/v1/user/login',
    headers: {
      Signature: getAesSignatureByRecord(loginData)
    },
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
    url: '/v1/user/logout'
  })
}

/**
 * 获取用户信息 API
 * @returns {Promise<Record<string, unknown>>} 用户信息响应
 */
export function getInfo () {
  return request({
    method: 'GET',
    url: '/v1/user/info'
  })
}

/**
 * 修改用户信息 API
 * @param {{
 *  nickName?: string;
 *  avatar?: string;
 *  email?: string;
 *  hone?: string;
 * }} userInfo - 需要修改的用户信息
 * @returns {Promise<Record<string, unknown>>} 用户信息响应
 */
export function editInfo (userInfo) {
  return request({
    method: 'POST',
    url: '/v1/user/info',
    headers: {
      Signature: getAesSignatureByRecord(userInfo)
    },
    data: userInfo
  })
}

/**
 * 修改用户密码 API
 * @param {{ oldPassword: string; newPassword: string }} passwordData
 * - 旧密码与新密码（password 使用 AES 加密）
 * @returns {Promise<Record<string, unknown>>}
 */
export function modifyPassword (passwordData) {
  return request({
    method: 'POST',
    url: '/v1/user/modifypassword',
    headers: {
      Signature: getAesSignatureByRecord(passwordData)
    },
    data: passwordData
  })
}

/**
 * 用户账号注销 API
 * @param {{ password: string }} cancellationData
 * - 账号密码（password 使用 AES 加密）
 * @returns {Promise<Record<string, unknown>>}
 */
export function accountCancellation (cancellationData) {
  return request({
    method: 'POST',
    url: '/v1/user/cancellation',
    headers: {
      Signature: getAesSignatureByRecord(cancellationData)
    },
    data: cancellationData
  })
}
