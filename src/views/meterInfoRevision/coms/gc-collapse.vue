<template>
  <a-collapse v-if='data.length >0'>

    <a-collapse-panel
      v-for="item of data"
      :key='item.id'
    >
      <div
        slot='header'
        class='collapse-panel-content-header'
      >
        <div class='arrow-icon'>
          <i class='iconfont'>&#xe822;</i>
        </div>
        {{item.name}}
        <div
          class='header-checkbox'
          @click.stop
        >
          <a-radio :value="item.name+'&'+item.id"></a-radio>
        </div>
      </div>
      <div class='user-attribution-content'>
        <a-table
          :columns="columns"
          :pagination="false"
          :dataSource='item.data'
        >
        </a-table>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>
<script>
const columns = [{
  title: '表具编号',
  width: '33%',
  dataIndex: 'meter_no'
}, {
  title: '地址描述',
  width: '33%',
  dataIndex: 'address'
}, {
  title: '表具型号',
  width: '33%',
  dataIndex: 'addr_des'
}]
export default {
  name: 'gc-collapse',
  data () {
    return {
      columns,
      activeKey: []
    }
  },
  props: ['data']
}
</script>
