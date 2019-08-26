<template>
  <div class='demo-type-one'>
    <div class='title'>
      {{dataSource.title}}
    </div>
    <div class='subtitle'>
      {{dataSource.sub_title}}
    </div>
    <div class='router-component'>
      <item-config></item-config>
    </div>
  </div>
</template>
<script>
import ItemConfig from './coms/demo'
export default {
  name: 'demo-type-one',
  props: ['dataSource'],
  components: {
    ItemConfig
  }
}
</script>
<style lang='less'>
.demo-type-one {
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
    height: auto;
    margin-bottom: 5px;
    font-size: 16px;
    color: #4a4a4a;
    font-family: MicrosoftYaHei;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .subtitle {
    margin-bottom: 5px;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #999999;
    font-family: MicrosoftYaHei;
  }
  .router-component {
    height: calc(~"100% - 52px");
    width: 100%;
  }
}
</style>
