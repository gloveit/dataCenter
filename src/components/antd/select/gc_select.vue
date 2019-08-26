<template>
  <a-select
    :defaultValue='defaultValue'
    :value='value'
    style="width:93px;fontSize: 12px"
    @select='onSelect'
    class='gc-select-component'
  >
    <i
      class='ant-select-arrow-icon anticon anticon-down dwon-icon-bg'
      slot="suffixIcon"
    >
    </i>
    <slot></slot>
  </a-select>
</template>
<script>
export default {
  name: 'gc-select',
  props: ['defaultValue', 'value'],
  data () {
    return {}
  },
  methods: {
    onSelect (value) {
      this.$emit('select', value)
    }
  }

}
</script>
<style lang='less'>
@import url("./gc_select.less");
</style>
