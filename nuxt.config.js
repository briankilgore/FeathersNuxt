const path = require('path');

module.exports = {
  // rootDir: path.resolve(__dirname),
  srcDir: 'client',
  dev: process.env.NODE_ENV !== 'production',
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
      color: '#3B8070',
  },
  /*
  ** Global CSS
  */
  css: [
    'vuetify/dist/vuetify.min.css',
    '~/assets/css/main.css'
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /client\/\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    '~plugins/vuetify.js',
    { src: '~plugins/axios.js', injectAs: '$http' }
  ]
};
