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
    entry[name] = path;
  });
  return entry;
}

/**
 * @cooper
 * @returns {Object}
 */
function getHtmlConfig(name) {
  return {
    chunks: [name],
    template: `./src/view/${name}.html`,
    filename: `${name}.html`,
    hash: true,
    inject: 'body'
  };
}

/**
 * @cooper
 * @returns {Object}
 */
function createHtmlWebpackPlugin(list) {
  const pluginArr = [];
  for (const key in list) {
    if (list.hasOwnProperty(key)) {
      const configOptions = getHtmlConfig(key);
      pluginArr.push(new HtmlWebpackPlugin(configOptions));
    }
  }
  return pluginArr;
}

module.exports = { getEntry, createHtmlWebpackPlugin };
