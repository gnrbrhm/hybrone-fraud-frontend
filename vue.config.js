module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        win: {
          icon: './hybrone_logo.png'
        },
        mac: {
          icon: './hybrone_logo.png'
        }
      }
    }
  },
  configureWebpack: {
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
  },
  pwa: {
    name: 'Hybrone Sentinel',
    themeColor: '#00154D',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-150x150.png'
    },
    manifestOptions: {
      start_url: '/index.html',
      display: 'standalone',
      background_color: '#00154D',
      icons: [
        {
          src: '/img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/img/icons/android-chrome-256x256.png',
          sizes: '256x256',
          type: 'image/png'
        }
      ]
    }
  }
}
