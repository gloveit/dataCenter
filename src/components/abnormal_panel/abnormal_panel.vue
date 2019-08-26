<template>
  <div class='panel-container-page'>
    <header class='header'>
      异常面板
      <a-icon
        type="close"
        class='close-abnormal-panel'
        @click='closeAbnormalPanel(false)'
      />
    </header>
    <div class='panel-container-page-content'>
      <div class='select'>
        <a-select
          size="small"
          :defaultValue="currentYear"
          :style="{'width': '80px'}"
          @change="handleChange"
        >
          <a-select-option
            v-for="i in year"
            :key="i"
          >
            {{i}}
          </a-select-option>
        </a-select>
      </div>
      <div class='month-error-list'>
        <div
          v-for="item of dateJson"
          :key='item.key'
          class='month-item'
        >
          <div class='month-title'>
            {{item.title}}
          </div>
          <ul class="month-day">
            <li
              v-for="v in item.list"
              :key='v'
              @click="changeActiive(item.key+v)"
              :class="[{'date-selected': action === `${item.key}${v}`}]"
            >{{v}}</li>
          </ul>
        </div>
      </div>
    </div>
    <footer class='footer'>
      <a-button
        size='small'
        class='positioning'
        :disabled='!currentDate'
        @click="wrongLocation"
      >定位</a-button>
    </footer>
  </div>
</template>
<script>
import { getMeterAbnormalPanel } from '@/api/util'
import { DatePanel } from '@/config/date_panel'
import _ from 'lodash'
import $ from 'jquery'
export default {
  name: 'panel-container-page',
  data () {
    return {
      dateJson: [],
      action: '',
      currentDate: '',
      year: ['2019', '2018', '2017', '2016'],
      currentYear: '2019',
      actionDate: ''
    }
  },
  mounted: function () {
    $('.panel-container-page').on('click', (e) => {
      e.stopPropagation()
      return false
    })
    getMeterAbnormalPanel('meter_no=1440368414831&name=全部表具异常&year=2019').then((data) => {
      this.dateJson = DatePanel(data)
    })
  },
  methods: {
    handleChange (attr, remove, e) {
      this.currentYear = attr
      getMeterAbnormalPanel('meter_no=1440368414831&name=全部表具异常&year=' + attr).then((data) => {
        this.dateJson = DatePanel(data)
      })
      let evt = window.event || e
      evt.stopPropagation()
      return false
    },
    changeActiive (attr) {
      let newDate = _.find(this.dateJson, (item) => {
        return item.key === attr.slice(0, 5)
      })
      this.actionDate = this.currentYear + '-' + attr.slice(3, 5) + '-' + attr.slice(5, 7)
      this.currentDate = this.currentYear + '年' + attr.slice(3, 5) + '月' + attr.slice(5, 7) + '日'
      this.action = attr
    },
    closeAbnormalPanel (attr) {
      this.$emit('showAbnormalPanel', attr)
    },
    wrongLocation () {
      this.$emit('wrongLocation', this.actionDate)
    }
  }
}
</script>
<style lang='less' scoped>
@import url("./abnormal_panel.less");
</style>
