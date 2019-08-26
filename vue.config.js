const webpack = require('webpack');

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#999999'
        },
        javascriptEnabled: true
      }
    }
  },
  // eslint-disable-next-line no-dupe-keys
  devServer: {
    port: 8080, // 端口号
    host: '10.20.8.18',
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    proxy: {
      '/serve': {
        // target: 'http://10.30.2.87:8089',
        target: 'http://10.30.2.129:8089',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          // '^/': '/'
          '^/serve': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      //全局添加jquery
      new webpack.ProvidePlugin({
        $: 'jquery'
      })
    ]
  }
}
