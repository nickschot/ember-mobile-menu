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
  mobileMenuWidth:  85, // 0-100%
  maskEnabled:      true,
  shadowEnabled:    true,

  // private
  isDragging: false,
  currentPosition:  0,
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

  isOpen: computed('isDragging', 'currentPosition', 'mobileMenuWidth', 'isLeft', function(){
    return !get(this, 'isDragging') && get(this, 'currentPosition') === get(this, 'mobileMenuWidth');
  }),

  open(){
    set(this, 'currentPosition', get(this, 'mobileMenuWidth'));
    get(this, 'onOpen')(this);
  },
  close(){
    set(this, 'currentPosition', 0);
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
    const mobileMenuWidth = this.get('mobileMenuWidth');

    let targetPosition = 100 * dx / windowWidth;

    // enforce limits on the offset [0, mobileMenuWidth]
    targetPosition = Math.min(Math.max(targetPosition, 0), mobileMenuWidth);

    this.set('currentPosition', targetPosition);
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
    const mobileMenuWidth = get(this, 'mobileMenuWidth');

    const dx = isLeft ? deltaX : -deltaX;
    const vx = isLeft ? overallVelocityX : -overallVelocityX;

    const targetPosition = 100 * dx / windowWidth;

    // when overall horizontal velocity is high, force open/close and skip the rest
    if (vx > triggerVelocity || targetPosition > mobileMenuWidth / 2) {
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
    const mobileMenuWidth = this.get('mobileMenuWidth');

    const dx = isLeft ? deltaX : -deltaX;
    const cx = isLeft ? center.x : windowWidth - center.x;

    if(this.get('isOpen') && !this.get('isDragging')){

      // start drag when center.x is at the menu edge
      const cursorPosition = 100 * cx / windowWidth;

      // calculate and set a correction delta if the pan started outside the opened menu
      if(cursorPosition < mobileMenuWidth) {
        this.set('isDragging', true);
        this.set('dxCorrection', 100 * dx / windowWidth);
      }
    }

    if(this.get('isDragging')){
      let targetPosition = 100 * dx / windowWidth;
      const cursorPosition = 100 * cx / windowWidth;

      // correct targetPosition with dxCorrection set earlier
      targetPosition -= this.get('dxCorrection');

      // enforce limits on the offset [0, mobileMenuWidth]
      if(cursorPosition < mobileMenuWidth){
        if(targetPosition > 0){
          targetPosition = 0;
        } else if(targetPosition < -1 * mobileMenuWidth){
          targetPosition = -1 * mobileMenuWidth;
        }
        this.set('currentPosition', mobileMenuWidth + targetPosition);
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
      const mobileMenuWidth = this.get('mobileMenuWidth');

      const dx = isLeft ? deltaX : -deltaX;
      const vx = isLeft ? overallVelocityX : -overallVelocityX;
      const targetPosition = 100 * dx / windowWidth;

      // the pan action is over, cleanup and set the correct final menu position
      if (vx < -1 * triggerVelocity || -1 * targetPosition > mobileMenuWidth / 2){
        this.close();
      } else {
        this.open();
      }

      this.set('dxCorrection', 0);
    }
  }
});
