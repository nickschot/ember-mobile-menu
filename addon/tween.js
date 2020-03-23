import Easings from './easings';

export default class Tween {
  constructor(callback = () => {}, opts = {}){
    this.running = false;

    this.callback = callback;
    this.duration = opts.duration || 250;
    this.ease = Easings[opts.ease] || Easings['easeOutCubic'];
  }

  start() {
    this.promise = null;
    this.running = true;

    return new Promise((resolve, reject) => {
      this.promise = { resolve, reject };
      window.requestAnimationFrame(this._step.bind(this));
    });
  }

  stop() {
    this.running = false;
  }

  _step(timestamp) {
    if(this.running){
      if(!this.startTS) {
        this.startTS = timestamp;
      }

      this.progress = (timestamp - this.startTS) / this.duration;
      const currentValue = this.ease(this.progress);

      if(this.progress < 1){
        this.callback(currentValue);
        window.requestAnimationFrame(this._step.bind(this));
      } else {
        this.callback(1);
        this.promise.resolve();
      }
    }
  }
}
