<template>
  <div class='supe-meter-list-page'>
    <div class='table-page'>
      <div class='table-breadcrumb'>
        <a-breadcrumb separator=">">
          <a-breadcrumb-item>
            <router-link to="/home">首页</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            挂表数列表
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="title">
        挂表数列表
      </div>
      <div class='content'>
        <div class='search'>
          <a-input-group compact>
            <a-select
              defaultValue="user_no"
              style="width:93px;fontSize: 12px"
              @select='onSelect'
            >
              <a-select-option
                value="user_no"
                style="fontSize: 12px"
              >用户名</a-select-option>
              <a-select-option
                value="addr_des"
                style="fontSize: 12px"
              >地址描述</a-select-option>
              <a-select-option
                value="meter_model"
                style="fontSize: 12px"
              >表具型号</a-select-option>
            </a-select>
            <a-input-search
              style="width: 210px"
              placeholder="请输入"
              enterButton
              @search="onSearch"
            />
          </a-input-group>
          <a-button class='search-export'>
            导出
          </a-button>
        </div>
        <div class='table'>
          <div
            class='table-spin'
            v-if='showSpin'
          >
            <a-spin
              style='color: blue'
              wrapperClassName='spin'
            />
          </div>
          <a-table
            :rowSelection="rowSelection"
            :columns="columns"
            :dataSource="data"
            :pagination="false"
            :rowKey='this.RowKey'
            :scroll="{  y: 300 }"
          >
            <div
              slot="addr_des"
              slot-scope="text, record"
              class='addr_des_td'
              :title="text"
            >
              {{text}}
            </div>
            <div
              slot="meter_model"
              slot-scope="text, record"
              class='addr_des_td'
              :title="text"
            >
              {{text}}
            </div>
            <a
              slot="action"
              href="javascript:;"
              slot-scope="text, record"
              @click="clickGetList(record)"
            >查看详情</a>
            <a-icon
              type="down"
              slot="down"
            />
          </a-table>
        </div>
        <div class='content-footer'>
          <a-pagination
            showQuickJumper
            :defaultCurrent="1"
            :pageSize='1'
            :total="paginationTotal> 0?paginationTotal:1 "
            @change="onPagination"
          ></a-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMeterList } from '@/api/supeMeter'
import _ from 'lodash'
import moment from 'moment'
const columns = [{
  title: '用户名',
  width: '10%',
  dataIndex: 'user_no'
}, {
  title: '客户名称',
  width: '15%',
  dataIndex: 'cust_name'
}, {
  title: '地址描述',
  width: 150,
  dataIndex: 'addr_des',
  scopedSlots: { customRender: 'addr_des' }
}, {
  title: '表具型号',
  width: '15%',
  dataIndex: 'meter_model',
  scopedSlots: { customRender: 'meter_model' }
}, {
  title: '表具编号',
  width: '15%',
  dataIndex: 'meter_no'
}, {
  title: '安装日期',
  width: '120px',
  dataIndex: 'install_date'
}, {
  title: '操作',
  dataIndex: '9999',
  width: '90px',
  scopedSlots: { customRender: 'action' }
}]

export default {
  name: 'supe-meter-list',
  data () {
    return {
      data: [],
      columns,
      selectedRowKeys: [],
      paginationTotal: 1,
      selectType: 'user_no',
      searchValue: '',
      showSpin: true
    }
  },
  computed: {
    rowSelection () {
      const { selectedRowKeys } = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
        }
      }
    }
  },
  mounted: function () {
    this.getList({
      page: 1,
      cnt: 10,
      meter_no: '',
      user_no: '',
      addr_des: ''
    })
  },
  methods: {
    clickGetList (record) {
      this.$router.push({ path: '/home/supeMeter/history' })
    },
    onPagination (page) {
      this.getList({
        page: page,
        cnt: 10,
        meter_no: '',
        user_no: '',
        addr_des: '',
        meter_model: ''
      })
    },
    RowKey (record, index) {
      return index
    },
    onSearch (value) {
      this.searchValue = value
      this.getList({
        page: 1,
        cnt: 10,
        meter_no: '',
        user_no: '',
        addr_des: '',
        meter_model: ''
      })
    },
    onSelect (type) {
      this.selectType = type
    },
    getList (attr) {
      attr[this.selectType] = this.searchValue
      this.showSpin = true
      getMeterList(attr).then((data) => {
        this.data = data.num
        this.paginationTotal = data.sum.sum
        this.showSpin = false
      }).catch(() => {
        this.showSpin = false
      })
    }
  }
}
</script>
<style lang='less'>
@import url("./index.less");
</style>
