const chalk = require('chalk'); //用来在命令行中输入不同颜色的文字
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./config/webpack.common');
const prodConfig = require('./config/webpack.prod');
const getStyleRules = require('./modules/style-file-loader-config');

const NODE_ENV = process.env.NODE_ENV;
const config = merge(commonConfig, prodConfig, {
  module: {
    rules: getStyleRules(NODE_ENV === 'development'),
  },
});

webpack(config, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  process.stdout.write(
    stats.toString({
      // stats对象中保存着编译过程中的各种消息
      colors: true, // 增加控制台颜色开关
      modules: false, // 不增加内置模块信息
      children: false, // 不增加子级信息
      chunks: false, // 允许较少的输出
      chunkModules: false, // 不将内置模块的信息加到包信息
    }) + '\n\n'
  );

  console.log(chalk.cyan('  Build complete.\n'));
  // console.log(chalk.yellow('  Tip: built files are meant to be served over an HTTP server.\n' + "  Opening index.html over file:// won't work.\n"));
});
