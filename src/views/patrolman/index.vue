<template>
  <div class="patrolman-index-wrap">
    <div class="amap-wrapper">
      <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
    </div>
    <div class="patrolman-index-wrap-amap-meterList">
      <div class="patrolman-index-wrap-amap-meterList-title">
        <span class="iconfont">&#xe6ed;</span>

        <div class="patrolman-index-wrap-amap-meterList-title-descrip">
          <span class="patrolman-index-wrap-amap-meterList-title-descrip-chinese">工商户异常巡检</span>
          <span
            class="patrolman-index-wrap-amap-meterList-title-descrip-english"
          >Abnormal inspection</span>
        </div>

        <div class="patrolman-index-wrap-amap-meterList-title-account">
          <span class="patrolman-index-wrap-amap-meterList-title-account-number1">{{errorAccount}}</span>
          <div class="patrolman-index-wrap-amap-meterList-title-account-slash"></div>
          <span class="patrolman-index-wrap-amap-meterList-title-account-number2">{{allMeter}}</span>
        </div>
      </div>

      <div class="patrolman-index-wrap-amap-meterList-title-button">
        <button
          @click="handleAllErrorMeter"
          v-preventReClick="3000"
          :class="{'patrolman-index-wrap-amap-meterList-title-button-all':true,active:isactive}"
        >全部异常</button>
        <button
          @click="handlePressure"
          v-preventReClick="3000"
          :class="{'patrolman-index-wrap-amap-meterList-title-button-pressure':true,active:pisactive}"
        >压力异常({{pressureNumber}})</button>
        <button
          @click="handleTemperature"
          v-preventReClick="3000"
          :class="{'patrolman-index-wrap-amap-meterList-title-button-temperature':true,active:tisactive}"
        >温度异常({{temperatureNumber}})</button>
      </div>

      <div class="patrolman-index-wrap-amap-meterList-title-meterlist">
        <ul class="patrolman-index-wrap-amap-meterList-title-meterlist-list">
          <li
            v-for="(item,index) in meterList"
            :key="index"
            @click="handleMapDetail({lng:116.523195, lat:39.993253,index:index,temperature:item.temperature,pressure:item.pressure,meterId:item.meterId})"
            class="patrolman-index-wrap-amap-meterList-title-meterlist-list-detail"
          >
            <span
              class="patrolman-index-wrap-amap-meterList-title-meterlist-list-eq"
            >{{(page-1)*6+(index+1)>=10?(page-1)*6+(index+1):"0"+((page-1)*6+(index+1))}}</span>
            <div class="patrolman-index-wrap-amap-meterList-title-meterlist-list-wrap">
              <p>{{item.companyName}}</p>
              <span
                v-if="item.temperature==true"
                class="patrolman-index-wrap-amap-meterList-title-meterlist-list-wrap-button"
              >温度异常</span>
              <span
                v-if="item.pressure==true"
                class="patrolman-index-wrap-amap-meterList-title-meterlist-list-wrap-button"
              >压力异常</span>
            </div>
          </li>
        </ul>
        <div class="patrolman-index-wrap-amap-meterList-title-meterlist-pagenumber">
          <span
            @click="prevMeterList('prev')"
            class="iconfont patrolman-index-wrap-amap-meterList-title-meterlist-pagenumber-btprev"
          >&#xe6e5;</span>
          <span
            class="patrolman-index-wrap-amap-meterList-title-meterlist-pagenumber-number"
          >{{page}}</span>
          <span class="patrolman-index-wrap-amap-meterList-title-meterlist-pagenumber-pixe"></span>
          <span
            class="patrolman-index-wrap-amap-meterList-title-meterlist-pagenumber-number"
          >{{pageNumber}}</span>
          <span
            @click="nextMeterList('next')"
            class="iconfont patrolman-index-wrap-amap-meterList-title-meterlist-pagenumber-bt"
          >&#xe6e5;</span>
        </div>
      </div>
    </div>
    <vue-scroll :ops="ops" class="ops">
      <div v-show="isShowMeterDetail" class="patrolman-index-wrap-amap-meterDetail">
        <div class="patrolman-index-wrap-amap-meterDetail-wrap">
          <div>
            <span class="iconfont patrolman-index-wrap-amap-meterDetail-wrap-icon">&#xe6ee;</span>
            <span class="patrolman-index-wrap-amap-meterDetail-wrap-content">表具状态</span>
            <a
              href="javascipt::"
              @click="handleMeterDetailClose"
              class="patrolman-index-wrap-amap-meterDetail-wrap-close"
            >关闭</a>
          </div>
          <div class="patrolman-index-wrap-amap-meterDetail-wrap-business">
            <span class="patrolman-index-wrap-amap-meterDetail-wrap-common-message">工商户基本信息</span>
            <span class="patrolman-index-wrap-amap-meterDetail-wrap-common-line"></span>
            <p>
              <label>用户号:</label>
              <span>{{meterStatus.length>0?meterStatus[eq].userNo:""}}</span>
            </p>
            <p>
              <label>用户名:</label>
              <span>{{meterStatus.length>0?meterStatus[eq].custName:""}}</span>
            </p>
            <p>
              <label>表号:</label>
              <span>{{meterStatus.length>0?meterStatus[eq].meterNo:""}}</span>
            </p>
            <p>
              <label>联系电话:</label>
              <span>{{meterStatus.length>0?meterStatus[eq].custMobile:""}}</span>
            </p>
            <p>
              <label>地址:</label>
              <span>{{meterStatus.length>0?meterStatus[eq].address:""}}</span>
            </p>
          </div>
          <div class="patrolman-index-wrap-amap-meterDetail-wrap-realtime">
            <span class="patrolman-index-wrap-amap-meterDetail-wrap-commom-message">实时信息</span>
            <span class="patrolman-index-wrap-amap-meterDetail-wrap-common-line"></span>
            <div class="patrolman-index-wrap-amap-meterDetail-wrap-realtime-wrap">
              <img src="../../assets/img/meter.png" style="width:100%;height:100%">
            </div>
            <p>
              <label>照片拍摄时间:</label>
              <span>2019/06/19 14:30:00</span>
            </p>
          </div>
          <div class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail">
            <span class="errorIcon" v-show="meterDetailTemperature">温度异常</span>
            <span class="errorIcon" v-show="meterDetailPressure">压力异常</span>
            <p class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage">
              <label>当前压力:</label>
              <span
                class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage-data"
              >{{meterCurrentStatus.Pressure}}</span>
              <span class="iconfont icon-line" @click="handleLineData('Pressure')">&#xe6f0;</span>
            </p>
            <p class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage">
              <label>当前温度:</label>
              <span
                class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage-data"
              >{{meterCurrentStatus.Temperature}}</span>
              <span class="iconfont icon-line" @click="handleLineData('Temperature')">&#xe6f0;</span>
            </p>
            <p class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage">
              <label>当前电压:</label>
              <span
                class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage-data"
              >{{meterCurrentStatus.vol}}</span>
              <span class="iconfont icon-line" @click="handleLineData('Temperature')">&#xe6f0;</span>
            </p>
            <p class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage">
              <label>当前余额:</label>
              <span
                class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage-data"
              >{{meterCurrentStatus.balance}}</span>
              <span class="iconfont icon-line" @click="handleLineData('Temperature')">&#xe6f0;</span>
            </p>
            <p class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage">
              <label>工况瞬时:</label>
              <span
                class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage-data"
              >{{meterCurrentStatus.WorkingFlow}}</span>
              <span @click="handleLineData('Working_Flow')" class="iconfont icon-line">&#xe6f0;</span>
            </p>
            <p class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage">
              <label>标况瞬时:</label>
              <span
                class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage-data"
              >{{meterCurrentStatus.StandardFlow}}</span>
              <span @click="handleLineData('Standard_Flow')" class="iconfont icon-line">&#xe6f0;</span>
            </p>
            <p class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage">
              <label>工况总量:</label>
              <span
                class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage-data"
              >{{meterCurrentStatus.WorkingSum}}</span>
              <span @click="handleLineData('Working_Sum')" class="iconfont icon-line">&#xe6f0;</span>
            </p>
            <p class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage">
              <label>标况总量:</label>
              <span
                class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage-data"
              >{{meterCurrentStatus.StandardSum}}</span>
              <span @click="handleLineData('Standard_Sum')" class="iconfont icon-line">&#xe6f0;</span>
            </p>
            <p class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage">
              <label>上次通讯:</label>
              <span
                class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-linemessage-data"
              >{{meterCurrentStatus.DataDate}}</span>
              <!-- <span class="iconfont icon-line">&#xe6f0;</span> -->
            </p>

            <div class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-nexterror">
              <span
                class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-nexterror-con"
              >下一个异常点</span>
              <a href="javascript:;">
                <span
                  class="iconfont patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-nexterror-icon"
                >&#xe6f1;</span>
              </a>
            </div>
            <div class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-warp">
              <button
                id="t"
                class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-wrap-question"
              >有问题,生成工单</button>
              <button
                class="patrolman-index-wrap-amap-meterDetail-wrap-meterdetail-wrap-ready"
              >标记为已巡检</button>
            </div>
          </div>
        </div>
      </div>
    </vue-scroll>
    <div class="echarts-line" v-show="isShowEcharts">
      <div class="echarts-line-close">
        <span class="iconfont" @click="closeMeterLine">&#xe643;</span>
      </div>
      <div class="echarts-line-wrap" id="meterLine"></div>
    </div>
  </div>
