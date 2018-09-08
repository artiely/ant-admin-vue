<template>
  <a-layout-header class="layout-header" :class="{'layout-header-dark': headerTheme==='dark'}">
    <!-- trigger s -->
    <a-icon class="trigger" :type="isCollapse ? 'menu-unfold' : 'menu-fold'" @click="handleClick" />
    <!-- trigger e -->
    <!-- 设置s -->
    <a-icon type="setting" class="pull-right header-action hidden-xs-only" @click="handleSetting" />
    <!-- 设置e -->
    <!-- i18n s -->
    <div class="pull-right" style="padding-right:10px">
      <a-button ghost size="small" :type="headerTheme==='dark'?'':'primary'" @click="changeLang">{{language.label}}</a-button>
    </div>
    <!-- i18n e -->
    <!-- 个人中心s -->
    <span class="pull-right header-action">
      <a-dropdown style="height:64px;display:inline-block;">
        <a class="ant-dropdown-link">
          <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style="position:relative;top:10px" />
          <span style="font-size:16px" class="hidden-xs-only">artiely
            <a-icon type="down" />
          </span>
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
          <a-menu-item key="4" @click.native="logout" style="padding-right:30px">
            <a-icon type="poweroff" style="margin-right:4px" />安全登录 </a-menu-item>
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
    <!-- 全屏 s -->
    <a-tooltip placement="bottom" :title="fullscreen?'退出全屏':'全屏'" class="hidden-xs-only">
      <a-icon :type="fullscreen?'shrink':'arrows-alt'" class="pull-right header-action " @click="toggleScreen"/>
    </a-tooltip>
    <!-- 全屏 e -->
  </a-layout-header>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import en_US from 'ant-design-vue/lib/locale-provider/en_US'
import 'moment/locale/zh-cn'
export default {
  data() {
    return {
      fullscreen: false
    }
  },
  computed: {
    menu() {
      return this.$store.state.sys.menu
    },
    language() {
      return this.$store.state.sys.language
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
    changeLang() {
      if (this.language.label === '简体中文') {
        this.$store.commit('SET_LANGUAGE', {label: 'English', value: zh_CN})
      } else {
        this.$store.commit('SET_LANGUAGE', {label: '简体中文', value: en_US})
      }
    },
    handleClick() {
      this.$store.commit('IS_COLLAPSE', !this.isCollapse)
    },
    handleSetting() {
      this.$store.commit('SETTING_VISIBLE', !this.settingVisible)
    },
    toggleScreen() {
      if (!this.fullscreen) {
        var docElm = document.documentElement
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen()
        } else {
          this.$message.error({
            content: '除了让你升级浏览器对方没什么好说的！',
            duration: 3
          })
        }
        this.fullscreen = true
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        } else {
          this.$message.error({
            content: '请升级浏览器，不然我是不会理你的！',
            duration: 3
          })
        }
        this.fullscreen = false
      }
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
    color: #fff !important;
    .ant-badge {
      color: #fff !important;
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
