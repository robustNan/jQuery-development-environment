const common = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    host: 'localhost',
    hot: true,
    https: false,
    port: 8888,
    proxy: {
      '/txapi': {
        target: 'http://api.tianapi.com',
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});
