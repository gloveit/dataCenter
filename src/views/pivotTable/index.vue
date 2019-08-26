<template>
  <div class='data-perspective-table-wrap'>
    <div class='table-page'>
      <gc-breadcrumb />
      <div class="title">
        数据透视表
      </div>
      <div class='content'>
        <iframe
          src="/static/demo2/index.html"
          frameborder="0"
          style='height: 580px;width: 100%'
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
    // 列表接口
    // find: function () {
    //   this.axios({
    //     method: 'post',
    //     url: window.API.host + 'type/tableExceptionValue',
    //     data: qs.stringify({
    //       num: this.alarmNum,
    //       page: this.currentPage,
    //       pageNum: this.pageSize
    //     }),
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //   }).then((res) => {
    //     this.tableData = res.data.list
    //     this.dataNum = res.data.sum
    //   })
    // },
    // // 改变每页显示条数
    // handleSizeChange (size) {
    //   this.pageSize = size
    //   this.find()
    // },
    // // 翻页方法
    // handleCurrentChange: function (currentPage) {
    //   this.currentPage = currentPage
    //   this.find()
    // },
    // handleSelectionChange (val) {
    //   this.multipleSelection = val
    // }
  }
}
</script>
<style lang='less'>
@import url("./index.less");
</style>
