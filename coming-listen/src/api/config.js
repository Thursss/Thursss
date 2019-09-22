/*
 * @Description:
 * @Author: thurs
 * @Date: 2019-09-12 21:45:32
 * @LastEditTime: 2019-09-12 21:45:32
 * @LastEditors: thurs
 */
const apis = {
  recommend: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
  discList: '/api/getDiscList',
  allData: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
  singerList: '/api/getSingerList',
  singerSingList: '/api/getSingerSingList'
}
const commonParams = {
  g_tk: 5381,
  format: 'jsonp',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0
}
const option = {
  param: 'jsonpCallback'
}
const ERR_CODE = 0;
export { apis, commonParams, option, ERR_CODE }