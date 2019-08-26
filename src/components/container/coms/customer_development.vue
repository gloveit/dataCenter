<template>
  <div class='customer-development-tiles-wrap'>
    <div
      class='content-number'
      id='content-number'
    >

    </div>
    <div class="footer">
      <i
        class='iconfont'
        title="刷新数据"
      >&#xe635;</i>
      <span>数据时间</span>
      <span>{{currentTime}}</span>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import myechart from 'echarts'
export default {
  name: 'customer-development-tiles',
  data () {
    return {
      sum: '10.6w',
      currentTime: moment().format('hh:mm:ss'),
      autoRefresh: null
    }
  }
  //   mounted: function () {
  //     let echart = myechart.init(document.getElementById('content-number'))
  //     let option = {
  //       xAxis: {
  //         type: 'category',
  //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  //       },
  //       yAxis: {
  //         type: 'value',
  //         show: false
  //       },
  //       series: [{
  //         data: [820, 932, 901, 934, 1290, 1330, 1320],
  //         type: 'line',
  //         smooth: true
  //       }]
  //     }
  //     echart.setOption(option)
  //   }
}
</script>
<style scoped lang='less'>
.customer-development-tiles-wrap {
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
    background: url("../../../assets/img/customer.png") no-repeat;
    background-size: 100% 100%;
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
