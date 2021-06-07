/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const config = {
  publicPath: '/',
  devServer: {
    // 开发模式服务端口
    port: 8001,

    // 运行后自动打开浏览器
    open: false,

    // 禁用 Vue-Cli 的热刷新，
    // 使用 Webpack 的热刷新
    hot: false,
    hotOnly: false,

    // 跨域代理
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        ws: true,
        changeOrigin: true
      }
    }

  }
}

module.exports = config
