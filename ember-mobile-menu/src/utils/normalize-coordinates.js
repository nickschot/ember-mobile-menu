/**
 *  Normalizes coordinates in the passed TouchData to the BoundingClientRect of the passed element
 *
 * @function normalizeCoordinates
 * @param e {Object} TouchData as generated by ember-mobile-core
 * @param bcr {DOMRect} The DOMRect of the element to which the coordinates need to be normalized.
 * @return {Object} Returns a TouchData object
 * @private
 */
export default function normalizeCoordinates(e, bcr) {
  return {
    ...e,
    initial: {
      ...e.initial,
      x: e.initial.x - bcr.x,
      y: e.initial.x - bcr.x,
    },
    current: {
      ...e.current,
      x: e.current.x - bcr.x,
      y: e.current.x - bcr.x,
    },
  };
}
