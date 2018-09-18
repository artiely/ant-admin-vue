<template>
  <div>
    <a-card>
      <a-tree showLine :defaultExpandedKeys="['0-0-0']" @select="onSelect">
        <a-tree-node :key="item.menuId+''" v-for="item in data">
          <span slot="title" style="color: #1890ff">{{item.name}}</span>
          <a-tree-node :key="sub.menuId+''" v-for="sub in item.children">
            <div class="sub-menu-tree" slot="title">{{sub.name}}
              <a-icon class="pull-right tree-icon-right" type="edit" />
            </div>
            <a-tree-node :title="leaf.name" :key="leaf.menuId+''" v-for="leaf in sub.children" />
          </a-tree-node>
        </a-tree-node>
      </a-tree>
    </a-card>
    <pre>
      <!-- {{data}} -->
    </pre>
  </div>
</template>

<script>
import { treeDataTranslate } from '@/utils'
export default {
  data() {
    return {
      data: []
    }
  },
  methods: {
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    getData() {
      this.$store.dispatch('getMenuList').then(result => {
        this.data = treeDataTranslate(result, 'menuId')
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style  lang="less">
.sub-menu-tree {
  width: 150px;
  .tree-icon-right {
    line-height: 24px;
    display: none;
  }
  &:hover {
    .tree-icon-right {
      display: block;
    }
  }
}
</style>
