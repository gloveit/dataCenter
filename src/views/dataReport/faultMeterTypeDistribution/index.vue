<template>
  <div class='fault-meter-type-distribution-wrap'>
    <div class='table-page'>
      <gc-breadcrumb />
      <div class="title">
        故障率表具类型分布
      </div>
      <div class='content'>
        <div class='table'>
          <gc-table
            :dataSource='data'
            :columns='columns'
            :spinning='spinning'
          >
            <div
              slot="fault"
              slot-scope="{data}"
              style="padding: 0 15px 0 0"
            >
              <a-progress
                :percent="parseInt(data.bl)"
                :strokeWidth='12'
              />
            </div>
          </gc-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMeterFailureRate } from '@/api/meteralarm'
const columns = [{
  title: '表具类型',
  dataIndex: 'name'
}, {
  title: '故障率',
  dataIndex: 'bl',
  scopedSlots: { customRender: 'fault' }
}, {
  title: '总数量',
  dataIndex: 'sum'
}, {
  title: '故障数量',
  dataIndex: 'num'
}]
export default {
  name: 'meter-abnormal-type-distribution',
  data () {
    return {
      columns,
      data: [],
      spinning: true
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    getData () {
      getMeterFailureRate().then(data => {
        this.data = data || []
        this.spinning = false
      }).catch(() => {
        this.spinning = false
      })
    }
  }
}
</script>
<style lang='less'>
@import url("./index.less");
</style>
