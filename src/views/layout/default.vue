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
      // this.documentClientHeight = document.documentElement['clientHeight']
      this.$store.commit(
        'UPDATE_CLICENT_HEIGHT',
        document.documentElement['clientHeight'] - 64 - 37
      )
      window.onresize = () => {
        this.$store.commit(
          'UPDATE_CLICENT_HEIGHT',
          document.documentElement['clientHeight'] - 64 - 37
        )
      }
    },
    resetDocumentBodyClientHeight() {
      // this.documentClientHeight = document.documentElement['clientHeight']
      this.$store.commit(
        'UPDATE_BODY_CLICENT_HEIGHT',
        document.body['clientHeight'] - 64 - 37
      )
      window.onresize = () => {
        this.$store.commit(
          'UPDATE_BODY_CLICENT_HEIGHT',
          document.body['clientHeight'] - 64 - 37
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
