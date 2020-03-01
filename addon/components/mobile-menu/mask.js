import Component from '@glimmer/component';
import { htmlSafe } from '@ember/string';

const _fn = () => {};

/**
 * A mask component.
 *
 * You usually do not need to use this component yourself. Whether or not a mask is present can be set by passing an
 * argument to the MobileMenu component.
 *
 * @class Mask
 * @private
 */
export default class MaskComponent extends Component {
  /**
   * Offset (or "deadzone") used when calculating what opacity the mask should
   * currently be.
   *
   * Example: the default value is 0.1. This means the mask will only become
   * visible after the position is over 10% of the screen width.
   *
   * @argument maskOpacityOffset
   * @type number
   * @default 0.1
   */
  get maskOpacityOffset() {
    return this.args.maskOpacityOffset ?? 0.1;
  }

  /**
   * @argument isOpen
   * @type boolean
   * @default false
   * @protected
   */
  get isOpen() {
    return this.args.isOpen ?? false;
  }

  /**
   * @argument position
   * @type number
   * @default 0
   * @protected
   */
  get position() {
    return this.args.position ?? 0;
  }

  /**
   * @argument onClick
   * @type function
   * @default function(){}
   * @protected
   */
  get onClick(){
    return this.args.onClick ?? _fn;
  }

  get style() {
    let style = '';

    style += !this.isOpen && this.position === 0
      ? 'visibility: hidden;'
      : 'visibility: visible;';

    style += `opacity: ${
      this.position > this.maskOpacityOffset
        ? (this.position - this.maskOpacityOffset)
          / (1 - this.maskOpacityOffset)
        : 0
    };`;

    return htmlSafe(style);
  }
}
