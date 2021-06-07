import JSEncrypt from 'jsencrypt'
import { getPubKey } from '@/apis/key'

/**
 * RSA 加密
 * @param {string} str - 需要加密的字符串
 * @returns {Promise<string>} 加密结果（Base64 编码）
 */
export async function rsaEncrypt (str) {
  let pubKey

  // 获取 RSA 公钥
  try {
    const pubKeyRes = await getPubKey()
    if (!pubKeyRes.success) {
      return Promise.reject('RSA 公钥获取失败')
    }
    pubKey = pubKeyRes.data.pubKey
  } catch (error) {
    return Promise.reject(error)
  }

  // 加密数据
  const crypt = new JSEncrypt({})
  crypt.setPublicKey(pubKey)
  const encryptRes = crypt.encrypt(str)
  if (!encryptRes) {
    return Promise.reject('数据加密失败')
  }
  return encryptRes
}
