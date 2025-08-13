import { waitForPromise } from '@ember/test-waiters';
/**
 * See also: https://reactive.nullvoxpopuli.com/functions/sync.sync.html
 *
 * This version ties in to the waiter system
 */
export function effect(
  fn: (...args: unknown[]) => Promise<unknown>,
  ...args: unknown[]
) {
  void waitForPromise(
    (async () => {
      /**
       * Detaches from auto-tracking so that mutations here doen't cause
       * infinite re-render loops (which would run this effect)
       *
       * Infinite re-render loops are still possible if then some other effect
       * causes this effect to change.
       */
      await Promise.resolve();
      await fn(...args);
    })(),
  );

  return;
}
