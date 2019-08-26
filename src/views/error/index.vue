<template>
  <div class="error-wrap">
    正在开发中敬请期待......<span style='font-size: 16px'>{{second}}后返回首页</span>
  </div>
</template>
<script>
export default {
  name: 'error',
  data () {
    return {
      second: 2,
      intime: null
    }
  },
  mounted: function () {
    this.intime = setInterval(() => {
      if (this.second === 0) {
        this.$router.push({ path: '/home' })
      } else {
        this.second -= 1
      }
    }, 1000)
  },
  destroyed () {
    clearInterval(this.intime)
  }
}
</script>
<style>
.error-wrap {
  width: 100%;
  height: 100%;
  font-size: 30px;
  text-align: center;
  line-height: 200px;
  background: #fff;
}
</style>
