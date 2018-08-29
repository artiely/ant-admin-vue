<template>
  <a-layout-content :style="{padding: '0', minHeight: '100vh' }">
    <a-tabs v-if="navTabs.length>0" class="header-tabs" :activeKey="activeTab" defaultActiveKey="1" tabPosition="top" size="small" :tabBarGutter="10" :animated="false" :tabBarStyle="{'background':'#f8f8f8'}">
      <a-tab-pane :key="item.path" v-for="item in navTabs">
        <span slot="tab" class="header-tab">
          <span @click="change(item.path)">{{item.meta.title}}</span>
          <a-icon type="close" style="position:relative;margin-right:-10px;margin-left:6px" @click="removeTab(item)" />
        </span>
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
    <div style="padding:10px 20px">
      <router-view>
      </router-view>
    </div>
  </a-layout-content>
</template>

<script>
export default {
  computed: {
    navTabs() {
      return this.$store.state.sys.navTabs
    },
    activeTab() {
      return this.$store.state.sys.activeTab
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
      this.$store.commit('CLOSE_CURR_TAG')
      // let tempActive = this.activeTab
      // this.closeCurrTag()
      this.$nextTick(() => {
        this.$store.commit('REFRESH_CURR_TAG')
      })
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
