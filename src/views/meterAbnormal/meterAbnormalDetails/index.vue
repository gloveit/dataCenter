<template>
  <div class='tab-unnormal-details'>
    <div class='details-page'>
      <gc-breadcrumb />
      <div class='content'>
        <div class="left-panel">
          <div class='operation-navigation'>
            <a-select
              style="width: 110px"
              class='choose-time'
              @change='changeTime'
              :value='timeDateType'
            >
              <a-select-option value="today">近一天</a-select-option>
              <a-select-option value="threeday">近三天</a-select-option>
              <a-select-option value="week">近七天</a-select-option>
              <a-select-option
                value="custom"
                disabled
              >自定义</a-select-option>
            </a-select>
            <div class='custom-time-picker'>
              时间段
              <a-range-picker
                class='time-range'
                width='250px'
                :allowClear='false'
                @change='changeRangeTime'
                format="YYYY-MM-DD"
                :value="[startTime, endTime]"
              />
            </div>
            <div class='abnormal-panel'>
              <div @click.stop='showAbnormalPanel(true)'>

                <span class='icon-abnormal-panel'>
                  <i class='iconfont'>&#xe6d2;</i>
                </span>
                <span class='text-abnormal'>异常面板</span>
              </div>
              <div
                class='panel-container'
                v-if='isShowAbnormalPanel'
              >
                <abnormal-panel
                  @showAbnormalPanel='showAbnormalPanel'
                  @wrongLocation='wrongLocation'
                ></abnormal-panel>
              </div>
            </div>
          </div>
          <div class="chart-type-switch-box">
            <ul class='chart-type-switch'>
              <li
                :class="[{'chart-selected-active': activeChart === 'sum'}]"
                @click="changeMenuChart('sum')"
              >综合</li>
              <li
                :class="[{'chart-selected-active': activeChart === 'temp'}]"
                @click="changeMenuChart('temp')"
              >温度</li>
              <li
                :class="[{'chart-selected-active': activeChart === 'pressure'}]"
                @click="changeMenuChart('pressure')"
              >压力</li>
              <li
                :class="[{'chart-selected-active': activeChart === 'flow'}]"
                @click="changeMenuChart('flow')"
              >瞬时流量</li>
            </ul>
          </div>
          <div class="echart-box">
            <total-echart
              :data="totalData"
              :xAxis="timeList"
              v-if="activeChart === 'sum'"
            ></total-echart>
            <temperature-echart
              :data="temperatureData"
              :xAxis="timeList"
              v-if="activeChart === 'temp'"
            ></temperature-echart>
            <pressure-echart
              :data="pressureData"
              :xAxis="timeList"
              v-if="activeChart === 'pressure'"
            ></pressure-echart>
            <flow-echart
              :data="flowData"
              :xAxis="timeList"
              v-if="activeChart === 'flow'"
            ></flow-echart>
          </div>
        </div>
        <div class="right-panel">
          <gc-meter-info :dataSource='meterInfo'></gc-meter-info>
        </div>
      </div>
    </div>
    <gc-spin v-if="spinning" />
  </div>
