/**
 * 使数组滚动数位
 * @param {Array} arr
 * @param {Number} len
 * @returns {Array}
 */
function arrMove(arr, len) {
  const length = arr.length;
  if (!arr || length <= 0) return [];
  if (length === 1 || len <= 0) return arr;
  const realLen = len % length;
  const arrFront = arr.slice(0, length - realLen);
  const arrBehind = arr.slice(length - realLen, length);
  return [...arrBehind, ...arrFront];
}
