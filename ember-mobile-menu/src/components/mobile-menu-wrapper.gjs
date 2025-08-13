import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { modifier as eModifier } from 'ember-modifier';
import { action } from '@ember/object';
import { TrackedSet } from 'tracked-built-ins';

import MobileMenu from './mobile-menu.gjs';
import normalizeCoordinates, {
  scaleCorrection,
} from '../utils/normalize-coordinates.js';

import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import './mobile-menu-wrapper.css';
import onResize from 'ember-on-resize-modifier/modifiers/on-resize';
import setBodyClass from 'ember-set-body-class/helpers/set-body-class';
import { hash } from '@ember/helper';

import MobileMenuComponent from './mobile-menu.gjs';
import ToggleComponent from './mobile-menu-toggle.gjs';
import ContentComponent from './mobile-menu-wrapper/content.gjs';
import { buildWaiter } from '@ember/test-waiters';

const isIOSDevice =
  typeof window !== 'undefined' &&
  window.navigator?.platform &&
  (/iP(ad|hone|od)/.test(window.navigator.platform) ||
    (window.navigator.platform === 'MacIntel' &&
      window.navigator.maxTouchPoints > 1));

const panningWaiter = buildWaiter('ember-mobile-menu:menu--panning');
const transitioningWaiter = buildWaiter(
  'ember-mobile-menu:menu--transitioning',
);

/**
 * Wrapper component for menu's. Provides pan recognition and management.
 *
 * @class MobileMenuWrapper
 * @yield {Hash} wrapper
 * @yield {MobileMenu component} wrapper.MobileMenu
 * @yield {Content component} wrapper.Content
 * @yield {MobileMenuToggle component} wrapper.Toggle
 * @yield {Hash} wrapper.actions
 * @yield {number} position Current position of the active menu in px.
 * @yield {Action} wrapper.actions.toggle
 * @yield {Action} wrapper.actions.close
 * @public
 */
export default class MobileMenuWrapper extends Component {
  get fastboot() {
    return getOwner(this).lookup('service:fastboot');
  }
  get isFastBoot() {
    return !!this.fastboot?.isFastBoot;
  }

  /**
   * Current BoundingClientRect of the mobile menu wrapper root element
   *
   * @property boundingClientRect
   * @type {DOMRect}
   * @default null
   * @private
   */
  @tracked boundingClientRect = null;

  @tracked children = new TrackedSet();
  @tracked position = 0;
  @tracked dragging = false;
  @tracked transitioning = false;
  @tracked animationDisabled = false;
  _panningWaiterToken = null;
  _transitioningWaiterToken = null;
  fromPosition = 0;
  fromOpen = false;
  defaultMenuDx = 0;
  _activeMenu = null; // used only in case a menu is set to open in a fastboot environment

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
    return this.args.preventScroll ?? true;
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
  get activeMenu() {
    if (this.isFastBoot && !this.children.size && this._activeMenu) {
      return this._activeMenu;
    }

    if (this.leftMenu && this.position > 0) {
      return this.leftMenu;
    } else if (this.rightMenu && this.position < 0) {
      return this.rightMenu;
    } else {
      return null;
    }
  }

  get isOpen() {
    return !!this.activeMenu?.isOpen;
  }

  get isNotClosed() {
    return this.activeMenu && !this.activeMenu.isClosed;
  }

  get mode() {
    return this.activeMenu?.mode;
  }

  get contentShadowEnabled() {
    return (
      this.activeMenu?.shadowEnabled &&
      ['reveal', 'ios', 'squeeze-reveal'].includes(this.mode)
    );
  }

  @action
  registerChild(component) {
    assert(
      'component was already registered as a child',
      !this.children.has(component),
    );

    this.children.add(component);
  }

  @action
  unregisterChild(component) {
    this.children.delete(component);
  }

  get childMenus() {
    return [...this.children].filter((view) => view instanceof MobileMenu);
  }

  get leftMenu() {
    return this.childMenus.find((menu) => menu.isLeft);
  }

  get rightMenu() {
    return this.childMenus.find((menu) => menu.isRight);
  }

  get preventBodyScroll() {
    return (
      this.preventScroll &&
      !this.embed &&
      this.isNotClosed &&
      this.activeMenu?.maskEnabled
    );
  }

  @action
  toggle(target) {
    let targetMenu = this.leftMenu;

    if (target === 'right') {
      targetMenu = this.rightMenu;
    } else if (target === 'left') {
      targetMenu = this.leftMenu;
    } else if (this.rightMenu && !this.leftMenu) {
      targetMenu = this.rightMenu;
    }

    if (targetMenu) {
      if (this.activeMenu === targetMenu) {
        // Target menu is already open, just close it
        this.close();
      } else {
        // Switch to target menu
        this.close();
        this.open(targetMenu);
      }
    }
  }

