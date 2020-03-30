const common = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getStyleRules = require('./config/style-file-loader-config');

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
    },
    overlay: {
      errors: true // 编译出现错误时，错误直接贴到页面上
    }
  },
  module: {
    rules: getStyleRules(true)
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API': JSON.stringify('../')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
});
