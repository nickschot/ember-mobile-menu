import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import './mask.css';
import { on } from '@ember/modifier';
import didPan from 'ember-gesture-modifiers/modifiers/did-pan';

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
   * @argument invertOpacity
   * @type boolean
   * @default undefined
   * @protected
   */

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
  get onClick() {
    return this.args.onClick ?? _fn;
  }

  get style() {
    let style = '';

    style +=
      !this.isOpen && this.position === 0
        ? 'visibility: hidden;'
        : 'visibility: visible;';

    let opacity =
      this.position > this.maskOpacityOffset
        ? (this.position - this.maskOpacityOffset) /
          (1 - this.maskOpacityOffset)
        : 0;

    if (this.args.invertOpacity) {
      opacity = 1 - opacity;
    }

    style += `opacity: ${opacity};`;

    return htmlSafe(style);
  }

  <template>
    <button
      class="mobile-menu__mask"
      style={{this.style}}
      type="button"
      aria-label="Close"
      {{on "click" this.onClick}}
      {{didPan
        onPanStart=@onPanStart
        onPan=@onPan
        onPanEnd=@onPanEnd
        capture=@capture
        preventScroll=@preventScroll
      }}
      ...attributes
    ></button>
  </template>
}
