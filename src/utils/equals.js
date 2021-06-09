/**
 * Compare the same records
 * @param {Record} record1 - Record 1
 * @param {Record} record2 - Record 2
 * @returns {boolean} - Compare result
 */
export function compareRecord (record1, record2) {
  if (record1 === record2) return true

  const keyList1 = Object.keys(record1)
  const keyList2 = Object.keys(record2)
  if (keyList1.length !== keyList2.length) return false

  for (const key of keyList1) {
    if (record1[key] !== record2[key]) return false
  }

  return true
}
