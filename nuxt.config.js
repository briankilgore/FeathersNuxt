const { resolve } = require('path');

module.exports = {
  srcDir: resolve(__dirname, 'client'),
  dev: process.env.NODE_ENV !== 'production',
  mode: 'spa',
  router: {
    middleware: 'check-auth',
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'FeathersNuxt',
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
    'normalize.css',
    'vuetify/dist/vuetify.min.css',
    'mdi/css/materialdesignicons.min.css',
    '~/assets/css/main.css'
  ],
  /*
  ** Add axios globally
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'feathers/client',
      'feathers-socketio/client',
      'socket.io-client',
      'feathers-hooks',
      'feathers-authentication-client',
    ],
  },
  plugins: [
    '~/plugins/vuetify.js',
    { src: '~/plugins/vue-notification.js', ssr: false }
  ]
};
