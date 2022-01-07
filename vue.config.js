const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
  publicPath: '/MyNote/',
  assetsDir: 'static',
  outputDir: 'docs',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/scss/variables.scss";`
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  }
}
