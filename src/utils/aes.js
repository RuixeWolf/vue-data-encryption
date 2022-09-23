import AES from 'crypto-js/aes'
import SHA256 from 'crypto-js/sha256'
import encHex from 'crypto-js/enc-hex'
import { getStorageItem, setStorageItem } from '@/utils/webStorage'

// 随机生成密钥所包含的字符
const RANDOM_CHAR_LIST =
'abcdefghijklmnopqrstuvwxyz' +
'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
'0123456789'

/**
 * 获取客户端 AES 密钥
 * @description 从 localStorage 获取 AES 密钥，如没有则生成新密钥
 * @returns {string} AES 密钥
 */
export function getClientAesKey () {
  // 从本地获取
  let key = getStorageItem('clientAesKey') || ''
  if (key) return key

  // 本地无密钥，生成 16 位新密钥并保存
  while (key.length < 16) {
    const randomIndex = Math.floor(Math.random() * RANDOM_CHAR_LIST.length)
    key += RANDOM_CHAR_LIST[randomIndex]
  }
  setStorageItem('clientAesKey', key)
  return key
}

/**
 * 包含时间戳的 AES 加密方法
 * @description 将数据与时间戳一起加密，防止中间人攻击时保存密文伪造请求。
 * 默认的加密原文格式：[数据]@#@#@[时间戳]
 * @param {string} originalData - 要加密的数据
 * @param {string} [delimiter = '@#@#@'] - 数据与时间戳的分隔符
 * @returns {string} 加密结果
 */
export function aesEncryptWithTimestamp (originalData, delimiter = '@#@#@') {
  const timestamp = Date.now().toString()
  return AES.encrypt(originalData + delimiter + timestamp, getClientAesKey()).toString()
}

/**
 * 通过 Record 获取 AES 签名
 * @description 签名算法：将请求数据 key 按照 a-z 排序，
 * 拼接所有数据字段为一个字符串，对字符串进行 SHA256 摘要，
 * 使用 AES 加密 SHA256 摘要
 * @param {Record<string, unknown>} data - 需要签名的数据
 * @returns {string} 数据签名
 */
export function getAesSignatureByRecord (data) {
  let dataStr = ''
  Object.keys(data).sort().forEach(key => {
    dataStr += data[key]
  })
  const hashStr = SHA256(dataStr).toString(encHex)
  return AES.encrypt(hashStr, getClientAesKey()).toString()
}
