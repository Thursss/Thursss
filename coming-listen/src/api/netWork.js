/*
 * @Description:
 * @Author: thurs
 * @Date: 2019-09-13 17:33:35
 * @LastEditTime: 2019-09-13 17:33:35
 * @LastEditors: thurs
 */
import { apis, commonParams, option } from 'api/config';
import jsonp from 'common/js/jsonp'
import axios from 'axios'
/**
 * [getRecommend 获取轮播图]
 */
export function getRecommend() {
  let url = apis.recommend;
  let data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  });
  return jsonp(url, data, option);
}
/**
 * [getDiscList 获取歌单列表]
 * @param {number:28} categoryId [歌单id]
 */
export function getDiscList(categoryId = 28) {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: categoryId,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 * @description: [getSingList 获取歌手列表]
 * @param : {number} {-100} area [地区]
 * @param : {number} {-100} sex [性别]
 * @param : {number} {-100} genre [类型]
 * @param : {number} {-100} index [字母序号]
 * @return: {type} name [desc]
 */
export function getSingerList({ area = -100, sex = -100, genre = -100, index = -100 } = {}) {
  let url = apis.singerList;
  let data = Object.assign({}, commonParams, {
    '-': 'getUCGI2724135271681156',
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0,
    data: { "comm": { "ct": 24, "cv": 0 }, "singerList": { "module": "Music.SingerListServer", "method": "get_singer_list", "param": { "area": area, "sex": sex, "genre": genre, "index": index, "sin": 0, "cur_page": 1 } } }
  });

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data);
  })
}
export function getSingerSongList(id) {
  let url = apis.singerSingList;
  let data = Object.assign({}, commonParams, {
    '-': 'getUCGI05770517354052007',
    platform: 'yqq.json',
    needNewCode: 0,
    uin: 0,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    data: { "comm": { "ct": 24, "cv": 0 }, "singer": { "method": "get_singer_detail_info", "param": { "sort": 5, "singermid": id, "sin": 0, "num": 10 }, "module": "music.web_singer_info_svr" } }
  });
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data);
  })
}
/**
 * [getAllData 获取所有数据]
 */
export function getAllData() {
  let url = '/api/getAllData';
  let data = Object.assign({}, commonParams, {
    '-': 'recom2890924246317135',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0,
    data: { "comm": { "ct": 24 }, "category": { "method": "get_hot_category", "param": { "qq": "" }, "module": "music.web_category_svr" }, "recomPlaylist": { "method": "get_hot_recommend", "param": { "async": 1, "cmd": 2 }, "module": "playlist.HotRecommendServer" }, "playlist": { "method": "get_playlist_by_category", "param": { "id": 8, "curPage": 1, "size": 40, "order": 5, "titleid": 8 }, "module": "playlist.PlayListPlazaServer" }, "new_song": { "module": "newsong.NewSongServer", "method": "get_new_song_info", "param": { "type": 5 } }, "new_album": { "module": "newalbum.NewAlbumServer", "method": "get_new_album_info", "param": { "area": 1, "sin": 0, "num": 10 } }, "new_album_tag": { "module": "newalbum.NewAlbumServer", "method": "get_new_album_area", "param": {} }, "toplist": { "module": "musicToplist.ToplistInfoServer", "method": "GetAll", "param": {} }, "focus": { "module": "QQMusic.MusichallServer", "method": "GetFocus", "param": {} } }
  });
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data);
  })
}