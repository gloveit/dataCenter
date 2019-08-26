<template>
  <a-modal
    title="数据"
    wrapClassName='config-item-modal-wrap'
    :visible="true"
    @cancel="handleCancel"
    :maskClosable='false'
    :destroyOnClose='true'
    :afterClose='afterClose'
  >
    <div slot='footer'>
      <a-button
        type='primary'
        @click='onOk'
        :disabled='!isFristEnter'
        style='width: 90px;height: 30px'
      >确认</a-button>
      <a-button
        @click='handleCancel'
        style='width: 90px;height: 30px;margin-left: 10px'
      >取消</a-button>
    </div>
  </a-modal>
</template>
<script>
import $ from 'jquery'
import _ from 'lodash'

import { Message } from 'ant-design-vue'
import Vue from 'vue'
Vue.prototype.message = Message
export default {
  name: 'data-config-modal',
  props: ['title', 'visible', 'attribution'],
  data () {
    return {
      customer_belongList: [],
      activeKey: [],
      isFristEnter: false,
      name: '',
      searchResult: '',
      errorValue: '',
      checkvalue: '',
      newCustomer: ''
    }
  },
  computed: {
    isEmpty () {
      return $.isEmptyObject(this.customer_belongList)
    }
  },
  mounted: function () {
    if (this.attribution.id) {
      this.searchResult = this.attribution.name
      this.getResult(this.attribution.name)
    }
  },
  methods: {
    onOk () {
      if (this.checkvalue !== 'construts') {
        this.$emit('onOk', this.name)
      } else {
        this.addNewCustomer(this.newCustomer)
      }
    },
    getResult (value) {
      this.checkvalue = ''
      this.name = {
        name: '',
        id: ''
      }
      getMeterInfoAttribution('name=' + value).then((data) => {
        this.isFristEnter = true
        let newList = []
        // 将后台数据进行处理，整理成整洁可用的数组对象
        for (let i in data) {
          let newJson = {}
          newJson['name'] = data[i][0].name
          newJson['id'] = data[i][0].id
          newJson['data'] = _.compact(data[i].map((item) => {
            if (_.get(item, 'meterInformationRevision') !== null) {
              return _.get(item, 'meterInformationRevision', '')
            } else {
              return false
            }
          }))
          newList.push(newJson)
        }
        if ($.isEmptyObject(data)) {
          this.customer_belongList = []
          this.errorValue = value
          this.newCustomer = value
        } else {
          this.newCustomer = ''

          this.customer_belongList = newList
        }
      })
    },
    addNewCustomer (value) {
      if (!value) {
        this.message.error('内容不能为空')
      } else {
        addCustAscription('name=' + value).then((data) => {
          if (data.status === 'success') {
            this.message.success('添加成功')
            this.$emit('onOk', {
              name: data.date.name,
              id: data.date.id
            })
          }
        })
      }
    },
    onSearch (type, value) {
      if (type === 'search') {
        this.getResult(value)
      } else {
        this.addNewCustomer(value)
      }
    },
    onChange (type, value) {
      this[type] = value
    },
    handleCancel (e) {
      this.$emit('cancel')
    },
    changePanel (value, key) {
    },
    RowKey (record, index) {
      return index
    },
    onchangRadio (evt) {
      this.checkvalue = evt.target.value
      if (evt.target.value !== 'construts') {
        let attrArray = evt.target.value.split('&')
        this.name = {
          name: attrArray[0],
          id: attrArray[1]
        }
      } else {
        this.name = {
          name: '',
          id: ''
        }
      }
    },
    afterClose () {
      this.name = {
        name: '',
        id: ''
      }
      this.checkvalue = ''
      this.customer_belongList = []
      this.isFristEnter = false
    }

  }
}
</script>

<style lang='less'>
@import url("./config_item.less");
</style>
