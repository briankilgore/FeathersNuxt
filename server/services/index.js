const users = require('./users/users.service.js');

const email = require('./email/email.service.js');

const authManagement = require('./auth-management/auth-management.service.js');

const upload = require('./upload/upload.service.js');

const clients = require('./clients/clients.service.js');

const locations = require('./locations/locations.service.js');

const sessions = require('./sessions/sessions.service.js');

const availability = require('./availability/availability.service.js');

const companies = require('./companies/companies.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(email);
  app.configure(authManagement);
  app.configure(upload);
  app.configure(clients);
  app.configure(locations);
  app.configure(sessions);
  app.configure(availability);
  app.configure(companies);
};
