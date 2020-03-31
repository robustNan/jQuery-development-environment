const webpack = require('webpack');

module.exports = options => {
  const obj = {};
  for (const key in options) {
    const value = options[key];
    obj[key] = JSON.stringify(value);
  }
  return new webpack.DefinePlugin(obj);
};
