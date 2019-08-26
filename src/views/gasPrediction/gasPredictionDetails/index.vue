<template>
  <div class='gas-details-page'>
    <div class='gas-details-page'>
      <gc-breadcrumb />
      <div class='content'>
        <div class='content-left'>
          <div class='content-left-title'>
            <i class="iconfont">&#xe6d8;</i>图标展示
          </div>
          <div class='select-condictions'>
            <gc-select
              defaultValue='halfYear'
              class='select-date'
              :value='date'
              @select='onSelect'
            >
              <a-select-option
                value="halfYear"
                style="fontSize: 12px"
              >近半年</a-select-option>
              <a-select-option
                value="oneYear"
                style="fontSize: 12px"
              >近一年</a-select-option>
            </gc-select>
            <p>时间段：<span>{{this.startTime}}~{{this.endTime}}</span></p>
            <!-- <div class='positive-negative'>
              <span>正负1倍标准偏差={{standard1}}</span><span style='margin-left: 10px'>正负2倍标准偏差={{standard2}}</span>
            </div> -->
          </div>
          <div
            class='gas-details-chart'
            id='gag-details-chart'
          >

          </div>
        </div>
        <div class='content-right'>
          <gc-meter-info :dataSource='meterInfo'></gc-meter-info>
        </div>
      </div>
      <gc-spin v-if='spinning' />
    </div>
  </div>
</template>
<script>

import { gasPredictionDetails } from '@/api/gasAbnormal'
import { getMeterAbnormalInfo } from '@/api/meterAbnormal'
import myechart from 'echarts'
import moment from 'moment'
import $ from 'jquery'
export default {
  name: 'gas-list-details',
  data () {
    return {
      meterInfo: {},
      flagTime: 'today',
      date: 'halfYear',
      halfYear: {
        startTime: moment().subtract(182, 'days').format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD')
      },
      oneYear: {
        startTime: moment().subtract(365, 'days').format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD')
      },
      startTime: moment().subtract(182, 'days').format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD'),
      spinning: false,
      isShowAbnormalPanel: false,
      standard1: '50%',
      standard2: '96%'
    }
  },
  mounted: function () {
    getMeterAbnormalInfo('1440368414837').then((data) => {
      this.meterInfo = data
    })
    this.getGasAbnormalData({
      startTime: this.startTime,
      endTime: this.endTime
    })
  },
  methods: {
    onChangeTime (value, date) {
      this.flagTime = value
      this.getGasAbnormalData(date)
    },
    getGasAbnormalData (date) {
      let urlJson = 'meter_no=281705212910&bagindate=' + date.startTime + ' 00:00:00&enddate=' + date.endTime + ' 23:59:59'
      this.spinning = true
      gasPredictionDetails(urlJson).then((data) => {
        this.spinning = false
        if (data.status !== 'error') {
          let res = {
            date: [],
            realData: [], // 预测值
            predictData: [], // 实际值
            up1: [], // 正负1倍
            down1: [], // 正负1倍
            up2: [], // 正负两倍
            down2: [] // 正负两倍
          }
          let cnt1 = 0
          let cnt2 = 0;
          (data || []).reverse().forEach((item, index) => {
            res.date.push(item.time.slice(0, 10))
            res.realData.push(item.actual_value)
            res.predictData.push(item.predicted_value)
            res.up1.push(item.up1)
            res.down1.push(item.down1)
            res.up2.push(item.up2)
            res.down2.push(item.down2)
            if (item.predicted_value < item.down1 || item.predicted_value > item.up1) {
              cnt1 += 1
            }
            if (item.predicted_value < item.down2 || item.predicted_value > item.up2) {
              cnt2 += 1
            }
          })
          // this.standard1 = (data.length - cnt1)/
          this.draw(res)
        }
      })
    },
    onSelect (attr) {
      this.date = attr
      this.startTime = this[attr].startTime
      this.endTime = this[attr].endTime
      this.getGasAbnormalData({
        startTime: this.startTime,
        endTime: this.endTime
      })
    },
    draw (res) {
      let echart = myechart.init(document.getElementById('gag-details-chart'))

      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#ccc',
              borderColor: '#aaa',
              borderWidth: 1,
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              textStyle: {
                color: '#222'
              }
            }
          },
          formatter: function (params) {
            let predict = null
            let real = null

            for (let i = 0; i < params.length; i++) {
              if (params[i].componentIndex == 4) predict = params[i]
              if (params[i].componentIndex == 5) real = params[i]
            }

            if (!real && !predict) return ''

            let res = []

            let begin_value

            if (predict) {
              begin_value = predict.name
            } else {
              begin_value = real.name
            }

            let begin_date = new Date(begin_value)

            begin_date.setDate(begin_date.getDate() + 7)
            let end_value =
              begin_date.getFullYear() +
              '-' +
              (begin_date.getMonth() + 1) +
              '-' +
              begin_date.getDate()

            res.push('日期范围：' + begin_value + '~' + end_value)

            if (predict) {
              res.push('预测值：' + predict.value)
            }
            if (real) {
              res.push('实际值：' + real.value)
            }

            return res.join('<br />')
          }
        },
        color: ['#D6D6D6', '#D6D6D6', '#D6D6D6', '#2277F5', 'gray'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          left: 'left',
          data: [
            {
              name: '正负1倍标准偏差',
              icon: 'circle'
            },
            {
              name: '正负2倍标准偏差',
              icon: 'circle'
            },
            {
              name: '实际值',
              icon: 'circle'
            },
            {
              name: '预测值',
              icon: 'circle'
            }
          ]
        },

        xAxis: {
          type: 'category',
          data: res.date,
          axisLabel: {},
          splitLine: {
            show: false
          },
          boundaryGap: false
        },
        yAxis: {
          // min: 30,
          axisLabel: {},
          axisPointer: {
            label: {}
          },

          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '正负1倍标准偏差1',
            type: 'line',
            smooth: true,
            data: res.down1,
            lineStyle: {
              normal: {
                opacity: 0
              }
            },
            stack: 'yongqiyuce2',
            symbol: 'none'
          },
          {
            name: '正负1倍标准偏差',
            type: 'line',
            smooth: true,
            data: res.up1,
            lineStyle: {
              normal: {
                opacity: 0
              }
            },
            areaStyle: {
              normal: {
                color: '#F0F0F0'
              }
            },
            stack: 'yongqiyuce2',
            symbol: 'none'
          },
          {
            name: '正负2倍标准偏差',
            type: 'line',
            smooth: true,
            data: res.down2,
            lineStyle: {
              normal: {
                opacity: 0
              }
            },
            stack: 'yongqiyuce',
            symbol: 'none'
          },
          {
            name: '正负2倍标准偏差',
            type: 'line',
            smooth: true,
            data: res.up2,
            lineStyle: {
              normal: {
                opacity: 0
              }
            },
            areaStyle: {
              normal: {
                color: '#D6D6D6'
              }
            },
            stack: 'yongqiyuce',
            symbol: 'none'
          },
          {
            name: '实际值',
            type: 'line',
            smooth: true,
            data: res.realData,
            hoverAnimation: false,
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: '#2277F5'
              }
            },
            showSymbol: false
          },
          {
            name: '预测值',
            type: 'line',
            smooth: true,
            data: res.predictData,
            hoverAnimation: false,
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: '#999999'
              }
            },
            showSymbol: false
          }
        ]
      }
      echart.setOption(option)
    }
  }
}
</script>

<style lang='less'>
@import url("./index.less");
</style>
