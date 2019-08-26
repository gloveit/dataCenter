<template>
  <div
    class='magnet-type-one'
    :style="{width: dataSource.tile_size === 2?'452px':'226px' }"
  >
    <div class='title'>
      {{dataSource.title}}
    </div>
    <div
      class='subtitle'
      :title="dataSource.sub_title"
    >
      {{dataSource.sub_title}}
    </div>
    <div class='router-component'>
      <tiles-config :data='dataSource'></tiles-config>
    </div>
  </div>
</template>
<script>
import TilesConfig from './tiles_child_config'
export default {
  name: 'magnet-type-one',
  props: ['dataSource'],
  components: {
    TilesConfig
  },
  methods: {
    aaaaa: function (event) {
      event.stopPropagation()
      return false
    }
  }
}
</script>
<style lang='less'>
.magnet-type-one {
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
    height: 36px;
    color: #999999;
    font-family: MicrosoftYaHei;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .router-component {
    height: calc(~"100% - 68px");
    width: 100%;
  }
}
</style>
