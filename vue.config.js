//vue-cli的配置文件
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://baike.baidu.com',
        changeOrigin: true
      }
    }
  }
}