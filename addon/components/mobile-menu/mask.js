import Component from '@ember/component';

import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  classNames: ['mobile-menu__mask'],

  maskOpacityOffset: 5,

  mobileMenu: service(),

  didReceiveAttrs(){
    if(this.element){
      this.element.setAttribute('style', get(this, 'style'));
    }
  },

  style: computed(
    'isOpen', 'position',
    'maskOpacityOffset',
    function() {
      let style = '';

      if(!this.get('isOpen') && this.get('position') === 0){
        style += 'visibility: hidden;';
      } else {
        style += 'visibility: visible;';
      }

      style += `opacity: ${this.get('position') > this.get('maskOpacityOffset')
        ? (
          this.get('position') - this.get('maskOpacityOffset'))
          / (100 - this.get('maskOpacityOffset')
        )
        : 0};`;

      return style;
    }
  ),

  onClick(){},

  click(){
    this.onClick();
  }
});
