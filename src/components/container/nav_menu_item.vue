<template>
  <div class='content-menu'>
    <div class='title'>
      {{dataSource.title}}
    </div>
    <div class='subtitle'>
      {{dataSource.sub_title}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'nav-menu-item',
  props: ['dataSource'],
  data () {
    return {

    }
  },
  mounted: function () {
    // console.log('传进来的数据', this.dataSource)
  }
}
</script>
<style lang='less'>
.content-menu {
  height: auto;
  width: 100%;
  margin-bottom: 20px;
  padding-right: 30px;
  cursor: pointer;
  .title {
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #ffffff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .subtitle {
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #6b88b3;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
