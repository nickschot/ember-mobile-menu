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
    mode?: string;
    position?: number;
    shadowEnabled?: boolean;
    isOpen?: boolean;
    preventScroll?: boolean;
    capture?: boolean;
    onClose?: () => void;
    onPanStart?: (e: TouchData) => void;
    onPan?: (e: TouchData) => void;
    onPanEnd?: (e: TouchData) => void;
  };
  Blocks: {
    default: [];
  };
}

/**
 * @class ContentComponent
 * @private
 */
export default class ContentComponent extends Component<ContentComponentSignature> {
  /**
   * @argument mode
   * @type string
   * @protected
   */
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
