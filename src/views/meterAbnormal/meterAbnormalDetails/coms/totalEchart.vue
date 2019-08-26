<template>
  <div id='totalEchart'>
  </div>
</template>
<script>
import myechart from 'echarts'
import nFormatter from './nFormatter'
export default {
  name: 'total-echart',
  data () {
    return {
    }
  },
  props: {
    data: {
      type: Object,
      require: true,
      default () { return { sum: {} } }
    },
    xAxis: {
      type: Array,
      require: true,
      default () { return [] }
    }
  },
  watch: {
    data: {
      handler: function (newVal, oldVal) {
        this.draw()
      },
      deep: true
    },
    xAxis: {
      handler: function (newVal, oldVal) {
        this.draw()
      },
      deep: true
    }
  },
  methods: {
    draw () {
      let echart = myechart.init(document.getElementById('totalEchart'))
      let op = {
        title: {
          show: false,
          textStyle: {
            color: '#73deff',
            fontStyle: '',
            fontSize: 16,
            fontWeight: 100
          },
          left: '40'
        },
        grid: [
          {
            top: '2%',
            left: '8%',
            right: '6%',
            height: '19%'
          },
          {
            top: '23%',
            left: '8%',
            right: '6%',
            height: '19%'
          },
          {
            top: '43%',
            left: '8%',
            right: '6%',
            height: '19%'
          },
          {
            top: '63%',
            left: '8%',
            right: '6%',
            height: '19%'
            // bottom: '30'
            // containLabel: true
          }
        ],
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        axisPointer: {
          link: { xAxisIndex: 'all' }
        },
        legend: {
          show: false,
          data: ['总量', '采集压力', '采集温度', '瞬时流量'],
          right: 5,
          textStyle: {
            color: '#babfc2',
            fontSize: 10
          },
          itemWidth: 10, // 图形标记的宽
          itemGap: 5// 图例之间的间隔
        },
        xAxis: [
          { show: true, gridIndex: 0, boundaryGap: false, data: this.xAxis, axisLabel: { show: false }, axisLine: { lineStyle: { color: '#D8D8D8' } } },
          { show: true, gridIndex: 1, boundaryGap: false, data: this.xAxis, axisLabel: { show: false }, axisLine: { lineStyle: { color: '#D8D8D8' } } },
          { show: true, gridIndex: 2, boundaryGap: false, data: this.xAxis, axisLabel: { show: false }, axisLine: { lineStyle: { color: '#D8D8D8' } } },
          {
            type: 'category',
            boundaryGap: false,
            gridIndex: 3,
            axisLabel: {
              textStyle: {
                color: '#39404B'
              },
              interval: 'auto'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#D8D8D8'
              }
            },
            data: this.xAxis
          }
        ],
        yAxis: [
          {
            name: '总量\n',
            nameGap: 30,
            nameLocation: 'center',
            gridIndex: 0,
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#E6E7EC',
                type: 'dashed'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#D8D8D8'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#313D57'
              },
              formatter: function (value, index) {
                return nFormatter(value, 0)
              }
            },
            nameTextStyle: {
              color: '#1d293b'
            }
          },
          {
            name: '采集压力\n',
            gridIndex: 1,
            nameGap: 30,
            nameLocation: 'center',
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#E6E7EC',
                type: 'dashed'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#D8D8D8'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#313D57'
              },
              formatter: function (value, index) {
                return nFormatter(value, 0)
              }
            },
            nameTextStyle: {
              color: '#1d293b'
            }
          },
          {
            name: '采集温度\n',
            gridIndex: 2,
            nameGap: 30,
            nameLocation: 'center',
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#E6E7EC',
                type: 'dashed'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#D8D8D8'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#313D57'
              },
              formatter: function (value, index) {
                return nFormatter(value, 0)
              }
            },
            nameTextStyle: {
              color: '#1d293b'
            }
          },
          {
            name: '瞬时流量',
            gridIndex: 3,
            nameGap: 40,
            nameLocation: 'center',
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#E6E7EC',
                type: 'dashed'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#D8D8D8'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#313D57'
              },
              formatter: function (value, index) {
                return nFormatter(value, 0)
              }
            },
            nameTextStyle: {
              color: '#1d293b'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            height: 12,
            xAxisIndex: [0, 1, 2, 3],
            filterMode: 'empty'
          },
          {
            type: 'inside',
            height: 12,
            xAxisIndex: [0, 1, 2, 3],
            filterMode: 'empty'
          },
          {
            type: 'slider',
            orient: 'vertical',
            width: 12,
            yAxisIndex: [0],
            filterMode: 'empty'
          },
          {
            type: 'slider',
            orient: 'vertical',
            width: 12,
            yAxisIndex: [1],
            filterMode: 'empty'
          },
          {
            type: 'slider',
            orient: 'vertical',
            width: 12,
            yAxisIndex: [2],
            filterMode: 'empty'
          },
          {
            type: 'slider',
            orient: 'vertical',
            width: 12,
            yAxisIndex: [3],
            filterMode: 'empty'
          }
        ],
        series: [
          {
            data: this.data.sum,
            name: '总量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#5BB4DA'
              }
            }
          },
          {
            data: this.data.pressure,
            name: '采集压力',
            xAxisIndex: 1,
            yAxisIndex: 1,
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#5BB4DA'
              }
            }
          },
          {
            data: this.data.temperature,
            name: '采集温度',
            xAxisIndex: 2,
            yAxisIndex: 2,
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#5BB4DA'
              }
            }
          },
          {
            data: this.data.flow,
            name: '瞬时流量',
            xAxisIndex: 3,
            yAxisIndex: 3,
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#5BB4DA',
                opacity: 0
              }
            }
          }
        ]
      }
      echart.setOption(op)
    }
  },
  mounted: function () {
    this.draw()
  }
}
</script>
<style>
#totalEchart {
  height: 100%;
  width: 100%;
}
</style>
