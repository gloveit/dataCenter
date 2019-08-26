<template>
  <div class="tWrap">
    <div
      class='spin-table'
      v-if='spinning'
    >
      <a-spin size="large" />
    </div>
    <div class="
        table_demo">
      <div
        class='empty-data-prompt'
        v-if='dataSource.length<1'
      >
        <div class='no-data-icon'>
          <i></i>
          <span class='no-data-title'>暂无数据</span>
        </div>

      </div>
      <div
        :class="['tableMeter table-fixed-left',{'isNoneData': dataSource.length<1}]"
        :style="{'width': 50+styleWidthLeft+'px' }"
        v-if='columnsLeft.length >0'
      >
        <base-table
          :data="dataSource"
          :columns="columnsLeft"
          :selection="selection"
          :scrollY='scroll.y'
          class="table-left"
          @selectionChange="handleSelectionChange"
          @rowClick="rowClick"
          :currentIndex="currentIndex"
        >
          <div
            v-for="item in columnsLeft.filter((item)=>{
              if(!!item.scopedSlots){
                return item
              }
            })"
            :key='item.dataIndex'
            :slot='item.scopedSlots.customRender'
            slot-scope="{data}"
          >
            <slot
              :name="item.scopedSlots.customRender"
              :data='data'
            ></slot>
          </div>
        </base-table>
        <i class="bottom-icon"></i>
      </div>
      <div :class="['tableMeter table-content',{'isNoneData': dataSource.length<1},{'table-scroll': !!scroll},{'only-table-content': columnsRight.length <1 }]">
        <base-table
          :data="dataSource"
          :columns="columnsMiddle"
          :selection="selection&&columnsLeft.length<1"
          class="table-content"
          :style="{width: !!scroll?scroll['x']:null }"
          :scrollY="!!scroll?scroll['y'] :'' "
          :currentIndex="currentIndex"
          @selectionChange="handleSelectionChange"
          @rowClick="rowClick"
        >
          <div
            v-for="item in columnsMiddle.filter((item)=>{
              if(!!item.scopedSlots){
                return item
              }
            })"
            :key='item.dataIndex'
            :slot='item.scopedSlots.customRender'
            slot-scope="{data}"
          >
            <slot
              :name="item.scopedSlots.customRender"
              :data='data'
            ></slot>
          </div>
        </base-table>

      </div>
      <div
        :class="['tableMeter table-fixed-right',{'isNoneData': dataSource.length<1}]"
        v-if='columnsRight.length >0'
        :style="{'width': styleWidthRight+'px' }"
      >
        <base-table
          :data="dataSource"
          class="table-right"
          :columns="columnsRight"
          :currentIndex="currentIndex"
          :scrollY='scroll.y'
          @selectionChange="handleSelectionChange"
          @rowClick="rowClick"
        >

          <div
            v-for="item in columnsRight.filter((item)=>{
              if(!!item.scopedSlots){
                return item
              }
            })"
            :key='item.dataIndex'
            :slot='item.scopedSlots.customRender'
            slot-scope="{data}"
          >
            <slot
              :name="item.scopedSlots.customRender"
              :data='data'
            ></slot>
          </div>
        </base-table>
        <i class="bottom-icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import moment from 'moment'
import BaseTable from './base_table.vue'
export default {
  name: 'gc-table',
  props: ['dataSource', 'columns', 'meterNormal', 'stateNormal', 'timeNormal', 'customTime', 'scroll', 'spinning', 'selection'],
  components: {
    BaseTable
  },
  data () {
    return {
      data: [],
      columnsMiddle: [],
      columnsRight: [],
      columnsLeft: [],
      currentIndex: -1,
      styleWidthLeft: undefined,
      styleWidthRight: undefined
    }
  },
  mounted: function () {
    $('.tableMeter').on('mouseenter', 'tr', e => {
      this.currentIndex = parseInt(e.currentTarget.accessKey)
    })
    $('.tableMeter').on('mouseenter', 'tr', e => {
      this.currentIndex = parseInt(e.currentTarget.accessKey)
    })
    $('.tableMeter').on('mouseenter', 'tr', e => {
      this.currentIndex = parseInt(e.currentTarget.accessKey)
    })
    let s = 1
    $('.table-fixed-left .table-body-text').mouseover(function () {
      s = 1
      $('.table-fixed-left .table-body-text').scroll(function () {
        if (s === 2 || s === 3) {
          return
        }
        $('.table-fixed-right .table-body-text').scrollTop($('.table-fixed-left .table-body-text').scrollTop())
        $('.table-content .table-body-text').scrollTop($('.table-fixed-left .table-body-text').scrollTop())
      })
    })

    $('.table-content .table-body-text').mouseover(function () {
      s = 2
      $('.table-content .table-body-text').scroll(function () {
        if (s === 1 || s === 3) {
          return
        }
        $('.table-fixed-right .table-body-text').scrollTop($('.table-content .table-body-text').scrollTop())
        $('.table-fixed-left .table-body-text').scrollTop($('.table-content .table-body-text').scrollTop())
      })
    })
    $('.table-fixed-right .table-body-text').mouseover(function () {
      s = 3
      $('.table-fixed-right .table-body-text').scroll(function () {
        if (s === 1 || s === 2) {
          return
        }
        $('.table-content .table-body-text').scrollTop($('.table-fixed-right .table-body-text').scrollTop())
        $('.table-fixed-left .table-body-text').scrollTop($('.table-fixed-right .table-body-text').scrollTop())
      })
    })
    $(document).on('click', '.range-picker-flwe', (e) => {
      e.stopPropagation()
    })
  },
  created () {
    let left = []
    let middle = []
    let right = []
    _.get(this, 'columns', []).forEach((item) => {
      if (item.fixed === 'left') {
        left.push(item)
      } else if (item.fixed === 'right') {
        right.push(item)
      } else {
        middle.push(item)
      }
    })
    let rightStyle = null
    let leftStyle = 50
    right.forEach((item) => {
      if (item.width) {
        rightStyle += item.width
      } else {
        rightStyle += 100
      }
    })
    left.forEach((item) => {
      if (item.width) {
        leftStyle += item.width
      } else {
        leftStyle += 100
      }
    })
    this.columnsMiddle = middle
    this.columnsRight = right
    this.columnsLeft = left
    this.styleWidthLeft = leftStyle
    this.styleWidthRight = rightStyle
  },
  methods: {
    rowClick (row, index) {
      // console.log('单选row:', row)
      // console.log('单选index:', index)
    },
    handleSelectionChange (v) {
      // console.log('vvv', v)
    }
  }
}
</script>

