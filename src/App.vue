<template>
  <div id="app" :style="fixedMenuStyle">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    fixedMenu() {
      return this.$store.state.sys.menuFixed
    },
    fixedMenuStyle() {
      if (this.$store.state.sys.menuFixed) {
        return {
          height: '100%'
        }
      } else {
        return {
          height: 'auto'
        }
      }
    }
  }
}
</script>
