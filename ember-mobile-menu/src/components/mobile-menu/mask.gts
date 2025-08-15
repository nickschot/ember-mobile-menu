import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import './mask.css';
import { on } from '@ember/modifier';
// @ts-expect-error ember-gesture-modifiers is not t
import didPan from 'ember-gesture-modifiers/modifiers/did-pan';
import type { TouchData } from '../../utils/normalize-coordinates';

const _fn = () => {};

interface MaskComponentSignature {
  Element: HTMLButtonElement;
  Args: {
    /**
     * Width of the associated menu for opacity calculations.
     *
     * @argument width
     * @type {Number}
     * @default 300
     */
    width?: number;
    /**
     * If true, inverts the opacity calculation for certain menu modes like 'ios' and 'reveal'.
     *
     * @argument invertOpacity
     * @type {Boolean}
     */
    invertOpacity?: boolean;
    /**
     * Whether the associated menu is fully open.
     *
     * @argument isOpen
     * @type {Boolean}
     * @default false
     */
    isOpen?: boolean;
    /**
     * Whether the associated menu is fully closed (used for visibility control).
     *
     * @argument isClosed
     * @type {Boolean}
     */
    isClosed?: boolean;
    /**
     * Current position of the menu in pixels for opacity calculations.
     *
     * @argument position
     * @type {Number}
     * @default 0
     */
    position?: number;
    /**
     * If true, uses capture phase for pan events, giving precedence over bubble phase events. Useful for edge gestures.
     *
     * @argument capture
     * @type {Boolean}
     */
    capture?: boolean;
    /**
     * If true, prevents page scroll during pan gestures. Helps avoid conflicts with menu gestures.
     *
     * @argument preventScroll
     * @type {Boolean}
     */
    preventScroll?: boolean;
    /**
     * Handler called when the mask is clicked to close the menu.
     *
     * @argument onClick
     * @type {Function}
     */
    onClick?: () => void;
    /**
     * Handler for pan gesture events during dragging.
     *
     * @argument onPan
     * @type {Function}
     */
    onPan?: (e: TouchData) => void;
    /**
     * Handler for pan gesture end events.
     *
     * @argument onPanEnd
     * @type {Function}
     */
    onPanEnd?: (e: TouchData) => void;
    /**
     * Handler for pan gesture start events.
     *
     * @argument onPanStart
     * @type {Function}
     */
    onPanStart?: (e: TouchData) => void;
  };
  Blocks?: never;
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
  get width() {
    return this.args.width ?? 300;
  }

  get isOpen() {
    return this.args.isOpen ?? false;
  }

  get position() {
    return this.args.position ?? 0;
  }

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
