import Component from '@ember/component';
import layout from '../templates/components/mobile-menu-wrapper';

import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';

import RecognizerMixin from 'ember-mobile-core/mixins/pan-recognizer';
import ComponentParentMixin from 'ember-mobile-menu/mixins/component-parent';
import MobileMenu from 'ember-mobile-menu/components/mobile-menu';
import getWindowWidth from 'ember-mobile-core/utils/get-window-width';

/**
 * Wrapper component for menu's. Provides pan recognition and management.
 *
 * @class MobileMenuWrapper
 * @yield {Hash} wrapper
 * @yield {Component} wrapper.MobileMenu
 * @yield {Component} wrapper.MobileMenuToggle
 * @yield {Hash} wrapper.actions
 * @yield {Action} wrapper.actions.toggle
 * @yield {Action} wrapper.actions.close
 * @public
 */
export default Component.extend(RecognizerMixin, ComponentParentMixin, {
  layout,
  classNames: ['mobile-menu-wrapper'],

  userAgent: service(),

  /**
   * Horizontal width of the detection zone in pixels
   *
   * @argument openDetectionWidth
   * @type Number
   */
  openDetectionWidth: 15,  // in px

  /**
   * Denotes whether or not a menu is currently being dragged open. Turns false when the user releases the menu.
   *
   * @argument isDraggingOpen
   * @type Boolean
   */
  isDraggingOpen: false,

  // ember-mobile-core options
  /**
   * If true the capture phase will be used for the event, giving it precedence over events in the (default)
   * bubble phase. This is handy for menus as they are usually defined high in the dom, are opened with edge gestures
   * and thus must take precedence over deeper nested elements by using the capture phase.
   *
   * See <https://www.w3.org/TR/DOM-Level-3-Events/#event-flow> for more details.
   *
   * @argument useCapture
   * @type Boolean
   * @default true
   */
  useCapture: true,

  /**
   * If true, the component tries to prevent scroll when a menu is open
   *
   * @argument preventScroll
   * @type Boolean
   * @default false
   */
  preventScroll: false,

  /**
   * The currently active menu component.
   *
   * @property activeMenu
   * @type MobileMenu
   */
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

  actions: {
    didCloseMenu(){
      set(this, 'activeMenu', null);
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
   *
   * @method _isIOSbrowser
   * @return {Boolean} Returns true when the user is using iOS and is inside a browser
   * @private
   */
  _isIOSbrowser(){
    return this.get('userAgent.os.isIOS') && !window.navigator.standalone;
  }
});
