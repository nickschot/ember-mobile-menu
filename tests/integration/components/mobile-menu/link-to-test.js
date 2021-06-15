import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';
import Service from '@ember/service';

module('Integration | Component | mobile-menu/link-to', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    // Template block usage:
    await render(hbs`
      <MobileMenu::LinkTo @route="index">
        My Link
      </MobileMenu::LinkTo>
    `);

    assert.equal(this.element.textContent.trim(), 'My Link');
  });

  test('it fires the onClick hook when clicked', async function (assert) {
    assert.expect(1);

    this.owner.register('service:router', class Router extends Service {});

    this.handleClick = sinon.spy();

    await render(hbs`{{mobile-menu/link-to "index" onClick=this.handleClick}}`);
    await click('a');

    assert.ok(this.handleClick.calledOnce, 'onClick was called once');
  });
});
