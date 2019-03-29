import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mobile-menu', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{mobile-menu}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#mobile-menu}}
        template block text
      {{/mobile-menu}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('it is a left menu by default', async function(assert){
    assert.expect(1);

    await render(hbs`{{mobile-menu}}`);
    assert.dom('.mobile-menu').hasClass('mobile-menu--left');
  });

  test(`it is a right menu if type is 'right'`, async function(assert){
    assert.expect(1);

    await render(hbs`{{mobile-menu type="right"}}`);
    assert.dom('.mobile-menu').hasClass('mobile-menu--right');
  });

  test(`it adds a mask by default`, async function(assert){
    assert.expect(1);

    await render(hbs`{{mobile-menu}}`);
    assert.dom('.mobile-menu__mask').exists({ count: 1 });
  });

  test(`it doesn't add a mask by if maskEnabled=false`, async function(assert){
    assert.expect(1);

    await render(hbs`{{mobile-menu maskEnabled=false}}`);
    assert.dom('.mobile-menu__mask').doesNotExist();
  });

  test(`it adds a shadow by default`, async function(assert){
    assert.expect(1);

    await render(hbs`{{mobile-menu}}`);
    assert.dom('.mobile-menu').hasClass('mobile-menu--shadow');
  });

  test(`it doesn't add a shadow by if shadowEnabled=false`, async function(assert){
    assert.expect(1);

    await render(hbs`{{mobile-menu shadowEnabled=false}}`);
    assert.dom('.mobile-menu').doesNotHaveClass('mobile-menu--shadow');
  });
});
