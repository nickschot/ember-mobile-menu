/**
 * Generates a mock touchEvent like object for testing purposes
 * @param {number} identifier
 * @param {string} eventType touchstart, touchmove or touchend
 * @param {number} x
 * @param {number} y
 * @param {Element} target
 * @returns {TouchEvent}
 */
export default function createTouchEvent(identifier, eventType, x, y, target) {
  let touch = new Touch({
    identifier,
    target,
    clientX: x,
    clientY: y
  });

  // we mock it using an object because we can't otherwise set the timeStamp
  return new TouchEvent(eventType, {
    type: eventType,
    touches: [touch],
    changedTouches: [touch]
  });
}
