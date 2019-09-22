import oJSONP from 'jsonp'
/**
 * [jsonp jsonp请求]
 * @param {string} url 请求地址
 * @param {object} data 请求数据
 * @param {function} option jsonp函数
 */
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  return new Promise((resolve, reject) => {
    oJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}
/**
 * [param 拼接请求数据]
 * @param {object} data 数据
 * @return {string} url 请求字符串
 */
function param(data) {
  let url = '';
  for (const k in data) {
    let value = data[k] || '';
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1) : '';
}