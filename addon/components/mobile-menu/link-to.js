import LinkComponent from '@ember/routing/link-component';

/**
 * An extended LinkTo component which closes the menu when clicked.
 *
 * @class LinkTo
 * @public
 */
export default LinkComponent.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    this.set('current-when', this.get('qualifiedRouteName'));
  },

  onClick() {},

  click(){
    this.onClick();
  }
});
