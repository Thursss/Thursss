<template>
  <div id="app">
    <v-header></v-header>
    <v-tab></v-tab>
    <router-view />
  </div>
</template>

<script>
import Header from "components/header/header";
import Tab from "components/tab/tab";
export default {
  name: "App",
  components: {
    "v-header": Header,
    "v-tab": Tab
  }
};
</script>

<style lang="less">
@import "common/less/reset.less";
@import "common/less/variable.less";
#app {
  background-color: @bg_color;
}
</style>
