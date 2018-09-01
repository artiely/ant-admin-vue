<template>
  <v-drawer :isCollapse="settingVisible" placement="right" @change="close">
    <div class="drawer-setting-wrapper">
      <a-icon type="close-circle" style="font-size:30px;color:#666;cursor:pointer" @click="close" />
      <a-divider orientation="left">布局风格</a-divider>
      <v-cell title="顶部导航主题" mode="switch" v-model="headerTheme" left-icon-symbol="icon-daohang"></v-cell>
      <v-cell title="菜单主题" mode="switch" v-model="menuTheme" left-icon-symbol="icon-caidan"></v-cell>
      <v-cell title="标签页模式" mode="switch" v-model="isTabMode" left-icon-symbol="icon-biaoqian1"></v-cell>
      <v-cell title="面包屑模式" mode="switch" v-model="breadcrumbMode" left-icon-symbol="icon-bread"></v-cell>
      <v-cell title="固定布局模式" mode="switch" v-model="layoutFixed" left-icon-symbol="icon-yemiantoubu"></v-cell>
      <v-cell title="固定菜单模式" mode="switch" v-if="!layoutFixed" v-model="menuFixed" left-icon-symbol="icon-caidanfenlei"></v-cell>
      <v-icon name="icon-qingchugeshi"></v-icon>
      <v-icon name="icon-daohang" symbol></v-icon>
      <!-- <v-cell title="内联菜单模式" mode="switch" v-model="menuMode"></v-cell> -->
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
    menuFixed: {
      get() {
        return this.$store.state.sys.menuFixed
      },
      set(val) {
        this.$store.commit('MENU_FIXED', val)
      }
    },
    menuTheme: {
      get() {
        return this.$store.state.sys.menuTheme === 'light'
      },
      set(val) {
        this.$store.commit('MENU_THEME', val)
      }
    },
    headerTheme: {
      get() {
        return this.$store.state.sys.headerTheme === 'light'
      },
      set(val) {
        this.$store.commit('HEADER_THEME', val)
      }
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
