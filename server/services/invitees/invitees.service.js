// Initializes the `invites` service on path `/invites`
const createService = require('feathers-mongoose');
const createModel = require('../../models/invitees.model');
const hooks = require('./invitees.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'invitees',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/invitees', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('invitees');

  service.hooks(hooks);
};
