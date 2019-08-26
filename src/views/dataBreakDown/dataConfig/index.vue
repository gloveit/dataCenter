<template>
  <div class='data-perspective-conifg-wrap'>
    <div class='table-page'>
      <gc-breadcrumb />
      <div class="title">
        明细表配置
      </div>
      <div class='content'>
        友情提示：可Ctrl+F快速查询
        <a-card>
          <a-card-grid
            style="width:20%;textAlign:'center';cursor: pointer;overflow: hidden; white-space: nowrap;text-overflow: ellipsis;"
            v-for="(item, index) in configData"
            :key='item.Tables_in_test'
            @click="configTable(item.Tables_in_test)"
          >{{item.Tables_in_test}}</a-card-grid>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script>
import { dataAjax } from '@/api/dataConfig'
import ConfigDtata from './coms/config_item'
export default {
  name: 'pivot-table',
  components: {
    ConfigDtata
  },
  data () {
    return {
      configData: []
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    getData () {
      dataAjax().then(data => {
        this.configData = data
      })
    },
    configTable (attr) {
      this.$router.push({ path: '/home/itemTableConfig' })
    }
  }
}
</script>
<style lang='less'>
@import url("./index.less");
</style>