</template>
<script>
import { getMeterAbnormalInfo, getMeterAbnormalDatas } from '@/api/meterAbnormal'
import AbnormalPanel from '@/components/abnormal_panel/abnormal_panel'
import moment from 'moment'
import $ from 'jquery'
import URL from 'url'
// 综合图表
import totalEchart from './coms/totalEchart'
// 温度图表
import temperatureEchart from './coms/temperatureEchart'
// 压力图表
import pressureEchart from './coms/pressureEchart'
// 瞬时流量
import flowEchart from './coms/flowEchart'
// 右侧信息
import gcMeterInfo from '@/components/container/meterInfoDetails/gc_meterInfo'
export default {
  name: 'tab-unnormal-details',
  components: {
    AbnormalPanel,
    totalEchart,
    temperatureEchart,
    pressureEchart,
    flowEchart,
    gcMeterInfo
  },
  data () {
    return {
      meterInfo: {},
      totalData: {
        sum: [],
        pressure: [],
        temperature: [],
        flow: []
      }, // 综合图表数据
      timeList: [], // 图表x轴数据
      temperatureData: [], // 温度图表数据
      pressureData: [], // 压力图表数据
      flowData: [], // 流量图表数据
      meterInfoSwitch: false,
      meter_no: '',
      isShowAbnormalPanel: false, // 控制异常面板的显示
      spinning: true,
      timeDateType: 'today', // 时间绑定值
      activeChart: 'sum', // 标签激活
      startTime: moment(moment().subtract(30, 'days').format('YYYY-MM-DD'), 'YYYY-MM-DD'),
      endTime: moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD')
    }
  },
  mounted: function () {
    $(document).on('click', () => {
      this.isShowAbnormalPanel = false
    })
    $('.panel-container').on('click', (e) => {
      e.stopPropagation()
      return false
    })
    // eslint-disable-next-line node/no-deprecated-api
    let Url = URL.parse(window.location.href, true)
    this.meter_no = Url.query.meter_no
    getMeterAbnormalInfo(this.meter_no).then((data) => {
      this.meterInfo = data
    })
    // 默认是当天的
    this.getMeterAbnormalData({
      startTime: moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    // 测试数据
    // this.timeList = [
    //   '20190601',
    //   '20190602',
    //   '20190603',
    //   '20190604',
    //   '20190605',
    //   '20190606'
    // ]
    // this.totalData = {
    //   sum: [100, 200, 300, 100, 50, 120],
    //   pressure: [100, 200, 300, 100, 50, 120],
    //   temperature: [100, 200, 300, 100, 50, 120],
    //   flow: [100, 200, 300, 100, 50, 120]
    // }
    // this.temperatureData = {
    //   A: [100, 200, 300, 100, 50, 120],
    //   B: [100, 100, 100, 100, 100, 100]
    // }
    // this.pressureData = {
    //   A: [200, 200, 300, 100, 250, 320],
    //   B: [150, 150, 120, 110, 150, 150]
    // }
    // this.flowData = {
    //   A: [100, 200, 200, 220, 250, 320],
    //   B: [250, 150, 90, 160, 50, 350]
    // }
  },
  methods: {
    // 修改时间触发
    changeTime (type) {
      this.timeDateType = type
      if (type === 'today') {
        this.startTime = moment(moment().subtract(1, 'days').format('YYYY-MM-DD'), 'YYYY-MM-DD')
        this.endTime = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD')
        this.getMeterAbnormalData({
          startTime: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      } else if (type === 'threeday') {
        this.startTime = moment(moment().subtract(3, 'days').format('YYYY-MM-DD'), 'YYYY-MM-DD')
        this.endTime = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD')
        this.getMeterAbnormalData({
          startTime: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      } else {
        this.startTime = moment(moment().subtract(7, 'days').format('YYYY-MM-DD'), 'YYYY-MM-DD')
        this.endTime = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD')
        this.getMeterAbnormalData({
          startTime: moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
    },
    // 改变标签激活
    changeMenuChart (type) {
      this.activeChart = type
    },
    getMeterAbnormalData (timeJson) {
      this.spinning = true
      this.timeList = []
      this.totalData = {}
      this.pressureData = []
      this.temperature = []
      this.flowData = []
      let urlJson = 'meterNo=' + this.meter_no + '&startTime=' + timeJson.startTime + '&endTime=' + timeJson.endTime
      getMeterAbnormalDatas(urlJson).then((data) => {
        data.Reading_Time.forEach((i) => {
          this.timeList.push(i.substring(0, 10))
        })
        this.pressureData = { A: data.Pressure, B: [] }
        this.flowData = { A: data.Standard_Flow, B: [] }
        this.temperatureData = { A: data.Temperature, B: [] }
        this.totalData = {
          sum: data.Standard_Sum,
          pressure: data.Pressure,
          temperature: data.Temperature,
          flow: data.Standard_Flow
        }
        this.spinning = false
      })
    },
    // 时间段改变
    changeRangeTime (date, dateJson) {
      this.timeDateType = 'custom'
      this.startTime = moment(dateJson[0], 'YYYY-MM-DD')
      this.endTime = moment(dateJson[1], 'YYYY-MM-DD')
      this.getMeterAbnormalData({
        startTime: this.startTime.format('YYYY-MM-DD h:mm:ss'),
        endTime: this.endTime.format('YYYY-MM-DD h:mm:ss')
      })
    },
    // 异常面板点击
    showAbnormalPanel (attr) {
      this.isShowAbnormalPanel = attr
    },
    // 异常面板定位
    wrongLocation (attr) {
      this.showAbnormalPanel(false)
      this.startTime = moment(attr + ' 00:00:00', 'YYYY-MM-DD')
      this.endTime = moment(attr + ' 23:59:59', 'YYYY-MM-DD')
      this.timeDateType = 'custom'
      this.getMeterAbnormalData(this.getMeterAbnormalData({
        startTime: attr + ' 00:00:00',
        endTime: attr + ' 23:59:59'
      }))
    }
  }
}
</script>
<style lang='less'>
@import url("./index.less");
</style>
