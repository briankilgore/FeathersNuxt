// Initializes the `email` service on path `/email`
const hooks = require('./email.hooks');
const Mailer = require('feathers-mailer');
const mailgunTransport = require('nodemailer-mailgun-transport');

module.exports = function () {
  const app = this;

  // Initialize our service with any options it requires
  app.use('/email', Mailer(mailgunTransport({
    service: 'mailgun',
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  })));

  // Get our initialized service so that we can register hooks
  const service = app.service('email');

  service.hooks(hooks);
};
