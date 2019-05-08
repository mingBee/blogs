import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Login',
      component:(resolve)=>require(['../components/Login.vue'],resolve)
    },
    {
      path:'/todoList',
      name:'todoList',
      component:(resolve)=>require(['../components/TodoList.vue'],resolve)
    },
    {
      path:'/markEdit',
      name:'markEdit',
      component:(resolve)=>require(['../components/ArticleEdit.vue'],resolve)
    },
    {
      path:'/markDetail',
      name:'markDetail',
      component:(resolve)=>require(['../components/articleDetail.vue'],resolve)
    }
  ]
})
