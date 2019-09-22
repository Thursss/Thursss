<template>
  <header class="header">
    <div class="appname center child-inlineblock">
      <i class="icon"></i>
      <h1>{{name}}</h1>
    </div>
    <div class="me">
      <a href="javascript:;">
        <!-- <i class="icon iconfont icongeren"></i> -->
      </a>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      name: "coming-listen"
    };
  }
};
</script>
<style lang="less" scoped>
@import "../../common/less/variable.less";
@import "../../common/less/icon.less";
.header {
  position: relative;
  width: 100%;
  height: 44px;
  line-height: 44px;
  color: @Tomato_color;
  font-size: @font_size_m;
  .appname {
    height: 44px;
    .icon {
      width: 44px;
      height: 44px;
      padding: 0 3px;
      background: url(../../common/image/default.png) center no-repeat;
      background-size: 80%;
    }
    h1 {
      height: 44px;
      line-height: 44px;
      font-size: 14px;
    }
  }
  .me {
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    width: 44px;
    height: 44px;
    line-height: 44px;
    .icon {
      font-size: 22px;
      color: @po_color;
    }
  }
}
</style>