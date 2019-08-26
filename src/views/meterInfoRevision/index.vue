<template>
  <div class='meter-info-revision-page'>
    <div class='table-page'>
      <div class='table-breadcrumb'>
        <a-breadcrumb separator=">">
          <a-breadcrumb-item>
            <router-link to="/home">首页</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            表具信息修订
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="title">
        表具信息修订
      </div>
      <div class='content'>
        <div class='search'>
          <a-input-group
            compact
            @click.stop
            class='search-group'
          >
            <a-select
              defaultValue="user_no"
              style="width:93px;fontSize: 12px"
              @select='onSelect'
            >
              <a-select-option
                value="user_no"
                style="fontSize: 12px"
              >用户号</a-select-option>
              <a-select-option
                value="meter_no"
                style="fontSize: 12px"
              >表号</a-select-option>
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
              @click.stop
              @search="onSearchUserInfo"
            />
          </a-input-group>
          <div
            class='search-result-show'
            v-if='isShowResute'
            @click.stop
          >
            <search-result-modal
              :searchResult='searchResult'
              @click='getSearchResult'
            />

          </div>
        </div>
        <div class='meter-info-table'>
          <ul>
            <li class='meter-info-table-header'>
              <span
                v-for="item in columns"
                :key='item.key'
              >{{item.title}}</span>
            </li>
            <li v-if='data.length > 0'>
              <span>
                {{data[0].meter_no}}
              </span>
              <span>
                {{data[0].cust_name}}
              </span>
              <span>
                {{data[0].meter_model}}
              </span>
              <span>
                {{data[0].meter_model44|| ''}}
              </span>
              <span>
                {{data[0].user_no}}
              </span>

            </li>
            <li
              class='meter-info-table-footer'
              v-if='data.length < 1'
            >
              <p>暂无数据</p>
            </li>
          </ul>
        </div>
        <div class='meter-details'>
          <h4 class='meter-details-title'>
            <i class="iconfont">&#xe6d8;</i>表具详情
          </h4>
          <div class='meter-details-content'>
            <div class='meter-details-row-wrap'>
              <div class='meter-label-col'>*客户归属</div>
              <div class='meter-wrapper-col'>
                <div
                  class='customer-attrib-btn'
                  @click="onSearch"
                >
                  <span
                    class='placeholder'
                    v-if='!attribution'
                  >请选择或添加</span>
                  <span v-else>{{attribution.name}}</span>
                  <i class="iconfont ">
                    &#xe6c9;
                  </i>
                </div>
              </div>
            </div>
            <div class='meter-details-row-wrap'>
              <div class='meter-label-col'>表具型号</div>
              <div class='meter-wrapper-col'>
                <a-select
                  showSearch
                  placeholder="一类型号"
                  :value='valueMeterNo1'
                  style="width: 236px;marginRight: 10px"
                  @change="(attr)=>{
                    this.onChange('metreNo1', attr)
                  }"
                >
                  <a-select-option
                    v-for="item in valueMeterNo1List"
                    :value="item.id"
                    :key='item.id'
                  >{{item.name}}</a-select-option>
                </a-select>
                <a-select
                  showSearch
                  placeholder="二类型号"
                  :disabled='!valueMeterNo1'
                  @change="(attr)=>{
                    this.onChange('', attr)
                  }"
                  :value='valueMeterNo2'
                  style="width: 236px;marginRight: 10px"
                >
                  <a-select-option
                    v-for="item in valueMeterNo2List"
                    :value='item.id'
                    :key='item.id'
                  >{{item.name}}</a-select-option>
                </a-select>
              </div>
            </div>
            <div class='meter-details-row-wrap'>
              <div class='meter-label-col'>开口量</div>
              <div class='meter-wrapper-col'>
                <a-input
                  style="width: 236px"
                  placeholder="请填写"
                  @change="(evt)=>{
                    this.onInputChange('opening_quantity', evt.target.value)
                  }"
                />
              </div>
            </div>
            <div class='meter-details-row-wrap'>
              <div class='meter-label-col'>压力传感器量程</div>
              <div class='meter-wrapper-col'>
                <a-radio-group
                  name="radioGroup"
                  v-model="pressure_sensor_range"
                  buttonStyle='outline'
                  @change="onchangRadio"
                >
                  <a-radio :value="0.2">0.2Mpa</a-radio>
                  <a-radio :value="0.5">0.5Mpa</a-radio>
                  <a-radio :value="1">1Mpa</a-radio>
                </a-radio-group>
              </div>
            </div>
            <div class='meter-details-row-wrap'>
              <div class='meter-label-col'>客户行业</div>
              <div class='meter-wrapper-col'>
                <a-select
                  showSearch
                  placeholder="一级行业"
                  :value='customerIndustryNo1'
                  @change="(attr)=>{
                    this.onSelectIndeustry('number1', attr)
                  }"
                  style="width: 236px;marginRight: 10px"
                >
                  <a-select-option
                    v-for="item of customerIndustryNo1List"
                    :value="item.industry"
                    :key="item.id"
                  >{{item.name}}</a-select-option>
                </a-select>
                <a-select
                  showSearch
                  placeholder="二级行业"
                  :disabled='!customerIndustryNo1'
                  :value='customerIndustryNo2'
                  @change="(attr)=>{
                    this.onSelectIndeustry('number2', attr)
                  }"
                  style="width: 236px;marginRight: 10px"
                >
                  <a-select-option
                    v-for="item of customerIndustryNo2List"
                    :value="item.industry"
                    :key="item.id"
                  >{{item.name}}</a-select-option>
                </a-select>
                <a-select
                  showSearch
                  placeholder="三级行业"
                  :disabled='!customerIndustryNo2'
                  @change="(attr)=>{
                    this.onSelectIndeustry('', attr)
                  }"
                  :value='customerIndustryNo3'
                  style="width: 236px"
                >
                  <a-select-option
                    v-for="item of customerIndustryNo3List"
                    :value="item.industry"
                    :key="item.id"
                  >{{item.name}}</a-select-option>
                </a-select>
              </div>
            </div>
          </div>
        </div>
        <div class='customer-details'>
          <h4 class='customer-details-title'>
            <i class="iconfont">&#xe6d8;</i>客户详情
          </h4>
          <div class='customer-details-content'>
            <div class='customer-details-row-wrap'>
              <div class='meter-label-col'>地址</div>
              <div class='meter-wrapper-col'>
                <a-select
                  showSearch
                  placeholder="省"
                  :value='addressLevelNo1'
                  @change="(attr)=>{
                    this.onSelectAddress('level1', attr)
                  }"
                  style="width: 236px;marginRight: 10px"
                >
                  <a-select-option
                    v-for="item in addressLevelNo1List"
                    :value="item.city_id"
                    :key="item.city_id"
                  >{{item.city_name}}</a-select-option>
                </a-select>
                <a-select
                  showSearch
                  placeholder="市"
                  :value='addressLevelNo2'
                  :disabled='!addressLevelNo1'
                  @change="(attr)=>{
                    this.onSelectAddress('level2', attr)
                  }"
                  style="width: 236px;marginRight: 10px"
                >
                  <a-select-option
                    v-for="item in addressLevelNo2List"
                    :value="item.city_id"
                    :key="item.city_id"
                  >{{item.city_name}}</a-select-option>
                </a-select>
                <a-select
                  showSearch
                  placeholder="区"
                  :value='addressLevelNo3'
                  :disabled='!addressLevelNo2'
                  @change="(attr)=>{
                    this.onSelectAddress('level3', attr)
                  }"
                  style="width: 236px;marginRight: 10px"
                >
                  <a-select-option
                    v-for="item in addressLevelNo3List"
                    :value="item.city_id"
                    :key="item.city_id"
                  >{{item.city_name}}</a-select-option>
                </a-select>
                <a-select
                  showSearch
                  placeholder="街道"
                  :value='addressLevelNo4'
                  :disabled='!addressLevelNo3'
                  @change="(attr)=>{
                    this.onSelectAddress('', attr)
                  }"
                  style="width: 236px"
                >
                  <a-select-option
                    v-for="item in addressLevelNo4List"
                    :value="item.city_id"
                    :key="item.city_id"
                  >{{item.city_name}}</a-select-option>
                </a-select>
              </div>
            </div>
            <div class='customer-details-row-wrap'>
              <div class='meter-label-col'>地址详情</div>
              <div class='meter-wrapper-col'>
                <a-input
                  style="width: 526px"
                  v-model="address"
                />
              </div>
            </div>
          </div>
        </div>
        <footer>
          <a-button
            style='width: 96px;height: 32px'
            @click="onReset"
          >重置</a-button>
          <a-button
            type="primary"
            style='margin-left: 10px;width: 96px;height: 32px'
            @click='submitAllResult'
            :disabled='isResultError'
          >提交</a-button>
        </footer>
        <!-- modal代码 -->
        <customer-belong-modal
          title='客户归属'
          @onOk='onOkModal'
          :visible='visible'
          @cancel='cancel'
          :attribution='attribution'
          v-if='visible'
        >

        </customer-belong-modal>

      </div>
    </div>
  </div>
