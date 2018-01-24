const assert = require('assert');
const app = require('../../server/app');

describe('\'sessions\' service', () => {
  it('registered the service', () => {
    const service = app.service('sessions');

    assert.ok(service, 'Registered the service');
  });
});
