import jsonp from 'common/js/jsonp'
import { apis, commonParams, option } from 'api/config'
export function getRecommend() {
  let url = apis.recommend;
  let data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  });
  return jsonp(url, data, option);
}