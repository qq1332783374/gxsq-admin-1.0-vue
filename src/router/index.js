import Vue from 'vue'
import Router from 'vue-router'

import login from 'components/login/login'
import home from 'components/home/home'
import index from 'components/home/pages/index/index'

// 教师
import teacher from 'components/teacher/teacher'

// 家长
import patriarch from 'components/patriarch/patriarch'

// 学生
import students from 'components/students/students'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      hidden: true,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/',
      name: 'home',
      component: home,
      redirect:'/index',
      hidden: true,
      children: [
        {
          path: 'index',
          name: '首页',
          component: index,
          meta: {
            title: '首页'
          }
        }
      ],
      meta: {
        title: '首页'
      }
    },
    {
      path: '/',
      name: '教师',
      component: home,
      icon: 'mdi mdi-lightbulb-on-outline',
      children: [
        {
          path: 'teacher',
          name: '老师查询',
          component: teacher,
          meta: {
            title: '老师查询'
          }
        }
      ],
      meta: {
        title: '教师'
      }
    },
    {
      path: '/',
      name: '家长',
      component: home,
      icon: 'mdi mdi-home-outline',
      children: [
        {
          path: 'patriarch',
          name: '家长查询',
          component: patriarch,
          meta: {
            title: '家长查询'
          }
        }
      ],
      meta: {
        title: '家长'
      }
    },
    {
      path: '/',
      name: '学生',
      component: home,
      icon: 'mdi mdi-account-outline',
      children: [
        {
          path: 'students',
          name: '查看学生信息',
          component: students,
          meta: {
            title: '查看学生信息'
          }
        }
      ],
      meta: {
        title: '学生'
      }
    }
  ]
})
