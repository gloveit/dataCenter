<template>
  <div class='payment-methods-tiles-wrap'>
    <div class='content-number'>
      <a-row style='margin-bottom: 5px'>
        <a-col :span='7'>支付宝</a-col>
        <a-col :span='17'>
          <gc-progress
            :percent="55"
            :strokeWidth='16'
          />
        </a-col>
      </a-row>
      <a-row style='margin-bottom: 5px'>
        <a-col :span='7'>微信</a-col>
        <a-col :span='17'>
          <gc-progress
            :percent="30"
            :strokeWidth='16'
            progressBg='#0EA559'
          />
        </a-col>
      </a-row>
      <a-row style='margin-bottom: 5px'>
        <a-col :span='7'>现金</a-col>
        <a-col :span='17'>
          <gc-progress
            :percent="7"
            :strokeWidth='16'
            progressBg='#9375FF'
          />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='7'>其他</a-col>
        <a-col :span='17'>
          <gc-progress
            :percent="8"
            :strokeWidth='16'
            progressBg='#FF9900'
          />
        </a-col>
      </a-row>
    </div>
    <div class="footer">
      <i
        class='iconfont'
        title="刷新数据"
      >&#xe635;</i>
      <span>数据来源于业务研发平台</span>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'payment-methods-tiles',
  data () {
    return {
      sum: '10.6w',
      currentTime: moment().format('hh:mm:ss'),
      autoRefresh: null
    }
  },
  mounted: function () {

  }
}
</script>
<style scoped lang='less'>
.payment-methods-tiles-wrap {
  height: 100%;
  width: 100%;
  position: relative;
  .content-number {
    width: 100%;
    height: calc(~"100% - 40px");
    position: absolute;
    bottom: 34px;
    right: 0;
    text-align: left;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
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
