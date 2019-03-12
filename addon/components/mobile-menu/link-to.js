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

  /**
   * Hook called when the link is clicked.
   *
   * @argument onClick
   * @type function
   * @default function(){}
   */
  onClick(){},

  click(){
    this.get('onClick')();
  }
});