  @action
  updatePosition(pan) {
    const {
      current: { distanceX },
    } = pan;
    const distance = distanceX + this.fromPosition;

    // Simple position update - CSS transitions will handle smooth animation
    if (this.dragging) {
      const menu =
        this.fromMenu || (distance > 0 ? this.leftMenu : this.rightMenu);
      if (menu) {
        // Clamp position to menu bounds
        if (menu.isLeft) {
          this.position = Math.min(Math.max(distance, 0), menu._width);
        } else {
          this.position = Math.max(Math.min(distance, 0), -menu._width);
        }
      }
    }
  }

  @action
  didPanStart(e) {
    // Always start the panning waiter when pan starts - this ensures settled() waits
    this._panningWaiterToken = panningWaiter.beginAsync();

    // don't conflict with iOS browser's drag to go back/forward functionality
    if (
      this._isIOSbrowser &&
      (e.initial.x < 15 || e.initial.x > this._windowWidth - 15)
    ) {
      // Still end the waiter even if we don't process the pan
      if (this._panningWaiterToken) {
        panningWaiter.endAsync(this._panningWaiterToken);
        this._panningWaiterToken = null;
      }
      return;
    }

    const fromOpen = this.isOpen;
    const pan = scaleCorrection(
      normalizeCoordinates(e, this.boundingClientRect),
      this.scaleX,
      this.scaleY,
    );

    if (
      fromOpen ||
      this.openDetectionWidth < 0 ||
      (this.leftMenu && pan.initial.x <= this.openDetectionWidth) ||
      (this.rightMenu &&
        pan.initial.x >=
          this.boundingClientRect.width - this.openDetectionWidth)
    ) {
      this.fromOpen = fromOpen;
      this.fromMenu = this.activeMenu;
      this.fromPosition = this.position;
      this.dragging = true;
      this.updatePosition(pan);
      // End any ongoing transitions since dragging takes over position control
      if (this.activeMenu?.handleTransitionEnd) {
        this.activeMenu.handleTransitionEnd();
      }
    } else {
      // Pan didn't trigger dragging, so end the waiter immediately
      if (this._panningWaiterToken) {
        panningWaiter.endAsync(this._panningWaiterToken);
        this._panningWaiterToken = null;
      }
    }
  }

  @action
  didPan(e) {
    if (this.dragging) {
      this.updatePosition(
        scaleCorrection(
          normalizeCoordinates(e, this.boundingClientRect),
          this.scaleX,
          this.scaleY,
        ),
      );
    }
  }

  @action
  didPanEnd(e) {
    if (this.dragging) {
      this.dragging = false;
      const pan = scaleCorrection(
        normalizeCoordinates(e, this.boundingClientRect),
        this.scaleX,
        this.scaleY,
      );
      const menu = this.fromMenu || this.activeMenu;

      if (menu) {
        const {
          current: { distanceX, velocityX },
        } = pan;

        const isLeft = menu.isLeft;
        const width = menu._width;

        const condition =
          (isLeft && !this.fromOpen) || (this.fromOpen && !isLeft);
        const vx = condition ? velocityX : -velocityX;
        let dx = condition ? distanceX : -distanceX;

        // default menu dx correction
        if (this.fromOpen && this.mode === 'default') {
          if (isLeft) {
            dx -= this.defaultMenuDx;
          } else {
            dx += this.defaultMenuDx;
          }
        }

        // the pan action is over, cleanup and set the correct final menu position
        if (!this.fromOpen) {
          if (vx > this.triggerVelocity || dx > width / 2) {
            this.open(menu);
            // Don't end panning waiter yet - transition will take over
            return;
          } else {
            this.close(menu);
            // Don't end panning waiter yet - transition will take over
            return;
          }
        } else {
          if (
            this.mode === 'default'
              ? (vx > this.triggerVelocity && dx > 0) || dx > width / 2
              : vx > this.triggerVelocity || dx > width / 2
          ) {
            this.close(menu);
            // Don't end panning waiter yet - transition will take over
            return;
          } else {
            this.open(menu);
            // Don't end panning waiter yet - transition will take over
            return;
          }
        }
      }
    }

    // End panning waiter only if no transition was triggered
    if (this._panningWaiterToken) {
      panningWaiter.endAsync(this._panningWaiterToken);
      this._panningWaiterToken = null;
    }
  }

