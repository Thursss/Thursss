<template>
  <div class="singer-details-group">
    <i @click="goBlack" class="exit iconfont iconjiantou"></i>
    <div class="singer-details">
      <div class="mod_data">
        <div class="text-group">
          <h2 class="singer-name" v-html="singerDetails.name"></h2>
          <p class="desc ellipselist" v-html="singerDetails.brief"></p>
        </div>
        <div class="img-group">
          <img :src="singerDetails.pic" :alt="singerDetails.name" />
        </div>
      </div>
      <div class="song-group">
        <ul class="song-ul">
          <li v-for="(song, index) in songList" :key="index" class="song-li">
            <div class="img-group">
              <img v-lazy="song.pic" :alt="song.name" />
            </div>
            <div class="text-group ellipse">
              <h3 class="name ellipse" v-html="song.name"></h3>
              <p class="desc ellipse">{{song.singer+' · '+song.album}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getSingerSongList } from "api/netWork";
import { createdSong } from "common/js/songList";
import { ERR_CODE } from "api/config";
export default {
  data() {
    return {
      singerDetails: {},
      songList: []
    };
  },
  created() {
    this._getSingerSongList(this.id);
  },
  methods: {
    _getSingerSongList(id) {
      this.id = this.$route.query.singerInfo.singer_mid;
      getSingerSongList(id).then(res => {
        if (res.code === ERR_CODE) {
          this.singerDetails = {
            id: res.singer.data.singer_info.mid,
            name: res.singer.data.singer_info.name,
            pic: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${res.singer.data.singer_info.mid}.jpg?max_age=2592000`,
            fans: res.singer.data.singer_info.fans,
            brief: res.singer.data.singer_brief
          };
          let songlist = res.singer.data.songlist;
          let songs = [];
          for (const song of songlist) {
            songs.push(createdSong(song));
          }
          this.songList = songs;
          console.log(this.songList);
        }
      });
    },
    goBlack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../common/less/variable.less";
.singer-details-group {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: @bg_color;
  overflow-y: auto;
}
.exit {
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 99;
  color: @Tomato_color;
  font-size: 18px;
}
.singer-details {
  .mod_data {
    position: relative;
    .img-group {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      background-color: #222;
      overflow: hidden;
      img {
        width: 100%;
        opacity: 0.6;
      }
    }
    .text-group {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      text-align: center;
      .singer-name {
        color: #fff;
        height: 50px;
        line-height: 50px;
        letter-spacing: 2px;
        font-weight: bold;
      }
      .desc {
        margin: 30px 40px 0;
        color: #fff;
        line-height: 1.8;
        overflow-y: auto;
        line-clamp: 7;
        -webkit-line-clamp: 7;
      }
    }
  }
}
.song-group {
  padding-bottom: 50px;
  .song-ul {
    width: 100%;
    padding: 0 25px;
  }
  .song-li {
    width: 100%;
    display: flex;
    margin-top: 20px;
    height: 50px;
    overflow: hidden;
    .img-group {
      flex-shrink: 0;
      margin-right: 15px;
      width: 50px;
      height: 50px;
    }
    .text-group {
      flex-shrink: 1;
      .name {
        letter-spacing: 3px;
        font-size: 18px;
        font-weight: bold;
        color: rgb(0, 0, 0);
      }
      .desc{
        font-size:@font_size_m;
      }
    }
  }
}
</style>