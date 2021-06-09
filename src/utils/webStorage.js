/**
 * Set local storage item
 * @param {string} key - Data key
 * @param {string | number | bigint | boolean | symbol | undefined | Record<string, unknown>} value - Data value
 */
export function setStorageItem (key, value) {
  // Get data type
  const type = typeof value

  // Handle string data
  if (type === 'string') {
    localStorage.setItem(key, value)
    return
  }

  // Handle other data types
  if (type !== 'function') {
    const dataObj = { type, value }
    localStorage.setItem(key, JSON.stringify(dataObj))
  }
}

/**
 * Get local storage item
 * @param {string} key - Data key
 * @returns {string | number | bigint | boolean | symbol | undefined | Record<string, unknown> | null} Data value
 */
export function getStorageItem (key) {
  const dataStr = localStorage.getItem(key)
  if (!dataStr) return null
  let dataObj
  try {
    dataObj = JSON.parse(dataStr)
  } catch (error) {
    // Return string data
    return dataStr
  }
  return dataObj.value
}

/**
 * Remove local storage item
 * @param {string} key - Data key
 */
export function removeStorageItem (key) {
  localStorage.removeItem(key)
}

/**
 * Clear all local storage items
 */
export function clearStorage () {
  localStorage.clear()
}

/**
 * Set session storage item
 * @param {string} key - Data key
 * @param {string | number | bigint | boolean | symbol | undefined | Record<string, unknown>} value - Data value
 */
export function setSessionItem (key, value) {
  // Get data type
  const type = typeof value

  // Handle string data
  if (type === 'string') {
    sessionStorage.setItem(key, value)
    return
  }

  // Handle other data types
  if (type !== 'function') {
    const dataObj = { type, value }
    sessionStorage.setItem(key, JSON.stringify(dataObj))
  }
}

/**
 * Get session storage item
 * @param {string} key - Data key
 * @returns {string | number | bigint | boolean | symbol | undefined | Record<string, unknown> | null} Data value
 */
export function getSessionItem (key) {
  const dataStr = sessionStorage.getItem(key)
  if (!dataStr) return null
  let dataObj
  try {
    dataObj = JSON.parse(dataStr)
  } catch (error) {
    // Return string data
    return dataStr
  }
  return dataObj.value
}

/**
 * Remove session storage item
 * @param {string} key - Data key
 */
export function removeSessionItem (key) {
  sessionStorage.removeItem(key)
}

/**
 * Clear all session storage items
 */
export function clearSession () {
  sessionStorage.clear()
}
