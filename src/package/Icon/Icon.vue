<template>
  <span class="cb-icon--wrapper">
    <i class="icon iconfont" :class="name" :style="'font-size:'+size+'px;color:'+color"></i>
    <slot></slot>
  </span>
</template>
<script>
export default {
  name: 'icon',
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: [Number, String]
    },
    color: {
      type: String
    }
  }
}
</script>
<style lang="less">
.cb-icon--wrapper {
  display: inline-block;
  font-size: 16px;
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