</template>
<script>
import CustomerBelongModal from './coms/customer_belong_modal'
import SearchResultModal from './coms/search_result_modal'
import { getAbnormalList } from '@/api/util'
import { getFristCustomerIndustrys, allCustomerIndustrysByPid,
  getFristMeterTypes, getMeterTypeByPid, getFristAddress, getAddressByPid, getCustomerBelong, undateMeterInformationRevision } from '@/api/meterInfoRevision'
import $ from 'jquery'
import _ from 'lodash'
const columns = [{
  title: '表具编号',
  width: '20%',
  dataIndex: 'meter_no',
  key: '001'
}, {
  title: '地址描述',
  width: '25%',
  dataIndex: 'cust_name',
  key: '002'
}, {
  title: '表具型号',
  width: '20%',
  dataIndex: 'meter_model',
  scopedSlots: { customRender: 'addr_des' },
  key: '003'
}, {
  title: '用户表号',
  width: '20%',
  dataIndex: 'meter_model44',
  key: '004'
}, {
  title: '用户号',
  width: '15%',
  dataIndex: 'user_no',
  key: '005'
}]
export default {
  name: 'meter-info-revision',
  components: {
    CustomerBelongModal,
    SearchResultModal
  },
  data () {
    return {
      data: [],
      columns,
      adffadf: '金卡集团',
      visible: false,
      isShowResute: false,
      selectType: 'user_no',
      searchResult: [],
      attribution: '',
      meter_no: '', // 表具编号
      address: '', // 地址
      cust_ascription_id: {}, // 客户归属Id
      opening_quantity: '',
      pressure_sensor_range: 0.2,
      // 表具类型
      valueMeterNo1: undefined,
      valueMeterNo1List: [],
      valueMeterNo2: undefined,
      valueMeterNo2List: [],
      // 客户行业
      customerIndustryNo1: undefined,
      customerIndustryNo1List: [],
      customerIndustryNo2: undefined,
      customerIndustryNo2List: [],
      customerIndustryNo3: undefined,
      customerIndustryNo3List: [],
      // 地址
      addressLevelNo1: undefined,
      addressLevelNo1List: [],
      addressLevelNo2: undefined,
      addressLevelNo2List: [],
      addressLevelNo3: undefined,
      addressLevelNo3List: [],
      addressLevelNo4: undefined,
      addressLevelNo4List: []
    }
  },
  computed: {
    isResultError () {
      let attr = {
        meter_no: this.meter_no,
        meter_type1: this.valueMeterNo1,
        meter_type2: this.valueMeterNo2,
        opening_quantity: this.opening_quantity,
        pressure_sensor_range: this.pressure_sensor_range,
        cust_industry1: this.customerIndustryNo1,
        cust_industry2: this.customerIndustryNo2,
        tb_city1: this.addressLevelNo1,
        tb_city2: this.addressLevelNo2,
        tb_city3: this.addressLevelNo3,
        address: this.address,
        cust_ascription_id: this.attribution.id
      }
      let result = false
      Object.values(attr).forEach((item) => {
        if (!item) {
          result = true
        }
      })
      return result
    }
  },
  mounted: function () {
    $(document).on('click', () => {
      this.isShowResute = false
    })
    // 获取第一个行业信息
    getFristCustomerIndustrys().then((data) => {
      this.customerIndustryNo1List = data
    })
    // 获取第一个表具类型
    getFristMeterTypes().then((data) => {
      this.valueMeterNo1List = data || []
    })
    // 第一地址
    getFristAddress().then((data) => {
      this.addressLevelNo1List = data
    })
  },
  methods: {
    RowKey (record, index) {
      return index
    },
    onSelect (type) {
      this.selectType = type
    },
    onSearch (a, b, c) {
      this.showModal()
    },
    onChange (type, attr) {
      if (type) {
        this.valueMeterNo1 = attr
        this.valueMeterNo2 = undefined
        getMeterTypeByPid('pid=' + attr).then((data) => {
          this.valueMeterNo2List = data
        })
      } else {
        this.valueMeterNo2 = attr
      }
    },
    onSelectIndeustry (type, attr) {
      if (type) {
        allCustomerIndustrysByPid('pid=' + attr).then((data) => {
          if (type === 'number1') {
            this.customerIndustryNo1 = attr
            this.customerIndustryNo2 = undefined
            this.customerIndustryNo3 = undefined
            this.customerIndustryNo2List = data
          } else if (type === 'number2') {
            this.customerIndustryNo2 = attr
            this.customerIndustryNo3 = undefined
            this.customerIndustryNo3List = data
          }
        })
      } else {
        this.customerIndustryNo3 = attr
      }
    },
    onSelectAddress (type, attr) {
      if (type) {
        getAddressByPid('pid=' + attr).then((data) => {
          if (type === 'level1') {
            this.addressLevelNo1 = attr
            this.addressLevelNo2 = undefined
            this.addressLevelNo3 = undefined
            this.addressLevelNo4 = undefined
            this.addressLevelNo2List = data
          } else if (type === 'level2') {
            this.addressLevelNo2 = attr
            this.addressLevelNo3 = undefined
            this.addressLevelNo4 = undefined
            this.addressLevelNo3List = data
          } else if (type === 'level3') {
            this.addressLevelNo3 = attr
            this.addressLevelNo4 = undefined
            this.addressLevelNo4List = data
          }
        })
      } else {
        this.addressLevelNo4 = attr
      }
    },
    onSearchUserInfo (value) {
      if (!value) return
      this.isShowResute = true
      let json = {
        page: 1,
        cnt: 5,
        meter_no: '',
        user_no: '',
        addr_des: '',
        ex_status_name: '',
        meter_model: '',
        type: '全部表具异常',
        startTime: '',
        endTime: ''
      }
      json[this.selectType] = value
      getAbnormalList(json).then((data) => {
        if (data.status) {
          this.searchResult = _.get(data, 'date.list', [])
        }
      })
    },
    getSearchResult (attr) {
      this.meter_no = _.get(attr, 'meter_no')
      this.address = _.get(attr, 'addr_des')
      this.isShowResute = false
      this.data.push(attr)
    },
    showModal () {
      this.visible = true
    },
    onOkModal (attr) {
      this.attribution = attr
      this.visible = false
    },
    onInputChange (key, value) {
      this[key] = value
    },
    onchangRadio (evt) {
      this.pressure_sensor_range = evt.target.value
    },
    cancel () {
      this.visible = false
    },
    submitAllResult () {
      let attr = {
        meter_no: this.meter_no,
        meter_type1: this.valueMeterNo1,
        meter_type2: this.valueMeterNo2,
        opening_quantity: this.opening_quantity,
        pressure_sensor_range: this.pressure_sensor_range,
        cust_industry1: this.customerIndustryNo1,
        cust_industry2: this.customerIndustryNo2,
        cust_industry3: this.customerIndustryNo3,
        tb_city1: this.addressLevelNo1,
        tb_city2: this.addressLevelNo2,
        tb_city3: this.addressLevelNo3,
        tb_city4: this.addressLevelNo4,
        address: this.address,
        cust_ascription_id: this.attribution.id
      }

      undateMeterInformationRevision(`meter_no=${this.meter_no}&meter_type1=${this.valueMeterNo1}&meter_type1=${this.valueMeterNo2}&opening_quantity=${this.opening_quantity} &pressure_sensor_range=${this.pressure_sensor_range}
      &cust_industry1=${this.customerIndustryNo1}
      &cust_industry2=${this.customerIndustryNo2}
      &cust_industry3=${this.customerIndustryNo3}
      &tb_city1=${this.addressLevelNo1}
      &tb_city2=${this.addressLevelNo2}
      &tb_city3=${this.addressLevelNo3}
      &tb_city4=${this.addressLevelNo4}
      &address=${this.address}
      &cust_ascription_id=${this.attribution.id}`).then((data) => {
      })
    },
    onReset () {
      this.meter_no = undefined
      this.valueMeterNo1 = undefined
      this.valueMeterNo2 = undefined
      this.opening_quantity = undefined
      this.pressure_sensor_range = 0.2
      this.customerIndustryNo1 = undefined
      this.customerIndustryNo2 = undefined
      this.customerIndustryNo3 = undefined
      this.addressLevelNo1 = undefined
      this.addressLevelNo2 = undefined
      this.addressLevelNo3 = undefined
      this.addressLevelNo4 = undefined
      this.address = ''
      this.attribution = ''
    }
  }

}
</script>
<style lang='less'>
@import url("./index.less");
</style>
