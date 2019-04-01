/**
 * Generates a TouchEvent for testing purposes
 *
 * @param {Element} target
 * @param {string} eventType touchstart, touchmove or touchend
 * @param {number} x
 * @param {number} y
 * @param {number} identifier
 * @returns {TouchEvent}
 */
export default function createTouchEvent(target, eventType, x, y, identifier = 0) {
  let touch = new Touch({
    identifier: identifier || 0,
    target,
    clientX: x,
    clientY: y
  });

  // we mock it using an object because we can't otherwise set the timeStamp
  return new TouchEvent(eventType, {
    bubbles: true,
    type: eventType,
    touches: [touch],
    changedTouches: [touch]
  });
}
