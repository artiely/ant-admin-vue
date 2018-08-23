<template>
  <a-layout-sider collapsible :trigger="null" :collapsedWidth="collapsedWidth" v-model="isCollapse" width="256px">
    <div class="logo">
      <img :src="require('../../assets/logo.svg')" alt="logo">
      <h1 v-if="!isCollapse">Ant Design Pro</h1>
    </div>
    <a-menu theme="dark" mode="inline" @click="handleMenu" v-model="key">
      <template v-for="(item,index) in menu">
        <a-sub-menu :key="index" v-if="item.children">
          <span slot="title">
            <a-icon :type="item.icon" />
            <span>{{item.title}}</span>
          </span>
          <a-menu-item :key="sub.path" v-for="sub in item.children">
            <a-icon :type="sub.icon" />{{sub.title}}</a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="item.path">
          <a-icon :type="item.icon" />
          <span>{{item.title}}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  props: {
    collapsedWidth: {
      type: Number,
      default: 80
    }
  },
  data() {
    return {
      collapsed: false,
      key: []
    }
  },
  computed: {
    menu() {
      return this.$store.state.sys.menu
    },
    userInfo() {
      return this.$store.state.sys.userInfo
    },
    isCollapse: {
      get: function() {
        return this.$store.state.sys.isCollapse
      },
      set: function() {}
    }
  },
  methods: {
    handleMenu(item, key) {
      this.$router.push(item.key)
    },
    logout() {
      Cookies.remove('access_token')
      this.$router.replace('/login')
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
        _this.outputSize()
        EventUtil.addHandler(window, 'resize', function() {
          _this.outputSize()
        })
      },
      outputSize: function() {
        var result1 = window.matchMedia('(min-width:1200px)')
        var result2 = window.matchMedia('(min-width:992px)')
        var result3 = window.matchMedia('(min-width:768px)')
        if (result1.matches) {
          console.log('>=1200 大型设备 大台式电脑')
          self.$store.commit('IS_COLLAPSE', false)
          self.$store.commit('IS_MOBILE', false)
        } else if (result2.matches) {
          console.log('992=< <=1200 中型设备 台式电脑')
          self.$store.commit('IS_MOBILE', false)
        } else if (result3.matches) {
          console.log('768<= <=992 小型设备 平板电脑')
          self.$store.commit('IS_COLLAPSE', true)
          self.$store.commit('IS_MOBILE', true)
        } else {
          console.log('<=768 超小设备 手机')
          self.$store.commit('IS_MOBILE', true)
          self.$store.commit('IS_COLLAPSE', true)
        }
      }
    }
    mediaQuery.init()
  }
}
</script>

<style lang="less">
#components-layout-demo-custom-trigger .ant-layout-sider {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  position: relative;
  z-index: 10;
  background: #001529;
  &.drawer-layout-sider{
    height:100%
  }
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  // height: 100%;
}

#components-layout-demo-custom-trigger {
  .header-action {
    font-size: 18px;
    line-height: 64px;
    padding: 0 15px;
    cursor: pointer;
    transition: color 0.3s;
    height: 100%;
    &:hover,
    &:focus {
      color: #1890ff;
      background: #e6f7ff;
    }
  }
}
.logo {
  padding: 16px;
  height: 64px;
  background: #002140;
  text-align: center;
  overflow: hidden;
  img {
    display: inline-block;
    vertical-align: middle;
    height: 32px;
  }
  h1 {
    display: inline-block;
    vertical-align: middle;
    color: #fff;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
  }
}
</style>
