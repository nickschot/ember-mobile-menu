import { module } from 'qunit';
import test from 'ember-sinon-qunit/test-support/test';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mobile-menu-toggle', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{mobile-menu-toggle}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#mobile-menu-toggle}}
        template block text
      {{/mobile-menu-toggle}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('it fires the `onClick` hook with the "left" argument when clicked', async function(assert){
    assert.expect(2);

    const handleClick = this.spy();
    this.set('actions', { handleClick });

    await render(hbs`{{mobile-menu-toggle onClick=(action "handleClick")}}`);
    await click('.mobile-menu__toggle');

    assert.ok(handleClick.calledOnce, 'onClick was called once');
    assert.ok(handleClick.calledWithExactly('left'));
  });

  test('it fires the `onClick` hook with the passed target when clicked', async function(assert){
    assert.expect(2);

    const handleClick = this.spy();
    this.set('actions', { handleClick });

    await render(hbs`{{mobile-menu-toggle target="right" onClick=(action "handleClick")}}`);
    await click('.mobile-menu__toggle');

    assert.ok(handleClick.calledOnce, 'onClick was called once');
    assert.ok(handleClick.calledWithExactly('right'));
  });
});
