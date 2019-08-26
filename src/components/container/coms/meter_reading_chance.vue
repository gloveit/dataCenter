<template>
  <div class='meter-reading-tiles-wrap'>
    <div class='content-number'>
      <span><i class="iconfont">&#xe6f6;</i></span><span>{{sum}}</span>
    </div>
    <div class="footer">
      <!-- <i
        class='iconfont'
        @click.stop="getMeterAbnormalSum"
        title="刷新数据"
      >&#xe635;</i> -->
      <span>数据时间</span>
      <span>{{currentTime}}</span>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'meter-reading-chance-tiles',
  data () {
    return {
      sum: '99%',
      currentTime: moment().format('hh:mm:ss'),
      autoRefresh: null
    }
  },
  mounted: function () {

  }
}
</script>
<style scoped lang='less'>
.meter-reading-tiles-wrap {
  height: 100%;
  width: 100%;
  position: relative;
  .content-number {
    width: 100%;
    height: 42px;
    position: absolute;
    bottom: 34px;
    right: 0;
    text-align: right;
    line-height: 42px;
    display: flex;
    justify-content: flex-end;
    span {
      font-family: MicrosoftYaHei;
      font-size: 32px;
      color: #2277f5;
    }
    span:nth-of-type(1) {
      display: block;
      width: 42px;
      height: 42px;
      text-align: center;
      line-height: 40px;
      i {
        font-family: MicrosoftYaHei;
        font-size: 28px;
        color: #2277f5;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #b3b3b3;
    text-align: right;
    i {
      font-size: 14px;
      position: absolute;
      left: 0;
    }
    i:hover {
      color: #9375ff;
    }
    span {
      font-size: 12px;
    }
    span:nth-of-type(2) {
      margin-left: 5px;
    }
  }
}
</style>
