import { module } from 'qunit';
import test from 'ember-sinon-qunit/test-support/test';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mobile-menu/mask', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<MobileMenu::Mask/>`);

    assert.equal(this.element.textContent.trim(), '');
  });

  test('it triggers the onClick hook when clicked', async function (assert) {
    assert.expect(1);

    this.handleClick = this.spy();

    // Template block usage:
    await render(hbs`
      <MobileMenu::Mask @onClick={{this.handleClick}}>
        My Link
      </MobileMenu::Mask>
    `);

    await click('.mobile-menu__mask');

    assert.ok(this.handleClick.calledOnce, 'onClick hook has been called');
  });
});
