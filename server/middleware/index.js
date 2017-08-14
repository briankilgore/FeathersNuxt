const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');
const nuxt = require('./nuxt.js');
// const logger = require('./logger');

module.exports = function () {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  // Use Nuxt's render middleware
  app.use((req, res, next) => {
    switch (req.accepts('html', 'json')) {
      case 'json':
        next();
        break;
      default:
        nuxt.render(req, res, next);
    }
  });

  app.use(notFound());
  // app.use(logger(app));
  app.use(handler());
};
