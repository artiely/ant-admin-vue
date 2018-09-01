<template>
  <div class="v-cell">
    <div class="v-cell--icon" v-if="leftIcon||leftIconSymbol">
      <v-icon :name="leftIcon?leftIcon:leftIconSymbol" :symbol="leftIconSymbol?true:false" style="font-size:18px;margin-right:4px;"></v-icon>
    </div>
    <div class="v-cell--title">
      {{title}}
    </div>
    <div class="v-cell--value">
      <a-switch size="small" :defaultChecked="value" @change="handleSwitch" v-if="mode=='switch'" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    leftIcon: String,
    leftIconSymbol: String,
    mode: {
      type: String,
      default: 'value'
    },
    value: [String, Number, Boolean, Object]
  },
  methods: {
    handleSwitch(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang="less">
.v-cell {
  height: 40px;
  line-height: 40px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  &--title {
    flex: 1;
    font-size: 14px;
    color: #333;
  }
  &--value {
    // flex: 1;
    text-align: right;
  }
}
</style>
