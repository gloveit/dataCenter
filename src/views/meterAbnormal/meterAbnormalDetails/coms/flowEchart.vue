<template>
  <div id='chart'>
  </div>
</template>
<script>
import myechart from 'echarts'
import nFormatter from './nFormatter'
export default {
  name: 'flow-echart',
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
      let echart = myechart.init(document.getElementById('chart'))
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
            height: '80%'
            // bottom: '40',
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
          data: ['采集温度', '当地温度'],
          right: 5,
          textStyle: {
            color: '#babfc2',
            fontSize: 10
          },
          itemWidth: 10, // 图形标记的宽
          itemGap: 5// 图例之间的间隔
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            gridIndex: 0,
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
            name: '采集温度\n',
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
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            height: 12,
            xAxisIndex: [0, 0],
            filterMode: 'empty'
          },
          {
            type: 'inside',
            height: 12,
            xAxisIndex: [0, 0],
            filterMode: 'empty'
          }
        ],
        series: [
          {
            data: this.data.A,
            name: '采集温度',
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#5BB4DA'
              }
            }
          },
          {
            data: this.data.B,
            name: '当地温度',
            xAxisIndex: 0,
            yAxisIndex: 0,
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#C5D0EA'
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
#chart {
  height: 100%;
  width: 100%;
}
</style>
