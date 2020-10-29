import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mobile-menu/tray', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<MobileMenu::Tray/>`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <MobileMenu::Tray>
        template block text
      </MobileMenu::Tray>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('it cleans up body-scroll-lock after undrendering', async function(assert) {
    this.set('showMenu', true);
    this.set('isClosed', true);

    await render(hbs`{{#if this.showMenu}}<MobileMenu::Tray @preventScroll={{true}} @embed={{false}} @isClosed={{this.isClosed}}/>{{/if}}`);
    assert.equal(document.body.style.overflow, '');

    this.set('isClosed', false);
    assert.equal(document.body.style.overflow, 'hidden');

    this.set('isClosed', true);
    assert.equal(document.body.style.overflow, '');

    this.set('isClosed', false);
    assert.equal(document.body.style.overflow, 'hidden');

    this.set('showMenu', false);
    assert.equal(document.body.style.overflow, '');
  });
});
