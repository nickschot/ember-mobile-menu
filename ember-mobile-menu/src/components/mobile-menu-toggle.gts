import Component from '@glimmer/component';
import './mobile-menu-toggle.css';
import { on } from '@ember/modifier';

const _fn = () => {};

/**
 * A toggle component to open or close a menu.
 *
 * Provides a button that can target specific menus (left or right) and fires
 * a click handler when activated.
 *
 * @class MobileMenuToggle
 * @extends Component
 * @public
 */

interface MobileMenuToggleSignature {
  Element: HTMLButtonElement;
  Args: {
    /**
     * Target menu for the toggle
     *
     * @argument target
     * @type {String}
     */
    target?: 'left' | 'right';
    /**
     * Hook fired when the toggle is clicked.
     *
     * @argument onClick
     * @type {Function}
     */
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
