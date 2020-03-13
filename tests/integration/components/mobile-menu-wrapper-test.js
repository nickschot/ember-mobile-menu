import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, waitFor, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import pan from '../../helpers/pan';

module('Integration | Component | mobile-menu-wrapper', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<MobileMenuWrapper/>`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <MobileMenuWrapper>
        template block text
      </MobileMenuWrapper>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('it renders a "left" menu by default', async function(assert) {
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>
      </MobileMenuWrapper>
    `);

    assert.dom('.mobile-menu').hasClass('mobile-menu--left');
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--right');
  });

  test('it renders a "right" menu', async function(assert) {
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.MobileMenu @type="right" as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>
      </MobileMenuWrapper>
    `);

    assert.dom('.mobile-menu').hasClass('mobile-menu--right');
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--left');
  });

  test('it opens the menu when the toggle is clicked', async function(assert){
    assert.expect(5);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.Toggle>Menu</mmw.Toggle>

        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>
      </MobileMenuWrapper>
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
      <MobileMenuWrapper as |mmw|>
        <mmw.Toggle>Menu</mmw.Toggle>

        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>
      </MobileMenuWrapper>
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
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.Toggle>Menu</mmw.Toggle>

        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>
      </MobileMenuWrapper>
    `);

    await pan('.mobile-menu-wrapper', 'right');
    await settled();

    assert.dom('.mobile-menu').hasClass('mobile-menu--left');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');
  });

  test('it opens the "right" menu when dragged', async function(assert){
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.Toggle>Menu</mmw.Toggle>

        <mmw.MobileMenu @type="right" as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>
      </MobileMenuWrapper>
    `);

    await pan('.mobile-menu-wrapper', 'left');
    await settled();

    assert.dom('.mobile-menu').hasClass('mobile-menu--right');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');
  });


  test('it does not open the menu when dragged in the wrong direction', async function(assert){
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.Toggle>Menu</mmw.Toggle>

        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>
      </MobileMenuWrapper>
    `);

    await pan('.mobile-menu-wrapper', 'left');
    await settled();

    assert.dom('.mobile-menu').hasClass('mobile-menu--left');
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');
  });

  test('it closes the menu when dragged from outside the menu', async function(assert){
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.Toggle>Menu</mmw.Toggle>

        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>
      </MobileMenuWrapper>
    `);

    await click('.mobile-menu__toggle');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');

    await pan('.mobile-menu__mask', 'left');
    await settled();
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');
  });

  test('it closes the menu when dragged on the menu itself', async function(assert){
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.Toggle>Menu</mmw.Toggle>

        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>
      </MobileMenuWrapper>
    `);

    await click('.mobile-menu__toggle');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');

    await pan('.mobile-menu__tray', 'left');
    await settled();
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');
  });

  test('it opens the embedded menu when dragged', async function(assert){
    assert.expect(4);

    await render(hbs`
      <div class="root-div" style="padding: 100px; height: 500px; background: red;">
        <MobileMenuWrapper @embed={{true}} as |mmw|>
          <mmw.Toggle>Menu</mmw.Toggle>

          <mmw.MobileMenu as |mm|>
            <mm.LinkTo @route="index">Home</mm.LinkTo>
          </mmw.MobileMenu>
        </MobileMenuWrapper>
      </div>
    `);

    await pan('.root-div', 'right');
    await settled();

    assert.dom('.mobile-menu').hasClass('mobile-menu--left');
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');

    await pan('.mobile-menu-wrapper', 'right');
    await settled();

    assert.dom('.mobile-menu').hasClass('mobile-menu--left');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');
  });

  test('it opens the "right" embedded menu when dragged', async function(assert){
    assert.expect(4);

    await render(hbs`
      <div class="root-div" style="padding: 100px; height: 500px; background: red;">
        <MobileMenuWrapper @embed={{true}} as |mmw|>
          <mmw.Toggle>Menu</mmw.Toggle>

          <mmw.MobileMenu @type="right" as |mm|>
            <mm.LinkTo @route="index">Home</mm.LinkTo>
          </mmw.MobileMenu>
        </MobileMenuWrapper>
      </div>
    `);

    await pan('.root-div', 'left');
    await settled();

    assert.dom('.mobile-menu').hasClass('mobile-menu--right');
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');

    await pan('.mobile-menu-wrapper--embedded', 'left');
    await settled();

    assert.dom('.mobile-menu').hasClass('mobile-menu--right');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');
  });

  test('it closes the menu when dragged from outside the menu', async function(assert){
    assert.expect(2);

    await render(hbs`
        <MobileMenuWrapper @embed={{true}} as |mmw|>
        <mmw.Toggle>Menu</mmw.Toggle>

        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>
      </MobileMenuWrapper>
    `);

    await click('.mobile-menu__toggle');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');

    await pan('.mobile-menu__mask', 'left');
    await settled();
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');
  });

  test('it closes the menu when dragged on the menu itself', async function(assert){
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.Toggle>Menu</mmw.Toggle>

        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>
      </MobileMenuWrapper>
    `);

    await click('.mobile-menu__toggle');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');

    await pan('.mobile-menu__tray', 'left');
    await settled();
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');
  });
});
