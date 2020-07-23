let target = 'http://101.37.66.95:7001'
// let target = `https:www.yanhao.love/`

module.exports = {
  publicPath: '/',
  lintOnSave: false,
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      moment: 'moment',
      axios: 'axios',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENTUI',
    },
  },
  devServer: {
    port: 6001,
    // 设置代理
    proxy: {
      '/api': {
        target: target, // 域名
        ws: false, // 是否启用websockets
        changOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '/api': '/api',
        },
      },
    },
  },
}
