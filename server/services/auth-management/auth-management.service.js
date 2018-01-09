// Initializes the `auth-management` service on path `/auth-management`
const authManagement = require('feathers-authentication-management');
const hooks = require('./auth-management.hooks');
const notifier = require('./notifier');

module.exports = function () {
  const app = this;

  // Initialize our service with any options it requires
  app.configure(authManagement({
    longTokenLen: 32,
    notifier: notifier(app),
  }));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('authManagement');

  service.hooks(hooks);
};
