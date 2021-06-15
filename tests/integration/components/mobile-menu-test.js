import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mobile-menu', function (hooks) {
  setupRenderingTest(hooks);

  hooks.before(function () {
    this.register = () => {};
    this.unregister = () => {};
  });

  test('it renders', async function (assert) {
    await render(
      hbs`<MobileMenu @register={{this.register}} @unregister={{this.unregister}} @parentBoundingClientRect={{hash}}/>`
    );

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <MobileMenu @register={{this.register}} @unregister={{this.unregister}} @parentBoundingClientRect={{hash}}>
        template block text
      </MobileMenu>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('it is a left menu by default', async function (assert) {
    assert.expect(1);

    await render(
      hbs`<MobileMenu @register={{this.register}} @unregister={{this.unregister}} @parentBoundingClientRect={{hash}}/>`
    );
    assert.dom('.mobile-menu').hasClass('mobile-menu--left');
  });

  test(`it is a right menu if type is 'right'`, async function (assert) {
    assert.expect(1);

    await render(
      hbs`<MobileMenu @type="right" @register={{this.register}} @unregister={{this.unregister}} @parentBoundingClientRect={{hash}}/>`
    );
    assert.dom('.mobile-menu').hasClass('mobile-menu--right');
  });

  test(`it adds a mask by default`, async function (assert) {
    assert.expect(1);

    await render(
      hbs`<MobileMenu @register={{this.register}} @unregister={{this.unregister}} @parentBoundingClientRect={{hash}}/>`
    );
    assert.dom('.mobile-menu__mask').exists({ count: 1 });
  });

  test(`it doesn't add a mask by if maskEnabled=false`, async function (assert) {
    assert.expect(1);

    await render(
      hbs`<MobileMenu @maskEnabled={{false}} @register={{this.register}} @unregister={{this.unregister}}/> @parentBoundingClientRect={{hash}}`
    );
    assert.dom('.mobile-menu__mask').doesNotExist();
  });
});
