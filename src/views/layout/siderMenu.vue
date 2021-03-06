<template>
  <a-layout-sider collapsible :trigger="null" :collapsedWidth="collapsedWidth" v-model="isCollapse" width="256px" :class="{'drawer-layout-sider':isMobile, 'drawer-layout-light':menuTheme==='light'}">
    <div class="logo">
      <img :src="require('../../assets/logo.svg')" alt="logo">
      <h1 v-if="!collapsed">Ant Design Pro</h1>
    </div>
    <a-menu @click="handleMenu" v-model="activeTab" :defaultSelectedKeys="defaultPath" :mode="menuMode" :theme="menuTheme" :openKeys="openKeys" @openChange="onOpenChange">
      <template v-for="item in menu">
        <a-sub-menu :key="item.path" v-if="item.children" :obj="item">
          <span slot="title">
            <a-icon :type="item.meta.icon" v-if="item.meta.icon" />
            <span>{{item.meta.title}}</span>
          </span>
          <a-menu-item :key="sub.path" v-for="sub in item.children" :obj="sub">
            <a-icon :type="sub.meta.icon" v-if="sub.meta.icon" /> {{sub.meta.title}}
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="item.path" :obj="item">
          <a-icon :type="item.icon" />
          <span>{{item.meta.title}}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'sider-menu',
  props: {
    collapsedWidth: {
      type: Number,
      default: 80
    }
  },
  data() {
    return {
      collapsed: false,
      defaultPath: [],
      openKeys: [],
      rootSubmenuKeys: []
    }
  },
  computed: {
    menu() {
      return this.$store.state.sys.menu
    },
    menuMode() {
      return this.$store.state.sys.menuMode
    },
    menuTheme() {
      return this.$store.state.sys.menuTheme
    },
    userInfo() {
      return this.$store.state.sys.userInfo
    },
    isMobile() {
      return this.$store.state.sys.isMobile
    },
    activeTab: {
      get: function() {
        return [this.$store.state.sys.activeTab]
      },
      set: function() {}
    },
    isCollapse: {
      get: function() {
        return this.$store.state.sys.isCollapse
      },
      set: function() {}
    }
  },
  watch: {
    $route: {
      handler() {
        if (this.isCollapse) {
          this.openKeys = []
        } else {
          this.openKeys = ['/' + this.$route.path.split('/')[1]]
        }
      }
    },
    isCollapse: {
      handler(val) {
        if (val) {
          this.openKeys = []
        } else {
          this.openKeys = ['/' + this.$route.path.split('/')[1]]
        }
      },
      immediate: true
    }
  },
  methods: {
    handleMenu(item, key) {
      this.$router.push(item.key)
      this.$store.commit('NAV_TABS', item.item.$attrs.obj)
    },
    logout() {
      Cookies.remove('access_token')
      this.$router.replace('/login')
    },
    onOpenChange(openKeys) {
      this.openKeys = openKeys
    }
  },
  mounted() {
    let self = this
    var EventUtil = {
      addHandler: function(element, type, handler) {
        if (element.addEventListener) {
          element.addEventListener(type, handler, false)
        } else if (element.attachEvent) {
          element.attachEvent('on' + type, handler)
        } else {
          element['on' + type] = handler
        }
      }
    }
    var mediaQuery = {
      init: function() {
        var _this = this
        var timer = null
        _this.outputSize()
        EventUtil.addHandler(window, 'resize', function() {
          clearTimeout(timer)
          timer = setTimeout(() => {
            _this.outputSize()
          }, 400)
        })
      },
      outputSize: function() {
        var result1 = window.matchMedia('(min-width:1200px)')
        var result2 = window.matchMedia('(min-width:992px)')
        var result3 = window.matchMedia('(min-width:768px)')
        if (result1.matches) {
          // console.log('>=1200 大型设备 大台式电脑')
          self.$store.commit('IS_COLLAPSE', false)
          self.$store.commit('IS_MOBILE', false)
        } else if (result2.matches) {
          // console.log('992=< <=1200 中型设备 台式电脑')
          self.$store.commit('IS_MOBILE', false)
          self.$store.commit('IS_COLLAPSE', false)
        } else if (result3.matches) {
          // console.log('768<= <=992 小型设备 平板电脑')
          self.$store.commit('IS_COLLAPSE', true)
          self.$store.commit('IS_MOBILE', true)
        } else {
          // console.log('<=768 超小设备 手机')
          self.$store.commit('IS_MOBILE', true)
          self.$store.commit('IS_COLLAPSE', true)
        }
      }
    }
    mediaQuery.init()
    //
    this.defaultPath = [this.$route.path]
    this.key = [this.$route.path]
    this.openKeys = ['/' + this.$route.path.split('/')[1]]
  }
}
</script>

<style lang="less">
#components-layout-demo-custom-trigger .ant-layout-sider {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  position: relative;
  z-index: 10;
  background: #001529;
  transition: all 0.3s;
  &.drawer-layout-sider {
    height: 100%;
  }
  &.drawer-layout-light {
    background: #fff;
    transition: all 0.3s;
    .logo {
      background: #fff;
      h1 {
        color: #001529;
      }
    }
  }
}
.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: none !important;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.logo {
  height: 64px;
  position: relative;
  line-height: 64px;
  padding-left: 24px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  background: #002140;
  overflow: hidden;
  h1 {
    color: #fff;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
  }
  img {
    width: 32px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
