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
    return !get(this, 'isDragging') && (
         get(this, 'isLeft')  && get(this, 'currentPosition') === get(this, 'mobileMenuWidth')
      || get(this, 'isRight') && get(this, 'currentPosition') === -1 * get(this, 'mobileMenuWidth')
    );
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
    let openPosition = get(this, 'mobileMenuWidth');

    if(get(this, 'isRight')){
      openPosition *= -1;
    }

    set(this, 'currentPosition', openPosition);
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

    let targetPosition = 100 * deltaX / windowWidth;

    // enforce limits on the offset [0, mobileMenuWidth]
    targetPosition = get(this, 'isLeft')
      ? Math.min(Math.max(targetPosition, 0), mobileMenuWidth)
      : Math.max(Math.min(targetPosition, 0), -1 * mobileMenuWidth);

    this.set('currentPosition', targetPosition);
  },
  panOpenEnd(e){
    set(this, 'isDragging', false);

    const {
      deltaX,
      overallVelocityX,
    } = e.originalEvent.gesture;

    const triggerVelocity = 0.25; //TODO: make this an attribute
    const windowWidth = this._getWindowWidth();
    const mobileMenuWidth = get(this, 'mobileMenuWidth');
    const isLeft = get(this, 'isLeft');
    const isRight = get(this, 'isRight');

    let targetPosition = 100 * deltaX / windowWidth;

    // when overall horizontal velocity is high, force open/close and skip the rest
    if (isLeft && (overallVelocityX > triggerVelocity || targetPosition > mobileMenuWidth / 2)
      || isRight && (-1 * overallVelocityX > triggerVelocity || -1 * targetPosition > mobileMenuWidth / 2)) {
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

    const isLeft = get(this, 'isLeft');
    const isRight = get(this, 'isRight');

    const windowWidth = this._getWindowWidth();
    const mobileMenuWidth = this.get('mobileMenuWidth');

    if(this.get('isOpen') && !this.get('isDragging')){

      // start drag when center.x is at the menu edge
      const cursorPosition = 100 * center.x / windowWidth;

      // calculate and set a correction delta if the pan started outside the opened menu
      if(
        isLeft && cursorPosition < mobileMenuWidth
        || isRight && cursorPosition > 100 - mobileMenuWidth
      ) {
        this.set('isDragging', true);
        this.set('dxCorrection', 100 * deltaX / windowWidth);
      }
    }

    if(this.get('isDragging')){
      let targetPosition = 100 * deltaX / windowWidth;
      const cursorPosition = 100 * center.x / windowWidth;

      // correct targetPosition with dxCorrection set earlier
      targetPosition -= this.get('dxCorrection');

      // enforce limits on the offset [0, mobileMenuWidth]
      if(isLeft && cursorPosition < mobileMenuWidth){
        if(targetPosition > 0){
          targetPosition = 0;
        } else if(targetPosition < -1 * mobileMenuWidth){
          targetPosition = -1 * mobileMenuWidth;
        }
        this.set('currentPosition', mobileMenuWidth + targetPosition);
      } else if(isRight && cursorPosition > 100 - mobileMenuWidth){
        if(targetPosition < 0){
          targetPosition = 0;
        } else if(targetPosition > mobileMenuWidth){
          targetPosition = mobileMenuWidth;
        }
        this.set('currentPosition', -1 * mobileMenuWidth + targetPosition);
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
      const targetPosition = 100 * deltaX / windowWidth;

      const isLeft = get(this, 'isLeft');
      const isRight = get(this, 'isRight');

      // the pan action is over, cleanup and set the correct final menu position
      if (
           isLeft  && (overallVelocityX < -1 * triggerVelocity || -1 * targetPosition > mobileMenuWidth / 2)
        || isRight && (overallVelocityX > triggerVelocity || targetPosition > mobileMenuWidth / 2)
      ) {
        this.close();
      } else{
        this.open();
      }

      this.set('dxCorrection', 0);
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
