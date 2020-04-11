const merge = require('webpack-merge');
const path = require('path');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const commonConfig = require('./config/webpack.common');
const devConfig = require('./config/webpack.dev');
const getStyleRules = require('./modules/style-file-loader-config');

const NODE_ENV = process.env.NODE_ENV;
const config = merge(commonConfig, devConfig, {
  module: {
    rules: getStyleRules(NODE_ENV === 'development'),
  },
});

const devServerOptions = {
  contentBase: path.join(__dirname, './dist'),
  host: 'localhost',
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

/* 在这里配置端口号 */
server.listen(5050, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
