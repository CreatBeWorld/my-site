//vue-cli的配置文件
module.exports = {
  devServer: {
    port: 8080,
    host: "127.0.0.1",
    https:false,
    proxy: {
      '/api': {
        target: 'https://baike.baidu.com',
        changeOrigin: true
      }
    }
  },
  configureWebpack: require('./webpack.config')
}