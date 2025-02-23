import Component from '@glimmer/component';
import { action } from '@ember/object';
import { cached, tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { htmlSafe } from '@ember/template';
import { next } from '@ember/runloop';
import './mobile-menu.css';
import { registerDestructor } from '@ember/destroyable';

const _fn = function () {};
class StateResource {
  @tracked _open = false;
  @tracked _closed = true;
  @tracked _dragging = false;
  @tracked _transitioning = false;

  _useState;

  constructor(owner, useState = () => {}) {
    this._useState = useState;

    registerDestructor(owner, () => {
      this._useState = undefined;
    });
  }

  @cached
  get current() {
    let [position, isDragging, width, onToggle] = this._useState();

    this._dragging = position !== 0 && isDragging;
    let open = !this._dragging && Math.abs(position) === width;
    let closed = !this._dragging && position === 0;
    // eslint-disable-next-line ember/no-runloop
    next(() => {
      this.maybeToggle(open, closed, onToggle);
    });
    this._transitioning = !this._dragging && !this._open && !this._closed;

    return {
      open: this._open,
      closed: this._closed,
      dragging: this._dragging,
      transitioning: this._transitioning,
    };
  }

  get open() {
    return this.current.open;
  }
  get closed() {
    return this.current.closed;
  }
  get dragging() {
    return this.current.dragging;
  }
  get transitioning() {
    return this.current.transitioning;
  }

  maybeToggle(open, closed, onToggle) {
    if (this._open !== open) {
      this._open = open;
      if (open) {
        onToggle(true);
      }
    } else if (this.closed !== closed) {
      this._closed = closed;
      if (closed) {
        onToggle(false);
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
  state = new StateResource(this, () => [
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
      typeof this.args.register === 'function',
    );
    assert(
      'unregister function argument not passed. You should not be using <MobileMenu/> directly.',
      typeof this.args.unregister === 'function',
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

  @action
  openOrClose(open, animate = true) {
    if (open) {
      this.open(animate);
    } else {
      this.close(animate);
    }
  }

  @action
  closeFromLinkTo() {
    if (!['squeeze', 'squeeze-reveal'].includes(this.mode)) {
      this.close();
    }
  }
}
