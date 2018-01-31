import Service from '@ember/service';
import { computed, get, set } from '@ember/object';
import { getOwner } from '@ember/application';

export default Service.extend({
  side: 'left',
  mobileMenuOffset: 85,

  isOpen: false,
  isDragging: false,

  position: 0,

  toggle(){
    if(get(this, 'isOpen')){
      this.close();
    } else {
      this.open();
    }
  },

  open(){
    set(this, 'position', get(this, 'mobileMenuOffset'));
    set(this, 'isDragging', false);
    set(this, 'isOpen', true);
  },

  close(){
    set(this, 'position', 0);
    set(this, 'isDragging', false);
    set(this, 'isOpen', false);
  },

  fastboot: computed(function() {
    const owner = getOwner(this);
    return owner.lookup('service:fastboot');
  }),
  isFastBoot: computed('fastboot', function(){
    return !!get(this, 'fastboot.isFastBoot');
  })
});
