const { Nuxt, Builder } = require('nuxt');
const config = require('../../nuxt.config');
const logger = require('winston');

const nuxt = new Nuxt(config);

if (config.dev) {
  new Builder(nuxt).build()
    .then(() => process.emit('nuxt:build:done'))
    .catch((error) => {
      logger.error(error);
      process.exit(1);
    });
} else {
  process.nextTick(() => process.emit('nuxt:build:done'));
}

module.exports = nuxt;
