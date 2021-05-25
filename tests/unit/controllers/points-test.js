import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | points', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:points');
    assert.ok(controller);
  });
});
