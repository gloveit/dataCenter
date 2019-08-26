<template>
  <div class='gc-spin'>
    <a-spin />
  </div>
</template>
<script>
export default {
  name: 'gc-spin'
}
</script>
<style lang='less'>
.gc-spin {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 300px;
  background: rgba(0, 0, 0, 0.1);
  z-index: 999;
  .ant-spin-dot i {
    background: #1890ff;
  }
}
</style>
