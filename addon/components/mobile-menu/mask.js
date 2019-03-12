import Component from '@ember/component';

import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

/**
 * A mask component.
 *
 * You usually do not need to use this component yourself. Whether or not a mask is present can be set by passing an
 * argument to the MobileMenu component.
 *
 * @class Mask
 * @private
 */
export default Component.extend({
  classNames: ['mobile-menu__mask'],
  attributeBindings: ['style'],

  /**
   * Offset (or "deadzone") used when calculating what opacity the mask should
   * currently be.
   *
   * Example: the default value is 0.1. This means the mask will only become
   * visible after the position is over 10% of the screen width.
   *
   * @argument maskOpacityOffset
   * @type number
   * @default 0.1
   */
  maskOpacityOffset: 0.1,

  /**
   * @argument isOpen
   * @type boolean
   * @default false
   * @protected
   */
  isOpen: false,

  /**
   * @argument position
   * @type number
   * @default 0
   * @protected
   */
  position: 0,

  /**
   * @argument onClick
   * @type function
   * @default function(){}
   * @protected
   */
  onClick(){},

  style: computed(
    'isOpen', 'position',
    'maskOpacityOffset',
    function() {
      let style = '';
      const position = this.get('position');

      style += !this.get('isOpen') && position === 0
        ? 'visibility: hidden;'
        : 'visibility: visible;';

      style += `opacity: ${
        position > this.get('maskOpacityOffset')
          ? (position - this.get('maskOpacityOffset'))
            / (1 - this.get('maskOpacityOffset'))
          : 0
      };`;

      return htmlSafe(style);
    }
  ),

  click(){
    this.get('onClick')();
  }
});
