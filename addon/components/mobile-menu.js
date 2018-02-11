import Component from '@ember/component';
import layout from '../templates/components/mobile-menu';

import { get, set, computed, observer } from '@ember/object';
import { once } from '@ember/runloop';
import { htmlSafe } from '@ember/string';

import ComponentChildMixin from 'ember-mobile-menu/mixins/component-child';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Component.extend(ComponentChildMixin, RecognizerMixin, {
  layout,

  classNames: ['mobile-menu'],
  classNameBindings: [
    'isDragging:mobile-menu--dragging',
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
  deltaXCorrection: 0,

  // hooks
  onOpen(){},
  onClose(){},

  isLeft: computed('type', function(){
    return get(this, 'type') === 'left';
  }),
  isRight: computed('type', function(){
    return get(this, 'type') === 'right';
  }),

  isOpen: computed('isDragging', 'currentPosition', 'mobileMenuWidth', function(){
    return !get(this, 'isDragging') && get(this, 'currentPosition') === get(this, 'mobileMenuWidth');
  }),

  positionChanged: observer(
    'currentPosition',
    function(){
      once(this, function() {
        this.element.getElementsByClassName('mobile-menu__tray')[0].style.transform = `translateX(${get(this, 'currentPosition')}vw)`;
      });
    }
  ),

  open(){
    set(this, 'currentPosition', get(this, 'mobileMenuWidth'));
    get(this, 'onOpen')(this);
  },
  close(){
    set(this, 'currentPosition', 0);
    get(this, 'onClose')();
  },

  panOpen(e){
    set(this, 'isDragging', true);

    const {
      deltaX
    } = e.originalEvent.gesture;

    const windowWidth     = this._getWindowWidth();
    const mobileMenuWidth = this.get('mobileMenuWidth');

    let targetOffset = 100 * deltaX / windowWidth;

    // enforce limits on the offset [0, mobileMenuWidth]
    targetOffset = Math.min(Math.max(targetOffset, 0), mobileMenuWidth);

    this.set('currentPosition', targetOffset);
  },
  panOpenEnd(e){
    set(this, 'isDragging', false);

    const {
      deltaX,
      overallVelocityX,
    } = e.originalEvent.gesture;

    const triggerVelocity = 0.25; //TODO: make this an attribute
    const windowWidth = this._getWindowWidth();
    const mobileMenuWidth = this.get('mobileMenuWidth');
    let targetOffset = 100 * deltaX / windowWidth;

    // when overall horizontal velocity is high, force open/close and skip the rest
    if (overallVelocityX > triggerVelocity || targetOffset > mobileMenuWidth / 2) { //TODO: reverse these for right menu
      this.open();
    } else {
      this.close();
    }
  },

  pan(e){
    const {
      deltaX,
      center
    } = e.originalEvent.gesture;

    const windowWidth = this._getWindowWidth();
    const mobileMenuWidth = this.get('mobileMenuWidth');

    if(this.get('isOpen') && !this.get('isDragging')){
      // start drag when center.x is at the menu edge
      const cursorPosition = 100 * center.x / windowWidth;

      // calculate and set a correction delta if the pan started outside the opened menu
      if(cursorPosition < mobileMenuWidth) {
        this.set('isDragging', true);
        this.set('deltaXCorrection', 100 * deltaX / windowWidth);
      }
    }

    if(this.get('isDragging')){
      let targetOffset = 100 * deltaX / windowWidth;
      const cursorPosition = 100 * center.x / windowWidth;

      // correct targetOffset with deltaXCorrection set earlier
      targetOffset -= this.get('deltaXCorrection');

      // enforce limits on the offset [0, mobileMenuWidth]
      if(cursorPosition < mobileMenuWidth){
        if(targetOffset > 0){
          targetOffset = 0;
        } else if(targetOffset < -1 * mobileMenuWidth){
          targetOffset = -1 * mobileMenuWidth;
        }
        this.set('currentPosition', mobileMenuWidth + targetOffset);
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
      const windowWidth = this._getWindowWidth();
      const mobileMenuWidth = this.get('mobileMenuWidth');
      const targetOffset = 100 * deltaX / windowWidth;

      // the pan action is over, cleanup and set the correct final menu position
      if (overallVelocityX < -1 * triggerVelocity || -1 * targetOffset > mobileMenuWidth / 2) {
        this.close();
      } else{
        this.open();
      }

      this.set('deltaXCorrection', 0);
    }
  },

  actions: {
    close(){
      this.close();
    }
  },

  _getWindowWidth(){
    return window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
  },
});
