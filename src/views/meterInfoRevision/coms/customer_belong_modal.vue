<template>
  <a-modal
    :title="title"
    wrapClassName='gc-modal-wrap'
    :visible="visible"
    @cancel="handleCancel"
    :maskClosable='false'
    :destroyOnClose='true'
    :afterClose='afterClose'
  >
    <div class='modal-content'>
      <a-input-group
        compact
        class='search-input-top'
      >
        <a-input-search
          placeholder="请输入客户归属名称"
          enterButton
          :value="searchResult"
          @change="(evt)=>{
                    this.onChange('searchResult', evt.target.value)
                  }"
          @search="(val)=>{
            this.onSearch('search', val)
          }"
        />
      </a-input-group>
      <div
        class='frist-enter-modal'
        v-if='!isFristEnter'
      >
        <div class='frist-enter-modal'>
          <div class='data-empty-icon'>
            <i class='iconfont'>&#xe652;</i><br />
            <span>暂无内容，请搜索客户归属名称</span>
          </div>

        </div>
      </div>
      <div
        class='tips-for-user'
        v-if='isFristEnter&&isEmpty'
      >
        <p>无法搜索到"<span>{{errorValue}}</span>"名称，可在下面输入框内新增客户归属名</p>
      </div>

      <div
        class='user-attribution'
        v-if='isFristEnter'
      >
        <div id='user-attribution-box'>
          <a-radio-group
            name="radioGroup"
            :value="checkvalue"
            @change="onchangRadio"
          >
            <ul :class="['user-attribution-title', {'user-attribution-title-active': isEmpty}]">
              <li class='title'>
                客户归属
              </li>
              <li>
                添加新名称<a-input
                  style='width: 240px;margin-left: 10px'
                  v-model="newCustomer"
                >
                </a-input>
                <div class='add-newuser-checkbox'>
                  <a-radio
                    value="construts"
                    defaultChecked
                  ></a-radio>
                </div>
              </li>
            </ul>
            <gc-collapse :data='customer_belongList' />
          </a-radio-group>
        </div>
      </div>
    </div>
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
import { getMeterInfoAttribution, getMeterInformationRevisionByid, addCustAscription } from '@/api/meterInfoRevision'
import GcCollapse from './gc-collapse'
import { Message } from 'ant-design-vue'
import Vue from 'vue'
Vue.prototype.message = Message
export default {
  name: 'customer-belong-modal',
  props: ['title', 'visible', 'attribution'],
  components: {
    GcCollapse
  },
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
@import url("./customer_belong_modal.less");
</style>
