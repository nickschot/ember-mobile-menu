import Component from '@glimmer/component';
import { getOwner } from '@ember/application';
import { htmlSafe } from '@ember/string';
import { action } from '@ember/object';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

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
  fastboot = getOwner(this).lookup('service:fastboot');
  get isFastBoot() {
    return !!this.fastboot?.isFastBoot;
  }

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
  toggleBodyScroll(target, [isClosed]) {
    if (this.args.preventScroll && !this.args.embed && !this.isFastBoot) {
      if (isClosed) {
        enableBodyScroll(target);
      } else {
        disableBodyScroll(target);
      }
    }
  }
}
