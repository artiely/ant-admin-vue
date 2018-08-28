<template>
  <a-layout-header class="layout-header" :class="{'layout-header-dark': headerTheme==='dark'}">
    <!-- trigger s -->
    <a-icon class="trigger" :type="isCollapse ? 'menu-unfold' : 'menu-fold'" @click="handleClick" />
    <!-- trigger e -->
    <!-- 设置s -->
    <a-icon type="setting" class="pull-right header-action hidden-xs-only" @click="handleSetting" />
    <!-- 设置e -->
    <!-- 个人中心s -->
    <span class="pull-right header-action">
      <a-dropdown style="height:64px;display:inline-block;">
        <a class="ant-dropdown-link">
          <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style="position:relative;top:10px" />
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item key="-1">
            <a-icon type="user" style="margin-right:4px" />Artiely
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="-2">
            <a-icon type="check-circle-o" style="margin-right:4px" />待办
          </a-menu-item>
          <a-menu-item key="-3">
            <a-icon type="calendar" style="margin-right:4px" />日程
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="1" disabled>
            <a-icon type="setting" style="margin-right:4px" />设置
          </a-menu-item>
          <a-menu-item key="2" disabled>
            <a-icon type="close-circle-o" style="margin-right:4px" />触发报错
          </a-menu-item>
          <a-menu-item key="3" disabled>
            <a-icon type="lock" style="margin-right:4px" />锁屏
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="4" @click.native="logout">
            <a-icon type="poweroff" style="margin-right:4px" />安全登录</a-menu-item>
        </a-menu>
      </a-dropdown>
    </span>
    <!-- 个人中心e -->
    <!-- 通知s -->
    <a-popover trigger="click">
      <template slot="content">
        <a-tabs defaultActiveKey="2">
          <a-tab-pane key="1">
            <span slot="tab">
              <a-icon type="notification" /> 通知(3)
            </span>
            Tab 1
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">
              <a-icon type="mail" /> 消息(3)
            </span>
            Tab 2
          </a-tab-pane>
        </a-tabs>
      </template>
      <span class="pull-right header-action ">
        <a-badge count="12" :offset="[5,-5]">
          <a-icon type="bell" />
        </a-badge>
      </span>
    </a-popover>
    <!-- 通知e -->
    <!-- 帮助s -->
    <a-tooltip placement="bottom" title="帮助文档" class="hidden-xs-only">
      <a-icon type="question-circle-o" class="pull-right header-action " />
    </a-tooltip>
    <!-- 帮助e -->
    <!-- 手机s -->
    <a-popover class="hidden-xs-only">
      <template slot="content">
        <p>手机扫码二维码体验</p>
        <p>
          <a-icon type="qrcode" />假装有个二维码</p>
      </template>
      <a-icon type="mobile" class="pull-right header-action " />
    </a-popover>
    <!-- 手机e -->
  </a-layout-header>
</template>

<script>
export default {
  computed: {
    menu() {
      return this.$store.state.sys.menu
    },
    isCollapse() {
      return this.$store.state.sys.isCollapse
    },
    settingVisible() {
      return this.$store.state.sys.settingVisible
    },
    headerTheme() {
      return this.$store.state.sys.headerTheme
    }
  },
  methods: {
    handleClick() {
      this.$store.commit('IS_COLLAPSE', !this.isCollapse)
    },
    handleSetting() {
      this.$store.commit('SETTING_VISIBLE', !this.settingVisible)
    }
  }
}
</script>
<style lang="less">
.layout-header {
  &.ant-layout-header {
    background: #fff;
    padding: 0;
  }
  &.layout-header-dark {
    &.ant-layout-header {
      background: #002140;
    }
    color:#fff!important;
    .ant-badge{
     color:#fff!important;
    }
    .header-action {
    font-size: 18px;
    line-height: 64px;
    padding: 0 15px;
    cursor: pointer;
    transition: color 0.3s;
    height: 100%;
    &:hover,
    &:focus {
      color: #1890ff;
      background: #000c17;
    }
  }
  }
  .header-action {
    font-size: 18px;
    line-height: 64px;
    padding: 0 15px;
    cursor: pointer;
    transition: color 0.3s;
    height: 100%;
    &:hover,
    &:focus {
      color: #1890ff;
      background: #e6f7ff;
    }
  }
}
</style>
