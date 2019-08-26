import Vue from 'vue'
import VueAMap from 'vue-amap';
import { lazyAMapApiLoaderInstance } from 'vue-amap';

Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: 'c51c55ffd4ef35efaa8524e53d191896', //你的高德key
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
// console.log(lazyAMapApiLoaderInstance)
// 自定义地图样式，功能
lazyAMapApiLoaderInstance.load().then(() => {
  // const map = new AMap.Map('amap-vue', {
  //   mapStyle: 'amap://styles/119a67659b512895960997a75718245d', //设置地图的显示样式
  // });
  // your code ...
   new AMap.Map('amap-vue', {
    mapStyle: 'amap://styles/119a67659b512895960997a75718245d', //设置地图的显示样式
    center: [116.397428, 39.90923],//中心点坐标
  });
  // map.setMapStyle('amap://styles/119a67659b512895960997a75718245d');
});
