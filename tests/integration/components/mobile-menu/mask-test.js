import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mobile-menu/mask', 'Integration | Component | mobile menu/mask', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mobile-menu/mask}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mobile-menu/mask}}
      template block text
    {{/mobile-menu/mask}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
