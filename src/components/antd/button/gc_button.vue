<template>
  <div
    :class="['gc-button-wrap', `${className}`]"
    @click="onClick"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'gc-button',
  props: ['className'],
  data () {
    return {}
  },
  mounted: function () {
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>
<style>
@import url("./gc_button.less");
</style>
