const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const { getEntry, createHtmlWebpackPlugin } = require('./config/html-webpack-config');
const entry = getEntry();

// console.log(process.env.NODE_ENV)
module.exports = {
  entry: entry,
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      /* {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader']
        })
      }, */
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
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
              name: '[name].[ext]',
              // publicPath: './images/',
              outputPath: 'img/'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attributes: {
                list: [
                  {
                    tag: 'img',
                    attribute: 'src',
                    type: 'src'
                  },
                  {
                    tag: 'img',
                    attribute: 'srcset',
                    type: 'srcset'
                  },
                  {
                    tag: 'img',
                    attribute: 'data-src',
                    type: 'src'
                  },
                  {
                    tag: 'img',
                    attribute: 'data-srcset',
                    type: 'srcset'
                  },
                  {
                    tag: 'link',
                    attribute: 'href',
                    type: 'src',
                    filter: (tag, attribute, attributes) => {
                      if (!/stylesheet/i.test(attributes.rel)) {
                        return false;
                      }

                      if (attributes.type && attributes.type.trim().toLowerCase() !== 'text/css') {
                        return false;
                      }

                      return true;
                    }
                  }
                ]
              },
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: true,
              reloadAll: true
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader', // Run postcss actions
            options: {
              plugins: function() {
                // postcss plugins, can be exported to postcss.config.js
                return [require('autoprefixer')];
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    /* new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }), */
    //全局引入jquery, lodash在此引入无效
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash',
      echarts: 'echarts',
      Popper: ['popper.js', 'default']
    }),
    ...createHtmlWebpackPlugin(entry)
  ]
};
