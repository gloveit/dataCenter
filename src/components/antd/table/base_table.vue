<template>
  <div class="gc-table">
    <table class="gc-table-head">
      <tr>
        <td
          class="gc-table-body-checkbox"
          v-if="selection"
        >
          <span
            class="gc-checkbox"
            @click="checkAll"
          >
            <span
              class="gc-checkbox-inner"
              v-show="allChecked"
            ></span>
          </span>
        </td>
        <td
          v-for="(v1,index1) in columns "
          :key="index1"
          :style="{width: v1.width+'px' }"
        >
          {{v1.title}}
          <div
            @click.stop='filterDown(index1,v1)'
            class='dwon-icon'
            v-if='v1.filterDown'
          >
            <span class='dwon-icon-bg'>
            </span>
            <div
              class='fliter-box'
              v-if="!showFilter[index1].isHide"
            >
              <slot
                :name='v1.filterScopedSlots'
                :closeFun='cloneAllFloating'
              ></slot>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <div
      class="table-body-text"
      :style='{maxHeight: scrollY}'
    >
      <table class="gc-table-body">
        <colgroup></colgroup>
        <tbody>
          <tr
            v-for="(v1,index1) in data"
            :accessKey="index1"
            :key="index1"
            @click="rowClick(v1,index1)"
            :class="[{'highlightCurRow':currentIndex===index1},{'highlightCurRowLinght': index1%2===1}]"
          >
            <td
              class="gc-table-body-checkbox"
              v-if="selection"
            >
              <span
                class="gc-checkbox"
                @click="changeCheck(index1)"
              >
                <span
                  class="gc-checkbox-inner"
                  v-show="dataCheck[index1]['check'] === true"
                ></span>
              </span>
            </td>
            <td
              v-for="(v2,index2) in columns"
              :key="index2"
              :title='v1[v2.dataIndex]'
              :style="{width: v2.width+'px' }"
            >
              <div
                v-if='!!v2.scopedSlots'
                class='asdaf'
              >
                <slot
                  :name='v2.scopedSlots.customRender'
                  :data='v1'
                >
                </slot>
              </div>
              <span v-else>{{v1[v2.dataIndex]}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
export default {
  name: 'base-table',
  data () {
    return {
      highlight: -1,
      data2: [], // data深拷贝
      dataCheck: [],
      allChecked: false,
      sortIndex: -1,
      sortUp: 0,
      showFilter: [],
      demo: 'wangchangqi'
    }
  },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    highlightCurRow: {
      type: Boolean,
      default: true
    },
    selection: {
      type: Boolean,
      default: false
    },
    currentIndex: {
      type: Number,
      default: -1
    },
    scrollY: {
      type: String,
      default: null
    }
  },
  components: {},
  methods: {
    // 行点击
    rowClick (v, index) {
      this.highlight = index
      this.$emit('rowClick', v, index)
    },
    // 改变多选选项
    changeCheck (index) {
      this.dataCheck[index].check = !this.dataCheck[index].check
      this.dataCheck.splice(index, 1, this.dataCheck[index])
      let checked = []
      this.dataCheck.forEach((v, i) => {
        if (v.check) {
          checked.push(this.data[i])
        }
      })
      if (checked.length == this.data.length) {
        this.allChecked = true
      } else {
        this.allChecked = false
      }
      this.$emit('selectionChange', checked)
    },
    // 全选和全不选
    checkAll () {
      let checked = []
      if (this.allChecked) {
        this.dataCheck = Array.apply(null, { length: this.data.length }).map(
          function () {
            return { check: false }
          }
        )
      } else {
        this.dataCheck = Array.apply(null, { length: this.data.length }).map(
          function () {
            return { check: true }
          }
        )
        checked = this.data
      }
      this.allChecked = !this.allChecked
      this.$emit('selectionChange', checked)
    },
    filterDown (index, val) {
      let newFilter = _.cloneDeep(this.showFilter.map((item) => {
        item.isHide = true
        return item
      }))
      _.set(newFilter, `[${index}].isHide`, false)
      this.showFilter = newFilter
    },
    cloneAllFloating () {
      let newFilter = _.cloneDeep(this.showFilter)
      newFilter.forEach((item) => {
        item.isHide = true
      })
      this.showFilter = newFilter
    },
    oCopy (obj) {
      obj.select()
      let js = obj.createTextRange()
      js.execCommand('Copy')
      alert('复制成功!')
    }
  },
  created () {
    // 深拷贝
    this.data2 = JSON.parse(JSON.stringify(this.data))
    this.dataCheck = Array.apply(null, { length: this.data2.length }).map(
      function () {
        return { check: false }
      }
    )
    this.showFilter = Array.apply(null, { length: this.columns.length }).map(
      function () {
        return { isHide: true }
      }
    )
  },
  watch: {
    data (val) {
      this.data2 = JSON.parse(JSON.stringify(this.data))
      this.dataCheck = Array.apply(null, { length: this.data2.length }).map(
        function () {
          return { check: false }
        }
      )
      this.allChecked = false
    }
  },
  mounted () {
    $(document).on('click', () => {
      this.cloneAllFloating()
    })
  }
}
</script>

