const merge = require('webpack-merge');
const path = require('path');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const commonConfig = require('./config/webpack.common');
const devConfig = require('./config/webpack.dev');
const getStyleRules = require('./modules/style-file-loader-config');

const dotenv = require('dotenv');
dotenv.config('./env');

const NODE_ENV = process.env.NODE_ENV;
const config = merge(commonConfig, devConfig, {
  module: {
    rules: getStyleRules(NODE_ENV === 'development'),
  },
});

const devServerOptions = {
  contentBase: path.join(__dirname, './dist'),
  host: process.env.HOST,
  hot: true,
  open: true,
  proxy: {
    '/txapi': {
      target: 'http://api.tianapi.com',
      changeOrigin: true,
    },
  },
  overlay: {
    errors: true, // 编译出现错误时，错误直接贴到页面上
  },
};

webpackDevServer.addDevServerEntrypoints(config, devServerOptions);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, devServerOptions);

server.listen(process.env.PORT, 'localhost', () => {
  console.log(`dev server listening on port ${process.env.PORT}`);
});
