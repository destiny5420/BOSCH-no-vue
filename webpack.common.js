const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // // *** origin function ***
  // entry: {
  //   index: path.join(__dirname, './src/js/index.js'),
  //   about: path.join(__dirname, './src/js/index2.js'),
  // },
  entry: {
    index: [path.join(__dirname, './src/js/index.js'), path.join(__dirname, './src/js/index2.js')],
    index3: path.join(__dirname, './src/js/index3.js'),
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].bundle.js',
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
