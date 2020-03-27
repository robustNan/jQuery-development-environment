// const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * @cooper
 * @description 动态添加入口
 * @returns {Object}
 */
function getEntry() {
  const entry = {};
  const list = glob.sync('./src/script/*.js');
  list.forEach(function(path) {
    const [flag, suffix] = ['script/', '.js'];
    const start = path.indexOf(flag) + flag.length;
    const end = path.length - suffix.length;
    const name = path.slice(start, end);
    // n = n.split('/')[1];
    // eArr.push(path);
    // eArr.push('babel-polyfill'); //引入这个，是为了用async await，一些IE不支持的属性能够受支持，兼容IE浏览器用的
    // entry[name] = [path, 'babel-polyfill'];
    entry[name] = path;
  });
  return entry;
}

/**
 * @cooper
 * @description
 * @returns {Object}
 */
function getHtmlConfig(name) {
  return {
    chunks: [name],
    template: `./src/view/${name}.html`,
    filename: `${name}.html`,
    hash: true,
    title: '我在html-webpack-config.js里',
    //   favicon: './static/image/favicon.png',
    inject: 'body',
    minify: {
      caseSensitive: true, //是否对大小写敏感
      collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled"简写为disabled
      collapseWhitespace: true, //是否去除空格
      minifyCSS: true, //是否压缩html里的css
      minifyJS: true, //是否压缩html里的js
      preventAttributesEscaping: true, //Prevents the escaping of the values of attributes
      removeAttributeQuotes: true, //是否移除属性的引号，默认false
      removeComments: true, //是否移除注释，默认false
      removeCommentsFromCDATA: true, //从脚本和样式删除的注释，默认false
      removeEmptyAttributes: true, //是否删除空属性，默认false
      removeOptionalTags: false, //若开启此项，生成的html中没有body和head，html也未闭合
      removeRedundantAttributes: true, //删除多余的属性
      removeScriptTypeAttributes: true, //删除script的类型属性，在h5下面script的type默认值：text/javascript，默认false
      removeStyleLinkTypeAttributes: true, //删除style的类型属性， type="text/css" 同上
      useShortDoctype: true //使用短的文档类型，默认false
    }
  };
}

function createHtmlWebpackPlugin(list) {
  // const list = getEntry();
  const pluginArr = [];
  for (const key in list) {
    if (list.hasOwnProperty(key)) {
      // const element = list[key];
      const configOptions = getHtmlConfig(key);
      pluginArr.push(new HtmlWebpackPlugin(configOptions));
    }
  }
  return pluginArr;
}

module.exports = { getEntry, createHtmlWebpackPlugin };
