import Vue from 'vue'
import Router from 'vue-router'
// import Cookies from 'js-cookie'
import Login from '@/views/auth/Login'
import E404 from '@/views/auth/E404'
import Home from '@/views/layout/default'
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
    path: '/index',
    name: 'index',
    component: lazyLoading('views/index'),
    meta: {
      auth: true,
      title: '商户管理'
    }
  },
  {
    path: '/box_list',
    name: 'box_list',
    component: lazyLoading('views/box_list'),
    meta: {
      auth: true,
      title: '机柜管理'
    }
  },
  {
    path: '/charge_list',
    name: 'charge_list',
    component: lazyLoading('views/charge_list'),
    meta: {
      auth: true,
      title: '充电宝管理'
    }
  },
  {
    path: '/boxtype_list',
    name: 'boxtype_list',
    component: lazyLoading('views/boxtype_list'),
    meta: {
      auth: true,
      title: '机柜类型'
    }
  },
  {
    path: '/order_list',
    name: 'order_list',
    component: lazyLoading('views/order_list'),
    meta: {
      auth: true,
      title: '机柜类型'
    }
  },
  {
    path: '/member_list',
    name: 'member_list',
    component: lazyLoading('views/member_list'),
    meta: {
      auth: true
    }
  },
  {
    path: '/depositlog_list',
    name: 'depositlog_list',
    component: lazyLoading('views/depositlog_list'),
    meta: {
      auth: true
    }
  },
  {
    path: '/setting_list',
    name: 'setting_list',
    component: lazyLoading('views/setting_list'),
    meta: {
      auth: true
    }
  },
  {
    path: '/*',
    name: '404',
    component: E404,
    meta: {
      title: '页面找不到',
      hidden: true
    }
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
    redirect: '/index',
    children: [...asyncRouterMap]
  }
]

const MENU = [
  {
    title: '商户管理',
    icon: 'shop',
    path: '/store_list'
  },
  {
    title: '设备管理',
    icon: 'appstore-o',
    children: [
      {
        title: '机柜管理',
        path: '/box_list',
        icon: 'database'
      },
      {
        title: '充电宝管理',
        path: '/charge_list',
        icon: 'hdd'
      }
    ]
  },
  {
    title: '机柜类型',
    path: '/boxtype_list',
    icon: 'layout'
  },
  {
    title: '订单列表',
    path: '/order_list',
    icon: 'profile'
  },
  {
    title: '押金列表',
    path: '/depositlog_list',
    icon: 'red-envelope'
  },
  {
    title: '用户列表',
    path: '/member_list',
    icon: 'team'
  },
  {
    title: '系统设置',
    path: '/setting_list',
    icon: 'setting'
  }
]

store.commit('SET_MENU', MENU)
const router = new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [...constantRouterMap, ...asyncRouterMap]
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