
<template>
  <div class='supe-meter-history-page'>
    <gc-spin v-if="spinning" />
    <div class='supe-meter-box-page'>
      <div class='history-details-breadcrumb'>
        <a-breadcrumb separator=">">
          <a-breadcrumb-item>
            <router-link to="/home">首页</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link to="/home/supeMeter/list">挂表数列表</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            历史详情
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class='content'>
        <div class="meter-info">
          <i class="iconfont">&#xe6d8;</i>表具信息
        </div>
        <div class='details-info-content'>
          <a-row>
            <a-col
              :span='6'
              v-for="item in meterInfo"
              :key='item.key'
              class='info-row'
            >
              <span class='label'>
                {{item.name}}
              </span>
              <span
                class='input'
                :title='item.value'
              >{{item.value}}</span>
            </a-col>
          </a-row>
        </div>
        <h4 class="history-details-title">
          <i class="iconfont">&#xe6d8;</i> 异常历史
        </h4>
        <div class='history-details-table'>
          <a-table
            :columns="columns"
            :dataSource="data"
            :pagination='false'
            :scroll="{   y: 300 }"
          />
          <div class='content-footer'>
            <a-pagination
              showQuickJumper
              :defaultCurrent="pageIndex"
              :pageSize='1'
              :total="paginationTotal"
            ></a-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMeterAbnormalInfo } from '@/api/meterAbnormal'
import { getMeterHistoryDetails } from '@/api/supeMeter'

const columns = [{
  title: '异常类别',
  dataIndex: 'name',
  width: '25%'
}, {
  title: '异常值',
  dataIndex: 'age',
  width: '10%'
}, {
  title: '异常状态',
  dataIndex: 'address',
  width: '25%'
}, {
  title: '发生日期',
  dataIndex: 'date',
  width: '25%'
}]
const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    date: `asdasdas${i}`
  })
}

export default {
  name: 'supes-meter-histroy',
  data () {
    return {
      data,
      columns,
      pageIndex: 1,
      paginationTotal: 1,
      spinning: true,
      meterInfo: [
        {
          key: 'user_no',
          name: '客户号',
          value: '无'
        },
        {
          key: 'cust_name',
          name: '客户名称',
          value: '无'
        },
        {
          key: 'addr_des',
          name: '地址描述',
          value: '无'
        },
        {
          key: 'meter_no',
          name: '表具编号',
          value: '无'
        },
        {
          key: 'meter_model',
          name: '表具型号',
          value: '无'
        },
        {
          key: 'time1',
          name: '当前值',
          value: '无'
        }
      ]
    }
  },
  mounted: function () {
    getMeterAbnormalInfo('1440368414837').then((data) => {
      this.spinning = false
      this.meterInfo = this.meterInfo.map((item) => {
        item.value = _.get(data, `${item.key}`, '无')
        return item
      })
    })
  },
  computed: {

  }
}
</script>

<style lang='less'>
@import url("./index.less");
</style>
