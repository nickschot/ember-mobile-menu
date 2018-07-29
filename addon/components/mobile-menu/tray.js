import Component from '@ember/component';
import layout from '../../templates/components/mobile-menu/tray';

import { get, computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

/**
 * The tray that resides within the menu. Menu content can be placed in here.
 *
 * @class Tray
 * @public
 */
export default Component.extend({
  layout,

  classNames: ['mobile-menu__tray'],
  attributeBindings: ['style'],

  width: 300,   // in px
  isLeft: true,
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
