import { Spring as Wobble } from 'wobble';

/**
 * A thin wrapper around the `wobble` package which provides spring physics (damped harmonic oscillator).
 *
 * @class Spring
 * @private
 */
export default class Spring {
  spring;

  /**
   * @method constructor
   * @param {function} callback Called whenever the spring updates
   * @param {object} options See: https://github.com/skevy/wobble#api
   */
  constructor(callback = () => {}, options = {}){
    const config = {
      stiffness: 100,
      damping: 10,
      mass: 1,
      restVelocityThreshold: 0.01,
      restDisplacementThreshold: 0.01,
      ...options
    };

    this.spring = new Wobble(config);
    this.spring.onUpdate(callback);
    this.spring.onStop(() => this.stop());
  }

  start() {
    this.promise = null;

    return new Promise((resolve) => {
      this.promise = { resolve };

      const { fromValue, toValue, initialVelocity } = this.spring._config;

      // This is the same check as is done in wobble itself. It's needed to ensure our promise always resolves.
      if(fromValue !== toValue || initialVelocity !== 0){
        this.spring.start();
      } else {
        this.promise.resolve();
      }
    });
  }

  stop() {
    this.promise.resolve();
  }
}
