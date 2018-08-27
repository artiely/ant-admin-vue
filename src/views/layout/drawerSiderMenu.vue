<template>
  <v-drawer v-if="isMobile" :isCollapse="isCollapse" @change="handleChange">
    <sider-menu :collapsedWidth="0"/>
  </v-drawer>
  <sider-menu v-else/>
</template>

<script>
import siderMenu from './siderMenu'
export default {
  components: {
    siderMenu
  },
  data() {
    return {
      collapsedWidth: 0
    }
  },
  computed: {
    isCollapse: {
      get: function() {
        return this.$store.state.sys.isCollapse
      },
      set: function() {}
    },
    menuMode() {
      return this.$store.state.sys.menuMode
    },
    isMobile() {
      return this.$store.state.sys.isMobile
    }
  },
  methods: {
    handleChange(val) {
      this.$store.commit('IS_COLLAPSE', val)
    }
  }
}
</script>

<style>
</style>
