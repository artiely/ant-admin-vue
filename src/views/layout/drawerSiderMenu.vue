<template>
  <v-drawer v-if="isMobile" :isCollapse="isCollapse">
    <sider-menu :collapsedWidth="0" :class="{'drawer-layout-sider':isMobile}"/>
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
    isMobile() {
      return this.$store.state.sys.isMobile
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
