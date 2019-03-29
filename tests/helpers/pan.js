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
  console.log(element, type, x, y);
  const event = createTouchEvent(1234, type, x, y, element);
  dispatchEvent(event);
}

// currently only horizontal
async function _pan(element, options){
  const {
    clientTop: top,
    clientLeft: left,
    clientWidth: width,
    clientHeight: height
  } = element;

  const right = left + width;
  const bottom = top + height;

  console.log(element, top, right, bottom, left, width, height);

  const steps = 10;
  const startX = left + 1;
  const endX = right - 1;
  const middleY = top + height/2;

  sendEvent(element, 'touchstart', startX, middleY);
  sendEvent(element, 'touchmove', startX, middleY);
  for(let i = 1; i <= steps; i++){
    await timeout(30);
    console.log('loop', i);
    sendEvent(element, 'touchmove', (endX - startX)/steps * i, middleY);
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

  await _pan(element, direction);

  return settled();
}
