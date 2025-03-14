import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | smoke test', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.dom('h1').exists();
    assert.dom('h1').hasText('Ember MobileMenu');
    assert.dom('.mobile-menu').exists();
  });
});
