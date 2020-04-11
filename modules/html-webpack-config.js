const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * @cooper
 * @description 根据/src/script下的js文件名称动态生成入口配置对象
 * @returns {Object}
 */
function getEntry() {
  const entry = {};
  const list = glob.sync('./src/script/*.js');
  list.forEach(function (path) {
    const [flag, suffix] = ['script/', '.js'];
    const start = path.indexOf(flag) + flag.length;
    const end = path.length - suffix.length;
    const name = path.slice(start, end);
    entry[name] = path;
  });
  return entry;
}

/**
 * @cooper
 * @description 根据传入的入口文件名称返回HtmlWebpackPlugin所需配置对象
 * @param {String} | name
 * @returns {Object}
 */
function getHtmlConfig(name) {
  return {
    chunks: [name],
    template: `./src/view/${name}.html`,
    filename: `${name}.html`,
    favicon: './static/logo.png', //该配置回导致在html同级目录下多出一个logo.png文件
    hash: true,
    inject: 'body',
  };
}

/**
 * @cooper
 * @description 根据getEntry返回的入口配置对象分别创建HtmlWebpackPlugin
 * @param {Object} | entries
 * @returns {Array}
 */
function createHtmlWebpackPlugin(entries) {
  const pluginArr = [];
  for (const key in entries) {
    if (entries.hasOwnProperty(key)) {
      const configOptions = getHtmlConfig(key);
      pluginArr.push(new HtmlWebpackPlugin(configOptions));
    }
  }
  return pluginArr;
}

module.exports = { getEntry, createHtmlWebpackPlugin };
