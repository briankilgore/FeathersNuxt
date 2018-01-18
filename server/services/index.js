const users = require('./users/users.service.js');

const email = require('./email/email.service.js');

const authManagement = require('./auth-management/auth-management.service.js');

const upload = require('./upload/upload.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(email);
  app.configure(authManagement);
  app.configure(upload);
};
