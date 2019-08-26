<template>
  <div class='meter-info-list-wrap'>
    <div class='custer-info'>
      <div class='custer-info-title'>
        <i class="iconfont">&#xe6d8;</i>客户信息
      </div>
      <ul class='meter-info-list-wrap'>
        <li
          :span='6'
          class='info-row'
          v-for='item in newdata.filter(item=>{
              return item.isCuster === true
          })'
          :key='item.key'
        >
          <span class='label'>
            {{item.name}}
          </span>
          <span
            class='input'
            :title='item.value'
          >{{item.value}}</span>
        </li>
      </ul>
    </div>
    <div class='meter-info'>
      <div class='meter-info-title'>
        <i class="iconfont">&#xe6d8;</i>表具信息
      </div>
      <ul class='meter-info-list-wrap'>
        <li
          :span='6'
          class='info-row'
          v-for='item in newdata.filter(item=>{
              return item.isCuster !== true
          })'
          :key='item.key'
        >
          <span class='label'>
            {{item.name}}
          </span>
          <span
            class='input'
            :title='item.value'
          >{{item.value}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'gc-meter-info',
  data () {
    return {
      data: [
        {
          key: 'user_no',
          name: '客户号',
          isCuster: true,
          value: '无'
        },
        {
          key: 'cust_name',
          name: '客户名称',
          isCuster: true,
          value: '无'
        },
        {
          key: 'addr_des',
          name: '地址描述',
          isCuster: true,
          value: '无'
        },
        {
          key: 'meter_no',
          name: '表具编号',
          value: '无'
        },
        {
          key: 'meter_model',
          name: '表具型号',
          value: '无'
        },
        {
          key: 'time1',
          name: '安装时间',
          value: '无'
        }, {
          key: 'start_meter_reading',
          name: '起始表读',
          value: '无'
        }, {
          key: 'time3',
          name: '采集时间',
          value: '无'
        }, {
          key: 'time2', //
          name: '表内时钟',
          value: '无'
        }, {
          key: '314', //
          name: '电压',
          value: '无'
        }, {
          key: '123123', //
          name: '信号强度',
          value: '无'
        },
        {
          key: '1231441', //
          name: '阀门状态',
          value: '无'
        }, {
          key: '12312441',
          name: '累积量', //
          value: '无'
        }, {
          key: '12314412',
          name: '剩余量', //
          value: '无'
        }, {
          key: '123144412',
          name: '充值量', //
          value: '无'
        }, {
          key: '12312313',
          name: '充值时间', //
          value: '无'
        }
      ]
    }
  },
  props: ['dataSource'],
  mounted: function () {
    this.data = this.data.map((item) => {
      item.value = _.get(this.dataSource, `${item.key}`, '无')
      return item
    })
  },
  computed: {
    newdata: function () {
      let jsonData = this.data.map((item) => {
        item.value = _.get(this.dataSource, `${item.key}`, '无')
        return item
      })
      return jsonData
    }
  }
}
</script>
<style lang='less'>
.meter-info-list-wrap {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .custer-info {
    width: 100%;
    .custer-info-title {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #666666;
      margin-bottom: 10px;
      i {
        color: #1b5ec1;
        font-size: 14px;
        margin-right: 10px;
      }
    }
    ul {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      flex-wrap: wrap;
      border-top: 1px solid #e8e8e8;
      border-right: 1px solid #e8e8e8;
      border-left: 1px solid #e8e8e8;
      li {
        width: 100%;
        // border-right: 1px solid #e6e6e6;
        position: relative;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
        .label {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #999999;
          width: 90px;
          height: 100%;
          display: block;
          background: #f5f7fa;
          text-align: right;
          padding-right: 20px;
        }
        .input {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          flex: 1;
          color: #999999;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding-left: 20px;
          padding-right: 10px;
        }
      }
    }
  }
  .meter-info {
    width: 100%;
    .meter-info-title {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #666666;
      margin-bottom: 10px;
      i {
        color: #1b5ec1;
        font-size: 14px;
        margin-right: 10px;
      }
    }
    ul {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      flex-wrap: wrap;
      border-top: 1px solid #e8e8e8;
      border-right: 1px solid #e8e8e8;
      border-left: 1px solid #e8e8e8;
      li {
        width: 100%;
        // border-right: 1px solid #e6e6e6;
        position: relative;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .label {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #999999;
          width: 90px;
          height: 100%;
          display: block;
          background: #f5f7fa;
          text-align: right;
          padding-right: 20px;
        }
        .input {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          flex: 1;
          color: #999999;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding-left: 20px;
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
