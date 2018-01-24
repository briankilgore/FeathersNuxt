const assert = require('assert');
const app = require('../../server/app');

describe('\'availability\' service', () => {
  it('registered the service', () => {
    const service = app.service('availability');

    assert.ok(service, 'Registered the service');
  });
});
