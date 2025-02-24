import Component from '@glimmer/component';
import { registerDestructor } from '@ember/destroyable';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';
import {
  disableBodyScroll,
  enableBodyScroll,
} from '../../utils/body-scroll-lock.js';
import './tray.css';
import didPan from 'ember-gesture-modifiers/modifiers/did-pan';
import Modifier from 'ember-modifier';

function cleanup(instance) {
  let { toggleBodyScroll, element } = instance;
  toggleBodyScroll(element, true);

  instance.element = undefined;
  instance.toggleBodyScroll = undefined;
}

class TrayModifier extends Modifier {
  element;
  toggleBodyScroll;
  isClosed;

  constructor() {
    super(...arguments);
    registerDestructor(this, cleanup);
  }

  modify(element, [toggleBodyScroll, isClosed]) {
    if (!this.element) {
      this.element = element;
    }

    this.toggleBodyScroll = toggleBodyScroll;
    this.isClosed = isClosed;
    this.toggleBodyScroll(this.element, this.isClosed);
  }
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
export default class TrayComponent extends Component {
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

  get progress() {
    return Math.abs(this.position) / this.width;
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

    if (
      this.args.shadowEnabled &&
      ['default', 'push', 'squeeze'].includes(this.args.mode) &&
      this.progress > 0
    ) {
      style += `box-shadow: 0 0 10px rgba(0,0,0,${0.3 * this.progress});`;
    }

    return htmlSafe(style);
  }

  @action
  toggleBodyScroll(target, isClosed) {
    if (this.args.preventScroll && !this.args.embed) {
      if (isClosed) {
        enableBodyScroll(target);
      } else {
        disableBodyScroll(target);
      }
    }
  }

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
      {{TrayModifier this.toggleBodyScroll @isClosed}}
      ...attributes
    >
      {{yield}}
    </div>
  </template>
}
