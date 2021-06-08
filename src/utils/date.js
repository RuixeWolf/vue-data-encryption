/**
 * 日期处理
 */

/**
 * 日期格式化
 * @description Y：年、m：月、d：日、H：时、M：分、S：秒
 * @param {Date} [date = new Date()] - Date 对象
 * @param {string} [fmt = 'YYYY-mm-dd HH:MM:SS'] - 格式模板
 */
export function dateFormat (date = new Date(), fmt = 'YYYY-mm-dd HH:MM:SS') {
  const opt = {
    // 年
    'Y+': date.getFullYear().toString(),
    // 月
    'm+': (date.getMonth() + 1).toString(),
    // 日
    'd+': date.getDate().toString(),
    // 时
    'H+': date.getHours().toString(),
    // 分
    'M+': date.getMinutes().toString(),
    // 秒
    'S+': date.getSeconds().toString()
  }
  let ret
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}

/**
 * 获取某月第一天完整日期
 * @param {number | string} year - 目标年，默认为当前年
 * @param {number | string} month - 目标月，默认为当前月
 */
export function getFullFirstDate (year, month) {
  const currentDateObj = new Date()
  const targetYear = year || currentDateObj.getFullYear()
  const targetMonth = month - 1 || currentDateObj.getMonth()
  const targetDateObj = new Date(targetYear, targetMonth, 1)
  return dateFormat('YYYY-mm-dd', targetDateObj)
}

/**
 * 获取某月最后一天完整日期
 * @param {number | string} year - 目标年，默认为当前年
 * @param {number | string} month - 目标月，默认为当前月
 */
export function getFullLastDate (year, month) {
  const currentDateObj = new Date()
  const targetYear = year || currentDateObj.getFullYear()
  const targetMonth = month || currentDateObj.getMonth() + 1
  const targetDateObj = new Date(targetYear, targetMonth, 0)
  return dateFormat('YYYY-mm-dd', targetDateObj)
}

export default dateFormat
