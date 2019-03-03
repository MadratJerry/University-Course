const {
  override,
  fixBabelImports,
  addLessLoader,
  overrideDevServer,
} = require('customize-cra')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const path = require('path')

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#25b864' },
    }),
    config => {
      config.resolve = {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      }
      return config
    },
    rewireReactHotLoader,
  ),
  devServer: overrideDevServer(config => {
    config.proxy = {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: { '^/api': '' },
      },
    }
    return config
  }),
}
