<template>
  <div class='gc-progress-wrap'>
    <div
      class='percent-title'
      :style="{color: progressBg}"
    >
      {{percent}}%
    </div>
    <div class='progress-content'>
      <div
        class='slot-bg'
        :style='{background: slotBk}'
        :title="percent+'%'"
      >

      </div>
      <div
        class='progress'
        :style="{width:percent+ '%',background: progressBg}"
        :title="percent+'%'"
      >

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'gc-progress',
  props: {
    percent: {
      type: Number,
      default: function () {
        return 0
      }
    },
    slotBk: {
      type: String,
      default: function () {
        return '#E2E2E2'
      }
    },
    progressBg: {
      type: String,
      default: function () {
        return '#4DA1FF'
      }
    }
  }
}
</script>
<style lang='less'>
.gc-progress-wrap {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 2px;
  .percent-title {
    width: 35px;
    height: 100%;
    text-align: right;
    padding-right: 10px;
  }
  .progress-content {
    position: relative;
    flex: 1;
    height: 20px;
    line-height: 20px;
    padding-top: 2px;
    .slot-bg {
      height: 16px;
      width: 100%;
      background: rgba(226, 226, 226, 1);
      border-radius: 2px;
    }
    .progress {
      height: 16px;
      width: 10px;
      position: absolute;
      border-radius: 2px;
      left: 0;
      top: 2px;
      background: red;
    }
  }
}
</style>