<style lang='less'>
.gc-table-head {
  table-layout: fixed;
  width: 100%;
  color: #515a6e;
  font-size: 14px;
  border-collapse: collapse;
}
.gc-table-head tr {
  text-align: left;
  vertical-align: middle;
}
.gc-table-head tr td {
  box-sizing: border-box;
  // padding: 8px 5px;
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  font-weight: 600;
  background: #ebedf0;
}
.gc-table-head tr td .dwon-icon {
  height: 100%;
  width: 10px;
  display: inline-block;
  cursor: pointer;
  .dwon-icon-bg {
    display: inline-block;
    height: 6px;
    margin-bottom: 2px;
    margin-left: 2px;
    width: 13px;
    background: url("../../../assets/img/down.png") no-repeat;
    background-size: 100% 100%;
  }
  position: relative;
  .fliter-box {
    position: absolute;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    display: block;
    right: 0px;
    top: 32px;
    &.hide {
      display: none;
    }
  }
}
.gc-table-body {
  table-layout: fixed;

  width: 100%;
  font-size: 14px;
  border-collapse: collapse;
}
.gc-table-body tr {
  transition: background-color 0.25s ease;
  background: #fff;
}
/* .gc-table-body tr:hover{
        background:#f5f7fa;
        vertical-align: middle;
    } */
.gc-table-body tr.highlightCurRowLinght {
  background: #f5f7fa;
}
.gc-table-body tr.highlightCurRow {
  background: #f0f6ff;
}
.gc-table-body tr td {
  color: #606266;
  box-sizing: border-box;
  // padding: 8px 5px;
  padding: 0 10px;
  height: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.gc-table-body-checkbox {
  width: 50px;
  text-align: center;
}
.gc-checkbox {
  vertical-align: middle;
  width: 14px;
  height: 14px;
  display: inline-block;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 1;
  cursor: pointer;
}
/* .gc-checkbox:hover{
        border-color:#409eff;
    } */
.gc-checkbox-inner {
  background-color: #409eff;
  border: 1px solid #409eff;
  display: inline-block;
  width: 14px;
  height: 14px;
  position: absolute;
  box-sizing: border-box;
  top: -1px;
  left: -1px;
  border-radius: 2px;
}
.gc-checkbox-inner:after {
  content: "";
  display: table;
  width: 4px;
  height: 8px;
  position: absolute;
  top: 1px;
  left: 4px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
  -webkit-transform: rotate(45deg) scale(1);
  transform: rotate(45deg) scale(1);
}
.gc-table .caret-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 18px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
}
.gc-table .sort-caret {
  width: 0;
  height: 0;
  border: 5px solid transparent;
  position: absolute;
  left: 7px;
}
.gc-table .sort-caret.ascending {
  border-bottom-color: #c0c4cc;
  top: -3px;
}
.gc-table .curSort.sort-caret.ascending {
  border-bottom-color: #409eff;
}
.gc-table .sort-caret.descending {
  border-top-color: #c0c4cc;
  bottom: -3px;
}
.gc-table .curSort.sort-caret.descending {
  border-top-color: #409eff;
}
</style>
