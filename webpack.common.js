const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const { getEntry, createHtmlWebpackPlugin } = require('./config/html-webpack-config');
const entry = getEntry();

module.exports = {
  /* entry: {
    index: './src/script/index.js',
    about: './src/script/about.js'
  }, */
  entry: entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader']
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: './images/',
              outputPath: 'images/'
            }
          }
        ]
        // use: 'file-loader'
        // use: ['url-loader?name=fonst/[name].[md5:hash:hex:7].[ext]']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: 'style-loader' // inject CSS to page
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run postcss actions
            options: {
              plugins: function() {
                // postcss plugins, can be exported to postcss.config.js
                return [require('autoprefixer')];
              }
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
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
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
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
