import Component from '@glimmer/component';
import { htmlSafe } from '@ember/string';

const MODES = new Map([
  ['default', () => ''],
  ['push',    (p) => `transform: translateX(${p}px);`],
  ['reveal',  (p) => `transform: translateX(${p}px);`],
  ['ios',     (p) => `transform: translateX(${p}px);`],
  ['squeeze', (p, side) => `margin-${side}: ${Math.abs(p)}px;`],
  ['squeeze-reveal', (p, side) => `margin-${side}: ${Math.abs(p)}px;`]
]);

/**
 * @class ContentComponent
 * @private
 * @hide
 */
export default class ContentComponent extends Component {
  get style() {
    let styles = '';
    if (this.args.position > 0) {
      styles = MODES.get(this.args.mode)(this.args.position, 'left');
    } else if (this.args.position < 0) {
      styles = MODES.get(this.args.mode)(this.args.position, 'right');
    }

    return htmlSafe(styles);
  }
}
