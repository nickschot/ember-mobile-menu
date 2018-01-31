import Service from '@ember/service';
import { get, set } from '@ember/object';

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
  }
});
