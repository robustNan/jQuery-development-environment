const common = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  /* externals: {
    jquery: {
      amd: 'jquery',
      commonjs: 'jquery',
      commonjs2: 'jquery',
      root: '$'
    },
    joint: {
      amd: 'joint',
      commonjs: 'joint',
      commonjs2: 'joint',
      root: 'joint'
    },
    lodash: {
      amd: 'lodash',
      commonjs: 'lodash',
      commonjs2: 'lodash',
      root: '_'
    }
  }, */
  optimization: {
    // minimize: true, // 如果mode是production类型，minimize的默认值是true，执行默认压缩，
    splitChunks: {
      chunks: 'all',
      minSize: 30000, //表示在压缩前的最小模块大小,默认值是30kb
      minChunks: 1, // 表示被引用次数，默认为1；
      maxAsyncRequests: 5, //所有异步请求不得超过5个
      maxInitialRequests: 3, //初始话并行请求不得超过3个
      automaticNameDelimiter: '~', //名称分隔符
      name: true, //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔
      /* 设置缓存组用来抽取满足不同规则的chunk */
      cacheGroups: {
        /* vendorLodash: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }, */
        default: {
          minChunks: 2, //最少被几个chunk引用
          priority: -20, //优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
