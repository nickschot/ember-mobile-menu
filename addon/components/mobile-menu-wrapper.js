import Component from '@ember/component';
import layout from '../templates/components/mobile-menu-wrapper';

import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';

import RecognizerMixin from 'ember-mobile-core/mixins/pan-recognizer';
import ComponentParentMixin from 'ember-mobile-menu/mixins/component-parent';
import MobileMenu from 'ember-mobile-menu/components/mobile-menu';
import getWindowWidth from 'ember-mobile-core/utils/get-window-width';

export default Component.extend(RecognizerMixin, ComponentParentMixin, {
  layout,
  classNames: ['mobile-menu-wrapper'],

  userAgent: service(),

  //public
  openDetectionWidth: 15,  // in px

  //private
  isDraggingOpen: false,
  activeMenu: null,

  // ember-mobile-core options
  useCapture: true,
  preventScroll: false,

  childMenus: computed.filter('children', function(view){
    return view instanceof MobileMenu;
  }),
  leftMenu: computed('children.@each.type', function(){
    return get(this, 'children').find(menu => menu.get('isLeft'));
  }),
  rightMenu: computed('children.@each.type', function(){
    return get(this, 'children').find(menu => menu.get('isRight'));
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
    // only detect the pan if there is no currently active menu
    // disable edge pan for iOS browsers in non-standalone mode as it conflicts
    // with iOS's pan to go back/forward
    if(!this.get('activeMenu') && !this._isIOSbrowser()){
      const {
        initial: {
          x
        },
      } = e;

      // only detect initial drag from edges of the window if a menu is defined
      // for that side
      if(x < this.get('openDetectionWidth') && get(this, 'leftMenu')){
        this.lockPan();
        set(this, 'activeMenu', get(this, 'leftMenu'));
        this.set('isDraggingOpen', true);
      } else if(x > getWindowWidth() - this.get('openDetectionWidth') && get(this, 'rightMenu')){
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
  },

  /**
   * Detect if the user is using the app from a browser on iOS
   * @returns Boolean
   * @private
   */
  _isIOSbrowser(){
    return this.get('userAgent.os.isIOS') && !window.navigator.standalone;
  }
});
