import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
// @ts-expect-error ember-gesture-modifiers is not typed
import didPan from 'ember-gesture-modifiers/modifiers/did-pan';
import MaskComponent from '../mobile-menu/mask.gts';
import type { TouchData } from '../../utils/normalize-coordinates';

const MODES = new Map([
  ['default', () => ''],
  ['push', (p: number) => `transform: translateX(${p}px);`],
  ['reveal', (p: number) => `transform: translateX(${p}px);`],
  ['ios', (p: number) => `transform: translateX(${p}px);`],
  [
    'squeeze',
    (p: number, side: 'left' | 'right') => `margin-${side}: ${Math.abs(p)}px;`,
  ],
  [
    'squeeze-reveal',
    (p: number, side: 'left' | 'right') => `margin-${side}: ${Math.abs(p)}px;`,
  ],
]);

interface ContentComponentSignature {
  Element: HTMLDivElement;
  Args: {
    /**
     * Animation and positioning mode for content transformation.
     *
     * @argument mode
     * @type {String}
     * @default 'default'
     */
    mode?: 'default' | 'push' | 'ios' | 'reveal' | 'squeeze' | 'squeeze-reveal';
    /**
     * Current position of the active menu in pixels for content transformation.
     *
     * @argument position
     * @type {Number}
     */
    position?: number;
    /**
     * Whether to display a shadow on the content (used in certain modes).
     *
     * @argument shadowEnabled
     * @type {Boolean}
     */
    shadowEnabled?: boolean;
    /**
     * Whether any menu is currently open (used for mask rendering).
     *
     * @argument isOpen
     * @type {Boolean}
     */
    isOpen?: boolean;
    /**
     * If true, prevents page scroll during pan gestures. Helps avoid conflicts with menu gestures.
     *
     * @argument preventScroll
     * @type {Boolean}
     */
    preventScroll?: boolean;
    /**
     * If true, uses capture phase for pan events, giving precedence over bubble phase events. Useful for edge gestures.
     *
     * @argument capture
     * @type {Boolean}
     */
    capture?: boolean;
    /**
     * Handler called to close the active menu.
     *
     * @argument onClose
     * @type {Function}
     */
    onClose?: () => void;
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
     * Main application content is yielded here.
     *
     * @property default
     * @type {Array}
     */
    default: [];
  };
}

/**
 * @class ContentComponent
 * @private
 */
export default class ContentComponent extends Component<ContentComponentSignature> {
  get mode() {
    return this.args.mode ?? 'default';
  }

  get style() {
    let styles = '';
    if (this.args.position && this.args.position > 0) {
      styles = MODES.get(this.mode)?.(this.args.position, 'left') || '';
    } else if (this.args.position && this.args.position < 0) {
      styles = MODES.get(this.mode)?.(this.args.position, 'right') || '';
    }

    return htmlSafe(styles);
  }

  get mask() {
    return ['reveal', 'ios'].includes(this.mode);
  }

  <template>
    <div
      class="mobile-menu-wrapper__content
        {{if @shadowEnabled 'mobile-menu-wrapper__content--shadow'}}
        mobile-menu-wrapper__content--{{this.mode}}"
      style={{this.style}}
      {{didPan
        onPanStart=@onPanStart
        onPan=@onPan
        onPanEnd=@onPanEnd
        capture=@capture
        preventScroll=@preventScroll
      }}
      ...attributes
    >
      {{yield}}

      {{#if this.mask}}
        <MaskComponent @isOpen={{@isOpen}} @onClick={{@onClose}} />
      {{/if}}
    </div>
  </template>
}
