import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { htmlSafe } from '@ember/template';
import './mobile-menu.css';
import MaskComponent from './mobile-menu/mask.gts';
import TrayComponent from './mobile-menu/tray.gts';
import { hash } from '@ember/helper';
import { effect } from './utils';
import { on } from '@ember/modifier';
import { TouchData } from '../utils/normalize-coordinates';
import type MobileMenuWrapper from './mobile-menu-wrapper.gts';

const _fn = function () {};

interface MobileMenuSignature {
  Args: {
    type?: 'left' | 'right';
    mode?: 'default' | 'push' | 'ios' | 'reveal' | 'squeeze' | 'squeeze-reveal';
    width?: number;
    maxWidth?: number;
    maskEnabled?: boolean;
    shadowEnabled?: boolean;
    isOpen?: boolean;
    isDragging?: boolean;
    isTransitioning?: boolean;
    animationDisabled?: boolean;
    position?: number;
    parentBoundingClientRect?: DOMRect | null;
    register: (menu: MobileMenu) => void;
    unregister: (menu: MobileMenu) => void;
    onToggle?: (isOpen: boolean) => void;
    onOpen?: (menu: MobileMenu, animate?: boolean) => void;
    onClose?: (menu?: MobileMenu, animate?: boolean) => void;
    onTransitionEnd?: () => void;
    capture?: boolean;
    preventScroll?: boolean;
    onPan?: (event: TouchData) => void;
    onPanStart?: (event: TouchData) => void;
    onPanEnd?: (event: TouchData) => void;
    embed?: boolean;
    parent: typeof MobileMenuWrapper;
  };
}

/**
 * Menu component
 *
 * @class MobileMenu
 * @public
 */
export default class MobileMenu extends Component<MobileMenuSignature> {
  @tracked _open = false;
  @tracked _closed = true;

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
   * Sets the mode of the menu. Currently 'default', 'push', 'ios', 'reveal', 'squeeze' and 'squeeze-reveal' are supported.
   *
   * @argument mode
   * @type string
   * @default 'default'
   */
  get mode() {
    return this.args.mode ?? 'default';
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
   * @argument isOpen
   * @type boolean
   * @default false
   */

  /**
   * Hook which is called after the transition with the new menu isOpen state.
   *
   * @argument onToggle
   * @type Function
   */
  get onToggle() {
    return this.args.onToggle ?? _fn;
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

  /**
   * Hook fired when the menu is closed. You can pass in an action. The menu instance will be passed to the action.
   *
   * @argument onClose
   * @type Action
   * @protected
   */

  /**
   * @argument position
   * @type number
   * @protected
   */
  get position() {
    if (!this.args.position) return 0;
    return (this.isLeft && this.args.position > 0) ||
      (this.isRight && this.args.position && this.args.position < 0)
      ? this.args.position
      : 0;
  }

  /**
   * @argument isDragging
   * @type boolean
   * @protected
   */

  constructor() {
    super(...arguments);

    assert(
      'register function argument not passed. You should not be using <MobileMenu/> directly.',
      typeof this.args.register === 'function',
    );
    assert(
      'unregister function argument not passed. You should not be using <MobileMenu/> directly.',
      typeof this.args.unregister === 'function',
    );

    // Registration handled in template with effect

    if (this.args.parent?.isFastBoot && this.args.isOpen) {
      this.args.parent._activeMenu = this;
      this.open(false);
    }
  }

  willDestroy() {
    this.args.unregister(this);

    super.willDestroy();
  }

  get renderMenu() {
    return this.args.parent?.isFastBoot || this.args.parentBoundingClientRect;
  }

  get isOpen() {
    return (
      !this.args.isDragging &&
      !this.args.isTransitioning &&
      Math.abs(this.position) === this._width
    );
  }
  get isClosed() {
    return (
      !this.args.isDragging && !this.args.isTransitioning && this.position === 0
    );
  }

  get classNames() {
    let classes = `mobile-menu mobile-menu--${this.mode}`;
    if (this.isLeft) classes += ' mobile-menu--left';
    if (this.isRight) classes += ' mobile-menu--right';
    if (this.args.isDragging) classes += ' mobile-menu--dragging';
    if (this.isOpen) classes += ' mobile-menu--open';
    if (this.args.isTransitioning) classes += ' mobile-menu--transitioning';
    if (this.args.animationDisabled)
      classes += ' mobile-menu--animation-disabled';
    return classes;
  }

  get isLeft() {
    return this.type === 'left';
  }

  get isRight() {
    return this.type === 'right';
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
      ? (this.width / 100) * this.args.parentBoundingClientRect.width
      : this.maxWidth;

    return this.maxWidth === -1 ? width : Math.min(width, this.maxWidth);
  }

  get style() {
    let styles = '';
    if (!this.maskEnabled && this.isOpen) {
      styles = `width: ${this._width}px;`;
    }
    return htmlSafe(styles);
  }

  open = (animate) => {
    this.args.onOpen?.(this, animate);
  };

  close = (animate?: boolean) => {
    // Only skip close if we haven't rendered AND we're trying to animate
    if (!this.hasRendered && animate) return;

    this.args.onClose?.(this, animate);
  };

  hasRendered = false;

  openOrClose = (open) => {
    let animate = this.hasRendered;

    if (open) {
      this.open(animate);
    } else {
      this.close(animate);
    }

    this.onToggle(open);
  };

  closeFromLinkTo = () => {
    if (!['squeeze', 'squeeze-reveal'].includes(this.mode)) {
      this.close();
    }
  };

  setRendered = () => {
    if (!this.hasRendered) {
      this.hasRendered = true;
    }
  };

  handleTransitionEnd = () => {
    this.args.onTransitionEnd?.();
  };

  <template>
    {{#if this.renderMenu}}
      {{effect @register this}}
      {{effect this.openOrClose @isOpen}}

      <div
        class={{this.classNames}}
        style={{this.style}}
        aria-hidden={{if this.isClosed "true"}}
      >
        {{#if this.maskEnabled}}
          <MaskComponent
            @isOpen={{this.isOpen}}
            @isClosed={{this.isClosed}}
            @position={{this.position}}
            @width={{this._width}}
            @invertOpacity={{this.invertOpacity}}
            @onClick={{@onClose}}
            @onPanStart={{@onPanStart}}
            @onPan={{@onPan}}
            @onPanEnd={{@onPanEnd}}
            @capture={{@capture}}
            @preventScroll={{@preventScroll}}
          />
        {{/if}}

        <TrayComponent
          ...attributes
          @width={{this._width}}
          @isLeft={{this.isLeft}}
          @position={{this.position}}
          @shadowEnabled={{this.shadowEnabled}}
          @mode={{@mode}}
          @embed={{@embed}}
          @isClosed={{this.isClosed}}
          @onPanStart={{@onPanStart}}
          @onPan={{@onPan}}
          @onPanEnd={{@onPanEnd}}
          @capture={{@capture}}
          @preventScroll={{@preventScroll}}
          {{on "transitionend" this.handleTransitionEnd}}
        >
          {{yield (hash actions=(hash open=this.open close=this.close))}}
        </TrayComponent>
      </div>
    {{/if}}
  </template>
}
