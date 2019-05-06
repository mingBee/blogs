import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '@/components/TodoList'
import Login from '@/components/Login'
import ArticleEdit from '@/components/articleEdit'
import ArticleDetail from '@/components/articleDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Login',
      component:Login
    },
    {
      path:'/todoList',
      name:'todoList',
      component:TodoList
    },
    {
      path:'/markEdit',
      name:'markEdit',
      component:ArticleEdit
    },
    {
      path:'/markDetail',
      name:'markDetail',
      component:ArticleDetail
    }
  ]
})
