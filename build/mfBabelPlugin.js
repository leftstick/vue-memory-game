const { dependencies } = require('../package.json')
const { declare } = require('@babel/helper-plugin-utils')

module.exports = declare(({ types: t }) => {
  return {
    name: 'mf-dependency-converter',
    visitor: {
      ImportDeclaration(path) {
        const { node } = path

        if (t.isStringLiteral(node.source) && dependencies[node.source.value]) {
          node.source.value = `mf/${node.source.value}`
        }
      }
    }
  }
})
