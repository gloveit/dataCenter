import Vue from 'vue'
import { message } from 'ant-design-vue'

Vue.use(message);

/**
 * @clickLastTime时间戳数组
 * 全局指令,绑定值为事件click防抖时间间隔
 */
let clickLastTime = [];

Vue.directive('preventReClick', {
  inserted(e, binding) {
    e.addEventListener('click', () => {
      let clickCurrentTmie = '';
      clickCurrentTmie = new Date().getTime();
      clickLastTime.push(clickCurrentTmie)
      if (clickLastTime.length > 1){
        let timeDiff = clickCurrentTmie - clickLastTime[clickLastTime.length-2];
        if (timeDiff < binding.value){
          message.warning("请不要连读点击!")
        }
      }
      if (clickLastTime.length >200){
        clickLastTime.splice(0,clickLastTime.length-2)
      }
    })
  }
})
