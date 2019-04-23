// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


// vuex
import store from './store/index'

// el-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// api
import {server} from 'api/api'
// 添加 server 接口
Vue.prototype.$server = server

// 组件网站标题
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


/**
 * 路由拦截
 */
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('admin');
  }
  let user = JSON.parse(sessionStorage.getItem('admin'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
