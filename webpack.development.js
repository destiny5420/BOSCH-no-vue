const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    hot: true,
    port: '8090',
    inline: true,
    open: true,
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
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
