// Initializes the `upload` service on path `/upload`
const createService = require('./upload.class.js');
const hooks = require('./upload.hooks');
const filters = require('./upload.filters');
const cloudinary = require('cloudinary');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const cloudinaryConfig = app.get('cloudinary');

  cloudinary.config({ 
    cloud_name: cloudinaryConfig.cloud_name,
    api_key: cloudinaryConfig.api_key,
    api_secret: cloudinaryConfig.api_secret,
  });  

  const options = {
    name: 'upload',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/upload', createService(options, cloudinary));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('upload');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
