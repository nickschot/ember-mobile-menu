import Component from '@ember/component';
import layout from '../templates/components/mobile-menu-wrapper';

import { getOwner } from "@ember/application"
import { computed, get, set } from '@ember/object';
import RecognizerMixin from 'ember-mobile-core/mixins/pan-recognizer';
import ComponentParentMixin from 'ember-mobile-menu/mixins/component-parent';
import MobileMenu from 'ember-mobile-menu/components/mobile-menu';
import getWindowWidth from 'ember-mobile-core/utils/get-window-width';

export default Component.extend(RecognizerMixin, ComponentParentMixin, {
  layout,
  classNames: ['mobile-menu-wrapper'],

  //public
  openDetectionWidth: 15,  // in px

  //private
  isDraggingOpen: false,
  activeMenu: null,

  // ember-mobile-core options
  useCapture: true,

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

  didPanStart(e){
    // add a dragging class so any css transitions are disabled
    // and the pan event is enabled
    if(!this.get('activeMenu') && !this.get('userAgent.os.isIOS')){
      const {
        initial: {
          x
        },
      } = e;

      // only detect initial drag from edges of the window
      if(x < this.get('openDetectionWidth')){
        this.lockPan();
        set(this, 'activeMenu', get(this, 'leftMenu'));
        this.set('isDraggingOpen', true);
      } else if(x > getWindowWidth() - this.get('openDetectionWidth')){
        this.lockPan();
        set(this, 'activeMenu', get(this, 'rightMenu'));
        this.set('isDraggingOpen', true);
      }
    }
  },

  didPan(e){
    const activeMenu = get(this, 'activeMenu');

    if(activeMenu && get(this, 'isDraggingOpen')){
      activeMenu.panOpen(e);
    }
  },

  didPanEnd(e) {
    if(this.get('isDraggingOpen') && this.get('activeMenu')){
      set(this, 'isDraggingOpen', false);
      get(this, 'activeMenu').panOpenEnd(e);
    }
  }
});
