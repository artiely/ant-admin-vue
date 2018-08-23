<template>
  <v-drawer v-if="isMobile" :isCollapse="isCollapse" @change="onDrawerChange">
    <sider :collapsedWidth="0" :class="{'drawer-layout-sider':isMobile}"/>
  </v-drawer>
  <sider v-else/>
</template>

<script>
import sider from './sider'
export default {
  components: {
    sider
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
    isMobile() {
      return this.$store.state.sys.isMobile
    }
  },
  methods: {
    onDrawerChange(val) {
      this.$store.commit('IS_COLLAPSE', val)
    }
  }
}
</script>

<style>
</style>
