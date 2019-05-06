// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from './axios/index'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$http=Axios;
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.config.productionTip = false

router.beforeEach((to, from, next)=>{
  let token=sessionStorage.getItem('token');
  if(to.path==='/'){
    if(token && token!=='null'){
      next('/todoList');
    }
    next()
  }else {
    if(token && token!=='null'){
      next()
    }else {
      next('/');
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
