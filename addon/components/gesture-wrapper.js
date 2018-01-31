import Component from '@ember/component';
import layout from '../templates/components/gesture-wrapper';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Component.extend(RecognizerMixin, {
  layout,

  classNames: ['gesture-wrapper'],

  mobileMenu: service(),
  isFastBoot: computed.reads('mobileMenu.isFastBoot'),

  recognizers: 'pan',

  openDetectionWidth: 30, // in px
  mobileMenuOffset: 85,
  currentPosition: 0,

  deltaXCorrection: 0,

  open() {
    get(this, 'mobileMenu').open();
  },
  close() {
    get(this, 'mobileMenu').close();
  },

  actions: {
    close(){
      this.close();
    },
    toggle(){
      if(this.get('mobileMenu.isOpen')){
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
      if(!this.get('mobileMenu.isOpen') && additionalEvent === 'panright' && !this.get('userAgent.os.isIOS')){
        // only detect initial drag from left mobile of the window
        if(center.x < this.get('openDetectionWidth')){
          this.set('mobileMenu.isDragging', true);
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

      if(this.get('mobileMenu.isOpen') && !this.get('mobileMenu.isDragging')){
        // start drag when center.x is at the menu edge
        const cursorPosition = 100 * center.x / windowWidth;

        // calculate and set a correction delta if the pan started outmobile the opened menu
        if(cursorPosition < mobileMenuOffset) {
          this.set('mobileMenu.isDragging', true);
          this.set('deltaXCorrection', 100 * deltaX / windowWidth);
        }
      }

      if(this.get('mobileMenu.isDragging')){
        // TODO: limit size & disable drag for desktop
        //    (set mobileMenuOffset to pixel value and use deltaX directly instead of mapping to vw)

        let targetOffset = 100 * deltaX / windowWidth;

        if(!isFinal){
          // pass the new position taking limits into account
          if(this.get('mobileMenu.isOpen')){
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
              this.set('mobileMenu.position', mobileMenuOffset + targetOffset);
            }
          } else {
            // enforce limits on the offset [0, mobileMenuOffset]
            if(targetOffset < 0){
              targetOffset = 0;
            } else if(targetOffset > mobileMenuOffset){
              targetOffset = mobileMenuOffset;
            }
            this.set('mobileMenu.position', targetOffset);
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

      if(this.get('mobileMenu.isDragging')) {
        const triggerVelocity = 0.25;
        const windowWidth = this._getWindowWidth();
        const mobileMenuOffset = this.get('mobileMenuOffset');
        let targetOffset = 100 * deltaX / windowWidth;

        // when overall horizontal velocity is high, force open/close and skip the rest
        if (
          !this.get('mobileMenu.isOpen')
          && overallVelocityX > triggerVelocity
          && additionalEvent === 'panright'
        ) {
          // force open
          this.open();
          return;
        } else if (
          this.get('mobileMenu.isOpen')
          && overallVelocityX < -1 * triggerVelocity
          && additionalEvent === 'panleft'
        ) {
          // force close
          this.close();
          return;
        }

        // the pan action is over, cleanup and set the correct final menu position
        if ((!this.get('mobileMenu.isOpen') && targetOffset > mobileMenuOffset / 2)
          || (this.get('mobileMenu.isOpen') && -1 * targetOffset < mobileMenuOffset / 2)
        ) {
          this.open();
        } else {
          this.close();
        }
      }

      this.set('deltaXCorrection', 0);
    }
  }
});
