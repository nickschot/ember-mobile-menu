import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import './mask.css';
import { on } from '@ember/modifier';
// @ts-expect-error ember-gesture-modifiers is not t
import didPan from 'ember-gesture-modifiers/modifiers/did-pan';
import type { PanLike } from '../../utils/normalize-coordinates';

const _fn = () => {};

interface MaskComponentSignature {
  Element: HTMLButtonElement;
  Args: {
    width?: number;
    invertOpacity?: boolean;
    isOpen?: boolean;
    isClosed?: boolean;
    position?: number;
    capture?: boolean;
    preventScroll?: boolean;
    onClick?: () => void;
    onPan?: (e: PanLike) => void;
    onPanEnd?: (e: PanLike) => void;
    onPanStart?: (e: PanLike) => void;
  };
}

/**
 * A mask component.
 *
 * You usually do not need to use this component yourself. Whether or not a mask is present can be set by passing an
 * argument to the MobileMenu component.
 *
 * @class Mask
 * @private
 */
export default class MaskComponent extends Component<MaskComponentSignature> {
  /**
   * @argument width
   * @type number
   * @default 300
   * @protected
   */
  get width() {
    return this.args.width ?? 300;
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

    style += this.args.isClosed
      ? 'visibility: hidden;'
      : 'visibility: visible;';

    // Normalize position to 0-1 range (position is in pixels, width gives us the scale)
    const normalizedPosition =
      this.width > 0 ? Math.abs(this.position) / this.width : 0;

    // Set normalized position and invert flag - CSS calc() handles dead zone calculation
    style += `--mask-position: ${normalizedPosition}; `;
    style += `--mask-invert: ${this.args.invertOpacity ? 1 : 0};`;

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
