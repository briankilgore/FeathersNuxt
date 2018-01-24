// Initializes the `companies` service on path `/companies`
const createService = require('feathers-mongoose');
const createModel = require('../../models/companies.model');
const hooks = require('./companies.hooks');
const filters = require('./companies.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'companies',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/companies', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('companies');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
