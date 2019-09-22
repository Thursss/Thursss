<template>
  <div class="tab">
    <ul class="tab-ul">
      <router-link tag="li" to="/recommend">
        <a href="javascript:;">推荐</a>
      </router-link>
      <router-link tag="li" to="/singer">
        <a href="javascript:;">歌手</a>
      </router-link>
      <!-- <router-link tag="li" to="/top">
        <a href="javascript:;">排行</a>
      </router-link>
      <router-link tag="li" to="/search">
        <a href="javascript:;">搜索</a>
      </router-link> -->
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
@import "../../common/less/variable.less";
.tab-ul {
  display: flex;
  justify-content: space-around;
  text-align: center;
  width: 100%;
  height: 44px;
  line-height: 44px;
  li {
    flex: 1;
    display: block;
    a {
      position: relative;
      display: block;
      width: 100%;
      &::after {
        content: " ";
        position: absolute;
        bottom: 6px;
        left: 0;
        right: 0;
        margin: auto;
        display: block;
        width: 35px;
        border-top: 2px solid @Tomato_color;
        transition: 0.4s;
        transform: scaleX(0)
      }
    }
    &.router-link-exact-active {
      a {
        color: @Tomato_color;
        &::after {
          transform: scaleX(1);
        }
      }
    }
  }
}
</style>