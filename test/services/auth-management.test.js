const assert = require('assert');
const app = require('../../server/app');

describe('\'auth-management\' service', () => {
  it('registered the service', () => {
    const service = app.service('auth-management');

    assert.ok(service, 'Registered the service');
  });
});
