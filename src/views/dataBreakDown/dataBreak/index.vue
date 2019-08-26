<template>
  <div class='data-perspective-table-wrap'>
    <div class='table-page'>
      <gc-breadcrumb />
      <div class="title">
        明细表查询
        <div
          class='data-config-btn'
          @click="openDataConfig"
        >明细表配置</div>
      </div>
      <div class='content'>
        <iframe
          src="/static/tabel/wx/query.html"
          frameborder="0"
          style='height: 540px;width: 100%'
        ></iframe>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'pivot-table',
  data () {
    return {
    }
  },
  mounted: function () {

  },
  methods: {
    openDataConfig () {
      this.$router.push({ path: '/home/dataConfig' })
    }
  }
}
</script>
<style lang='less'>
@import url("./index.less");
</style>
