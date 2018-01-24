// Initializes the `sessions` service on path `/sessions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/sessions.model');
const hooks = require('./sessions.hooks');
const filters = require('./sessions.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'sessions',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sessions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('sessions');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
