import Vue from 'vue'
import Router from 'vue-router'
// import Cookies from 'js-cookie'
import Login from '@/views/auth/Login'
import E404 from '@/views/auth/E404'
import Home from '@/views/layout/default'
import RouterView from '@/views/layout/routerView'
import store from '@/store'
import NProgress from 'nprogress'
// import {notification} from 'ant-design-vue'

Vue.use(Router)

function lazyLoading(path) {
  return () => {
    // clearTimeout(timer)
    // let toast = Toast.loading({
    //   duration: 0, // 持续展示 toast
    //   forbidClick: true, // 禁用背景点击
    //   message: '跳转中...'
    // })
    // timer = setTimeout(() => {
    //   if (toast) {
    //     toast = notification.warning({
    //       message: '网络不太稳定...'
    //     })
    //   }
    // }, 10000)
    return import(`@/${path}`).then(component => {
      return component
    }).catch(() => {
      console.error('获取页面失败')
      window.location.reload()
    }).finally(() => {
      // notification.close(toast)
      // toast = null
    })
  }
}
export const asyncRouterMap = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: RouterView,
    meta: {
      auth: true,
      title: 'dashboard',
      icon: 'ant-design',
      visible: true
    },
    children: [
      {
        path: '/dashboard/workplace',
        name: '',
        component: lazyLoading('views/dashboard/workplace'),
        meta: {
          auth: true,
          title: '工作台',
          icon: 'laptop'
        }
      },
      {
        path: '/dashboard/analysis',
        name: '',
        component: lazyLoading('views/dashboard/analysis'),
        meta: {
          auth: true,
          title: '分析页',
          icon: 'line-chart'
        }
      }
    ]
  },
  {
    path: '/form',
    name: 'form',
    component: RouterView,
    meta: {
      auth: true,
      title: '表单页',
      icon: 'form'
    },
    children: [
      {
        path: '/form/basic',
        name: 'basic',
        component: lazyLoading('views/dashboard/analysis'),
        meta: {
          auth: true,
          title: '表单页'
        }
      },
      {
        path: '/form/step',
        name: 'step',
        component: lazyLoading('views/dashboard/analysis'),
        meta: {
          auth: true,
          title: '分步表单'
        }
      },
      {
        path: '/form/advanced',
        name: 'advanced',
        component: lazyLoading('views/dashboard/analysis'),
        meta: {
          auth: true,
          title: '高级表单'
        }
      }
    ]
  }
]

let constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'index',
    children: asyncRouterMap
  },
  {
    path: '/*',
    name: 'Home',
    component: Home,
    redirect: '/404',
    children: [
      {
        path: '/404',
        name: '404',
        component: E404,
        meta: {
          title: '页面找不到',
          hidden: true
        }
      }
    ]
  }
]

store.commit('SET_MENU', asyncRouterMap)
const router = new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [...constantRouterMap]
})

// 处理登录
router.beforeEach((to, from, next) => {
  NProgress.start()
  // if (to.meta.auth) {
  //   // 登录验证 有token就一定有角色
  //   let token = Cookies.get('access_token')
  //   if (token) {
  //     next({
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     })
  //   } else {
  //     next({
  //       path: '/login',
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     })
  //   }
  // } else {
  next()
  // }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
export default router
