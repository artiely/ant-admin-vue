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
      <v-cell title="标签页模式" mode="switch" v-model="isTabMode"></v-cell>
      <v-cell title="是否固定布局" mode="switch" v-model="layoutFixed"></v-cell>
      <v-cell title="内联菜单模式" mode="switch" v-model="menuMode"></v-cell>
      <v-cell title="面包屑模式" mode="switch" v-model="breadcrumbMode"></v-cell>
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
      },
      tabMode: true
    }
  },
  computed: {
    settingVisible() {
      return this.$store.state.sys.settingVisible
    },
    layoutFixed: {
      get() {
        return this.$store.state.sys.layoutFixed
      },
      set(val) {
        this.$store.commit('LAYOUT_FIXED', val)
      }
    },
    menuTheme() {
      return this.$store.state.sys.menuTheme
    },
    menuMode: {
      get() {
        return this.$store.state.sys.menuMode === 'inline'
      },
      set(val) {
        this.$store.commit('MENU_MODE', val)
      }
    },
    breadcrumbMode: {
      get() {
        return this.$store.state.sys.breadcrumbMode
      },
      set(val) {
        this.$store.commit('BREADCRUMB', val)
      }
    },
    headerTheme() {
      return this.$store.state.sys.headerTheme
    },
    isTabMode: {
      get() {
        return this.$store.state.sys.isTabMode
      },
      set(val) {
        this.$store.commit('TAB_MODE', val)
      }
    }
  },
  methods: {
    close() {
      this.$store.commit('SETTING_VISIBLE')
    },
    onChangeTheme() {
      this.$store.commit('MENU_THEME')
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
