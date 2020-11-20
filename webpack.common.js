const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const loader = require('sass-loader');

module.exports = {
  // // *** origin function ***
  // entry: {
  //   index: path.join(__dirname, './src/js/index.js'),
  //   about: path.join(__dirname, './src/js/index2.js'),
  // },
  entry: {
    index: [path.join(__dirname, './src/js/index.js')],
    about: [path.join(__dirname, './src/js/about.js')],
    support: [path.join(__dirname, './src/js/support.js')],
  },
  output: {
    path: path.join(__dirname, './docs'),
    filename: 'js/[name]2011120-01.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_mosules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '../fonts/',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, './docs'),
    hot: true,
    port: '8092',
    inline: true,
    open: false,
    overlay: true,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  plugins: [
    new webpack.BannerPlugin('版權所有，翻版必究'),
    new HtmlWebpackPlugin({
      title: '主頁 | 台灣博世',
      filename: 'index.html',
      template: path.join(__dirname, './src/index.html'),
      favicon: './src/images/favicon.ico',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      title: '關於我們 | 台灣博世',
      filename: 'about.html',
      template: path.join(__dirname, './src/about.html'),
      favicon: './src/images/favicon.ico',
      chunks: ['about'],
    }),
    new HtmlWebpackPlugin({
      title: '支援 | 台灣博世',
      filename: 'support.html',
      template: path.join(__dirname, './src/support.html'),
      favicon: './src/images/favicon.ico',
      chunks: ['support'],
    }),
  ],
};
