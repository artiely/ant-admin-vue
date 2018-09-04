<template>
  <a-layout id="components-layout-demo-custom-trigger" :class="{'layout-fixed':layoutFixed}">
    <drawer-sider-menu></drawer-sider-menu>
    <a-layout>
      <a-header/>
      <a-content/>
    </a-layout>
    <drawer-setting></drawer-setting>
  </a-layout>
</template>
<script>
import header from './header'
import content from './content'
import drawerSiderMenu from './drawerSiderMenu'
import drawerSetting from './drawerSetting'
let navTabsHeight = 37
let headerHeight = 64
export default {
  components: {
    'a-header': header,
    'a-content': content,
    drawerSiderMenu,
    drawerSetting
  },
  computed: {
    documentClientHeight: {
      get() {
        return this.$store.state.sys.documentClientHeight
      },
      set(val) {
        this.$store.commit('UPDATE_CLICENT_HEIGHT', val)
      }
    },
    layoutFixed() {
      return this.$store.state.sys.layoutFixed
    }
  },
  methods: {
    // 重置窗口可视高度
    resetDocumentClientHeight() {
      this.$store.commit(
        'UPDATE_CLICENT_HEIGHT',
        document.documentElement['clientHeight'] - headerHeight - navTabsHeight
      )
      window.onresize = () => {
        this.$store.commit(
          'UPDATE_CLICENT_HEIGHT',
          document.documentElement['clientHeight'] - headerHeight - navTabsHeight
        )
      }
    },
    resetDocumentBodyClientHeight() {
      this.$store.commit(
        'UPDATE_BODY_CLICENT_HEIGHT',
        document.body['clientHeight'] - headerHeight - navTabsHeight
      )
      window.onresize = () => {
        this.$store.commit(
          'UPDATE_BODY_CLICENT_HEIGHT',
          document.body['clientHeight'] - headerHeight - navTabsHeight
        )
      }
    }
  },
  mounted() {
    this.resetDocumentClientHeight()
    this.resetDocumentBodyClientHeight()
  }
}
</script>
<style lang="less">
.ant-layout {
  height: 100%;
}
#components-layout-demo-custom-trigger {
  &.layout-fixed {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
  }
}
</style>
