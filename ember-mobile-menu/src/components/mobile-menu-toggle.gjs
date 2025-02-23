import Component from '@glimmer/component';
import './mobile-menu-toggle.css';
import { on } from '@ember/modifier';

const _fn = () => {};

/**
 * A toggle component to open or close a menu.
 *
 * @class MobileMenuToggle
 * @public
 */
export default class MobileMenuToggle extends Component {
  /**
   * Target menu for the toggle
   *
   * @argument target
   * @type String 'left' or 'right'
   */

  /**
   * Hook fired when the toggle is clicked. You can pass in an action.
   *
   * @argument onClick
   * @type function
   */
  get onClick() {
    return () => this.args.onClick(this.args.target) ?? _fn;
  }

  <template>
    <button
      class="mobile-menu__toggle"
      type="button"
      {{on "click" this.onClick}}
      ...attributes
    >
      {{yield}}
    </button>
  </template>
}
