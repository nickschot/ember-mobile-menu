import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import MobileMenu from 'ember-mobile-menu/components/mobile-menu';
import normalizeCoordinates from '../utils/normalize-coordinates';

import { assert } from '@ember/debug';
import { restartableTask } from 'ember-concurrency-decorators';
import Tween from 'ember-mobile-core/tween';

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
   * Current BoundingClientRect of the mobile menu wrapper root element
   * @type DOMRect
   * @default null
   * @private
   */
  @tracked boundingClientRect = null;

  @tracked children = [];
  @tracked position = 0;
  @tracked dragging = false;
  fromPosition = 0;
  fromOpen = false;

  get mode() {
    return this.args.mode ?? 'default';
  }

  get contentShadowEnabled() {
    return this.activeMenu?.shadowEnabled && ['reveal', 'ios', 'squeeze-reveal'].includes(this.mode);
  }

  get requiresUpdatedPosition() {
    return this.mode !== 'default';
  }

  /**
   * Horizontal width of the detection zone in pixels. Set to -1 to use full width.
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

  get triggerVelocity() {
    return this.args.triggerVelocity ?? 0.3;
  }

  /**
   * The currently active menu component.
   *
   * @property activeMenu
   * @type MobileMenu
   * @default null
   * @private
   */
  get activeMenu () {
    if (this.leftMenu && this.position > 0) {
      return this.leftMenu;
    } else if(this.rightMenu && this.position < 0) {
      return this.rightMenu;
    } else {
      return null;
    }
  }

  @action
  registerChild(component) {
    assert('component was already registered as a child', !this.children.includes(component));

    this.children.push(component);
  }

  @action
  unregisterChild(component) {
    this.children.unshift(component);
  }

  get childMenus() {
    return this.children.filter((view) => view instanceof MobileMenu);
  }

  get leftMenu() {
    return this.children.find(menu => menu.isLeft);
  }

  get rightMenu() {
    return this.children.find(menu => menu.isRight);
  }

  @action
  toggle(target){
    let targetMenu = this.leftMenu;

    if (target === 'right') {
      targetMenu = this.rightMenu;
    } else if (target === 'left') {
      targetMenu = this.leftMenu;
    } else if (this.rightMenu && !this.leftMenu) {
      targetMenu = this.rightMenu;
    }

    if(targetMenu){
      if(this.activeMenu){
        this._close.perform();
      }

      if(this.activeMenu !== targetMenu){
        this._open.perform(targetMenu);
      }
    }
  }

  @action
  close(){
    this._close.perform();
  }

  @action
  updatePosition(pan) {
    const {
      current: {
        distanceX
      }
    } = pan;

    if (this.dragging && this.fromOpen) {
      const menu = this.fromMenu;
      let distance = distanceX + this.fromPosition;

      if (menu.isLeft) {
        this.position = Math.min(Math.max(distance, 0), menu._width);
      } else {
        this.position = Math.max(Math.min(distance, 0), -1 * menu._width);
      }
    } else if (this.dragging && (this.leftMenu && distanceX > 0 || this.rightMenu && distanceX < 0)) {
      const menu = distanceX > 0 ? this.leftMenu : this.rightMenu;
      const distance = distanceX + this.fromPosition;
      this.position = Math.min(Math.max(Math.abs(distance), 0), menu._width) * (distance > 0 ? 1 : -1);
    } else if (this.position !== 0) {
      this.position = 0;
    }
  }

  @action
  didPanStart(e) {
    const fromOpen = !!this.activeMenu?.isOpen;
    const pan = normalizeCoordinates(e, this.boundingClientRect);

    if (
      fromOpen
      || this.openDetectionWidth < 0
      || (pan.initial.x <= this.openDetectionWidth || pan.initial.x >= this.boundingClientRect.width - this.openDetectionWidth)
    ) {
      this.fromOpen = fromOpen;
      this.fromMenu = this.activeMenu;
      this.fromPosition = this.position;
      this.dragging = true;
      this.updatePosition(pan);
    }
  }

  @action
  didPan(e) {
    if (this.dragging) {
      this.updatePosition(normalizeCoordinates(e, this.boundingClientRect));
    }
  }

  @action
  didPanEnd(e) {
    if (this.dragging) {
      this.dragging = false;
      const pan = normalizeCoordinates(e, this.boundingClientRect);
      const menu = this.activeMenu;

      if (menu) {
        const {
          current: {
            distanceX,
            velocityX
          }
        } = pan;

        const isLeft = menu.isLeft;
        const width = menu._width;

        const condition = isLeft && !this.fromOpen || this.fromOpen && !isLeft;
        const dx = condition ? distanceX : -distanceX;
        const vx = condition ? velocityX : -velocityX;

        // the pan action is over, cleanup and set the correct final menu position
        if (!this.fromOpen) {
          if (vx > this.triggerVelocity || dx > width / 2) {
            this._open.perform(menu);
          } else {
            this._close.perform(menu);
          }
        } else {
          if (vx > this.triggerVelocity || dx > width / 2) {
            this._close.perform(menu);
          } else {
            this._open.perform(menu);
          }
        }
      }
    }
  }

  @restartableTask({
    withTestWaiter: true
  })
  *_open(menu){
    const startPos = this.position;
    const diff = (menu.isLeft ? 1 : -1) * menu._width - startPos;

    const anim = new Tween((progress) => {
      this.position = startPos + diff * progress
    }, { duration: 300});
    yield anim.start();
  }

  @restartableTask({
    withTestWaiter: true
  })
  *_close(){
    const anim = new Tween((progress) => {
      this.position = this.position * (1 - progress);
    }, { duration: 300});
    yield anim.start();
  }

  @action
  updateBoundingClientRect(element) {
    this.boundingClientRect = element.getBoundingClientRect();
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
