const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
/*
在node中，全局变量process表示当前的node进程，process.env表示系统的环境变量
NODE_ENV为用户自定义变量，在webpack中用于判断生产环境或开发环境
*/
if (process.env.NODE_ENV === "production") {
  module.exports = {
    // devtool:"none", //webpack5没有none属性值选项，并且使用该属性值会报错
    plugins: [new BundleAnalyzerPlugin()],
    externals: {
      //防止以下包打包到bundle中
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      axios: "axios",
    },
  };
} else {
  module.exports = {};
}
