/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');

const port = app.get('port');

process.on('unhandledRejection', (reason, p) => {
  return logger.error('Unhandled Rejection at: Promise ', p, reason);
});

process.on('nuxt:build:done', (err) => {
  console.log('Nuxt starting');
  if (err) {
    logger.error(err);
  }

  const server = app.listen(port);

  server.on('listening', () => {
    logger.info(`Feathers application started on ${app.get('host')}:${port}`);
    console.log(`Feathers application started on ${app.get('host')}:${port}`);
  });
});
