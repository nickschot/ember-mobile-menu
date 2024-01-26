import { module, test } from 'qunit';
import {
  setup,
  visit /* mockServer */,
} from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | index', function (hooks) {
  setup(hooks);

  test('it renders a page...', async function (assert) {
    await visit('/');

    // smoke test
    assert.dom('[data-test-menu]').exists();
    assert.dom('[data-test-menu-toggle]').exists();
  });
});
