const { container } = require('webpack')
const pkg = require('./package.json')
const { ModuleFederationPlugin } = container

function getExposes() {
  return Object.keys(pkg.dependencies).reduce((prev, cur) => {
    prev[`./${cur}`] = cur
    return prev
  }, {})
}

module.exports = {
  mode: 'production',
  entry: {
    index: './js/mfGeneratorEntry.js'
  },
  output: {
    filename: 'mfGeneratorEntry.bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new ModuleFederationPlugin({
      library: {
        type: 'global',
        name: 'mf'
      },
      name: 'mf',
      filename: 'remoteEntry.js',
      exposes: {
        './vue': 'vue/dist/vue.runtime.min.js',
        './vuex': 'vuex/dist/vuex.min.js'
      }
    })
  ]
}
