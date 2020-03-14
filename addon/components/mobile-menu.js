import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

import Tween from 'ember-mobile-core/tween';
import { restartableTask } from 'ember-concurrency-decorators';
import normalizeCoordinates from '../utils/normalize-coordinates';

import defineModifier from 'ember-concurrency-test-waiter/define-modifier';
defineModifier();

const _fn = () => {};

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
   * @property isDragging
   * @type boolean
   * @default false
   * @private
   */
  @tracked isDragging = false;

  /**
   * @property position
   * @type number
   * @default 0
   * @private
   */
  @tracked position = 0;

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
    let classes = 'mobile-menu';
    if (this.isLeft) classes += ' mobile-menu--left';
    if (this.isRight) classes += ' mobile-menu--right';
    if (this.isDragging) classes += ' mobile-menu--dragging';
    if (this.isOpen) classes += ' mobile-menu--open';
    if (this.isTransitioning) classes += ' mobile-menu--transitioning';
    if (this.shadowEnabled) classes += ' mobile-menu--shadow';
    return classes;
  }

  get isLeft() {
    return this.type === 'left';
  }

  get isRight() {
    return this.type === 'right';
  }

  get isOpen() {
    return !this.isDragging && this.position === this._width;
  }

  get isTransitioning() {
    return this._open.isRunning || this._close.isRunning;
  }

  get relativePosition() {
    return Math.abs(this.position) / this._width;
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

  @restartableTask({
    withTestWaiter: true
  })
  *_open(){
    const startPos = this.position;
    const diff = this._width - startPos;

    const anim = new Tween((progress) => {
      this.position = startPos + diff * progress;
    }, { duration: 300});
    yield anim.start();

    this.onOpen(this);
  }

  @restartableTask({
    withTestWaiter: true
  })
  *_close(){
    const anim = new Tween((progress) => {
      this.position = this.position * (1 - progress);
    }, { duration: 300});
    yield anim.start();

    this.onClose();
  }

  @action
  open(){
    this._open.perform();
  }

  @action
  close(){
    this._close.perform();
  }

  @action
  panOpen(e){
    this.isDragging = true;

    const _e = normalizeCoordinates(e, this.args.parentBoundingClientRect);
    const {
      current: {
        distanceX
      }
    } = _e;

    const dx = this.isLeft ? distanceX : -distanceX;
    const width = this._width;

    // enforce limits on the offset [0, width]
    this.position = Math.min(Math.max(dx, 0), width);
  }

  @action
  panOpenEnd(e){
    this.isDragging = false;

    const _e = normalizeCoordinates(e, this.args.parentBoundingClientRect);
    const {
      current: {
        distanceX,
        velocityX,
      }
    } = _e;

    const triggerVelocity = this.triggerVelocity;

    const isLeft = this.isLeft;
    const width = this._width;

    const dx = isLeft ? distanceX : -distanceX;
    const vx = isLeft ? velocityX : -velocityX;

    // when overall horizontal velocity is high, force open/close and skip the rest
    if (vx > triggerVelocity || dx > width / 2) {
      this._open.perform();
    } else {
      this._close.perform();
    }
  }

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
  }
}
