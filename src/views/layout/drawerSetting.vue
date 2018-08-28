<template>
  <v-drawer :isCollapse="settingVisible" placement="right" @change="close">
    <div class="drawer-setting-wrapper">
      <a-icon type="close-circle" @click="close" />
      <a-divider orientation="left">布局风格</a-divider>
      <a-radio-group @change="onChangeTheme" v-model="menuTheme">
        <a-radio :style="radioStyle" value="light">流式布局</a-radio>
        <a-radio :style="radioStyle" value="dark">固定布局</a-radio>
      </a-radio-group>

      <a-divider orientation="left">菜单颜色</a-divider>
      <a-radio-group @change="onChangeTheme" v-model="menuTheme">
        <a-radio :style="radioStyle" value="light">白色</a-radio>
        <a-radio :style="radioStyle" value="dark">黑色</a-radio>
      </a-radio-group>
      <a-divider orientation="left">导航颜色</a-divider>
       <a-radio-group @change="onChangeHeaderThemee" v-model="headerTheme">
        <a-radio :style="radioStyle" value="light">白色</a-radio>
        <a-radio :style="radioStyle" value="dark">黑色</a-radio>
      </a-radio-group>
      <a-divider orientation="left">菜单模式</a-divider>
       <a-radio-group @change="onChangeMode" v-model="menuTheme">
        <a-radio :style="radioStyle" value="light">面包屑模式</a-radio>
        <a-radio :style="radioStyle" value="dark">标签页模式</a-radio>
      </a-radio-group>
      <a-switch defaultChecked @change='onChangeMode' />
      <a-divider orientation="left">面包屑模式</a-divider>
      <a-divider orientation="left">标签页模式</a-divider>
      <a-divider orientation="left">导航颜色</a-divider>
    </div>
  </v-drawer>
</template>
<script>
export default {
  data() {
    return {
      radioStyle: {
        height: '30px',
        width: '100px',
        lineHeight: '30px'
      }
    }
  },
  computed: {
    settingVisible() {
      return this.$store.state.sys.settingVisible
    },
    menuTheme() {
      return this.$store.state.sys.menuTheme
    },
    headerTheme() {
      return this.$store.state.sys.headerTheme
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
    },
    onChangeHeaderThemee() {
      this.$store.commit('HEADER_THEME')
    }
  },
  mounted() {}
}
</script>
<style>
.drawer-setting-wrapper {
  padding: 20px;
  width: 266px;
  background: #fff;
}
</style>
