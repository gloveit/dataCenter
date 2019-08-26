<template>
  <div class='magnet-type-three'>
    <img src='../../../assets/demo.png'>
    <div class='model-text'>
      <div class='title'>
        {{dataSource.title}}
      </div>
      <div class='subtitle'>
        {{dataSource.sub_title}}
      </div>
      <div class="footer">
        <span>这是脚页</span>
        <span>2019-04-11</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'magnet-type-three',
  props: ['dataSource'],
  data () {
    return {
    }
  }
}
</script>
<style lang='less'>
.magnet-type-three {
  height: 226px;
  width: 472px;
  box-sizing: border-box;
  background: #fff;
  color: #000;
  position: relative;
  border-radius: 4px;
  img {
    height: 100%;
    width: 100%;
    border-radius: 4px;
  }
  .model-text {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100px;
    width: 100%;
    z-index: 2;
    padding: 20px;
    background: rgba(5, 22, 51, 0.6);
    .title {
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #f2f2f2;
    }
    .subtitle {
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #d9d9d9;
    }
    .footer {
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #999999;
      text-align: right;
    }
  }
}
</style>
