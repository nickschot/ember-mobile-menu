import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, waitFor, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import pan from '../../helpers/pan';

module('Integration | Component | mobile-menu-wrapper', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{mobile-menu-wrapper}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#mobile-menu-wrapper}}
        template block text
      {{/mobile-menu-wrapper}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('it opens the menu when the toggle is clicked', async function(assert){
    assert.expect(5);

    await render(hbs`
      {{#mobile-menu-wrapper as |mmw|}}
        {{#mmw.toggle}}Menu{{/mmw.toggle}}
      
        {{#mmw.mobile-menu as |mm|}}
          {{#mm.link-to 'index'}}Home{{/mm.link-to}}
        {{/mmw.mobile-menu}}
      {{/mobile-menu-wrapper}}
    `);

    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');
    click('.mobile-menu__toggle');

    await waitFor('.mobile-menu--transitioning');
    assert.dom('.mobile-menu').hasClass('mobile-menu--transitioning');
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');

    await settled();
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--transitioning');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');
  });

  test('it closes the menu when the mask is clicked', async function(assert){
    assert.expect(4);

    await render(hbs`
      {{#mobile-menu-wrapper as |mmw|}}
        {{#mmw.toggle}}Menu{{/mmw.toggle}}
      
        {{#mmw.mobile-menu as |mm|}}
          {{#mm.link-to 'index'}}Home{{/mm.link-to}}
        {{/mmw.mobile-menu}}
      {{/mobile-menu-wrapper}}
    `);

    await click('.mobile-menu__toggle');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');

    click('.mobile-menu__mask');
    await waitFor('.mobile-menu--transitioning');
    assert.dom('.mobile-menu').hasClass('mobile-menu--transitioning');

    await settled();
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--transitioning');
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');
  });

  test('it opens the menu when dragged', async function(assert){
    assert.expect(1);

    await render(hbs`
      {{#mobile-menu-wrapper as |mmw|}}
        {{#mmw.toggle}}Menu{{/mmw.toggle}}
      
        {{#mmw.mobile-menu as |mm|}}
          {{#mm.link-to 'index'}}Home{{/mm.link-to}}
        {{/mmw.mobile-menu}}
      {{/mobile-menu-wrapper}}
    `);

    await pan('.mobile-menu-wrapper', 'right');
    await settled();

    assert.dom('.mobile-menu').hasClass('mobile-menu--open');
  });
});
