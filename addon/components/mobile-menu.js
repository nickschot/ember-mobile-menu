import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { htmlSafe } from '@ember/string';

import defineModifier from 'ember-concurrency-test-waiter/define-modifier';
defineModifier();

const _fn = function(){};

/**
 * Menu component
 *
 * @class MobileMenu
 * @public
 */
export default class MobileMenu extends Component {
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
   * @default default''
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
    return (this.isLeft && this.args.position > 0 || this.isRight && this.args.position < 0)
      ? this.args.position
      : 0;
  }

  /**
   * @argument isDragging
   * @type boolean
   * @protected
   */
  get isDragging() {
    return this.args.isDragging && this.position !== 0;
  }

  constructor() {
    super(...arguments);

    assert('register function argument not passed. You should not be using <MobileMenu/> directly.', typeof this.args.register === 'function');
    assert('unregister function argument not passed. You should not be using <MobileMenu/> directly.', typeof this.args.unregister === 'function');

    this.args.register(this);
  }

  willDestroy() {
    this.args.unregister(this);
    super.willDestroy(...arguments);
  }

  get classNames() {
    let classes = `mobile-menu mobile-menu--${this.mode}`;
    if (this.isLeft) classes += ' mobile-menu--left';
    if (this.isRight) classes += ' mobile-menu--right';
    if (this.isDragging) classes += ' mobile-menu--dragging';
    if (this.isOpen) classes += ' mobile-menu--open';
    if (this.isTransitioning) classes += ' mobile-menu--transitioning';
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

  get isClosed() {
    return !this.isDragging && this.position === 0;
  }

  get isOpen() {
    return !this.isDragging && Math.abs(this.position) === this._width;
  }

  get isTransitioning() {
    return !this.isDragging && !this.isOpen && !this.isClosed;
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
      ? this.width / 100 * this.args.parentBoundingClientRect?.width
      : this.width;

    return this.maxWidth === -1 ? width : Math.min(width, this.maxWidth);
  }

  get style() {
    let styles = '';
    if (!this.maskEnabled && this.isOpen) {
      styles = `width: ${this._width}px;`;
    }
    return htmlSafe(styles);
  }

  @action
  open(){
    this.onOpen(this);
  }

  @action
  close(){
    this.onClose(this);
  }
}
