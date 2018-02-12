import Component from '@ember/component';
import layout from '../templates/components/mobile-menu-toggle';

import { get } from '@ember/object';

export default Component.extend({
  layout,

  classNames: ['mobile-menu__toggle'],

  target: 'left',

  onClick(){},

  click(){
    get(this, 'onClick')(get(this, 'target'));
  }
});
