/* eslint-disable ember/no-classic-classes, ember/no-component-lifecycle-hooks */
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

    this.set('current-when', this.qualifiedRouteName);
  },

  /**
   * Hook called when the link is clicked.
   *
   * @argument onClick
   * @type function
   * @default function(){}
   */
  onClick() {},

  click() {
    this.onClick();
  },
});
