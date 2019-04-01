import { settled, getRootElement } from '@ember/test-helpers';
import createTouchEvent from './create-touch-event';
import { timeout } from 'ember-concurrency';

function nextTickPromise() {
  return new Promise(resolve => {
    setTimeout(resolve);
  });
}

function getElement(target) {
  if (
    target.nodeType === Node.ELEMENT_NODE ||
    target.nodeType === Node.DOCUMENT_NODE ||
    target instanceof Window
  ) {
    return target;
  } else if (typeof target === 'string') {
    let rootElement = getRootElement();

    return rootElement.querySelector(target);
  } else {
    throw new Error('Must use an element or a selector string');
  }
}

function sendEvent(element, type, x, y){
  const event = createTouchEvent(element, type, x, y);
  element.dispatchEvent(event);
}

// currently only horizontal
async function _pan(element, options = {}){
  const {
    clientTop: top,
    clientLeft: left,
    clientWidth: width,
    clientHeight: height
  } = element;

  const right = left + width;
  const isLeft = options.direction === 'left';

  const {
    startX = isLeft ? right -1 : left + 1,
    endX = isLeft ? left + 1 : right - 1,
    duration = 100,
    resolution = 17 // ms per step
  } = options;

  const steps = Math.ceil(duration / resolution);
  const middleY = top + height/2;

  sendEvent(element, 'touchstart', startX, middleY);
  for(let i = 1; i < steps; i++){
    await timeout(1);
    const x = isLeft
      ? startX - (startX - endX)/steps*i
      : (endX - startX)/steps * i;
    sendEvent(element, 'touchmove',  x, middleY);
  }
  sendEvent(element, 'touchend', endX, middleY);
}

export default async function pan(target, direction) {
  await nextTickPromise();

  if (!target) {
    throw new Error('Must pass an element or selector to `pan`.');
  }

  let element = getElement(target);
  if (!element) {
    throw new Error(`Element not found when calling \`pan('${target}')\`.`);
  }

  await _pan(element, { direction });

  return settled();
}
