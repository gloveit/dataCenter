<template>
  <div class='north-combustion-tiles-wrap'>
    <img src='../../../assets/img/north.png'>
    <div class='model-text'>
      <div class='title'>
        {{dataSource.title}}
      </div>
      <div class='subtitle'>
        {{dataSource.sub_title}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'north-combustion-tiles',
  props: ['dataSource'],
  data () {
    return {
    }
  }
}
</script>
<style lang='less'>
.north-combustion-tiles-wrap {
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
    height: 60px;
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
