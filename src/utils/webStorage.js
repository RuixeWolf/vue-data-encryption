/**
 * Set storage item
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
 * Get storage item
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
 * Remove storage item
 * @param {string} key - Data key
 */
export function removeStorageItem (key) {
  localStorage.removeItem(key)
}

/**
 * Clear all storage items
 */
export function clearStorage () {
  localStorage.clear()
}
