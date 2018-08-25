<template>
  <v-drawer :isCollapse="settingVisible" placement="right">
    <div class="drawer-setting-wrapper">
      <a-icon type="close-circle" @click="close" />
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
    }
  },
  mounted() {}
}
</script>
<style>
.drawer-setting-wrapper {
  width: 200px;
  background: #fff;
}
</style>
