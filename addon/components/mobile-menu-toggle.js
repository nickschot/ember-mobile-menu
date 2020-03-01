import Component from '@glimmer/component';

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
   * @default 'left'
   */
  get target() {
    return this.args.target ?? 'left';
  }

  /**
   * Hook fired when the toggle is clicked. You can pass in an action.
   *
   * @argument onClick
   * @type Action
   */
  get onClick() {
    return this.args.onClick ?? _fn;
  }
}
