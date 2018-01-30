const _ = require('lodash');
const { getItems } = require('feathers-hooks-common');

module.exports = function(options = {}) {
  return function(hook) {
    return new Promise(async (resolve, reject) => {
      try {
        const organization = await hook.app.service('organizations').create({
          name: 'Organization 1',
        });

        _.castArray(getItems(hook)).forEach(item => { 
          item.organization = organization._id;
        });

        resolve(hook);
      } catch(error) {
        console.error(error);
        reject(error);
      }
    });
  }
}
