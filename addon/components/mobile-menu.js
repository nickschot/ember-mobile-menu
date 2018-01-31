import Component from '@ember/component';
import layout from '../templates/components/mobile-menu';

import { get, computed, observer } from '@ember/object';
import { once } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,

  mobileMenu: service(),
  isFastBoot: computed.reads('mobileMenu.isFastBoot'),

  classNames: ['mobile-menu'],
  classNameBindings: ['mobileMenu.isDragging:mobile-menu--dragging', 'shadowEnabled:mobile-menu--shadow'],

  maskEnabled: true,
  shadowEnabled: true,

  positionChanged: observer(
    'mobileMenu.position',
    function(){
      once(this, function() {
        this.element.getElementsByClassName('mobile-menu__tray')[0].style.transform = get(this, 'style').transform;
      });
    }
  ),

  style: computed(
    'mobileMenu.position',
    function() {
      return {
        transform: `translateX(${this.get('mobileMenu.position')}vw)`
      };
    }
  ),

  actions: {
    close(){
      get(this, 'mobileMenu').close();
    }
  }
});
