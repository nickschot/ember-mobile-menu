import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mobile-menu-toggle', 'Integration | Component | mobile menu toggle', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mobile-menu-toggle}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mobile-menu-toggle}}
      template block text
    {{/mobile-menu-toggle}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
