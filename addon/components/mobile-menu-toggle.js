import Component from '@ember/component';
import layout from '../templates/components/mobile-menu-toggle';

import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Component.extend({
  layout,

  classNames: ['mobile-menu-toggle'],

  mobileMenu: service(),

  click(){
    get(this, 'mobileMenu').toggle();
  }
});