</template>

<script>
import { lazyAMapApiLoaderInstance } from "vue-amap";
import moment from "moment";
import getRequest from "../../api/intercept";
import vuescroll from "vuescroll/dist/vuescroll-native";
import Vue from "vue";
import $echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";

Vue.use(vuescroll);

export default {
  name: "index",
  components: {
    // VeLine
  },
  data() {
    return {
      map: "",
      //表具按钮状态
      isactive: true,
      pisactive: false,
      tisactive: false,
      // 异常总数
      errorAccount: "",
      temperatureNumber: "",
      pressureNumber: "",
      //所有表具
      allMeter: "",
      // allMeterId: "",
      //温度异常Id
      temperatureId: "",
      // 压力异常Id
      pressureId: "",
      allMarkers: [],
      isShowMeterDetail: true,
      page: 1,
      pageNumber: 1,
      //表具状态
      meterStatus: [],
      eq: 0,
      meterDetailTemperature: false,
      meterDetailPressure: false,
      meterCurrentStatus: "",
      // 折线图显示隐藏
      isShowEcharts: false,
      // echarts实例
      charts: "",
      //表Id
      oneMeterId: "",
      ops: {
        scrollPanel: {
          scrollingX: false
        },
        rail: {
          background: "#f00"
        },
        bar: {
          background: "#1c365c",
          opacity: "0.7",
          size: "8px"
        }
      },
      //工商户列表
      meterList: []
    };
  },
  methods: {
    hanlMeterDetail(data) {
      // console.log(data)
      this.meterList = [];
      this.meterStatus = [];
      if (data !== null && data !== "" && data !== undefined) {
        let allMeterList = data.list;
        for (let i = 0; i < allMeterList.length; i++) {
          let {
            meter_no,
            cust_name,
            user_no,
            cust_mobile,
            addr_des,
            meter_id
          } = allMeterList[i];
          this.meterList.push({ companyName: cust_name, meterId: meter_id });
          this.meterStatus.push({
            meterNo: meter_no,
            userNo: user_no,
            custMobile: cust_mobile,
            address: addr_des,
            custName: cust_name
          });
          // Object.assign(this.meterStatus,{"meterNo":meter_no,"userNo":user_no,"custMobile":cust_mobile,"address":addr_des,"custName":cust_name})
          if (allMeterList[i].ex_pid === 4) {
            this.meterList[i].temperature = true;
          }
          if (allMeterList[i].ex_pid === 5) {
            this.meterList[i].pressure = true;
          }
          this.meterDetailTemperature = this.meterList[0].temperature;
          this.meterDetailPressure = this.meterList[0].pressure;
          // console.log(that.meterList)
          // console.log(this.meterStatus);
        }
        this.pageNumber = Math.ceil(data.num.num / 6);
      } else {
        throw error("数据为空");
      }
      this.handleMeterCurrentStatus(this.meterList[0].meterId);
      this.oneMeterId = this.meterList[0].meterId;
    },
    prevnextMeterList(data) {
      let that = this;
      if (data === "prev") {
        if (that.page > 1) {
          that.page -= 1;
        } else {
          that.page = 1;
        }
      } else {
        if (that.page === that.pageNumber) {
          that.page = that.pageNumber;
        } else {
          that.page += 1;
        }
      }

      let id = "";
      if (that.isactive) {
        id = "";
      }
      if (that.tisactive) {
        id = that.temperatureId;
      }
      if (that.pisactive) {
        id = that.pressureId;
      }
      getRequest
        .get(
          "/abnormalMeter/wdylExceptionList?id=" +
            id +
            "&page=" +
            that.page +
            "&cnt=6"
        )
        .then(data => {
          that.hanlMeterDetail(data);
        });
    },
    //温度、压力异常数据
    loadMeterAccount() {
      getRequest.get("/abnormalMeter/wdylExceptions").then(data => {
        // console.log(data);
        this.temperatureNumber = data[1].sum;
        this.temperatureId = data[1].pid;
        this.pressureNumber = data[0].sum;
        this.pressureId = data[0].pid;
        this.allMeter = data[3].nums;
        // this.allMeterId = data[2].pid;
        this.errorAccount = data[0].sum + data[1].sum;
        this.loadMeterList();
        this.pageNumber = Math.ceil(data[2].sum / 6);
      });
    },
    //全部异常
    loadMeterList() {
      let that = this;
      if (that.page !== 1) {
        that.page = 1;
      }
      getRequest
        .get("/abnormalMeter/wdylExceptionList?id&page=" + that.page + "&cnt=6")
        .then(data => {
          that.hanlMeterDetail(data);
        });
    },
    // 压力异常
    handlePressure() {
      let that = this;
      that.isactive = false;
      that.tisactive = false;
      that.pisactive = true;
      if (that.page !== 1) {
        that.page = 1;
      }
      getRequest
        .get(
          "/abnormalMeter/wdylExceptionList?id=" +
            that.pressureId +
            "&page=" +
            that.page +
            "&cnt=6"
        )
        .then(data => {
          that.hanlMeterDetail(data);
        });
    },
    // 温度异常
    handleTemperature() {
      let that = this;
      that.isactive = false;
      that.pisactive = false;
      that.tisactive = true;
      if (that.page !== 1) {
        that.page = 1;
      }
      getRequest
        .get(
          "/abnormalMeter/wdylExceptionList?id=" +
            that.temperatureId +
            "&page=" +
            that.page +
            "&cnt=6"
        )
        .then(data => {
          that.hanlMeterDetail(data);
        });
    },
    //全部异常
    handleAllErrorMeter() {
      this.isactive = true;
      this.pisactive = false;
      this.tisactive = false;
      this.loadMeterList();
    },
    //重新设置地图中心点并添加动画
    handleMapDetail(data) {
      this.eq = data.index;
      this.meterDetailTemperature = data.temperature;
      this.meterDetailPressure = data.pressure;
      this.isShowMeterDetail = true;
      let targetMarker = "";
      let position = new AMap.LngLat(data.lng, data.lat);
      this.map.setCenter(position);
      // this.map.setFitView(position);
      let index = this.map
        .getAllOverlays("marker")
        .findIndex(
          el => el.Uh.position.lng == data.lng && el.Uh.position.lat == data.lat
        );
      // let markerId = this.map.getAllOverlays("marker")[index].Uh.extDate.id;
      targetMarker = this.allMarkers[index];
      targetMarker.setAnimation("AMAP_ANIMATION_BOUNCE");
      this.handleMeterCurrentStatus(data.meterId);
      this.oneMeterId = data.meterId;
    },
    handleMeterDetailClose() {
      this.isShowMeterDetail = false;
    },
    prevMeterList(data) {
      this.prevnextMeterList(data);
    },
    nextMeterList(data) {
      this.prevnextMeterList(data);
    },
    handleMeterCurrentStatus(id) {
      getRequest
        .get("/abnormalMeter/abnormalValue?meterId=" + id)
        .then(data => {
          if (data !== null && data !== undefined && data !== "") {
            let {
              Pressure,
              Temperature,
              vol,
              balance,
              Standard_Flow,
              Working_Flow,
              Working_Sum,
              Data_Date,
              Standard_Sum
            } = data[0];
            this.meterCurrentStatus = Object.assign(
              {},
              {
                Pressure: Pressure,
                Temperature: Temperature,
                vol: "0",
                balance: "0",
                StandardFlow: Standard_Flow,
                WorkingFlow: Working_Flow,
                WorkingSum: Working_Sum,
                DataDate: moment(Data_Date).format("lll"),
                StandardSum: Standard_Sum
              }
            );
            // console.log(this.meterCurrentStatus);
          } else {
            throw Error("数据为空!");
          }
        });
    },
    async drawMeterLine(xdata, ydata, type) {
      this.isShowEcharts = true;
      // let charts = '';
      let yName = "";
      if (type === "Pressure") {
        yName = "压力(kpa)";
      } else if (type === "Temperature") {
        yName = "温度(℃)";
      } else if (type === "Working_Flow") {
        yName = "工况流量(m³/s)";
      } else if (type === "Standard_Flow") {
        yName = "标况流量(m³/s)";
      } else if (type === "Working_Sum") {
        yName = "工况总量(m³/s)";
      } else if (type === "Standard_Sum") {
        yName = "标况总量(m³/s)";
      }
      // setTimeout(function(){
      this.charts = $echarts.init(document.getElementById("meterLine"));
      this.charts.setOption({
        tooltip: {
          show: true
        },
        xAxis: {
          type: "category",
          name: "时间",
          axisLine: {
            lineStyle: {
              color: "#384a60"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#fff"
          },
          nameTextStyle: {
            color: "#fff"
          },
          data: xdata
        },
        yAxis: {
          type: "value",
          name: yName,
          nameGap: "30",
          axisLine: {
            lineStyle: {
              color: "#384a60"
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: "#fff"
          },
          nameTextStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            data: ydata,
            type: "line",
            lineStyle: {
              color: "#ffe23f"
            },
            itemStyle: {
              color: "yellow"
            }
          }
        ]
      });
      // },1)
    },
    closeMeterLine() {
      this.isShowEcharts = false;
    },
    handleLineData(type) {
      getRequest
        .get(
          "/abnormalMeter/abnormalPolygraph?meterId=" +
            this.oneMeterId +
            "&value=" +
            type
        )
        .then(data => {
          // console.log(data);
          let xData = [];
          let yData = [];
          for (let i = 0; i < 10; i++) {
            xData.push(moment(data.Data_Date[i]).format("YYYY/MM/D h:mm:ss"));
            yData.push(data[type][i]);
          }
          this.drawMeterLine(xData, yData, type);
        });
    }
  },
  mounted() {
    this.loadMeterAccount();
    lazyAMapApiLoaderInstance.load().then(() => {
      // const roadNet = new AMap.TileLayer.RoadNet(); //路网图层
      const redMeter =
        '<span class="iconfont" style="font-size:23px;color:#ff2a00">&#xe6eb;</span>';
      const blueMeter =
        '<span class="iconfont" style="font-size:23px;color:#3acaff">&#xe6ea;</span>';
      let positions = [
        { lnglat: [116.523195, 39.993253], meterStatus: "lanmeter" },
        { lnglat: [116.473195, 39.923253], meterStatus: "hongmeter" },
        { lnglat: [116.483195, 39.903253], meterStatus: "lanmeter" },
        { lnglat: [116.493195, 39.973253], meterStatus: "hongmeter" },
        { lnglat: [116.473195, 39.973253], meterStatus: "lanmeter" },
        { lnglat: [116.483195, 39.913253], meterStatus: "hongmeter" },
        { lnglat: [116.493195, 39.953253], meterStatus: "lanmeter" },
        { lnglat: [116.473195, 39.953253], meterStatus: "hongmeter" },
        { lnglat: [116.453195, 39.953253], meterStatus: "lanmeter" }
      ];
      let markers = [];
      for (let i = 0; i < positions.length; i++) {
        if (positions[i].meterStatus === "lanmeter") {
          markers[i] = new AMap.Marker({
            position: positions[i].lnglat,
            // icon:require('@/assets/img/lanbiao1.png'),
            content: blueMeter,
            anchor: "bottom-left",
            extDate: {
              id: i + 1
            }
          });
        } else {
          markers[i] = new AMap.Marker({
            position: positions[i].lnglat,
            // icon:require('@/assets/img/lanbiao1.png'),
            content: redMeter,
            anchor: "bottom-left",
            extDate: {
              id: i + 1
            }
          });
        }
      }

      this.map = new AMap.Map("amap-vue", {
        zoom: 18,
        zooms: [3, 18],
        mapStyle: "amap://styles/119a67659b512895960997a75718245d", //设置地图的显示样式
      });

      this.allMarkers = markers;
      this.map.add(this.allMarkers);
      const cmap = this.map;
      cmap.plugin("AMap.Geolocation", function() {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000,
          maximumAge: 0,
          convert: true,
          showButton: false,
          buttonPosition: "RT",
          buttonOffset: new AMap.Pixel(10, 20),
          showMarker: false,
          showCircle: false,
          panToLocation: true,
          zoomToAccuracy: true
        });
        cmap.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
        AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
      });
    });
  }
};
</script>

<style lang="less">
@import url("./index.less");
</style>
