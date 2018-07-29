import Component from '@ember/component';

import { computed, get } from '@ember/object';
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

  // public
  maskOpacityOffset: 0.1,

  // protected
  isOpen: false,
  position: 0,

  // hooks
  onClick(){},

  style: computed(
    'isOpen', 'position',
    'maskOpacityOffset',
    function() {
      let style = '';
      const position = get(this, 'position');

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
    get(this, 'onClick')();
  }
});
