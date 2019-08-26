<template>
  <div class='supe-meter-tiles'>
    <div class='content-number'>
      <span><i class="iconfont">&#xe6da;</i></span><span>{{sum}}</span>
    </div>
    <div class="footer">
      <i
        class='iconfont'
        @click.stop="getMeterAbnormalSum"
        title="刷新数据"
      >&#xe635;</i>
      <span>数据时间</span>
      <span>{{currentTime}}</span>
    </div>
  </div>
</template>
<script>
import { getMeterList } from '@/api/supeMeter'
import _ from 'lodash'
import moment from 'moment'
export default {
  name: 'supe-meter-tiles',
  data () {
    return {
      sum: 0,
      currentTime: moment().format('hh:mm:ss'),
      autoRefresh: null
    }
  },
  mounted: function () {
    this.getMeterAbnormalSum()
  },
  methods: {
    getMeterAbnormalSum () {
      clearInterval(this.autoRefresh)
      getMeterList({
        page: 1,
        cnt: 10,
        meter_no: '',
        user_no: '',
        addr_des: '',
        meter_model: ''
      }).then((data) => {
        if (_.get(data, 'sum.sum')) {
          let number = _.get(data, 'sum.sum').toString()
          this.sum = number.length > 4 ? number.substr(0, number.length - 4) + '万' : number
          this.currentTime = moment().format('hh:mm:ss')
        }
      })
    },
    setIntervalGetData () {
      this.autoRefresh = setInterval(() => {
        getMeterList({
          page: 1,
          cnt: 10,
          meter_no: '',
          user_no: '',
          addr_des: '',
          meter_model: ''
        }).then((data) => {
          if (_.get(data, 'sum.sum')) {
            let number = _.get(data, 'sum.sum').toString()
            this.sum = number.length > 4 ? number.substr(0, number.length - 4) + '万' : number
            this.currentTime = moment().format('hh:mm:ss')
          }
        })
      }, 10 * 60 * 1000)
    }
  },
  beforeDestroy: function () {
    clearInterval(this.autoRefresh)
  }
}
</script>
<style scoped lang='less'>
.supe-meter-tiles {
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
      color: #36d6c1;
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
        color: #36d6c1;
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
