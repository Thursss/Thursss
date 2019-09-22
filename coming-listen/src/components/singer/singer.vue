<!--
 * @Description:
 * @Author: thurs
 * @Date: 2019-09-12 15:56:43
 * @LastEditTime: 2019-09-16 23:53:03
 * @LastEditors: thurs
 -->
<template>
  <div class="singer">
    <div class="screen-group">
      <transition name="drop">
        <div class="screen" v-show="isScreen">
          <ul
            class="screen-ul"
            v-for="(tag, tagName, index1) in singerTags"
            :key="index1"
            :tag="tagName"
          >
            <li
              class="screen-li"
              :class="{'on' : singerScreen[tagName]===item.id}"
              v-for="(item,index2) in tag"
              :key="index2"
              :id="item.id"
            >
              <a
                href="javasctipt:;"
                @click="changTag(tagName,item.id)"
                :alt="item.name"
              >{{item.name}}</a>
            </li>
          </ul>
        </div>
      </transition>
      <div class="drop">
        <a href="javascript:;" @click="showScreen">
          <i class="icon iconfont" :class="isScreen?'iconshanla1 ':'iconxiala1'"></i>
        </a>
      </div>
    </div>
    <list-view :data="singerList" @getSingerInfo="getSingerInfo"></list-view>
    <div class="loading-group">
      <loading v-if="!singerList.length"></loading>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { getSingerList } from "api/netWork";
import { ERR_CODE } from "api/config";
import loading from "base/loading/loading";
import listView from "base/listview/listview";
import singerDetails from "components/singer-details/singer-details";

export default {
  data() {
    return {
      singerList: [],
      singerTags: {},
      singerScreen: { area: -100, genre: 3, index: -100, sex: -100 },
      isScreen: false
    };
  },
  created() {
    this._getSingerList(this.singerScreen);
  },
  methods: {
    _getSingerList(tags) {
      getSingerList(tags).then(res => {
        if (res.code === ERR_CODE) {
          this.singerList = res.singerList.data.singerlist;
          this.singerTags = res.singerList.data.tags;
        }
      });
    },
    getSingerInfo(singerInfo) {
      this.$router.push({
        path: "/singer/singerDetails",
        query: {
          singerInfo: singerInfo
        }
      });
    },
    changTag(tagName, value) {
      this.singerScreen[tagName] = value;
      this._getSingerList(this.singerScreen);
      this.isScreen = false;
    },
    showScreen() {
      this.isScreen = !this.isScreen;
    }
  },
  watch: {
    singerScreen: function() {
      console.log(this.singerScreen);
    }
  },
  components: {
    loading,
    listView,
    singerDetails
  }
};
</script>
<style lang="less">
@import "../../common/less/variable.less";
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  padding-top: 40px;
  overflow-y: auto;
  .screen-group {
    position: fixed;
    top: 88px;
    left: 0;
    z-index: 9;
    width: 100%;
    background-color: rgb(0, 255, 255);
    overflow: hidden;
    .screen {
      padding-top: 10px;
      .screen-ul {
        .screen-li {
          display: inline-block;
          margin-bottom: 4px;
          padding: 3px 10px;
          &.on {
            border-radius: 10px;
            background-color: @po_color;
            a {
              color: #fff;
            }
          }
        }
      }
    }
    .drop-enter-active,
    .drop-leave-active {
      transition: 0.5s;
    }
    .drop-enter,
    .drop-leave-to {
      transform: translateY(-100px);
      height: 0;
      opacity: 0;
    }
    .drop {
      text-align: center;
      a {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 2;
        padding-bottom: 5px;
      }
      .icon {
        color: #00f;
        font-size: 22px;
      }
    }
  }
  .loading-group {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>