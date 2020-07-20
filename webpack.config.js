const { resolve, join } = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: resolve(__dirname, 'build')
  },
  devtool: '#source-map',
  devServer: {
    contentBase: join(__dirname, 'build'),
    compress: false,
    port: 8080,
    host: '0.0.0.0',
    hot: true,
    inline: true
  }
})
