<template>
  <div class='meter-type-alarm-report-wrap'>
    <div class='table-page'>
      <gc-breadcrumb />
      <div class="title">
        表具多类别报警报表
      </div>
      <div class='content'>
        <div class='search'>
          <span class='search-title'>报警次数超过</span>
          <a-input-number
            :min="0"
            :max="10"
            :value='alarmNum'
            @change="onChange"
            style='margin: 0 5px 0 10px;'
          />
          <gc-button
            @click='onSearch'
            style='color: #fff;height: 30px;line-height: 22px;'
          > 查询</gc-button>
        </div>
        <div class='table'>

          <gc-table
            :dataSource='data'
            :columns='columns'
            :spinning='spinning'
          />
        </div>
        <div class='content-footer'>
          <a-pagination
            showQuickJumper
            :current="currentPage"
            :pageSize='10'
            :total="paginationTotal> 0?paginationTotal:1 "
            @change="onPagination"
          ></a-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMeterAlarmType } from '@/api/meteralarm'
import _ from 'lodash'
const columns = [{
  title: '用户号',
  dataIndex: 'user_no'
}, {
  title: '客户名称',
  dataIndex: 'cust_name'
}, {
  title: '客户类型',
  dataIndex: 'des'
}, {
  title: '地址描述',
  dataIndex: 'addr_des'
}, {
  title: '报警数目',
  dataIndex: 'count'
}, {
  title: '表具型号',
  dataIndex: 'meter_model'
}, {
  title: '表具编号',
  dataIndex: 'meter_no'
}, {
  title: '最近读表',
  dataIndex: 'last_meter_reading'
}, {
  title: '最近表时间',
  dataIndex: 'last_read_meter_date'
}]

export default {
  name: 'meter-type-alarm-report',
  data () {
    return {
      data: [],
      columns,
      paginationTotal: 1,
      alarmNum: 0,
      currentPage: 1,
      pageSize: 10,
      spinning: false
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    getData () {
      let attr = `num=${this.alarmNum}&page=${this.currentPage}&pageNum=${this.pageSize}`
      this.spinning = true
      getMeterAlarmType(attr).then(data => {
        this.spinning = false
        this.paginationTotal = _.get(data, 'sum', 1)
        this.data = _.get(data, 'list', [])
      }).catch(data => {
        this.spinning = false
      })
    },
    onSearch () {
      this.currentPage = 1
      this.getData()
    },
    onChange (num) {
      if ((num || num === 0) && num >= 0) {
        this.alarmNum = num
      }
    },
    onPagination (size) {
      this.currentPage = size
      this.getData()
    }
  }
}
</script>
<style lang='less'>
@import url("./index.less");
</style>
