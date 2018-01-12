const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { hashPassword } = require('feathers-authentication-local').hooks;
const verifyHooks = require('feathers-authentication-management').hooks;

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id',
  }),
];

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [...restrict],
    create: [
      hashPassword(),
      verifyHooks.addVerification(),
    ],
    update: [commonHooks.disallow('external')],
    patch: [
      ...restrict, 
      commonHooks.iff(
        commonHooks.isProvider('external'),    
        commonHooks.preventChanges(
          'email',
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires'
        )),
    ],
    remove: [...restrict],
  },

  after: {
    all: [
      commonHooks
        .when(hook => hook.params.provider, commonHooks.discard('password')),
        verifyHooks.removeVerification(),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
