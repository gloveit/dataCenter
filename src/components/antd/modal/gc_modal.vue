<template>
  <a-modal
    :title="title"
    wrapClassName='gc-modal-wrap'
    :visible="visible"
    @cancel="handleCancel"
  >
    <slot></slot>
    <div slot='footer'>
      <a-button
        disabled
        type='primary'
        @clcik='onOk'
      >确认</a-button>
      <a-button @click='handleCancel'>取消</a-button>
    </div>
  </a-modal>
</template>
<script>
export default {
  name: 'gc-modal',
  props: ['title', 'visible'],
  methods: {
    onOk () {
      this.$emit('onOk')
    },
    handleCancel (e) {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang='less'>
@import url("./gc_modal.less");
</style>
