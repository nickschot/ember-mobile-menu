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

interface MobileMenuToggleSignature {
  Element: HTMLButtonElement;
  Args: {
    /** Target menu for the toggle */
    target?: 'left' | 'right';
    /** Hook fired when the toggle is clicked. */
    onClick?: (target?: 'left' | 'right') => void;
  };
  Blocks: {
    default: [];
  };
}
export default class MobileMenuToggle extends Component<MobileMenuToggleSignature> {
  get onClick() {
    return () => this.args.onClick?.(this.args.target) ?? _fn;
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
