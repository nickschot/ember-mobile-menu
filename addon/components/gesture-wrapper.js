import Component from '@ember/component';
import layout from '../templates/components/gesture-wrapper';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Component.extend(RecognizerMixin, {
  layout,

  classNames: ['gesture-wrapper'],

  fastboot: service(),
  isFastBoot: computed.reads('fastboot.isFastBoot'),

  recognizers: 'pan',

  mask: true,
  openDetectionWidth: 25, // in px
  mobileMenuOffset: 85,
  currentPosition: 0,
  isDragging: false,

  deltaXCorrection: 0,

  _isOpen: false,
  isOpen: computed('_isOpen', {
    get(){
      return this.get('_isOpen');
    },
    set(key, value){
      if(this.get('isFastBoot')){
        if(value){
          this.set('currentPosition', this.get('mobileMenuOffset'));
        }
      } else {
        if(value){
          //TODO: use ember-body-class addon
          $('body').addClass('mobile-menu--open');

          this.set('isDragging', false);
          this.set('currentPosition', this.get('mobileMenuOffset'));
        } else {
          $('body').removeClass('mobile-menu--open');

          this.set('isDragging', false);
          this.set('currentPosition', 0);
        }
      }

      this.set('_isOpen', value);
      return value;
    }
  }),

  open() {
    this.set('isOpen', true);
  },
  close() {
    this.set('isOpen', false);
  },

  actions: {
    close(){
      this.close();
    },
    toggle(){
      if(this.get('isOpen')){
        this.close();
      } else {
        this.open();
      }
    }
  },

  _getWindowWidth(){
    return window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
  },

  panStart(e){
    const {
      center,
      pointerType,
      additionalEvent,
    } = e.originalEvent.gesture;

    if(pointerType === 'touch'){
      // workaround for https://github.com/hammerjs/hammer.js/issues/1132
      if (center.x === 0 && center.y === 0) return;

      // add a dragging class so any css transitions are disabled
      // and the pan event is enabled
      if(!this.get('isOpen') && additionalEvent === 'panright' && !this.get('userAgent.os.isIOS')){
        // only detect initial drag from left mobile of the window
        if(center.x < this.get('openDetectionWidth')){
          this.set('isDragging', true);
        }
      }
    }
  },

  pan(e){
    const {
      deltaX,
      isFinal,
      center,
      pointerType
    } = e.originalEvent.gesture;

    if(pointerType === 'touch'){

      // workaround for https://github.com/hammerjs/hammer.js/issues/1132
      if (center.x === 0 && center.y === 0) return;

      const windowWidth = this._getWindowWidth();
      const mobileMenuOffset = this.get('mobileMenuOffset');

      if(this.get('isOpen') && !this.get('isDragging')){
        // start drag when center.x is at the menu edge
        const cursorPosition = 100 * center.x / windowWidth;

        // calculate and set a correction delta if the pan started outmobile the opened menu
        if(cursorPosition < mobileMenuOffset) {
          this.set('isDragging', true);
          this.set('deltaXCorrection', 100 * deltaX / windowWidth);
        }
      }

      if(this.get('isDragging')){
        // TODO: limit size & disable drag for desktop
        //    (set mobileMenuOffset to pixel value and use deltaX directly instead of mapping to vw)

        let targetOffset = 100 * deltaX / windowWidth;

        if(!isFinal){
          // pass the new position taking limits into account
          if(this.get('isOpen')){
            const cursorPosition = 100 * center.x / windowWidth;

            // correct targetOffset with deltaXCorrection set earlier
            targetOffset -= this.get('deltaXCorrection');

            // enforce limits on the offset [0, mobileMenuOffset]
            if(cursorPosition < mobileMenuOffset){
              if(targetOffset > 0){
                targetOffset = 0;
              } else if(targetOffset < -1 * mobileMenuOffset){
                targetOffset = -1 * mobileMenuOffset;
              }
              this.set('currentPosition', mobileMenuOffset + targetOffset);
            }
          } else {
            // enforce limits on the offset [0, mobileMenuOffset]
            if(targetOffset < 0){
              targetOffset = 0;
            } else if(targetOffset > mobileMenuOffset){
              targetOffset = mobileMenuOffset;
            }
            this.set('currentPosition', targetOffset);
          }
        }
      }
    }
  },

  panEnd(e) {
    const {
      additionalEvent,
      center,
      deltaX,
      pointerType,
      overallVelocityX,
    } = e.originalEvent.gesture;

    if(pointerType === 'touch'){
      // workaround for https://github.com/hammerjs/hammer.js/issues/1132
      if (center.x === 0 && center.y === 0) return;

      console.log('touch end');

      const triggerVelocity = 0.25;
      const windowWidth = this._getWindowWidth();
      const mobileMenuOffset = this.get('mobileMenuOffset');
      let targetOffset = 100 * deltaX / windowWidth;

      // when overall horizontal velocity is high, force open/close and skip the rest
      if(
        !this.get('isOpen')
        && overallVelocityX > triggerVelocity
        && additionalEvent === 'panright'
      ){
        // force open
        this.open();
        return;
      } else if(
        this.get('isOpen')
        && overallVelocityX < -1 * triggerVelocity
        && additionalEvent === 'panleft'
      ){
        // force close
        this.close();
        return;
      }
      // the pan action is over, cleanup and set the correct final menu position
      if(    (!this.get('isOpen') && targetOffset > mobileMenuOffset / 2)
        || ( this.get('isOpen') && -1 * targetOffset < mobileMenuOffset / 2)
      ){
        this.open();
      } else {
        this.close();
      }

      this.set('deltaXCorrection', 0);
    }
  }
});
