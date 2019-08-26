<template>
  <ul
    class='search-result-modal-wrap'
    @click.stop
  >
    <li
      class='header'
      @click.stop
    >
      <span>用户号</span><span>表具型号</span><span>地址</span>
    </li>
    <li
      v-for="(item, index) in searchResult"
      :key="'key_'+index"
      @click='onClick(item)'
    >
      <span>{{item.user_no}}</span><span>{{item.meter_model}}</span><span>{{item.addr_des}}</span>
    </li>
    <li
      class='footer'
      v-if='searchResult.length < 1'
    >
      <p>暂无数据</p>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'search-result-modal-wrap',
  props: ['searchResult'],
  mounted: function () {

  },
  methods: {
    onClick (attr) {
      this.$emit('click', attr)
    }
  }
}
</script>
<style lang='less'>
@import url("./search_result_modal.less");
</style>
