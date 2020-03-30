const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = isHmr => {
  return [
    {
      test: /\.styl$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
            hmr: isHmr,
            reloadAll: isHmr
          }
        },
        'css-loader',
        'stylus-loader'
      ]
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
            hmr: isHmr,
            reloadAll: isHmr
          }
        },
        'css-loader',
        'sass-loader'
      ]
    }
  ];
};
