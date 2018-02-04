// Initializes the `clients` service on path `/clients`
const createService = require('feathers-mongoose');
const createModel = require('../../models/clients.model');
const hooks = require('./clients.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'clients',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/clients', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('clients');

  service.hooks(hooks);
};
