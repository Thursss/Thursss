<!--
 * @Description:
 * @Author: thurs
 * @Date: 2019-09-12 15:56:55
 * @LastEditTime: 2019-09-16 16:59:45
 * @LastEditors: thurs
 -->
<template>
  <div class="recommend-container">
    <swiper v-if="sliderArr.length" ref="mySwiper" :options="swiperOption">
      <swiper-slide v-for="(item,index) in sliderArr" :key="index">
        <a :href="item.jump_info.url" :title="item.title" :alt="item.title">
          <img :data-src="item.pic_info.url" class="swiper-lazy" :alt="item.title" />
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="recommend-list">
      <h2 class="re-title">热门歌单推荐</h2>
      <div class="list-group">
        <ul class="list-ul">
          <li class="list-li" v-for="(item, index) in discList" :key="index">
            <div class="img-group">
              <img v-lazy="item.imgurl" :alt="item.dissname" />
            </div>
            <div class="text-group">
              <h3 class="ellipse">{{ item.dissname }}</h3>
              <p class="ellipse">{{item.creator.name}}</p>
              <p class="ellipse listennum">播放量：{{ (item.listennum / 10000).toFixed(1)}}万</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="loading-group">
      <loading v-if="!discList.length">loading....</loading>
    </div>
  </div>
</template>
<script>
import { getRecommend, getDiscList, getAllData } from "api/netWork";
import { ERR_CODE } from "api/config";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import loading from "base/loading/loading";

import "swiper/dist/css/swiper.css";

export default {
  data() {
    return {
      swiperOption: {
        loop: true,
        notNextTick: true,
        observer: true,
        observeParents: true,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        lazy: {
          loadPrevNext: true
        }
      },
      sliderArr: [],
      discList: []
    };
  },
  created() {
    // this._getRecommend();
    this._getDiscList();
    this._getAllData();
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_CODE) {
          this.sliderArr = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList(10000000).then(res => {
        if (res.code === ERR_CODE) {
          this.discList = res.data.list;
        }
      });
    },
    _getAllData() {
      getAllData().then(res => {
        if (res.code === ERR_CODE) {
          this.sliderArr = res.focus.data.content;
        }
      });
    }
  },
  components: {
    swiper,
    swiperSlide,
    loading
  }
};
</script>
<style lang="less">
@import "../../common/less/variable";
.swiper-container {
  width: 100%;
  .swiper-slide {
    position: relative;
    width: 100%;
    img {
      width: 100%;
    }
  }
  .swiper-pagination {
    .swiper-pagination-bullet {
      opacity: 1;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: hsla(0, 0%, 100%, 0.5);
      transition: 0.4s;
    }
    .swiper-pagination-bullet-active {
      width: 20px;
      border-radius: 5px;
      background: hsla(0, 0%, 100%, 0.8);
    }
  }
}
.recommend-container {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
}
.recommend-list {
  h2 {
    width: 100%;
    height: 65px;
    line-height: 65px;
    text-align: center;
    font-size: @font_size_l;
    font-weight: bold;
    color: @Tomato_color;
  }
  .list-ul {
    .list-li {
      display: flex;
      padding: 0 20px 20px;
      .img-group {
        flex-shrink: 0;
        margin-right: 20px;
        width: 70px;
        height: 70px;
      }
      .text-group {
        flex-shrink: 1;
        & > * {
        }
        h3 {
          font-size: @font_size_m;
          line-height: 25px;
          font-weight: bold;
        }
        p {
          color: @desc_color;
          font-size: @font_size_s;
          line-height: 18px;
        }
      }
    }
  }
}
</style>
