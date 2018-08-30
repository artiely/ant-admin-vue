import * as types from '../mutation-types'
// import {
//   asyncRouterMap
// } from '@/router/index'
import Cookies from 'js-cookie'

// initial state
const state = {
  layout: '固定布局',
  isCollapse: false, // 菜单状态是否收起
  settingVisible: true, // 设置
  menu: null, // 菜单
  role: null, // 角色权限
  lang: 'zh', // 语言
  userInfo: null,
  navTabs: [], // 标签栏
  activeTab: '',
  tempObj: {},
  // activeTabObj: {},
  menuMode: 'inline', // 菜单模式
  menuTheme: 'light', // 菜单主题
  headerTheme: 'light', // header主题
  isMobile: false // 是否小屏
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param role
 * @param route
 */
// function hasPermission(role, route) {
//   if (route.meta && route.meta.role) {
//     return route.meta.role.indexOf(role) !== -1
//   } else {
//     return true
//   }
// }
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param role
 */
// function filterAsyncRouter(asyncRouterMap, role) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(role, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, role)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

// getters
const getters = {
  activeTabObj: state => {
    const findIndex = element => {
      return element.path === state.activeTab
    }
    let index = state.navTabs.findIndex(findIndex)
    if (index !== -1 && state.navTabs.length !== 0) {
      return state.navTabs[index]
    }
    return {}
  }
}

// mutations
const mutations = {
  /*
  当前菜单收展状态
  */
  [types.IS_COLLAPSE](state, payload) {
    state.isCollapse = payload || !state.isCollapse
  },
  /*
  菜单模式
  */
  [types.MENU_MODE](state, payload) {
    state.menuMode = state.menuMode === 'vertical' ? 'inline' : 'vertical'
  },
  /*
  菜单模式
  */
  [types.NAV_TABS](state, payload) {
    state.activeTab = payload.path
    const findIndex = element => {
      return element.path === payload.path
    }
    let index = state.navTabs.findIndex(findIndex)
    if (index === -1) {
      state.navTabs.push(payload)
    }
  },
  [types.ACTIVE_TAB](state, payload) {
    state.activeTab = payload
  },
  [types.SET_CURR_TAG](state, payload) {
    // 保存临时变量
    const findIndex = element => {
      return element.path === state.activeTab
    }
    let index = state.navTabs.findIndex(findIndex)
    if (index !== -1 && state.navTabs.length !== 0) {
      state.tempObj = state.navTabs[index]
      state.navTabs.splice(index, 1)
      if (state.navTabs.length === 0) {
        state.activeTab = '/dashboard/analysis'
      } else {
        state.activeTab = state.navTabs[state.navTabs.length - 1].path
      }
    }
  },
  [types.CLOSE_OTHER_TAG](state, payload) {
    // 关闭其他标签
    state.navTabs = state.navTabs.filter(v => {
      return v.path === state.activeTab
    })
  },
  [types.CLOSE_ALL_TAG](state, payload) {
    // 关闭所有标签
    state.navTabs = []
  },
  [types.REFRESH_CURR_TAG](state, payload) {
    state.navTabs.push(state.tempObj)
    state.activeTab = state.tempObj.path
  },
  [types.CLOSE_CURR_TAG](state, payload) {
    // 关闭当前标签
    const findIndex = element => {
      return element.path === state.activeTab
    }
    let index = state.navTabs.findIndex(findIndex)
    if (index !== -1) {
      state.navTabs.splice(index, 1)
      if (state.navTabs.length === 0) {
        state.activeTab = '/dashboard/analysis'
      } else {
        state.activeTab = state.navTabs[state.navTabs.length - 1].path
      }
      // state.activeTabObj = state.navTabs[index]
    }
  },
  [types.REMOVE_TAB](state, payload) {
    const findIndex = element => {
      return element.path === payload.path
    }
    let index = state.navTabs.findIndex(findIndex)
    if (index !== -1) {
      state.navTabs.splice(index, 1)
      if (state.navTabs.length === 0) {
        state.activeTab = '/dashboard/analysis'
      } else {
        state.activeTab = state.navTabs[state.navTabs.length - 1].path
      }
    }
  },
  /*
  header主题
  */
  [types.HEADER_THEME](state, payload) {
    state.headerTheme = state.headerTheme === 'dark' ? 'light' : 'dark'
  },
  /*
   菜单主题
   */
  [types.MENU_THEME](state, payload) {
    state.menuTheme = state.menuTheme === 'dark' ? 'light' : 'dark'
  },
  /*
  设置收展状态
  */
  [types.SETTING_VISIBLE](state, payload) {
    state.settingVisible = payload || !state.settingVisible
  },
  /*
  当前是否小屏
  */
  [types.IS_MOBILE](state, payload) {
    state.isMobile = payload
    // console.log('是否小屏', state.isMobile)
  },
  /*
  布局
  */
  [types.LAYOUT](state, payload) {
    state.layout = payload
    Cookies.set('layout', payload)
  },
  /*
  当前菜单(主要是注销时清空)
  */
  [types.SET_MENU](state, payload) {
    state.menu = payload
  },
  /*
  通过角色过滤出可展示的菜单
  如果是管理直接赋值
  否则过滤出符合角色的对应菜单
  目前每个用户只存在一种角色 如果业务不是如此需要修改**
  */
  [types.FILTER_ROLE](state, payload) {
    state.role = payload
    // state.menu = filterAsyncRouter(asyncRouterMap, payload)
  },
  // 设置语言
  [types.SET_LANG](state, payload) {
    state.lang = payload
    window.localStorage.setItem('lang', payload)
  },
  // 登陆者信息
  [types.USER_INFO](state, payload) {
    state.userInfo = payload
  }
}

// actions
const actions = {}

export default {
  state,
  getters,
  actions,
  mutations
}
