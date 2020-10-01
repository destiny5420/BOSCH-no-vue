const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, './src/js/index.js'),
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.bundle.js',
  },
  plugins: [
    new webpack.BannerPlugin('版權所有，翻版必究'),
    new HtmlWebpackPlugin({
      title: '首頁',
      filename: 'index.html',
      template: path.join(__dirname, './src/index.html'),
    }),
    new HtmlWebpackPlugin({
      title: '關於',
      filename: 'about.html',
      template: path.join(__dirname, './src/about.html'),
    }),
  ],
};
