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
    width?: number;
    isLeft?: boolean;
    position?: number;
    shadowEnabled?: boolean;
    mode: 'default' | 'push' | 'ios' | 'reveal' | 'squeeze' | 'squeeze-reveal';
    isClosed?: boolean;
    preventScroll?: boolean;
    embed?: boolean;
    capture?: boolean;
    onPanStart?: (e: TouchData) => void;
    onPan?: (e: TouchData) => void;
    onPanEnd?: (e: TouchData) => void;
  };
  Blocks: {
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
  /**
   * Width of the menu in px.
   *
   * @property width
   * @type Number
   * @default 300
   * @private
   */
  get width() {
    return this.args.width ?? 300;
  }

  /**
   * Whether the menu is a left menu (otherwise it's a right menu)
   *
   * @property isLeft
   * @type Boolean
   * @default true
   * @private
   */
  get isLeft() {
    return this.args.isLeft ?? true;
  }

  /**
   * Current relative position of the menu in px.
   *
   * @property position
   * @type Number
   * @default 0
   * @private
   */
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
