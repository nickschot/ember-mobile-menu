import Component from '@ember/component';

import { computed, get } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  classNames: ['mobile-menu__mask'],
  attributeBindings: ['style'],

  // public
  maskOpacityOffset: 5,

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
      const position = Math.abs(get(this, 'position'));

      style += !this.get('isOpen') && position === 0
        ? 'visibility: hidden;'
        : 'visibility: visible;';

      style += `opacity: ${
        position > this.get('maskOpacityOffset')
          ? (position - this.get('maskOpacityOffset'))
            / (100 - this.get('maskOpacityOffset'))
          : 0
      };`;

      return htmlSafe(style);
    }
  ),

  click(){
    get(this, 'onClick')();
  }
});
