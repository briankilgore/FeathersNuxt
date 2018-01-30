const { authenticate } = require('feathers-authentication').hooks;
const hooks = require('feathers-authentication-hooks');
const { set } = require('lodash');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      hooks.associateCurrentUser({ idField: '_id', as: 'invitedBy' }),
      (hook) => {
        set(hook.data, 'from', {
          _id: hook.params.user._id,
          firstName: hook.params.user.firstName,
          lastName: hook.params.user.lastName,
          email: hook.params.user.email,
        });
      },
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
