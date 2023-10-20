import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mobile-menu/mask', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<MobileMenu::Mask/>`);

    assert.strictEqual(this.element.textContent.trim(), '');
  });

  test('it triggers the onClick hook when clicked', async function (assert) {
    this.handleClick = (...args) => {
      assert.strictEqual(args.length, 1);
      assert.ok(args[0] instanceof MouseEvent);
      assert.step(`handleClick`);
    };

    // Template block usage:
    await render(hbs`
      <MobileMenu::Mask @onClick={{this.handleClick}}>
        My Link
      </MobileMenu::Mask>
    `);

    await click('.mobile-menu__mask');

    assert.verifySteps(['handleClick']);
  });
});
