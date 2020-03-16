import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
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
   * @argument mode
   * @type string
   * @protected
   */

  /**
   * @property dxCorrection
   * @type number
   * @default 0
   * @private
   */
  @tracked dxCorrection = 0;

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
    let classes = `mobile-menu mobile-menu--${this.args.mode}`;
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

  get isOpen() {
    return !this.isDragging && Math.abs(this.position) === this._width;
  }

  get isTransitioning() {
    return !this.isDragging && (this.isLeft && this.args.position > 0 || this.isRight && this.args.position < 0);
  }

  get position() {
    return (this.isLeft && this.args.position > 0 || this.isRight && this.args.position < 0)
      ? this.args.position
      : 0;
  }

  get isDragging() {
    return this.args.isDragging && (this.isLeft && this.args.position > 0 || this.isRight && this.args.position < 0);
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
      ? this.width / 100 * this.args.parentBoundingClientRect?.width
      : this.width;

    return this.maxWidth === -1 ? width : Math.min(width, this.maxWidth);
  }

  get style() {
    let styles = '';
    if (['squeeze', 'squeeze-reveal'].includes(this.args.mode) && !this.maskEnabled && this.isOpen) {
      styles =`width: ${this._width}px;`;
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

  /*
  @action
  didPan(e){
    const _e = normalizeCoordinates(e, this.args.parentBoundingClientRect);
    const {
      current: {
        distanceX,
        x
      }
    } = _e;

    const isLeft = this.isLeft;
    const windowWidth = this.args.parentBoundingClientRect.width;
    const width = this._width;

    const dx = isLeft ? distanceX : -distanceX;
    const cx = isLeft ? x : windowWidth - x;

    if(this.isOpen && !this.isDragging){
      // calculate and set a correction delta if the pan started outside the opened menu
      if(cx < width) {
        this.isDragging = true;
        this.dxCorrection = dx;
      }
    }

    if(this.isDragging){
      let targetPosition = dx;

      // correct targetPosition with dxCorrection set earlier
      targetPosition -= this.dxCorrection;

      // enforce limits on the offset [0, width]
      if(cx < width){
        if(targetPosition > 0){
          targetPosition = 0;
        } else if(targetPosition < -1 * width){
          targetPosition = -1 * width;
        }
        this.position = width + targetPosition;

        if (this.args.didUpdatePosition) {
          this.args.didUpdatePosition(this.position);
        }
      }
    }
  }

  @action
  didPanEnd(e){
    if(this.isDragging){
      this.isDragging = false;

      const _e = normalizeCoordinates(e, this.args.parentBoundingClientRect);
      const {
        current: {
          distanceX,
          velocityX
        }
      } = _e;

      const triggerVelocity = this.triggerVelocity;

      const isLeft = this.isLeft;
      const width = this._width;

      const dx = isLeft ? distanceX : -distanceX;
      const vx = isLeft ? velocityX : -velocityX;

      // the pan action is over, cleanup and set the correct final menu position
      if (vx < -1 * triggerVelocity || -1 * dx > width / 2){
        this._close.perform();
      } else {
        this._open.perform();
      }

      this.dxCorrection = 0;
    }
  }*/
}
