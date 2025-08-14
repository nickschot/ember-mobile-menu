import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { modifier as eModifier } from 'ember-modifier';
import {
  disableBodyScroll,
  enableBodyScroll,
} from '../../utils/body-scroll-lock.js';
import './tray.css';
// @ts-expect-error ember-gesture-modifiers is not typed
import didPan from 'ember-gesture-modifiers/modifiers/did-pan';
import type { TouchData } from '../../utils/normalize-coordinates.ts';

interface TrayComponentSignature {
  Element: HTMLDivElement;
  Args: {
    /**
     * Width of the menu in pixels.
     *
     * @argument width
     * @type {Number}
     * @default 300
     */
    width?: number;
    /**
     * Whether this is a left-side menu (false for right-side).
     *
     * @argument isLeft
     * @type {Boolean}
     * @default true
     */
    isLeft?: boolean;
    /**
     * Current position of the menu in pixels from its closed position.
     *
     * @argument position
     * @type {Number}
     * @default 0
     */
    position?: number;
    /**
     * Whether to display a shadow on the tray.
     *
     * @argument shadowEnabled
     * @type {Boolean}
     */
    shadowEnabled?: boolean;
    /**
     * Animation and positioning mode for the menu.
     *
     * @argument mode
     * @type {String}
     */
    mode: 'default' | 'push' | 'ios' | 'reveal' | 'squeeze' | 'squeeze-reveal';
    /**
     * Whether the menu is in closed state (used for body scroll management).
     *
     * @argument isClosed
     * @type {Boolean}
     */
    isClosed?: boolean;
    /**
     * If true, prevents page scroll when the menu is open. Helps avoid conflicts with menu gestures.
     *
     * @argument preventScroll
     * @type {Boolean}
     */
    preventScroll?: boolean;
    /**
     * If true, renders in embedded mode without full-screen behavior.
     *
     * @argument embed
     * @type {Boolean}
     */
    embed?: boolean;
    /**
     * If true, uses capture phase for pan events, giving precedence over bubble phase events. Useful for edge gestures.
     *
     * @argument capture
     * @type {Boolean}
     */
    capture?: boolean;
    /**
     * Handler for pan gesture start events.
     *
     * @argument onPanStart
     * @type {Function}
     */
    onPanStart?: (e: TouchData) => void;
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
  };
  Blocks: {
    /**
     * Menu content is yielded here.
     *
     * @property default
     * @type {Array}
     */
    default: [];
  };
}

/**
 * The tray that resides within the menu. Menu content is placed in here.
 *
 * You usually do not need to use this component yourself.
 *
 * @class Tray
 * @private
 * @hide
 */
export default class TrayComponent extends Component<TrayComponentSignature> {
  get width() {
    return this.args.width ?? 300;
  }

  get isLeft() {
    return this.args.isLeft ?? true;
  }

  get position() {
    return this.args.position ?? 0;
  }

  get style() {
    let style = `width: ${this.width}px;`;

    let offset = this.width;
    let translation = this.position;
    if (this.args.mode === 'ios') {
      offset /= 3;
      translation /= 3;
    } else if (['reveal', 'squeeze-reveal'].includes(this.args.mode)) {
      offset = 0;
      translation = 0;
    }

    style += this.isLeft
      ? `left: -${offset}px; transform: translateX(${translation}px);`
      : `right: -${offset}px; transform: translateX(${translation}px);`;

    // Set position for declarative shadow opacity calculation
    if (
      this.args.shadowEnabled &&
      ['default', 'push', 'squeeze'].includes(this.args.mode)
    ) {
      const normalizedPosition =
        this.width > 0 ? Math.abs(this.position) / this.width : 0;
      style += `--tray-position: ${normalizedPosition};`;
    }

    return htmlSafe(style);
  }

  lockBodyScroll = eModifier((element: HTMLElement) => {
    const { isClosed, preventScroll, embed } = this.args;

    if (preventScroll && !embed) {
      if (isClosed) {
        enableBodyScroll?.(element);
      } else {
        disableBodyScroll?.(element);
      }
    }

    return () => {
      if (preventScroll && !embed) {
        enableBodyScroll?.(element);
      }
    };
  });

  <template>
    <div
      class="mobile-menu__tray"
      style={{this.style}}
      {{didPan
        onPanStart=@onPanStart
        onPan=@onPan
        onPanEnd=@onPanEnd
        capture=@capture
        preventScroll=@preventScroll
      }}
      {{this.lockBodyScroll}}
      ...attributes
    >
      {{yield}}
    </div>
  </template>
}
