const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const getDefinePlugin = require('../modules/create-define-plugin');
const { getEntry, createHtmlWebpackPlugin } = require('../modules/html-webpack-config');
const entries = getEntry(); //获取到所有入口文件

/* 根据 process.env.NODE_ENV 生成对应 DefinePlugin */
const DefinePlugin = process.env.NODE_ENV === 'development' ? getDefinePlugin(require('./dev.config')) : getDefinePlugin(require('./prod.config'));

module.exports = {
  entry: entries,
  output: {
    filename: 'js/[name]-[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'font',
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
              outputPath: 'img',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attributes: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    /* 全局引入jquery、lodash、echarts */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      _: 'lodash',
      echarts: 'echarts',
      Popper: ['popper.js', 'default'],
    }),
    DefinePlugin,
    ...createHtmlWebpackPlugin(entries),
  ],
};
