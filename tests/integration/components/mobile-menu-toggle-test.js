import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

module('Integration | Component | mobile-menu-toggle', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<MobileMenuToggle/>`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <MobileMenuToggle>
        template block text
      </MobileMenuToggle>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('it fires the `onClick` hook with no argument when clicked', async function (assert) {
    assert.expect(2);

    this.handleClick = sinon.spy();

    await render(hbs`<MobileMenuToggle @onClick={{this.handleClick}}/>`);
    await click('.mobile-menu__toggle');

    assert.ok(this.handleClick.calledOnce, 'onClick was called once');
    assert.ok(this.handleClick.calledWithExactly(undefined));
  });

  test('it fires the `onClick` hook with the passed target when clicked', async function (assert) {
    assert.expect(2);

    this.handleClick = sinon.spy();

    await render(
      hbs`<MobileMenuToggle @target="right" @onClick={{this.handleClick}}/>`
    );
    await click('.mobile-menu__toggle');

    assert.ok(this.handleClick.calledOnce, 'onClick was called once');
    assert.ok(this.handleClick.calledWithExactly('right'));
  });
});
