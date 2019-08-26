<template>
  <div class='meter-abnormal-list-wrap'>
    <div
      class='table-list-page'
      id='meterScrollBox'
    >
      <div class='table-page'>
        <div class='table-container-box'>
          <gc-breadcrumb />
          <div class="title">
            当前异常概览列表
          </div>
          <ul class='tiles'>
            <li
              v-for='item in abnormalList'
              :key='item.name'
              :class='item.class'
            >
              <div class='img-pg'></div>
              <div class='titles-content'>
                <div class='tiles-top-title'>
                  <span class='tiles-top-icon'>
                    <i
                      class="iconfont"
                      v-if="item.name==='温度异常'"
                    >&#xe6d5;</i>
                    <span
                      class="iconfont  pressure"
                      v-else-if="item.name==='压力异常'"
                    ></span>
                    <i
                      class="iconfont"
                      v-else-if="item.name==='规格异常'"
                    >&#xe6d6;</i>
                    <i
                      class="iconfont"
                      v-else-if="item.name==='电池异常'"
                    >&#xe6d4;</i>
                    <i
                      class="iconfont"
                      v-else-if="item.name==='流量异常'"
                    >&#xe6d3;</i>
                  </span>
                  <span class='tiles-top-name'>
                    {{item.name}}
                  </span>
                  <span class='tiles-top-num'>{{item.sum}}</span>
                </div>
              </div>
            </li>
          </ul>

          <div class='content'>
            <div class='search'>
              <a-input-group compact>
                <gc-select
                  @select="(attr)=>{
                    onSelect('', attr)
                    }"
                  defaultValue='user_no'
                  :value='selectType'
                >
                  <a-select-option
                    value="user_no"
                    style="fontSize: 12px"
                  >用户号</a-select-option>
                  <a-select-option
                    value="addr_des"
                    style="fontSize: 12px"
                  >地址描述</a-select-option>
                  <a-select-option
                    value="meter_model"
                    style="fontSize: 12px"
                  >表具型号</a-select-option>
                  <a-select-option
                    value="meter_no"
                    style="fontSize: 12px"
                  >表具编号</a-select-option>
                </gc-select>
                <a-input
                  style="width: 180px"
                  class='search-input'
                  placeholder="请输入"
                  @pressEnter='(evt)=>{onSearch(evt.target.value)}'
                  v-model="searchValue"
                />
                <gc-button
                  className='search-input-btn'
                  @click="onSearch"
                >
                  <i class='iconfont'>&#xe6c9;</i>
                </gc-button>

              </a-input-group>
              <div
                class='advanced-search'
                @click="openAdvancedSearch"
              >
                <span>高级搜索</span>
                <div :class="['down-search-icon',{'show-conditions': isOpenAdvancedSearch}]">
                  <i></i>
                </div>
              </div>
              <gc-button className='demo'>
                导出
              </gc-button>
            </div>
            <div
              class='has-selected-conditions'
              v-if='hasConditions.length >0'
            >
              <span class='creening-icon'><i></i></span>筛选项：<span
                class='search-conditions-tiles'
                v-for="(item, index) of conditions.filter((item)=>{ return item.value !== ''})"
                :key='item.name'
              >{{item.value}}<i
                  class='iconfont'
                  @click="clearConditions(item)"
                  v-if='item.value'
                >&#xe643;</i></span>
            </div>
            <div
              class='advanced-search-conditions'
              v-show='isOpenAdvancedSearch'
            >

              <div class='allow-search-conditions'>
                <ul>
                  <li class='type-conditions'>
                    <span class='search-label'>异常类别</span>
                    <gc-select
                      class='select-input-cond'
                      :value='meterNormal'
                      @select="(attr)=>{
                    onSelect('type', attr)
                    }"
                    >
                      <a-select-option
                        value="typeAll"
                        style="fontSize: 12px"
                      >全部</a-select-option>
                      <a-select-option
                        value="pessureAbnor"
                        style="fontSize: 12px"
                      >压力异常</a-select-option>
                      <a-select-option
                        value="tempAbnor"
                        style="fontSize: 12px"
                      >温度异常</a-select-option>
                      <a-select-option
                        value="specAbnor"
                        style="fontSize: 12px"
                      >规格异常</a-select-option>
                      <a-select-option
                        value="flowAbnor"
                        style="fontSize: 12px"
                      >瞬时流量异常</a-select-option>
                      <a-select-option
                        value="batteryAbnor"
                        style="fontSize: 12px"
                      >电池电量异常</a-select-option>
                    </gc-select>
                  </li>
                  <li class='status-conditions'>
                    <span class='search-label'>异常状态</span>
                    <gc-select
                      @select="(attr)=>{
                    onSelect('abnormalStatus', attr)
                    }"
                      :value='stateNormal'
                      class='select-input-cond'
                    >
                      <a-select-option
                        value="statusAll"
                        style="fontSize: 12px"
                      >全部</a-select-option>
                      <a-select-option
                        value="statusAbnormal"
                        style="fontSize: 12px"
                      >异常</a-select-option>
                      <a-select-option
                        value="toPredict"
                        style="fontSize: 12px"
                      >预测</a-select-option>
                    </gc-select>
                  </li>
                  <li class='time-conditions'>
                    <span class='search-label'>发生日期</span>
                    <a-range-picker
                      :allowClear='false'
                      dropdownClassName='range-picker-flwe'
                      class='select-input-cond'
                      @change='changeTime'
                      :value="[fristTime,secondTime]"
                    />
                  </li>
                  <li class='action-conditions'>
                    <gc-button
                      @click='onSearch'
                      style='width: 64px;margin-right: 10px;color: #FFFFFF;'
                    >
                      查询
                    </gc-button>
                    <gc-button
                      @click='onReset'
                      style='width: 64px;background: #F5F5F5;border: 1px solid #DBDBDB;'
                    >
                      重置
                    </gc-button>
                  </li>
                </ul>
              </div>
            </div>
            <div class='table'>
              <gc-table
                :dataSource='data'
                :columns='columns'
                :scroll="{x:'120%'}"
                :selection='true'
                :spinning='spinning'
              >
                <div
                  slot="action"
                  slot-scope="{data}"
                  class='action-btn'
                  @click='onAction(data)'
                >
                  查看详情
                </div>
              </gc-table>
            </div>
            <div class='content-footer'>
              <a-pagination
                showQuickJumper
                :defaultCurrent="pageIndex"
                :pageSize='10'
                :total="paginationTotal>0?paginationTotal: 1"
                @change="onPagination"
              ></a-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { getMeterAbnormalNum } from '@/api/meterAbnormal'
