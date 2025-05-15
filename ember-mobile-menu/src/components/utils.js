import { waitForPromise } from '@ember/test-waiters';
/**
 * See also: https://reactive.nullvoxpopuli.com/functions/sync.sync.html
 *
 * This version ties in to the waiter system
 */
export function effect(fn) {
  waitForPromise(
    (async () => {
      await 0;
      await fn();
    })(),
  );

  return;
}
