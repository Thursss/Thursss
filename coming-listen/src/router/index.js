import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Top from 'components/top/top'
import Singer from 'components/singer/singer'
import Search from 'components/search/search'
import singerDetails from "components/singer-details/singer-details"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/top',
      name: 'Top',
      component: Top
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children: [
        {
          path: '/singer/singerDetails',
          name: 'singerDetails',
          component: singerDetails
        }
      ]
    }
  ]
})
