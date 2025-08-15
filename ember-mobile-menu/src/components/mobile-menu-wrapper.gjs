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
import { waitFor } from '@ember/test-waiters';
import { restartableTask } from 'ember-concurrency';
import Spring from '../spring.js';
import './mobile-menu-wrapper.css';
import onResize from 'ember-on-resize-modifier/modifiers/on-resize';
import { hash } from '@ember/helper';

import MobileMenuComponent from './mobile-menu.gjs';
import ToggleComponent from './mobile-menu-toggle.gjs';
import ContentComponent from './mobile-menu-wrapper/content.gjs';

const isIOSDevice =
  typeof window !== 'undefined' &&
  window.navigator?.platform &&
  (/iP(ad|hone|od)/.test(window.navigator.platform) ||
    (window.navigator.platform === 'MacIntel' &&
      window.navigator.maxTouchPoints > 1));

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
 * @yield {number} relativePosition Current position of the active menu between 0 and 1.
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
  fromPosition = 0;
  fromOpen = false;
  defaultMenuDx = 0;
  preservedVelocity = 0;
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
    if (this.isFastBoot && !this.children.length && this._activeMenu) {
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
    return !!this.activeMenu?.state.open;
  }

  get isNotClosed() {
    return this.activeMenu && !this.activeMenu.state.closed;
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

  get requiresUpdatedPosition() {
    return this.mode !== 'default';
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

  get relativePosition() {
    return this.activeMenu
      ? Math.abs(this.position) / this.activeMenu._width
      : 0;
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
      this.close();
      if (this.activeMenu !== targetMenu) {
        this.open(targetMenu);
      }
    }
  }

  @action
  updatePosition(pan) {
    const {
      initial: { x: initialX },
      current: { distanceX },
    } = pan;

    let distance = distanceX + this.fromPosition;
    if (this.dragging && this.fromOpen) {
      const menu = this.fromMenu;

      // default menu dx correction
      if (this.mode === 'default') {
        if (menu.isLeft && initialX > menu._width) {
          this.defaultMenuDx = initialX - menu._width;
          if (initialX + distanceX > menu._width) {
            return;
          }
        } else if (
          menu.isRight &&
          initialX < this.boundingClientRect.width - menu._width
        ) {
          this.defaultMenuDx =
            initialX - (this.boundingClientRect.width - menu._width);
          if (
            initialX + distanceX <
            this.boundingClientRect.width - menu._width
          ) {
            return;
          }
        } else {
          this.defaultMenuDx = 0;
        }

        distance += this.defaultMenuDx;
      }

      if (menu.isLeft) {
        this.position = Math.min(Math.max(distance, 0), menu._width);
      } else {
        this.position = Math.max(Math.min(distance, 0), -1 * menu._width);
      }
    } else if (
      this.dragging &&
      ((this.leftMenu && distance > 0) || (this.rightMenu && distance < 0))
    ) {
      const menu = distance > 0 ? this.leftMenu : this.rightMenu;
      this.position =
        Math.min(Math.max(Math.abs(distance), 0), menu._width) *
        (distance > 0 ? 1 : -1);
    } else if (this.position !== 0) {
      this.position = 0;
    }
  }

  @action
  didPanStart(e) {
    if (this.finishTransitionTask.isRunning) {
      this.finishTransitionTask.cancelAll();
      this.preservedVelocity = 0;
    }

    // don't conflict with iOS browser's drag to go back/forward functionality
    if (
      this._isIOSbrowser &&
      (e.initial.x < 15 || e.initial.x > this._windowWidth - 15)
    ) {
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
      const menu = this.activeMenu;

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
            this.open(menu, velocityX);
          } else {
            this.close(menu, velocityX);
          }
        } else {
          if (
            this.mode === 'default'
              ? (vx > this.triggerVelocity && dx > 0) || dx > width / 2
              : vx > this.triggerVelocity || dx > width / 2
          ) {
            this.close(menu, velocityX);
          } else {
            this.open(menu, velocityX);
          }
        }
      }
    }
  }

  finishTransitionTask = restartableTask(
    waitFor(
      async (
        menu,
        targetPosition = 'open',
        currentVelocity = 0,
        animate = true,
      ) => {
        const fromValue = this.position;
        const toValue =
          targetPosition === 'close' ? 0 : (menu.isLeft ? 1 : -1) * menu._width;

        if (fromValue !== toValue && animate) {
          const spring = new Spring((s) => (this.position = s.currentValue), {
            stiffness: 1000,
            mass: 3,
            damping: 500,
            overshootClamping: true,

            fromValue,
            toValue,
            initialVelocity: this.preservedVelocity || currentVelocity,
          });

          try {
            await spring.start();
          } finally {
            spring.stop();
            this.preservedVelocity = spring.currentVelocity;
          }
        } else {
          this.position = toValue;
          this.preservedVelocity = 0;
        }
      },
    ),
  );

  @action
  open(menu = this.activeMenu, currentVelocity, animate) {
    this.finishTransitionTask.perform(menu, 'open', currentVelocity, animate);
  }

  @action
  close(menu = this.activeMenu, currentVelocity, animate) {
    this.finishTransitionTask.perform(menu, 'close', currentVelocity, animate);
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

  <template>
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
            position=this.position
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
          relativePosition=this.relativePosition
          actions=(hash toggle=this.toggle close=this.close)
        )
      }}
    </div>
  </template>
}
