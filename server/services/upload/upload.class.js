/* eslint-disable no-unused-vars */
class Service {
  constructor (options, cloudinary) {
    this.options = options || {};
    this.cloudinary = cloudinary;
  }

  find (params) {
    return Promise.resolve([]);
  }

  get (id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  create (data, params) {
    console.log(data, params);

    return new Promise((resolve, reject) => {
      this.cloudinary.uploader.upload(data.dataUri, function(result) {
        if(result) {
          resolve(result);
        } else {
          reject();
        }
      });
    });
  }

  update (id, data, params) {
    return Promise.resolve(data);
  }

  patch (id, data, params) {
    return Promise.resolve(data);
  }

  remove (id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function (options, cloudinary) {
  return new Service(options, cloudinary);
};

module.exports.Service = Service;