import { getAbnormalList } from '@/api/util'
import _ from 'lodash'
import $ from 'jquery'
import moment from 'moment'
const columns = [{
  title: '用户号',
  dataIndex: 'user_no',
  fixed: 'left',
  width: 120
}, {
  title: '客户名称',
  dataIndex: 'cust_name',
  fixed: 'left'
}, {
  title: '地址描述',
  dataIndex: 'addr_des',
  fixed: 'left'
}, {
  title: '表具型号',

  dataIndex: 'meter_model'
}, {
  title: '表具编号',
  width: 180,
  dataIndex: 'meter_no'
}, {
  title: '异常类别',
  dataIndex: 'name'
}, {
  title: '当前值',
  width: 80,
  dataIndex: 'record_value'

}, {
  title: '异常状态',
  width: 90,
  dataIndex: 'ex_status_name'
}, {
  title: '发生日期',
  dataIndex: 'record_time'
}, {
  title: '操作',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' },
  fixed: 'right'
}]
export default {
  name: 'showList',
  data () {
    return {
      data: [],
      columns,
      selectedRowKeys: [],
      abnormalList: [{
        name: '温度异常',
        class: 'tempAbnor',
        sum: 0
      }, {
        name: '压力异常',
        class: 'pessureAbnor',
        sum: 0
      }, {
        name: '规格异常',
        class: 'specAbnor',
        sum: 100
      }, {
        name: '电池异常',
        class: 'batteryAbnor',
        sum: 0
      }, {
        name: '流量异常',
        class: 'flowAbnor',
        sum: 0
      }],
      paginationTotal: 1,
      selectType: 'user_no',
      searchValue: '',
      startTime: '',
      endTime: '',
      fristTime: undefined,
      secondTime: undefined,
      type: '全部表具异常',
      abnormalStatus: '',
      pageIndex: 1,
      tableMaxHeight: 0,
      conditions: [],
      meterNormal: 'typeAll',
      stateNormal: 'statusAll',
      timeNormal: '',
      isOpenAdvancedSearch: false,
      spinning: false,
      abnormalSelectList: {
        typeAll: '全部表具异常',
        tempAbnor: '温度异常',
        pessureAbnor: '压力异常',
        specAbnor: '规格异常',
        flowAbnor: '瞬时流量异常',
        batteryAbnor: '电池电量异常',
        statusAll: '',
        statusAbnormal: '异常',
        toPredict: '预测'
      }
    }
  },
  computed: {
    hasConditions () {
      return this.conditions.filter((item) => { return item.value !== '' })
    }
  },
  mounted: function () {
    $(window).resize(() => {
      this.tableMaxHeight = $('.content').height() - 180
    })
    this.tableMaxHeight = $('.content').height() - 180
    getMeterAbnormalNum().then((data) => {
      if ((data || []).length > 0) {
        this.abnormalList = _.filter(data, (item) => {
          return item.name !== 'sum'
        }).map((item) => {
          if (item.name === '温度异常') {
            item['class'] = 'tempAbnor'
          } else if (item.name === '压力异常') {
            item['class'] = 'pessureAbnor'
          } else if (item.name === '规格异常') {
            item['class'] = 'specAbnor'
          } else if (item.name === '电池电量异常') {
            item['class'] = 'batteryAbnor'
            item['name'] = '电池异常'
          } else if (item.name === '瞬时流量异常') {
            item['class'] = 'flowAbnor'
            item['name'] = '流量异常'
          }
          return item
        })
      }
    })
    this.getList({
      page: 1,
      cnt: 10,
      meter_no: '',
      user_no: '',
      addr_des: '',
      ex_status_name: '',
      meter_model: '',
      type: this.type,
      startTime: '',
      endTime: ''
    })
  },
  methods: {
    clickGetList (record) {
      this.$router.push({ path: '/home/details' })
    },
    onPagination (page) {
      this.getList({
        page: page,
        cnt: 10,
        meter_no: '',
        user_no: '',
        addr_des: '',
        ex_status_name: this.abnormalStatus,
        meter_model: '',
        type: this.type,
        startTime: this.startTime,
        endTime: this.endTime
      })
    },
    RowKey (record, index) {
      return index
    },
    openAdvancedSearch () {
      this.isOpenAdvancedSearch = !this.isOpenAdvancedSearch
    },
    onChangeInput (attr) {
      this.searchValue = attr.value
    },
    onSearch () {
      this.getList({
        page: 1,
        cnt: 10,
        meter_no: '',
        user_no: '',
        ex_status_name: this.abnormalStatus,
        addr_des: '',
        meter_model: '',
        type: this.type,
        startTime: this.startTime || '',
        endTime: this.endTime || ''
      })
    },
    onSelect (type, value) {
      if (!type) {
        this.selectType = value
      } else {
        if (type === 'abnormalStatus') {
          this.stateNormal = value
          let isHas = _.some(this.conditions, (item) => {
            return item.name === '异常状态'
          })
          if (!isHas) {
            this.conditions.push({
              name: '异常状态',
              value: this.abnormalSelectList[value]
            })
          } else {
            this.conditions.forEach((item) => {
              if (item.name === '异常状态') {
                item.value = this.abnormalSelectList[value]
              }
            })
          }
        } else {
          this.meterNormal = value
          let isHas = _.some(this.conditions, (item) => {
            return item.name === '异常类别'
          })
          if (!isHas) {
            this.conditions.push({
              name: '异常类别',
              value: value === 'typeAll' ? '' : this.abnormalSelectList[value]
            })
          } else {
            this.conditions.forEach((item) => {
              if (item.name === '异常类别') {
                item.value = value === 'typeAll' ? '' : this.abnormalSelectList[value]
              }
            })
          }
        }
        this[type] = this.abnormalSelectList[value]
      }
    },
    getList (attr) {
      /**
       * attr =  {
        page: pageIndex,
        cnt: pageSize,
        meter_no: '1440368414831',
        user_no: '',
        addr_des: '',
        meter_model: '',
        type: '',
        startTime: '',
        endTime: ''
      }
       *
       */
      attr[this.selectType] = this.searchValue
      this.spinning = true
      getAbnormalList(attr).then((data) => {
        this.spinning = false
        if (data.status === 'success') {
          this.data = _.get(data, 'date.list', [])
          this.paginationTotal = data.date.sum
        }
      }).catch(() => {
        this.spinning = false
      })
    },
    onReset () {
      this.meterNormal = 'typeAll'
      this.stateNormal = 'statusAll'
      this.type = '全部表具异常'
      this.abnormalStatus = ''
      this.startTime = ''
      this.endTime = ''
      this.fristTime = undefined
      this.secondTime = undefined
      this.conditions = []
    },
    changeTime (data, date) {
      let isHas = _.some(this.conditions, (item) => {
        return item.name === '发生日期'
      })
      if (!isHas) {
        this.conditions.push({
          name: '发生日期',
          value: `${moment(date[0], 'YYYY-MM-DD').format('LL')}-${moment(date[1], 'YYYY-MM-DD').format('LL')}`
        })
      } else {
        this.conditions.forEach((item) => {
          if (item.name === '发生日期') {
            item.value = `${moment(date[0], 'YYYY-MM-DD').format('LL')}-${moment(date[1], 'YYYY-MM-DD').format('LL')}`
          }
        })
      }
      this.startTime = date[0] + ' 00:00:00'
      this.endTime = date[1] + ' 23:59:59'
      this.fristTime = date[0] ? moment(date[0], 'YYYY-MM-DD') : undefined
      this.secondTime = date[1] ? moment(date[1], 'YYYY-MM-DD') : undefined
    },
    clearConditions (attr) {
      let newConditions = _.cloneDeep(this.conditions)
      if (attr.name === '异常类别') {
        this.meterNormal = 'typeAll'
        this.type = '全部表具异常'
        this.conditions = newConditions.filter((item) => {
          return item.name !== '异常类别'
        })
        this.onSearch()
      } else if (attr.name === '异常状态') {
        this.stateNormal = 'statusAll'
        this.abnormalStatus = ''
        this.conditions = newConditions.filter((item) => {
          return item.name !== '异常状态'
        })
        this.onSearch()
      } else if (attr.name === '发生日期') {
        this.startTime = ''
        this.endTime = ''
        this.fristTime = undefined
        this.secondTime = undefined
        this.conditions = newConditions.filter((item) => {
          return item.name !== '发生日期'
        })
        this.onSearch()
      }
    },

    onAction (attr) {
      this.$router.push({ path: '/home/details?meter_no=' + attr.meter_no })
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/home/content') {
      from.meta.keepAlive = false
    } else {
      from.meta.keepAlive = true
    }
    next()
  }
}
</script>
<style lang='less'>
@import url("./index.less");
</style>
