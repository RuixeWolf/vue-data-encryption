import request from '@/utils/request'

/**
 * 获取 RSA 公钥
 * @returns {Promise<Record<string, unknown>>} RSA 公钥响应
 */
export function getPubKey () {
  return request({
    method: 'GET',
    url: '/v1/key/pubkey'
  })
}
