// Initializes the `availability` service on path `/availability`
const createService = require('feathers-mongoose');
const createModel = require('../../models/availability.model');
const hooks = require('./availability.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'availability',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/availability', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('availability');

  service.hooks(hooks);
};
