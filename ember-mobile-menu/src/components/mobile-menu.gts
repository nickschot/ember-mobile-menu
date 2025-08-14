import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { htmlSafe } from '@ember/template';
import type Owner from '@ember/owner';
import './mobile-menu.css';
import MaskComponent from './mobile-menu/mask.gts';
import TrayComponent from './mobile-menu/tray.gts';
import { hash } from '@ember/helper';
import { effect } from './utils.ts';
import { on } from '@ember/modifier';
import type { TouchData } from '../utils/normalize-coordinates';
import type MobileMenuWrapper from './mobile-menu-wrapper.gts';

const _fn = function () {};

interface MobileMenuSignature {
  Element: HTMLDivElement;
  Args: {
    /**
     * The type of menu. Currently 'left' and 'right' are supported.
     *
     * @argument type
     * @type {String}
     * @default 'left'
     */
    type?: 'left' | 'right';
    /**
     * Sets the mode of the menu. Currently 'default', 'push', 'ios', 'reveal', 'squeeze' and 'squeeze-reveal' are supported.
     *
     * @argument mode
     * @type {String}
     * @default 'default'
     */
    mode?: 'default' | 'push' | 'ios' | 'reveal' | 'squeeze' | 'squeeze-reveal';
    /**
     * The percentage of the screen the menu will take when opened.
     *
     * @argument width
     * @type {Number}
     * @default 85
     */
    width?: number;
    /**
     * The maximum width of the menu in pixels. Set to -1 to disable.
     *
     * @argument maxWidth
     * @type {Number}
     * @default 300
     */
    maxWidth?: number;
    /**
     * Whether or not a mask is added when the menu is opened.
     *
     * @argument maskEnabled
     * @type {Boolean}
     * @default true
     */
    maskEnabled?: boolean;
    /**
     * Whether or not a shadow is added to the menu.
     *
     * @argument shadowEnabled
     * @type {Boolean}
     * @default true
     */
    shadowEnabled?: boolean;
    /**
     * Controls whether the menu is open or closed.
     *
     * @argument isOpen
     * @type {Boolean}
     * @default false
     */
    isOpen?: boolean;
    /**
     * Internal state indicating if the menu is currently being dragged by the user.
     *
     * @argument isDragging
     * @type {Boolean}
     */
    isDragging?: boolean;
    /**
     * Internal state indicating if the menu is currently transitioning between states.
     *
     * @argument isTransitioning
     * @type {Boolean}
     */
    isTransitioning?: boolean;
    /**
     * Temporarily disables CSS transitions for immediate position changes.
     *
     * @argument animationDisabled
     * @type {Boolean}
     */
    animationDisabled?: boolean;
    /**
     * Current position of the menu in pixels from its closed position.
     *
     * @argument position
     * @type {Number}
     */
    position?: number;
    /**
     * The bounding rectangle of the parent wrapper element for position calculations.
     *
     * @argument parentBoundingClientRect
     * @type {DOMRect}
     */
    parentBoundingClientRect?: DOMRect | null;
    /**
     * Function to register this menu with its parent wrapper.
     *
     * @argument register
     * @type {Function}
     */
    register: (menu: MobileMenu) => void;
    /**
     * Function to unregister this menu from its parent wrapper.
     *
     * @argument unregister
     * @type {Function}
     */
    unregister: (menu: MobileMenu) => void;
    /**
     * Hook which is called after the transition with the new menu isOpen state.
     *
     * @argument onToggle
     * @type {Function}
     */
    onToggle?: (isOpen?: boolean) => void;
    /**
     * Hook fired when the menu is opened. The menu instance will be passed to the action.
     *
     * @argument onOpen
     * @type {Function}
     */
    onOpen?: (menu: MobileMenu, animate?: boolean) => void;
    /**
     * Hook fired when the menu is closed. The menu instance will be passed to the action.
     *
     * @argument onClose
     * @type {Function}
     */
    onClose?: (menu?: MobileMenu, animate?: boolean) => void;
    /**
     * Hook fired when CSS transitions end.
     *
     * @argument onTransitionEnd
     * @type {Function}
     */
    onTransitionEnd?: () => void;
    /**
     * If true, uses capture phase for pan events, giving precedence over bubble phase events. Useful for edge gestures.
     *
     * @argument capture
     * @type {Boolean}
     * @default true
     */
    capture?: boolean;
    /**
     * If true, prevents page scroll when the menu is open. Helps avoid conflicts with menu gestures.
     *
     * @argument preventScroll
     * @type {Boolean}
     * @default false
     */
    preventScroll?: boolean;
    /**
     * Handler for pan gesture events during menu dragging.
     *
     * @argument onPan
     * @type {Function}
     */
    onPan?: (event: TouchData) => void;
    /**
     * Handler for pan gesture start events.
     *
     * @argument onPanStart
     * @type {Function}
     */
    onPanStart?: (event: TouchData) => void;
    /**
     * Handler for pan gesture end events.
     *
     * @argument onPanEnd
     * @type {Function}
     */
    onPanEnd?: (event: TouchData) => void;
    /**
     * If true, renders the menu in embedded mode without full-screen behavior.
     *
     * @argument embed
     * @type {Boolean}
     * @default false
     */
    embed?: boolean;
    /**
     * Reference to the parent MobileMenuWrapper component.
     *
     * @argument parent
     * @type {MobileMenuWrapper}
     */
    parent: MobileMenuWrapper;
  };
  Blocks: {
    default: [
      {
        actions: {
          /**
           * Opens the menu. Pass false to skip animation.
           *
           * @property open
           * @type {Function}
           */
          open: (animate?: boolean) => void;
          /**
           * Closes the menu. Pass false to skip animation.
           *
           * @property close
           * @type {Function}
           */
          close: (animate?: boolean) => void;
        };
      },
    ];
  };
}

