<template>
  <v-drawer :isCollapse="settingVisible" placement="right" @change="close">
    <div class="drawer-setting-wrapper">
      <a-icon type="close-circle" @click="close" />
        <a-divider orientation="left">布局风格</a-divider>
        流式布局
        固定布局
        <a-divider orientation="left">菜单颜色</a-divider>
        <a-switch  defaultChecked @change='onChangeTheme'/>
         <a-divider orientation="left">菜单模式</a-divider>
        <a-switch  defaultChecked @change='onChangeMode'/>
    </div>
  </v-drawer>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  },
  computed: {
    settingVisible() {
      return this.$store.state.sys.settingVisible
    }
  },
  methods: {
    close() {
      this.$store.commit('SETTING_VISIBLE')
    },
    onChangeTheme() {
      this.$store.commit('MENU_THEME')
    },
    onChangeMode() {
      this.$store.commit('MENU_MODE')
    }
  },
  mounted() {}
}
</script>
<style>
.drawer-setting-wrapper {
  padding:20px;
  width: 250px;
  background: #fff;
}
</style>
