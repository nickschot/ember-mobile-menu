import Component from '@ember/component';
import layout from '../../templates/components/mobile-menu/tray';

import { get, computed } from '@ember/object';
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
export default Component.extend({
  layout,

  classNames: ['mobile-menu__tray'],
  attributeBindings: ['style'],

  /**
   * Width of the menu in px.
   *
   * @property width
   * @type Number
   * @default 300
   * @private
   */
  width: 300,

  /**
   * Whether the menu is a left menu (otherwise it's a right menu)
   *
   * @property isLeft
   * @type Boolean
   * @default true
   * @private
   */
  isLeft: true,

  /**
   * Current relative position of the menu in px.
   *
   * @property position
   * @type Number
   * @default 0
   * @private
   */
  position: 0,  // in px

  style: computed('width', 'isLeft', 'position', function(){
    const width = get(this, 'width');
    const position = get(this, 'position');

    let style = `width: ${width}px;`;
    style += get(this, 'isLeft')
      ?  `left: -${width}px; transform: translateX(${position}px);`
      : `right: -${width}px; transform: translateX(-${position}px);`;

    return htmlSafe(style);
  })
});
