const {
  override,
  fixBabelImports,
  addLessLoader,
  overrideDevServer,
} = require('customize-cra')

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
