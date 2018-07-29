import LinkComponent from '@ember/routing/link-component';

/**
 * An extended LinkTo component which provides an onClick hook.
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
