<template>
  <div>
    <a-row :gutter="24">
      <a-col :xs="24" :sm="12" :md="12" :lg="6" v-for="i in 14" :key="i">
        <a-card :bordered="false" style="margin-bottom:24px;">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </a-card>
      </a-col>
    </a-row>
    <a-row style="background:#fff">
      <a-col>
        <a-tabs defaultActiveKey="1" size="large">
          <a-tab-pane tab="销售额" key="1">
            <a-row>
              <a-col :xs="24" :sm="24" :md="16" :lg="16">
                <div id="mountNode" ></div>
              </a-col>
              <a-col :xs="24" :sm="24" :md="8" :lg="8">
                123
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="访问量" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
          <div slot="tabBarExtraContent" style="padding-right:24px;padding-top:7px" class="hidden-xs-only">
            <span class="current-data">
              <a class="active">今日 </a>
              <a>本周 </a>
              <a>本月 </a>
              <a>本年 </a>
            </span>
            <a-range-picker class="hidden-sm-and-down"/>
          </div>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import G2 from '@antv/g2'
var data = [
  {
    year: '1951 年',
    sales: 38
  },
  {
    year: '1952 年',
    sales: 52
  },
  {
    year: '1956 年',
    sales: 61
  },
  {
    year: '1957 年',
    sales: 145
  },
  {
    year: '1958 年',
    sales: 48
  },
  {
    year: '1959 年',
    sales: 38
  },
  {
    year: '1960 年',
    sales: 38
  },
  {
    year: '1962 年',
    sales: 38
  },
  {
    year: '1963 年',
    sales: 100
  },
  {
    year: '1964 年',
    sales: 38
  },
  {
    year: '1965 年',
    sales: 38
  },
  {
    year: '1966 年',
    sales: 38
  }
]
export default {
  data() {
    return {
      chart: null
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.sys.isCollapse
    }
  },
  watch: {
    isCollapse: {
      handler() {
        setTimeout(() => {
          this.chart.forceFit()
        }, 400)
      }
    }
  },
  mounted() {
    this.chart = new G2.Chart({
      container: 'mountNode',
      forceFit: true,
      height: 300
    })
    this.chart.source(data)
    this.chart.scale('sales', {
      tickInterval: 20
    })
    this.chart.interval().position('year*sales')
    this.chart.render()
    this.$nextTick(() => {
      this.chart.forceFit()
    })
    window.onreset = function() {
      this.chart.forceFit()
    }
  }
}
</script>

<style lang="less">
.current-data {
  padding-right: 10px;
  > a {
    color: #777;
    padding: 0 10px;
    &.active {
      color: #1690ff;
    }
  }
}
</style>
