import Component from '@ember/component';
import layout from '../templates/components/mobile-menu-wrapper';

import { computed, get, set } from '@ember/object';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';
import ComponentParentMixin from 'ember-mobile-menu/mixins/component-parent';
import MobileMenu from 'ember-mobile-menu/components/mobile-menu';
import windowWidth from 'ember-mobile-menu/utils/get-window-width';

export default Component.extend(RecognizerMixin, ComponentParentMixin, {
  layout,

  classNames: ['mobile-menu-wrapper'],

  recognizers: 'pan',

  //TODO: max-width support in px

  //public
  openDetectionWidth: 30,  // in px
  breakPoint:         768, // in px

  //private
  isDraggingOpen: false,
  activeMenu: null,

  childMenus: computed.filter('children', function(view){
    return view instanceof MobileMenu;
  }),
  leftMenu: computed('children.@each.type', function(){
    return get(this, 'children').find(menu => menu.get('isLeft'));
  }),
  rightMenu: computed('children.@each.type', function(){
    return get(this, 'children').find(menu => menu.get('isRight'));
  }),

  fastboot: computed(function() {
    const owner = getOwner(this);
    return owner.lookup('service:fastboot');
  }),
  isFastBoot: computed('fastboot', function(){
    return !!get(this, 'fastboot.isFastBoot');
  }),

  actions: {
    didCloseMenu(){
      set(this, 'activeMenu', false);
    },
    didOpenMenu(menu){
      set(this, 'activeMenu', menu);
    },
    toggle(target){
      const activeMenu = get(this, 'activeMenu');
      const targetMenu = target === 'right'
        ? get(this, 'rightMenu')
        : get(this, 'leftMenu');

      if(targetMenu){
        if(activeMenu){
          activeMenu.close();
        }

        if(activeMenu !== targetMenu){
          targetMenu.open();
        }
      }
    },
    close(){
      const activeMenu = get(this, 'activeMenu');

      if(activeMenu){
        activeMenu.close();
      }
    }
  },

  _isEnabled(e){
    const {
      center,
      pointerType
    } = e.originalEvent.gesture;

    return windowWidth() < get(this, 'breakPoint')
      && pointerType === 'touch'
      && !(center.x === 0 && center.y === 0); // workaround for https://github.com/hammerjs/hammer.js/issues/1132
  },

  panStart(e){
    if(this._isEnabled(e)){
      // add a dragging class so any css transitions are disabled
      // and the pan event is enabled
      if(!this.get('activeMenu') && !this.get('userAgent.os.isIOS')){
        const {
          center,
        } = e.originalEvent.gesture;

        // only detect initial drag from edges of the window
        if(center.x < this.get('openDetectionWidth')){
          set(this, 'activeMenu', get(this, 'leftMenu'));
          this.set('isDraggingOpen', true);
        } else if(center.x > windowWidth() - this.get('openDetectionWidth')){
          set(this, 'activeMenu', get(this, 'rightMenu'));
          this.set('isDraggingOpen', true);
        }
      }
    }
  },

  pan(e){
    if(this._isEnabled(e)){
      const activeMenu = get(this, 'activeMenu');

      if(activeMenu && get(this, 'isDraggingOpen')){
        activeMenu.panOpen(e);
      }
    }
  },

  panEnd(e) {
    if(this._isEnabled(e)){
      if(this.get('isDraggingOpen') && this.get('activeMenu')){
        set(this, 'isDraggingOpen', false);
        get(this, 'activeMenu').panOpenEnd(e);
      }
    }
  }
});
