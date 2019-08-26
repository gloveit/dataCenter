<template>
  <ul class='gc-breadcrumb-wrap'>
    <li
      v-for="(item,index) in list"
      :key='item.key'
    >
      <span
        :class="[{'handPointer': index !== (list.length - 1)}, {'bread-callback-home': index ===0 }]"
        @click="changeRouter(item.path,index)"
      >{{item.name}}</span>
      <i
        class='iconfont breadcrumb-icon'
        v-if='index !== (list.length - 1)'
      >&#xe6e5;</i>
    </li>
  </ul>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'gc-breadcrumb',
  data () {
    return {
    }
  },
  computed: {
    list () {
      return this.$store.state.Breadcrumb.breadList
    }
  },
  mounted () {
  },
  methods: {
    changeRouter (path, index) {
      if (index === (this.$store.state.Breadcrumb.breadList.length - 1)) {
        return false
      } else {
        let _newList = _.cloneDeep(this.$store.state.Breadcrumb.breadList)
        let List = _.filter(_newList, (item, i) => {
          return i <= index
        })
        this.$store.commit('CHANGEBREAD', List)
        this.$router.push(path)
      }
    }
  }
}
</script>
<style lang='less'>
@import url("./gc_breadcrumb.less");
</style>
