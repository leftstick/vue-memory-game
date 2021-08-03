const { resolve } = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { DefinePlugin, optimize, container } = require('webpack')
const { ModuleFederationPlugin } = container

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new optimize.ModuleConcatenationPlugin(),
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        mf: 'mf@/remoteEntry.js'
      }
    })
  ]
})
