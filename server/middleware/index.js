'use strict';
const { render } = require('./nuxt');

const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');
const logger = require('./logger');

module.exports = function () {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  // Webpack dev middleware
  // if (process.env.NODE_ENV !== 'production') {
  //   const webpackDev = require('./webpack-dev');
  //   webpackDev(app);
  // }

  app.use(notFound());
  app.use(logger(app));
  app.use(handler());

  app.use((req, res, next) => {
    switch (req.accepts('html', 'json')) {
      case 'json': {
        next();
        break;
      }
      default: {
        render(req, res, next);
      }
    }
  });
  
};