  @action
  setPosition(menu, targetPosition = 'open', animate = true) {
    // For closing, we might not have a menu reference, so use any menu with transitioning state
    const targetMenu = menu || this.childMenus.find((m) => m.isTransitioning);

    const toValue =
      targetPosition === 'close'
        ? 0
        : targetMenu
          ? (targetMenu.isLeft ? 1 : -1) * targetMenu._width
          : 0;

    const wasAlreadyAtTarget = this.position === toValue;

    if (!animate || wasAlreadyAtTarget) {
      // Set position immediately without animation
      this.animationDisabled = true;
      this.position = toValue;
      this.animationDisabled = false;
      // Ensure transitioning state is cleared
      this.transitioning = false;
      return;
    }

    // Start the transition waiter, but only if we don't already have one
    if (!this._transitioningWaiterToken) {
      this._transitioningWaiterToken = transitioningWaiter.beginAsync();
    }

    // Set position to trigger transition - CSS events will handle waiter lifecycle
    this.transitioning = true;
    this.position = toValue;
  }

  @action
  open(menu = this.activeMenu, animate = true) {
    this.setPosition(menu, 'open', animate);
  }

  @action
  close(menu = this.activeMenu, animate = true) {
    this.setPosition(menu, 'close', animate);
  }

  scaleX = 1;
  scaleY = 1;

  @action
  onResize({ target }) {
    this.boundingClientRect = target.getBoundingClientRect();
    this.updateScale(target);
  }

  @action
  updateScale(element) {
    this.scaleX = this.boundingClientRect.width / element.clientWidth;
    this.scaleY = this.boundingClientRect.height / element.clientHeight;
  }

  /**
   * Detect if the user is using the app from a browser on iOS
   *
   * @method _isIOSbrowser
   * @return {Boolean} Returns true when the user is using iOS and is inside a browser
   * @private
   */
  get _isIOSbrowser() {
    return isIOSDevice && !window.navigator.standalone;
  }

  get _windowWidth() {
    return window.innerWidth;
  }

  updateBounds = eModifier((element) => {
    this.boundingClientRect = element.getBoundingClientRect();
    this.updateScale(element);
  });

  @action
  onTransitionEnd() {
    if (this._transitioningWaiterToken) {
      transitioningWaiter.endAsync(this._transitioningWaiterToken);
      this._transitioningWaiterToken = null;
    }

    // Also end any pending panning waiter since the pan-to-transition sequence is complete
    if (this._panningWaiterToken) {
      panningWaiter.endAsync(this._panningWaiterToken);
      this._panningWaiterToken = null;
    }

    this.transitioning = false;
  }

  willDestroy() {
    // Clean up any pending waiters
    if (this._panningWaiterToken) {
      panningWaiter.endAsync(this._panningWaiterToken);
      this._panningWaiterToken = null;
    }

    if (this._transitioningWaiterToken) {
      transitioningWaiter.endAsync(this._transitioningWaiterToken);
      this._transitioningWaiterToken = null;
    }

    super.willDestroy(...arguments);
  }

  <template>
    {{#if this.preventBodyScroll}}
      {{setBodyClass "mobile-menu--prevent-scroll"}}
    {{/if}}

    <div
      class="mobile-menu-wrapper
        {{if this.embed 'mobile-menu-wrapper--embedded'}}"
      {{this.updateBounds}}
      {{onResize this.onResize}}
      ...attributes
    >
      {{yield
        (hash
          MobileMenu=(component
            MobileMenuComponent
            isDragging=this.dragging
            isTransitioning=this.transitioning
            position=this.position
            animationDisabled=this.animationDisabled
            embed=this.embed
            parentBoundingClientRect=this.boundingClientRect
            parent=this
            register=this.registerChild
            unregister=this.unregisterChild
            onClose=this.close
            onOpen=this.open
            onPanStart=this.didPanStart
            onPan=this.didPan
            onPanEnd=this.didPanEnd
            capture=this.capture
            preventScroll=this.preventScroll
            onTransitionEnd=this.onTransitionEnd
          )
          Toggle=(component ToggleComponent onClick=this.toggle)
          Content=(component
            ContentComponent
            shadowEnabled=this.contentShadowEnabled
            position=this.position
            mode=this.mode
            isOpen=this.activeMenu
            maskEnabled=this.activeMenu.maskEnabled
            onPanStart=this.didPanStart
            onPan=this.didPan
            onPanEnd=this.didPanEnd
            capture=this.capture
            preventScroll=this.preventScroll
            onClose=this.close
          )
          position=this.position
          actions=(hash toggle=this.toggle close=this.close)
        )
      }}
    </div>
  </template>
}
