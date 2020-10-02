const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '../images',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  // devServer: {
  //   contentBase: path.join(__dirname, './dist'),
  //   hot: true,
  //   port: '8091',
  //   inline: true,
  //   // open: true,
  //   overlay: true,
  //   // proxy: {
  //   //   '/api': {
  //   //     target: '',
  //   //     changeOrigin: true,
  //   //     pathRewrite: {
  //   //       '^/api': '',
  //   //     },
  //   //   },
  //   // },
  // },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
