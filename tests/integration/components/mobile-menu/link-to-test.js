import { module } from 'qunit';
import test from 'ember-sinon-qunit/test-support/test';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mobile-menu/link-to', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{mobile-menu/link-to 'My Link' 'index'}}`);

    assert.equal(this.element.textContent.trim(), 'My Link');

    // Template block usage:
    await render(hbs`
      {{#mobile-menu/link-to 'index'}}
        My Link
      {{/mobile-menu/link-to}}
    `);

    assert.equal(this.element.textContent.trim(), 'My Link');
  });

  test('it fires the onClick hook when clicked', async function(assert){
    assert.expect(1);

    this.set('handleClick', this.spy());

    await render(hbs`{{mobile-menu/link-to 'index' onClick=(action handleClick)}}`);
    await click('a');

    assert.ok(this.get('handleClick').calledOnce, 'onClick was called once');
  });
});
