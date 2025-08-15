import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mobile-menu/tray', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<MobileMenu::Tray/>`);

    assert.strictEqual(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <MobileMenu::Tray>
        template block text
      </MobileMenu::Tray>
    `);

    assert.strictEqual(this.element.textContent.trim(), 'template block text');
  });
});
