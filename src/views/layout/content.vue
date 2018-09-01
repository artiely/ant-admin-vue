<template>
  <a-layout-content :style="fixedMenuStyle">
    <a-tabs v-if="navTabs.length>0 && isTabMode" class="header-tabs" :activeKey="activeTab" defaultActiveKey="1" tabPosition="top" size="small" :tabBarGutter="10" :animated="false" :tabBarStyle="{'background':'#f8f8f8','margin':'0'}">
      <a-tab-pane :key="item.path" v-for="item in navTabs">
        <span slot="tab" class="header-tab">
          <span @click="change(item.path)">{{item.meta.title}}</span>
          <a-icon type="close" style="position:relative;margin-right:-10px;margin-left:6px;width:14px;height:14px;display:inline-block" @click="removeTab(item)" />
        </span>
        <!-- <div style="padding:10px 20px;" v-if="item.type === 'iframe'" :style="{'height':documentBodyClientHeight+'px'}">
          <iframe id="external-frame" :src="item.iframeUrl" width="100%" height="100%" frameborder="0" scrolling="yes">
          </iframe>
        </div> -->
      </a-tab-pane>
      <div style="height:35px;width:35px;text-align:center;background:#f0f0f0;cursor:pointer" slot="tabBarExtraContent">
        <a-dropdown>
          <a class="ant-dropdown-link" href="#">
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item @click.native="closeCurrTag">
              <a href="javascript:;">关闭当前标签页</a>
            </a-menu-item>
            <a-menu-item @click.native="closeOtherTag">
              <a href="javascript:;">关闭其他标签页</a>
            </a-menu-item>
            <a-menu-item @click.native="closeAllTag">
              <a href="javascript:;">关闭全部标签页</a>
            </a-menu-item>
            <a-menu-item @click.native="refreshCurrTag">
              <a href="javascript:;">刷新当前标签页</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </a-tabs>
    <div style="padding:5px 20px;" v-if="!activeTabObj.type" :style="fixedStyle">
      <a-breadcrumb style="margin:0 0 10px 0" v-if="breadcrumbMode">
        <a-breadcrumb-item v-for="item in $route.matched" :key="item.path">
          <span v-if="item.name=='Home'">
            <a-icon type="home" /> 首页
          </span>
          <a-icon :type="item.meta.icon" v-else/>
          <span>
            {{item.meta.title}}
          </span>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <router-view>
      </router-view>
      <a-layout-footer style="text-align: center">
        Ant Design ©2016 Created by Ant UED
      </a-layout-footer>
    </div>

  </a-layout-content>
</template>

<script>
export default {
  data() {
    return {
      iframeHeight: 600
    }
  },
  computed: {
    fixedStyle() {
      if (this.$store.state.sys.layoutFixed) {
        return {
          height: this.documentBodyClientHeight + 'px',
          'overflow-y': 'scroll'
        }
      } else {
        return { height: 'auto' }
      }
    },
    fixedMenuStyle() {
      if (this.$store.state.sys.fixedMenu) {
        return {
          height: this.documentBodyClientHeight + 'px',
          padding: 0
        }
      } else {
        return {
          padding: 0,
          'min-height': this.documentBodyClientHeight + 37 + 'px'
        }
      }
    },
    navTabs() {
      return this.$store.state.sys.navTabs
    },
    layoutFixed() {
      return this.$store.state.sys.layoutFixed
    },
    documentClientHeight: {
      get() {
        return this.$store.state.sys.documentClientHeight
      },
      set() {}
    },
    documentBodyClientHeight: {
      get() {
        return this.$store.state.sys.documentBodyClientHeight
      },
      set() {}
    },
    breadcrumbMode() {
      return this.$store.state.sys.breadcrumbMode
    },
    activeTab() {
      return this.$store.state.sys.activeTab
    },
    isTabMode() {
      return this.$store.state.sys.isTabMode
    },
    activeTabObj() {
      return this.$store.getters.activeTabObj
    }
  },
  watch: {
    activeTab: {
      handler(val) {
        this.$router.push(val)
      }
    }
  },
  methods: {
    setIframeHeight(iframe) {
      if (iframe) {
        var iframeWin =
          iframe.contentWindow || iframe.contentDocument.parentWindow
        if (iframeWin.document.body) {
          iframe.height =
            iframeWin.document.documentElement.scrollHeight ||
            iframeWin.document.body.scrollHeight
        }
      }
    },
    change(val) {
      this.$store.commit('ACTIVE_TAB', val)
    },
    removeTab(val) {
      this.$store.commit('REMOVE_TAB', val)
    },
    closeCurrTag() {
      this.$store.commit('CLOSE_CURR_TAG')
    },
    closeOtherTag() {
      this.$store.commit('CLOSE_OTHER_TAG')
    },
    closeAllTag() {
      this.$store.commit('CLOSE_ALL_TAG')
    },
    refreshCurrTag() {
      // 创建临时变量保存当前的activeTag 然后删除当前 再添加临时变量
      this.$store.commit('SET_CURR_TAG')
      this.$nextTick(() => {
        this.$store.commit('REFRESH_CURR_TAG')
      })
    }
  },
  created() {
    this.iframeHeight = document.body.clientHeight
    console.log(this.iframeHeight)
    window.onresize = function() {
      this.iframeHeight = document.body.clientHeight
      console.log(this.iframeHeight)
    }
  }
}
</script>

<style lang="less">
.header-tabs {
  .ant-tabs-nav .ant-tabs-tab-active {
    background: #f0f0f0 !important;
  }
}
.header-tab {
  position: relative;
  .anticon {
    &:hover {
      background: #ddd !important;
    }
  }
}
</style>
