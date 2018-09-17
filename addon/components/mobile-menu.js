import Component from '@ember/component';
import layout from '../templates/components/mobile-menu';

import { get, set, computed } from '@ember/object';
import { getOwner } from '@ember/application';

import ComponentChildMixin from 'ember-mobile-menu/mixins/component-child';
import RecognizerMixin from 'ember-mobile-core/mixins/pan-recognizer';
import getWindowWidth from 'ember-mobile-core/utils/get-window-width';
import Spring from 'ember-mobile-core/spring';

export default Component.extend(ComponentChildMixin, RecognizerMixin, {
  layout,

  classNames: ['mobile-menu'],
  classNameBindings: [
    'isLeft:mobile-menu--left',
    'isRight:mobile-menu--right',
    'isDragging:mobile-menu--dragging',
    'isOpen:mobile-menu--open',
    'isTransitioning:mobile-menu--transitioning',
    'shadowEnabled:mobile-menu--shadow'
  ],

  // public
  type:           'left', // 'left' or 'right'
  width:          85,     // 0-100
  maxWidth:       300,    // in px
  maskEnabled:    true,
  shadowEnabled:  true,
  triggerVelocity: 0.3,

  // private
  isDragging: false,
  isTransitioning: false,
  position:  0,
  dxCorrection: 0,

  // hooks
  onOpen(){},
  onClose(){},

  isLeft: computed('type', function(){
    return get(this, 'type') === 'left';
  }),
  isRight: computed('type', function(){
    return get(this, 'type') === 'right';
  }),
  isOpen: computed('isDragging', 'position', '_width', 'isLeft', function(){
    return !get(this, 'isDragging') && get(this, 'position') === get(this, '_width');
  }),
  relativePosition: computed('position', function(){
    return Math.abs(get(this, 'position')) / get(this, '_width');
  }),
  
  fastboot: computed(function() {
    const owner = getOwner(this);
    return owner.lookup('service:fastboot');
  }),
  isFastBoot: computed('fastboot', function(){
    return !!get(this, 'fastboot.isFastBoot');
  }),

  /**
   * Calculates current width in px
   */
  _width: computed('width', 'maxWidth', function(){
    return this.get('isFastBoot')
      ? this.get('maxWidth')
      : Math.min(get(this, 'width') / 100 * getWindowWidth(), get(this, 'maxWidth'));
  }),

  async open(currentVelocity = 0){
    const startPos = get(this, 'position');
    const diff = get(this, '_width') - startPos;

    const initialVelocity = startPos === 0 ? 0 : currentVelocity / startPos * diff;

    const spring = new Spring(s => set(this, 'position', s.currentValue), {
      overshootClamping: true,

      fromValue: startPos,
      toValue: startPos + diff,

      initialVelocity
    });

    set(this, 'isTransitioning', true);
    await spring.start();
    set(this, 'isTransitioning', false);
    get(this, 'onOpen')(this);
  },
  async close(currentVelocity = 0){
    const startPos = get(this, 'position');

    const initialVelocity = currentVelocity / this.get('_width') * startPos;

    const spring = new Spring(s => set(this, 'position', s.currentValue), {
      overshootClamping: true,

      fromValue: startPos,
      toValue: 0,

      initialVelocity
    });

    set(this, 'isTransitioning', true);
    await spring.start();
    set(this, 'isTransitioning', false);
    get(this, 'onClose')(this);
  },

  actions: {
    close(){
      this.close();
    }
  },

  // pan handlers for opening the menu
  panOpen(e){
    set(this, 'isDragging', true);

    const {
      current: {
        distanceX
      }
    } = e;

    const dx = get(this, 'isLeft') ? distanceX : -distanceX;
    const width = this.get('_width');

    // enforce limits on the offset [0, width]
    const targetPosition = Math.min(Math.max(dx, 0), width);

    this.set('position', targetPosition);
  },
  panOpenEnd(e){
    set(this, 'isDragging', false);

    const {
      current: {
        distanceX,
        velocityX,
      }
    } = e;

    const triggerVelocity = get(this, 'triggerVelocity');

    const isLeft = get(this, 'isLeft');
    const width = get(this, '_width');

    const dx = isLeft ? distanceX : -distanceX;
    const vx = isLeft ? velocityX : -velocityX;

    // when overall horizontal velocity is high, force open/close and skip the rest
    if (vx > triggerVelocity || dx > width / 2) {
      this.open(vx);
    } else {
      this.close(vx);
    }
  },

  // pan handlers for closing the menu
  didPan(e){
    const {
      current: {
        distanceX,
        x
      }
    } = e;

    const isLeft = get(this, 'isLeft');
    const windowWidth = getWindowWidth();
    const width = this.get('_width');

    const dx = isLeft ? distanceX : -distanceX;
    const cx = isLeft ? x : windowWidth - x;

    if(this.get('isOpen') && !this.get('isDragging')){
      // calculate and set a correction delta if the pan started outside the opened menu
      if(cx < width) {
        this.set('isDragging', true);
        this.set('dxCorrection', dx);
      }
    }

    if(this.get('isDragging')){
      let targetPosition = dx;

      // correct targetPosition with dxCorrection set earlier
      targetPosition -= this.get('dxCorrection');

      // enforce limits on the offset [0, width]
      if(cx < width){
        if(targetPosition > 0){
          targetPosition = 0;
        } else if(targetPosition < -1 * width){
          targetPosition = -1 * width;
        }
        this.set('position', width + targetPosition);
      }
    }
  },
  didPanEnd(e){
    if(get(this, 'isDragging')){
      set(this, 'isDragging', false);

      const {
        current: {
          distanceX,
          velocityX
        }
      } = e;

      const triggerVelocity = get(this, 'triggerVelocity');

      const isLeft = get(this, 'isLeft');
      const width = this.get('_width');

      const dx = isLeft ? distanceX : -distanceX;
      const vx = isLeft ? velocityX : -velocityX;

      // the pan action is over, cleanup and set the correct final menu position
      if (vx < -1 * triggerVelocity || -1 * dx > width / 2){
        this.close(vx);
      } else {
        this.open(vx);
      }

      this.set('dxCorrection', 0);
    }
  }
});
