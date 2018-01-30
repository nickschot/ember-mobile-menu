import Component from '@ember/component';
import layout from '../templates/components/side-menu';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,

  fastboot: service(),
  isFastBoot: computed.reads('fastboot.isFastBoot'),

  classNames: ['mobile-menu'],
  classNameBindings: ['isDragging:mobile-menu--dragging'],

  mask: true,
  isOpen: false,
  isDragging: false,
  currentPosition: 0,
  maskOpacityOffset: 5,

  didRender(){
    //TODO: fix fastboot, remove jquery usage
    this.$('.mobile-menu__tray').css(get(this, 'style'));
    if(get(this, 'mask')){
      this.$('.mobile-menu__mask').css(get(this, 'maskStyle'));
    }
  },

  style: computed('isOpen', 'currentPosition', function() {
    return {
      transform: `translateX(${this.get('currentPosition')}vw)`
    };
  }),

  maskStyle: computed('isOpen', 'currentPosition', function() {
    const style = {
      visibility: '',
      opacity: ''
    };

    if(!this.get('isOpen') && this.get('currentPosition') === 0){
      style.visibility = 'hidden';
    }

    style.opacity = this.get('currentPosition') > this.get('maskOpacityOffset')
      ? (
      this.get('currentPosition') - this.get('maskOpacityOffset'))
      / (100 - this.get('maskOpacityOffset')
      )
      : 0;
    return style;
  }),

  actions: {
    close(){
      this.sendAction('close');
    }
  }
});
