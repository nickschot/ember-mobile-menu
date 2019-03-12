import Component from '@ember/component';
import layout from '../templates/components/mobile-menu-toggle';

/**
 * A toggle component to open or close a menu.
 *
 * @class MobileMenuToggle
 * @public
 */
export default Component.extend({
  layout,

  classNames: ['mobile-menu__toggle'],

  /**
   * Target menu for the toggle
   *
   * @property target
   * @type String 'left' or 'right'
   * @default 'left'
   * @public
   */
  target: 'left',

  /**
   * Hook fired when the toggle is clicked. You can pass in an action.
   *
   * @property onClick
   * @type Action
   * @public
   */
  onClick(){},

  click(){
    this.get('onClick')(this.get('target'));
  }
});
