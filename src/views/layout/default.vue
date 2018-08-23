<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <sider-menu></sider-menu>
    <a-layout>
      <a-header/>
      <a-layout-content :style="{padding: '24px', minHeight: '100vh' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import sider from './sider'
import header from './header'
import siderMenu from './siderMenu'
export default {
  components: {
    sider,
    'a-header': header,
    siderMenu
  }
}
</script>
<style lang="less">
.ant-layout {
  height: 100%;
}
</style>
