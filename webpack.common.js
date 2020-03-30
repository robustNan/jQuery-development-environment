const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const { getEntry, createHtmlWebpackPlugin } = require('./config/html-webpack-config');
const entry = getEntry();

module.exports = {
  entry: entry,
  output: {
    filename: 'js/[name]-[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'font'
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
              outputPath: 'img/'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attributes: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    /* 全局引入jquery, lodash在此引入无效 */
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash',
      echarts: 'echarts',
      Popper: ['popper.js', 'default']
    }),
    ...createHtmlWebpackPlugin(entry)
  ]
};
