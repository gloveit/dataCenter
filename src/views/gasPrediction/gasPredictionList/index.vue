<template>
  <div class='gas-abnormal-list-page'>
    <div class='table-page'>
      <gc-breadcrumb />
      <div class='content'>
        <div class='title'>
          <span class='title-icon'></span>
          <p>周用气实际值落在预测值正负1倍标准偏差的概率 &lt;
            68%并且落在正负2倍标准偏差的概率
            &lt;
            97%，则认为用气异常；计算周期为最近半年，数据每周一更新。</p>
        </div>
        <div class='search'>
          <a-input-group compact>
            <gc-select
              @select='onSelect'
              defaultValue='user_no'
              :value='selectType'
            >
              <a-select-option
                value="user_no"
                style="fontSize: 12px"
              >用户号</a-select-option>
              <a-select-option
                value="cust_name"
                style="fontSize: 12px"
              >客户名称</a-select-option>

              <a-select-option
                value="cust_mobile"
                style="fontSize: 12px"
              >电话</a-select-option>
              <a-select-option
                value="addr_des"
                style="fontSize: 12px"
              >地址描述</a-select-option>
              <a-select-option
                value="meter_model"
                style="fontSize: 12px"
              >表具编号</a-select-option>
            </gc-select>
            <a-input
              style="width: 180px"
              class='search-input'
              placeholder="请输入"
              @pressEnter='onSearch'
              v-model="searchValue"
            />
            <gc-button
              className='search-input-btn'
              @click="onSearch"
            >
              <i class='iconfont'>&#xe6c9;</i>
            </gc-button>
            <a-checkbox
              class='search-checkbox'
              @change='onChangeCheckbox'
            >只看用气异常工商户</a-checkbox>
          </a-input-group>
        </div>
        <div class='table'>
          <gc-table
            :columns='columns'
            :dataSource='data'
            :spinning='spinning'
          >
            <div
              slot="action"
              slot-scope="{data}"
              class='action-btn'
              @click='onAction(data)'
            >
              查看曲线图
            </div>
          </gc-table>
        </div>
        <div class='content-footer'>
          <a-pagination
            showQuickJumper
            :defaultCurrent="pageIndex"
            :pageSize='10'
            :current='pageIndex'
            :total="paginationTotal>0? paginationTotal : 1"
            @change="onPagination"
          ></a-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPredictionHistory } from '@/api/gasAbnormal'
import _ from 'lodash'
import moment from 'moment'
const columns = [{
  title: '用户号',
  dataIndex: 'user_no',
  width: 120
}, {
  title: '客户名称',
  width: 100,
  dataIndex: 'cust_name'
}, {
  title: '地址描述',
  dataIndex: 'addr_des'
}, {
  title: '电话',
  dataIndex: 'cust_mobile'
}, {
  title: '表具编号',
  dataIndex: 'meter_no'
}, {
  title: '1倍偏差率',
  dataIndex: 'deviation_rate1'
}, {
  title: '2倍偏差率',
  dataIndex: 'deviation_rate2',
  width: 90
}, {
  title: '本周预测值',
  dataIndex: 'predicted_value',
  width: 90

}, {
  title: '操作',
  dataIndex: 'action',
  width: 110,
  scopedSlots: { customRender: 'action' }
}]

export default {
  name: 'showList',
  data () {
    return {
      data: [],
      columns,
      paginationTotal: 1,
      selectType: 'user_no',
      searchValue: '',
      pageIndex: 1,
      iscust: '',
      spinning: false,
      user_no: '',
      cust_name: '',
      cust_mobile: '',
      meter_no: '',
      addr_des: ''
    }
  },
  mounted: function () {
    this.getList()
  },
  methods: {
    onPagination (page) {
      this.pageIndex = page
      this.getList()
    },
    onSearch () {
      this.user_no = ''
      this.cust_name = ''
      this.addr_des = ''
      this.cust_mobile = ''
      this.meter_no = ''
      this.pageIndex = 1
      this[this.selectType] = this.searchValue
      this.getList()
    },
    onSelect (type) {
      this.selectType = type
    },
    getList (attr) {
      this.spinning = true
      let json = `user_no=${this.user_no}&cust_name=${this.cust_name}&addr_des=${this.addr_des}&cust_mobile=${this.cust_mobile}&meter_no=${this.meter_no}&iscust=${this.iscust}&page=${this.pageIndex}&cnt=10`
      getPredictionHistory(json).then((data) => {
        this.spinning = false
        if (data.status !== 'error') {
          this.data = _.get(data, 'list1', [])
          this.paginationTotal = _.get(data, 'sums', 1)
        }
      }).catch(() => {
        this.spinning = false
      })
    },
    onAction (attr) {
      this.$router.push({ path: '/home/gasPredictionDetails?meter_no=' + attr.meter_no })
    },
    onChangeCheckbox (evt) {
      if (evt.target.checked) {
        this.iscust = 1
      } else {
        this.iscust = ''
      }
      this.getList()
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
