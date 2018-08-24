<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon class="trigger" :type="isCollapse ? 'menu-unfold' : 'menu-fold'" @click="handleClick" />
    <!-- 个人中心s -->
    <span class="pull-right header-action" style="margin-right:20px">
      <a-dropdown style="height:64px;display:inline-block;">
        <a class="ant-dropdown-link">
          artiely
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item key="0" disabled>
            <a-icon type="user" style="margin-right:4px" />个人中心
          </a-menu-item>
          <a-menu-item key="1" disabled>
            <a-icon type="setting" style="margin-right:4px" />设置
          </a-menu-item>
          <a-menu-item key="2" disabled>
            <a-icon type="setting" style="margin-right:4px" />触发报错
          </a-menu-item>
          <a-menu-item key="3" disabled>
            <a-icon type="setting" style="margin-right:4px" />锁屏
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="4" @click.native="logout">
            <a-icon type="poweroff" style="margin-right:4px" />退出登录</a-menu-item>
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
        <p><a-icon type="qrcode" />假装有个二维码</p>
      </template>
      <a-icon type="mobile" class="pull-right header-action "/>
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
    }
  },
  methods: {
    handleClick() {
      this.$store.commit('IS_COLLAPSE', !this.isCollapse)
    }
  }
}
</script>
