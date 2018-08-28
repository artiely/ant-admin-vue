<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <drawer-sider-menu></drawer-sider-menu>
    <a-layout>
      <a-header/>
      <a-content/>
      <a-layout-footer style="text-align: center">
        Ant Design ©2016 Created by Ant UED
      </a-layout-footer>
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
  }
}
</script>
<style lang="less">
.ant-layout {
  height: 100%;
}
</style>
