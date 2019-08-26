<template>
  <div class='magnet-type-two'>
    <div class='title'>
      {{dataSource.title}}
    </div>
    <div
      class='subtitle'
      :title='dataSource.sub_title'
    >
      {{dataSource.sub_title}}
    </div>
    <div class="footer">
      <span>这是脚页</span>
      <span>2019-04-11</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'magnet-type-two',
  props: ['dataSource']
}
</script>
<style lang='less'>
.magnet-type-two {
  height: 226px;
  width: 226px;
  box-sizing: border-box;
  background: #fff;
  color: #000;
  position: relative;
  border-radius: 4px;
  padding: 20px;
  .title {
    width: 100%;
    max-height: calc(~"100% - 67px");
    margin-bottom: 5px;
    font-size: 16px;
    color: #4a4a4a;
    font-family: MicrosoftYaHei;
    overflow: hidden;
    margin-bottom: 5px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
  }
  .subtitle {
    width: 200px;
    height: 70px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #999999;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }
  .footer {
    position: absolute;
    bottom: 20px;
    width: 186px;
    font-family: MicrosoftYaHei;
    font-size: 6px;
    color: #b3b3b3;
    display: flex;
    justify-content: flex-end;
    span {
      width: 50%;
    }
    span:nth-of-type(2) {
      text-align: right;
    }
  }
}
</style>
