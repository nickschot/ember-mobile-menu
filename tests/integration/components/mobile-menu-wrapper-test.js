import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, waitFor, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import pan from '../../helpers/pan';

module('Integration | Component | mobile-menu-wrapper', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
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

  test('it renders a "left" menu by default', async function (assert) {
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

  test('it renders a "right" menu', async function (assert) {
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

  test('it opens the menu when the toggle is clicked', async function (assert) {
    assert.expect(8);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>

        <mmw.Content>
          <mmw.Toggle>Menu</mmw.Toggle>
        </mmw.Content>
      </MobileMenuWrapper>
    `);

    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');
    assert.dom('.mobile-menu').hasAttribute('aria-hidden', 'true');
    click('.mobile-menu__toggle');

    await waitFor('.mobile-menu--transitioning');
    assert.dom('.mobile-menu').hasClass('mobile-menu--transitioning');
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');
    assert.dom('.mobile-menu').doesNotHaveAttribute('aria-hidden');

    await settled();
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--transitioning');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');
    assert.dom('.mobile-menu').doesNotHaveAttribute('aria-hidden');
  });

  test('it toggles the right menu when it is the only one', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.MobileMenu @type="right" as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>

        <mmw.Content>
          <mmw.Toggle>Menu</mmw.Toggle>
        </mmw.Content>
      </MobileMenuWrapper>
    `);

    assert.dom('.mobile-menu--right').doesNotHaveClass('mobile-menu--open');
    await click('.mobile-menu__toggle');

    assert.dom('.mobile-menu--right').hasClass('mobile-menu--open');
  });

  test('it toggles the targetted menu', async function (assert) {
    assert.expect(8);

    this.set('target', 'right');

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.MobileMenu @type="left" as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>
        <mmw.MobileMenu @type="right" as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>

        <mmw.Content>
          <mmw.Toggle @target={{this.target}}>Menu</mmw.Toggle>
        </mmw.Content>
      </MobileMenuWrapper>
    `);

    assert.dom('.mobile-menu--left').doesNotHaveClass('mobile-menu--open');
    assert.dom('.mobile-menu--right').doesNotHaveClass('mobile-menu--open');
    await click('.mobile-menu__toggle');

    assert.dom('.mobile-menu--left').doesNotHaveClass('mobile-menu--open');
    assert.dom('.mobile-menu--right').hasClass('mobile-menu--open');

    await click('.mobile-menu__toggle');
    this.set('target', 'left');

    assert.dom('.mobile-menu--left').doesNotHaveClass('mobile-menu--open');
    assert.dom('.mobile-menu--right').doesNotHaveClass('mobile-menu--open');
    await click('.mobile-menu__toggle');

    assert.dom('.mobile-menu--left').hasClass('mobile-menu--open');
    assert.dom('.mobile-menu--right').doesNotHaveClass('mobile-menu--open');
  });

  test('it closes the menu when the mask is clicked', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>

        <mmw.Content>
          <mmw.Toggle>Menu</mmw.Toggle>
        </mmw.Content>
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

  test('it opens the menu when dragged', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>

        <mmw.Content>
          <mmw.Toggle>Menu</mmw.Toggle>
        </mmw.Content>
      </MobileMenuWrapper>
    `);

    await pan('.mobile-menu-wrapper__content', 'right');
    await settled();

    assert.dom('.mobile-menu').hasClass('mobile-menu--left');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');
  });

  test('it opens the "right" menu when dragged', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.MobileMenu @type="right" as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>

        <mmw.Content>
          <mmw.Toggle>Menu</mmw.Toggle>
        </mmw.Content>
      </MobileMenuWrapper>
    `);

    await pan('.mobile-menu-wrapper__content', 'left');
    await settled();

    assert.dom('.mobile-menu').hasClass('mobile-menu--right');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');
  });

  test('it does not open the menu when dragged in the wrong direction', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>

        <mmw.Content>
          <mmw.Toggle>Menu</mmw.Toggle>
        </mmw.Content>
      </MobileMenuWrapper>
    `);

    await pan('.mobile-menu-wrapper__content', 'left');
    await settled();

    assert.dom('.mobile-menu').hasClass('mobile-menu--left');
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');
  });

  test('it closes the menu when dragged from outside the menu', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>

        <mmw.Content>
          <mmw.Toggle>Menu</mmw.Toggle>
        </mmw.Content>
      </MobileMenuWrapper>
    `);

    await click('.mobile-menu__toggle');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');

    await pan('.mobile-menu__mask', 'left');
    await settled();
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');
  });

  test('it closes the menu when dragged on the menu itself', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>

        <mmw.Content>
          <mmw.Toggle>Menu</mmw.Toggle>
        </mmw.Content>
      </MobileMenuWrapper>
    `);

    await click('.mobile-menu__toggle');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');

    await pan('.mobile-menu__tray', 'left');
    await settled();
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');
  });

  test('it opens the embedded menu when dragged', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <div class="root-div" style="padding: 100px; height: 500px; background: red;">
        <MobileMenuWrapper @embed={{true}} as |mmw|>
          <mmw.MobileMenu as |mm|>
            <mm.LinkTo @route="index">Home</mm.LinkTo>
          </mmw.MobileMenu>

          <mmw.Content>
            <mmw.Toggle>Menu</mmw.Toggle>
          </mmw.Content>
        </MobileMenuWrapper>
      </div>
    `);

    await pan('.root-div', 'right');
    await settled();

    assert.dom('.mobile-menu').hasClass('mobile-menu--left');
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');

    await pan('.mobile-menu-wrapper__content', 'right');
    await settled();

    assert.dom('.mobile-menu').hasClass('mobile-menu--left');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');
  });

  test('it opens the "right" embedded menu when dragged', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <div class="root-div" style="padding: 100px; height: 500px; background: red;">
        <MobileMenuWrapper @embed={{true}} as |mmw|>
          <mmw.MobileMenu @type="right" as |mm|>
            <mm.LinkTo @route="index">Home</mm.LinkTo>
          </mmw.MobileMenu>

          <mmw.Content>
            <mmw.Toggle>Menu</mmw.Toggle>
          </mmw.Content>
        </MobileMenuWrapper>
      </div>
    `);

    await pan('.root-div', 'left');
    await settled();

    assert.dom('.mobile-menu').hasClass('mobile-menu--right');
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');

    await pan(
      '.mobile-menu-wrapper--embedded .mobile-menu-wrapper__content',
      'left'
    );
    await settled();

    assert.dom('.mobile-menu').hasClass('mobile-menu--right');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');
  });

  test('it closes the menu when dragged from outside the menu', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper @embed={{true}} as |mmw|>
        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>

        <mmw.Content>
          <mmw.Toggle>Menu</mmw.Toggle>
        </mmw.Content>
      </MobileMenuWrapper>
    `);

    await click('.mobile-menu__toggle');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');

    await pan('.mobile-menu__mask', 'left');
    await settled();
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');
  });

  test('it closes the menu when dragged on the menu itself', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.MobileMenu as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>

        <mmw.Content>
          <mmw.Toggle>Menu</mmw.Toggle>
        </mmw.Content>
      </MobileMenuWrapper>
    `);

    await click('.mobile-menu__toggle');
    assert.dom('.mobile-menu').hasClass('mobile-menu--open');

    await pan('.mobile-menu__tray', 'left');
    await settled();
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--open');
  });

  test('it renders the menu with the correct width/maxWidth', async function (assert) {
    assert.expect(2);

    this.set('maxWidth', -1);

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.MobileMenu @width={{100}} @maxWidth={{this.maxWidth}} as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>

        <mmw.Content>
          <mmw.Toggle>Menu</mmw.Toggle>
        </mmw.Content>
      </MobileMenuWrapper>
    `);

    const containerWidth = document
      .querySelector('.mobile-menu-wrapper')
      .getBoundingClientRect().width;

    await click('.mobile-menu__toggle');
    assert.dom('.mobile-menu__tray').hasStyle({
      width: `${containerWidth}px`,
    });

    this.set('maxWidth', 100);
    assert.dom('.mobile-menu__tray').hasStyle({
      width: `100px`,
    });
  });

  test('it opens/closes the menu according to the @isOpen argument and calls the accompanying @onToggle hook', async function (assert) {
    assert.expect(6);

    this.set('isOpen', true);
    this.set('onToggle', (isOpen) => {
      assert.equal(this.isOpen, isOpen);
    });

    await render(hbs`
      <MobileMenuWrapper as |mmw|>
        <mmw.MobileMenu @isOpen={{this.isOpen}} @onToggle={{this.onToggle}} as |mm|>
          <mm.LinkTo @route="index">Home</mm.LinkTo>
        </mmw.MobileMenu>

        <mmw.Content>
          <mmw.Toggle>Menu</mmw.Toggle>
        </mmw.Content>
      </MobileMenuWrapper>
    `);

    assert.dom('.mobile-menu--open').exists();

    this.set('isOpen', false);
    await settled();
    assert.dom('.mobile-menu--open').doesNotExist();

    this.set('isOpen', true);
    await settled();
    assert.dom('.mobile-menu--open').exists();
  });
});
