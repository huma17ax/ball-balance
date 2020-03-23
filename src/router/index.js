import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Title from '@/components/Title'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Title',
      component: Title
    },
    {
      path: '/game',
      name: 'Main',
      component: Main
    }
  ]
})
