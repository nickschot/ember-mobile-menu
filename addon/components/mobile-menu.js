import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { htmlSafe } from '@ember/template';
import { use, Resource } from 'ember-could-get-used-to-this';
import { next } from '@ember/runloop';

const _fn = function () {};
class StateResource extends Resource {
  open = false;
  closed = true;
  dragging = false;
  transitioning = false;

  get value() {
    return {
      open: this.open,
      closed: this.closed,
      dragging: this.dragging,
      transitioning: this.transitioning,
    };
  }

  setup() {
    this.setState(...this.args.positional);
  }

  update() {
    this.setState(...this.args.positional);
  }

  teardown() {}

  setState(position, isDragging, width, onToggle) {
    this.dragging = position !== 0 && isDragging;
    let open = !this.dragging && Math.abs(position) === width;
    let closed = !this.dragging && position === 0;
    this.maybeToggle(open, closed, onToggle);
    this.transitioning = !this.dragging && !this.open && !this.closed;
  }

  maybeToggle(open, closed, onToggle) {
    if (this.open !== open) {
      this.open = open;
      if (open) {
        next(() => onToggle(true));
      }
    } else if (this.closed !== closed) {
      this.closed = closed;
      if (closed) {
        next(() => onToggle(false));
      }
    }
  }
}

/**
 * Menu component
 *
 * @class MobileMenu
 * @public
 */
export default class MobileMenu extends Component {
  @use state = new StateResource(() => [
    this.position,
    this.args.isDragging,
    this._width,
    this.onToggle,
  ]);

  /**
   * The type of menu. Currently 'left' and 'right' are supported.
   *
   * @argument type
   * @type String
   * @default 'left'
   */
  get type() {
    return this.args.type ?? 'left';
  }

  /**
   * Sets the mode of the menu. Currently 'default', 'push', 'ios', 'reveal', 'squeeze' and 'squeeze-reveal' are supported.
   *
   * @argument mode
   * @type string
   * @default 'default'
   */
  get mode() {
    return this.args.mode ?? 'default';
  }

  /**
   * The percentage of the screen the menu will take when opened.
   *
   * @argument width
   * @type Number [0-100]
   * @default 85
   */
  get width() {
    return this.args.width ?? 85;
  }

  /**
   * The maximum width of the menu in pixels. Set to -1 to disable;
   *
   * @argument maxWidth
   * @type Number
   * @default 300
   */
  get maxWidth() {
    return this.args.maxWidth ?? 300;
  }

  /**
   * Whether or not a mask is added when the menu is opened.
   *
   * @argument maskEnabled
   * @type Boolean
   * @default true
   */
  get maskEnabled() {
    return this.args.maskEnabled ?? true;
  }

  /**
   * Whether or not a shadow is added to the menu.
   *
   * @argument shadowEnabled
   * @type Boolean
   * @default true
   */
  get shadowEnabled() {
    return this.args.shadowEnabled ?? true;
  }

  /**
   * The default swipe velocity needed to fully open the menu.
   *
   * @argument triggerVelocity
   * @type Number
   * @default 0.3
   */
  get triggerVelocity() {
    return this.args.triggerVelocity ?? 0.3;
  }

  /**
   * @argument isOpen
   * @type boolean
   * @default false
   */

  /**
   * Hook which is called after the transition with the new menu isOpen state.
   *
   * @argument onToggle
   * @type Function
   */
  get onToggle() {
    return this.args.onToggle ?? _fn;
  }

  /**
   * @argument embed
   * @type boolean
   * @default false
   * @protected
   */
  get embed() {
    return this.args.embed ?? false;
  }

  /**
   * Hook fired when the menu is opened. You can pass in an action. The menu instance will be passed to the action.
   *
   * @argument onOpen
   * @type Function
   * @protected
   */
  get onOpen() {
    return this.args.onOpen ?? _fn;
  }

  /**
   * Hook fired when the menu is closed. You can pass in an action. The menu instance will be passed to the action.
   *
   * @argument onClose
   * @type Action
   * @protected
   */
  get onClose() {
    return this.args.onClose ?? _fn;
  }

  /**
   * @argument position
   * @type number
   * @protected
   */
  get position() {
    return (this.isLeft && this.args.position > 0) ||
      (this.isRight && this.args.position < 0)
      ? this.args.position
      : 0;
  }

  /**
   * @argument isDragging
   * @type boolean
   * @protected
   */

  constructor() {
    super(...arguments);

    assert(
      'register function argument not passed. You should not be using <MobileMenu/> directly.',
      typeof this.args.register === 'function'
    );
    assert(
      'unregister function argument not passed. You should not be using <MobileMenu/> directly.',
      typeof this.args.unregister === 'function'
    );

    if (this.args.parent?.isFastBoot && this.args.isOpen) {
      this.args.parent._activeMenu = this;
      this.open(false);
    }
  }

  willDestroy() {
    this.args.unregister(this);
    super.willDestroy(...arguments);
  }

  get renderMenu() {
    return this.args.parent?.isFastBoot || this.args.parentBoundingClientRect;
  }

  get classNames() {
    let classes = `mobile-menu mobile-menu--${this.mode}`;
    if (this.isLeft) classes += ' mobile-menu--left';
    if (this.isRight) classes += ' mobile-menu--right';
    if (this.state.dragging) classes += ' mobile-menu--dragging';
    if (this.state.open) classes += ' mobile-menu--open';
    if (this.state.transitioning) classes += ' mobile-menu--transitioning';
    return classes;
  }

  get isLeft() {
    return this.type === 'left';
  }

  get isRight() {
    return this.type === 'right';
  }

  get relativePosition() {
    return Math.abs(this.position) / this._width;
  }

  get invertOpacity() {
    return ['ios', 'reveal', 'squeeze-reveal'].includes(this.args.mode);
  }

  /**
   * Current menu width in px
   *
   * @property _width
   * @return {Boolean}
   * @private
   */
  get _width() {
    const width = this.args.parentBoundingClientRect
      ? (this.width / 100) * this.args.parentBoundingClientRect.width
      : this.maxWidth;

    return this.maxWidth === -1 ? width : Math.min(width, this.maxWidth);
  }

  get style() {
    let styles = '';
    if (!this.maskEnabled && this.state.open) {
      styles = `width: ${this._width}px;`;
    }
    return htmlSafe(styles);
  }

  @action
  open(animate) {
    this.onOpen(this, 0, animate);
  }

  @action
  close(animate) {
    this.onClose(this, 0, animate);
  }

  _lastOpenStatus;
  _lastOpenAnimate;

  @action
  openOrClose(open, animate = true) {
    if (this._lastOpenStatus !== open || this._lastOpenAnimate !== animate) {
      this._lastOpenStatus = open;
      this._lastOpenAnimate = animate;

      if (open) {
        this.open(animate);
      } else {
        this.close(animate);
      }
    }
  }

  @action
  closeFromLinkTo() {
    if (!['squeeze', 'squeeze-reveal'].includes(this.mode)) {
      this.close();
    }
  }
}
