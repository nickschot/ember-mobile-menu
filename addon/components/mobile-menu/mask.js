import Component from '@ember/component';

import { computed, get } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  classNames: ['mobile-menu__mask'],
  attributeBindings: ['style'],

  // public
  maskOpacityOffset: 5,

  // protected
  activeMenu: null,

  // hooks
  onClick(){},

  isOpen: computed('activeMenu.isOpen', function(){
    return !!get(this, 'activeMenu.isOpen');
  }),
  position: computed('activeMenu.currentPosition', function(){
    return get(this, 'activeMenu.currentPosition') || 0;
  }),

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

      return htmlSafe(style);
    }
  ),

  click(){
    get(this, 'onClick')();
  }
});
