<!--
 * @Description:
 * @Author: thurs
 * @Date: 2019-09-16 23:54:31
 * @LastEditTime: 2019-09-16 23:55:03
 * @LastEditors: thurs
 -->
<template>
  <div class="swiper-group">
    <ul v-if="data.length" class="swiper-ul">
      <li v-for="(item, index) in data" :key="index" @click="goSingerDetails(item)" class="swiper-li">
        <!-- <slot :item="item"></slot> -->
        <div class="img-group">
          <img v-lazy="item.singer_pic" :alt="item.singer_name" />
        </div>
        <p class="name" v-html="item.singer_name"></p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goSingerDetails(singerInfo) {
      this.$emit("getSingerInfo", singerInfo);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../common/less/variable.less";
.swiper-group {
  .swiper-li {
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-top: 20px;
  }
  .img-group {
    margin-right: 20px;
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
  }
  .name {
    font-size: @font_size_m;
    color: @desc_color;
  }
}
</style>