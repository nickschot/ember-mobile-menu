import Component from '@ember/component';
import layout from '../templates/components/mobile-menu';

import { get, set, computed, observer } from '@ember/object';
import { once } from '@ember/runloop';
import { htmlSafe } from '@ember/string';

import ComponentChildMixin from 'ember-mobile-menu/mixins/component-child';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';
import getWindowWidth from 'ember-mobile-menu/utils/get-window-width';

export default Component.extend(ComponentChildMixin, RecognizerMixin, {
  layout,

  classNames: ['mobile-menu'],
  classNameBindings: [
    'isLeft:mobile-menu--left',
    'isRight:mobile-menu--right',
    'isDragging:mobile-menu--dragging',
    'isOpen:mobile-menu--open',
    'shadowEnabled:mobile-menu--shadow'
  ],

  recognizers: 'pan',

  // public
  type:             'left',
  width:  85, // 0-100%
  maskEnabled:      true,
  shadowEnabled:    true,

  // private
  isDragging: false,
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

  isOpen: computed('isDragging', 'position', 'width', 'isLeft', function(){
    return !get(this, 'isDragging') && get(this, 'position') === get(this, 'width');
  }),

  open(){
    set(this, 'position', get(this, 'width'));
    get(this, 'onOpen')(this);
  },
  close(){
    set(this, 'position', 0);
    get(this, 'onClose')();
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
      deltaX
    } = e.originalEvent.gesture;

    const dx = get(this, 'isLeft') ? deltaX : -deltaX;

    const windowWidth = getWindowWidth();
    const width = this.get('width');

    let targetPosition = 100 * dx / windowWidth;

    // enforce limits on the offset [0, width]
    targetPosition = Math.min(Math.max(targetPosition, 0), width);

    this.set('position', targetPosition);
  },
  panOpenEnd(e){
    set(this, 'isDragging', false);

    const {
      deltaX,
      overallVelocityX,
    } = e.originalEvent.gesture;

    const triggerVelocity = 0.25; //TODO: make this an attribute

    const isLeft = get(this, 'isLeft');
    const windowWidth = getWindowWidth();
    const width = get(this, 'width');

    const dx = isLeft ? deltaX : -deltaX;
    const vx = isLeft ? overallVelocityX : -overallVelocityX;

    const targetPosition = 100 * dx / windowWidth;

    // when overall horizontal velocity is high, force open/close and skip the rest
    if (vx > triggerVelocity || targetPosition > width / 2) {
      this.open();
    } else {
      this.close();
    }
  },

  // pan handlers for closing the menu
  pan(e){
    const {
      deltaX,
      center
    } = e.originalEvent.gesture;

    const isLeft = get(this, 'isLeft');
    const windowWidth = getWindowWidth();
    const width = this.get('width');

    const dx = isLeft ? deltaX : -deltaX;
    const cx = isLeft ? center.x : windowWidth - center.x;

    if(this.get('isOpen') && !this.get('isDragging')){

      // start drag when center.x is at the menu edge
      const cursorPosition = 100 * cx / windowWidth;

      // calculate and set a correction delta if the pan started outside the opened menu
      if(cursorPosition < width) {
        this.set('isDragging', true);
        this.set('dxCorrection', 100 * dx / windowWidth);
      }
    }

    if(this.get('isDragging')){
      let targetPosition = 100 * dx / windowWidth;
      const cursorPosition = 100 * cx / windowWidth;

      // correct targetPosition with dxCorrection set earlier
      targetPosition -= this.get('dxCorrection');

      // enforce limits on the offset [0, width]
      if(cursorPosition < width){
        if(targetPosition > 0){
          targetPosition = 0;
        } else if(targetPosition < -1 * width){
          targetPosition = -1 * width;
        }
        this.set('position', width + targetPosition);
      }
    }
  },
  panEnd(e){
    if(get(this, 'isDragging')){
      set(this, 'isDragging', false);

      const {
        deltaX,
        overallVelocityX,
      } = e.originalEvent.gesture;

      const triggerVelocity = 0.25; //TODO: make this an attribute

      const isLeft = get(this, 'isLeft');
      const windowWidth = this._getWindowWidth();
      const width = this.get('width');

      const dx = isLeft ? deltaX : -deltaX;
      const vx = isLeft ? overallVelocityX : -overallVelocityX;
      const targetPosition = 100 * dx / windowWidth;

      // the pan action is over, cleanup and set the correct final menu position
      if (vx < -1 * triggerVelocity || -1 * targetPosition > width / 2){
        this.close();
      } else {
        this.open();
      }

      this.set('dxCorrection', 0);
    }
  }
});
