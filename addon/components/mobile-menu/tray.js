import Component from '@glimmer/component';
import { htmlSafe } from '@ember/string';

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

  get style() {
    let style = `width: ${this.width}px;`;
    style += this.isLeft
      ?  `left: -${this.width}px; transform: translateX(${this.position}px);`
      : `right: -${this.width}px; transform: translateX(-${this.position}px);`;

    return htmlSafe(style);
  }
}
