import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

import MobileMenu from 'ember-mobile-menu/components/mobile-menu';
import normalizeCoordinates from '../utils/normalize-coordinates';

import { assert } from '@ember/debug';

/**
 * Wrapper component for menu's. Provides pan recognition and management.
 *
 * @class MobileMenuWrapper
 * @yield {Hash} wrapper
 * @yield {MobileMenu component} wrapper.mobile-menu
 * @yield {MobileMenuToggle component} wrapper.toggle
 * @yield {Hash} wrapper.actions
 * @yield {Action} wrapper.actions.toggle
 * @yield {Action} wrapper.actions.close
 * @public
 */
export default class MobileMenuWrapper extends Component {
  @service userAgent;

  /**
   * Horizontal width of the detection zone in pixels
   *
   * @argument openDetectionWidth
   * @type Number
   * @default 15
   */
  get openDetectionWidth() {
    return this.args.openDetectionWidth ?? 15;
  }

  /**
   * If true the capture phase will be used for the event, giving it precedence over events in the (default)
   * bubble phase. This is handy for menus as they are usually defined high in the dom, are opened with edge gestures
   * and thus must take precedence over deeper nested elements by using the capture phase.
   *
   * See <https://www.w3.org/TR/DOM-Level-3-Events/#event-flow> for more details.
   *
   * @argument capture
   * @type Boolean
   * @default true
   */
  get capture() {
    return this.args.capture ?? true;
  }

  /**
   * If true, the component tries to prevent scroll when a menu is open
   *
   * @argument preventScroll
   * @type Boolean
   * @default false
   */
  get preventScroll() {
    return this.args.preventScroll ?? false;
  }

  /**
   * @argument embed
   * @type Boolean
   * @default false
   */
  get embed() {
    return this.args.embed ?? false;
  }

  /**
   * Denotes whether or not a menu is currently being dragged open. Turns false when the user releases the menu.
   *
   * @property isDraggingOpen
   * @type Boolean
   * @default false
   */
  @tracked isDraggingOpen = false;

  /**
   * The currently active menu component.
   *
   * @property activeMenu
   * @type MobileMenu
   * @default null
   * @private
   */
  @tracked activeMenu = null;

  @tracked _element = null;
  @tracked children = [];

  @action
  registerChild(component) {
    assert('component was already registered as a child', !this.children.includes(component));

    this.children.push(component);
  }

  @action
  unregisterChild(component) {
    this.children.unshift(component);
  }

  @computed('children')
  get childMenus() {
    this.children.filter((view) => view instanceof MobileMenu);
  }

  @computed('children.@each.type')
  get leftMenu() {
    return this.children.find(menu => menu.isLeft);
  }

  @computed('children.@each.type')
  get rightMenu() {
    return this.children.find(menu => menu.isRight);
  }

  @action
  didCloseMenu(){
    this.activeMenu = null;
  }

  @action
  didOpenMenu(menu){
    this.activeMenu = menu;
  }

  @action
  toggle(target){
    const targetMenu = target === 'right'
      ? this.rightMenu
      : this.leftMenu;

    if(targetMenu){
      if(this.activeMenu){
        this.activeMenu.send('close');
      }

      if(this.activeMenu !== targetMenu){
        targetMenu.send('open');
      }
    }
  }

  @action
  close(){
    if(this.activeMenu){
      this.activeMenu.send('close');
    }
  }

  @action
  didPanStart(e){
    // only detect the pan if there is no currently active menu
    // disable edge pan for iOS browsers in non-standalone mode as it conflicts
    // with iOS's pan to go back/forward
    if(!this.activeMenu && !this._isIOSbrowser()){
      const _e = normalizeCoordinates(e, this._element);
      const {
        initial: {
          x
        },
      } = _e;

      // only detect initial drag from edges of the window if a menu is defined
      // for that side
      if(x < this.openDetectionWidth && this.leftMenu){
        // TODO: this.lockPan();
        this.activeMenu = this.leftMenu;
        this.isDraggingOpen = true;
      } else if(
        x > this._element.getBoundingClientRect().width - this.openDetectionWidth
        && this.rightMenu
      ){
        // TODO: this.lockPan();
        this.activeMenu = this.rightMenu;
        this.isDraggingOpen = true;
      }
    }
  }

  @action
  didPan(e){
    if(this.activeMenu && this.isDraggingOpen){
      const _e = normalizeCoordinates(e, this._element);
      this.activeMenu.panOpen(_e);
    }
  }

  @action
  didPanEnd(e) {
    if(this.isDraggingOpen && this.activeMenu){
      const _e = normalizeCoordinates(e, this._element);
      this.isDraggingOpen = false;
      this.activeMenu.panOpenEnd(_e);
    }
  }

  /**
   * Detect if the user is using the app from a browser on iOS
   *
   * @method _isIOSbrowser
   * @return {Boolean} Returns true when the user is using iOS and is inside a browser
   * @private
   */
  _isIOSbrowser(){
    return this.userAgent.os.isIOS && !window.navigator.standalone;
  }
}
