const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, './src/js/index.js'),
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.bundle.js',
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
              name: 'myPrefix.[name].[ext]',
              publicPath: '/dist/images',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
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
    // new MiniCssExtractPlugin(),
  ],
};
