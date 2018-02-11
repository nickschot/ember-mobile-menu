import Component from '@ember/component';
import layout from '../../templates/components/mobile-menu/tray';

import { get, computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  layout,

  classNames: ['mobile-menu__tray'],
  attributeBindings: ['style'],

  width: 85,
  isLeft: true,
  position: 0,

  style: computed('width', 'isLeft', 'position', function(){
    const width = get(this, 'width');
    const position = get(this, 'position');

    let style = `width: ${width}vw;`;
    style += get(this, 'isLeft')
      ?  `left: -${width}vw; transform: translateX(${position}vw);`
      : `right: -${width}vw; transform: translateX(-${position}vw);`;

    return htmlSafe(style);
  })
});
