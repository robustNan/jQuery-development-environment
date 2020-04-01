const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackProgressOraPlugin = require('webpack-progress-ora-plugin');

module.exports = {
  mode: 'production',
  devtool: 'hidden-source-map', //source-map
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000, //表示在压缩前的最小模块大小,默认值是30kb
      minChunks: 1, // 表示被引用次数，默认为1；
      maxAsyncRequests: 6, //所有异步请求不得超过6个
      maxInitialRequests: 4, //初始话并行请求不得超过4个
      automaticNameDelimiter: '~', //名称分隔符
      name: true, //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔
      /* 设置缓存组用来抽取满足不同规则的chunk */
      cacheGroups: {
        utilCommon: {
          // 抽离自定义工具库
          name: 'common',
          minSize: 0, // 将引用模块分离成新代码文件的最小体积
          minChunks: 2, // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
          priority: -20
        },
        vendors: {
          // 抽离第三方插件
          test: /[\\/]node_modules[\\/]/, // 指定是node_modules下的第三方包
          name: 'vendors',
          priority: -10 // 抽取优先级
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].css'
    }),
    new WebpackProgressOraPlugin({
      stderr_check: true,
      interval: 300
    })
  ]
};
