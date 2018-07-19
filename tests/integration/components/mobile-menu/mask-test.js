import { module } from 'qunit';
import test from 'ember-sinon-qunit/test-support/test';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mobile-menu/mask', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`{{mobile-menu/mask}}`);

    assert.equal(this.element.textContent.trim(), '');
  });

  test('it triggers the onClick hook when clicked', async function(assert) {
    assert.expect(1);

    let handleClick = this.spy();
    this.actions = { handleClick };

    // Template block usage:
    await render(hbs`
      {{#mobile-menu/mask 'index' onClick=(action 'handleClick')}}
        My Link
      {{/mobile-menu/mask}}
    `);

    await click('.mobile-menu__mask');

    assert.ok(handleClick.calledOnce, 'onClick hook has been called');
  });
});
