const assert = require('assert');
const app = require('../../server/app');

describe('\'locations\' service', () => {
  it('registered the service', () => {
    const service = app.service('locations');

    assert.ok(service, 'Registered the service');
  });
});
