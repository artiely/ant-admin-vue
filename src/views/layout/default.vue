<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <drawer-sider-menu></drawer-sider-menu>
    <a-layout>
      <a-header/>
      <a-layout-content :style="{padding: '24px', minHeight: '100vh' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <drawer-setting></drawer-setting>
  </a-layout>
</template>
<script>
import header from './header'
import drawerSiderMenu from './drawerSiderMenu'
import drawerSetting from './drawerSetting'
export default {
  components: {
    'a-header': header,
    drawerSiderMenu,
    drawerSetting
  }
}
</script>
<style lang="less">
.ant-layout {
  height: 100%;
}
</style>
