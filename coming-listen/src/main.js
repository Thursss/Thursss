// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'

import 'common/less/base.less'
import 'common/less/reset.less'

Vue.config.productionTip = false
Vue.use(Vueaxios, axios)

Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./common/image/default.png'),
  loading: require('./common/image/default.png'),
  attempt: 1,
  throttleWait: 1000
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