/**
 * Menu component providing a draggable sidebar specifically tailored to mobile devices.
 *
 * Supports both left and right menus with multiple animation modes including default, push, ios, reveal, squeeze and squeeze-reveal.
 * Touch dragging is supported through pan gestures and the component provides hooks for customization.
 *
 * @class MobileMenu
 * @extends Component
 * @public
 */
export default class MobileMenu extends Component<MobileMenuSignature> {
  @tracked _open = false;
  @tracked _closed = true;

  get type() {
    return this.args.type ?? 'left';
  }

  get mode() {
    return this.args.mode ?? 'default';
  }

  get width() {
    return this.args.width ?? 85;
  }

  get maxWidth() {
    return this.args.maxWidth ?? 300;
  }

  get maskEnabled() {
    return this.args.maskEnabled ?? true;
  }

  get shadowEnabled() {
    return this.args.shadowEnabled ?? true;
  }

  get onToggle() {
    return this.args.onToggle ?? _fn;
  }

  get embed() {
    return this.args.embed ?? false;
  }

  get position() {
    if (!this.args.position) return 0;
    return (this.isLeft && this.args.position > 0) ||
      (this.isRight && this.args.position && this.args.position < 0)
      ? this.args.position
      : 0;
  }

  constructor(owner: Owner, args: MobileMenuSignature['Args']) {
    super(owner, args);

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
    return ['ios', 'reveal', 'squeeze-reveal'].includes(this.mode);
  }

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

  open = (animate?: boolean) => {
    this.args.onOpen?.(this, animate);
  };

  close = (animate?: boolean) => {
    // Only skip close if we haven't rendered AND we're trying to animate
    if (!this.hasRendered && animate) return;

    this.args.onClose?.(this, animate);
  };

  hasRendered = false;

  openOrClose = (open?: boolean) => {
    const animate = this.hasRendered;

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
      {{effect this.setRendered}}

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
          @mode={{this.mode}}
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