<style  lang="less">
.tWrap {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  position: relative;
  .spin-table {
    position: absolute;
    left: -3px;
    top: 0;
    width: calc(~"100% + 6px");
    height: 100%;
    background: rgba(0, 0, 0, 0.05);
    z-index: 155;
    line-height: 120px;
    text-align: center;
  }
  .table_demo {
    display: flex;
    justify-content: flex-start;
    align-items: top;

    position: relative;
    .empty-data-prompt {
      position: absolute;
      left: 25px;
      width: 100%;
      height: 200px;
      line-height: 40px;
      top: 50px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      margin-left: -25px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      .no-data-icon {
        width: 100%;
        height: 128px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        i {
          display: block;
          width: 106px;
          height: 68px;
          background: url("../../../assets/img/nonedata.png");
          background-size: 100% 100%;
        }
        .no-data-title {
          width: 100%;
          font-family: MicrosoftYaHei;
          font-size: 16px;
          color: #cccccc;
        }
      }
    }
  }
  .table-fixed-left {
    position: relative;
    border-right: 1px dashed #d9d9d9;
    &.isNoneData {
      border-right: none;
      .bottom-icon {
        display: none;
      }
    }
    .bottom-icon {
      position: absolute;
      width: 100%;
      height: 17px;
      bottom: 0;
      left: 0;
      background: #d6d9de;
    }
  }
  .table-fixed-right {
    width: 95px;
    position: relative;
    // box-shadow: -6px 0 6px -4px rgba(0, 0, 0, 0.1);
    border-left: 1px dashed #d9d9d9;
    &.isNoneData {
      border-left: none;
      overflow: hidden;
      .bottom-icon {
        display: none;
      }
    }

    .bottom-icon {
      position: absolute;
      width: 100%;
      height: 17px;
      bottom: 0;
      left: 0;
      background: #d6d9de;
    }
  }
  .table-content {
    flex: 1;
    margin-right: -1.5px;
    margin-left: -1.5px;
    padding: none;
    width: auto;
    &.table-scroll {
      overflow-y: auto;
    }
    min-height: 250px;
    &.isNoneData {
      border-left: none;
      overflow: hidden;
    }
  }
  .table-content::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }
  .table-content::-webkit-scrollbar-thumb {
    background: rgba(154, 182, 219, 1);
    border-radius: 2.5px;
  }
  .table-content::-webkit-scrollbar-button:horizontal:single-button:start {
    width: 17px;
    height: 17px;
    background: url("../../../assets/img/scroll_left.png") no-repeat;
    background-size: 100% 110%;
    background-position: center center;
    border-radius: 0;
    color: #9ab6db;
    cursor: pointer;
  }
  .table-content::-webkit-scrollbar-button:horizontal:single-button:end {
    width: 17px;
    height: 17px;
    background: url("../../../assets/img/scroll_right.png") no-repeat;
    background-size: 100% 110%;
    background-position: center center;
    cursor: pointer;
  }
  .tableMeter .table-body-text {
    overflow: auto;
  }
  .table-content .table-body-text::-webkit-scrollbar,
  .table-fixed-left .table-body-text::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .table-content .table-body-text::-webkit-scrollbar-thumb {
    background: #9ab6db;
    border-radius: 2.5px;
  }

  .table-content.only-table-content .table-body-text tr td:last-child {
    padding-left: 15px;
  }
  .table-content.only-table-content .table-body-text::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  .table-content.only-table-content .table-body-text::-webkit-scrollbar-thumb {
    background: #9ab6db;
    border-radius: 2.5px;
  }
  .table-fixed-right .table-body-text::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  .table-fixed-right .table-body-text::-webkit-scrollbar-thumb {
    background: rgba(154, 182, 219, 1);
    border-radius: 2.5px;
  }
}
</style>
