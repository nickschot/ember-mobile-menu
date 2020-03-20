import { settled, getRootElement } from '@ember/test-helpers';
import createTouchEvent from './create-touch-event';
import { timeout } from 'ember-concurrency';

let panPoint;

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
  if (!panPoint) {
    const elem = document.createElement('div');
    elem.id = 'pan-point';
    document.body.appendChild(elem);

    panPoint = elem;
  }

  panPoint.style = `
    background: blue;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    position: fixed;
    top: ${y-15}px;
    left: ${x-15}px;
    z-index:9999;
  `;

  const event = createTouchEvent(element, type, x, y);
  element.dispatchEvent(event);
}

// currently only horizontal
async function _pan(element, options = {}){
  const {
    top,
    left,
    width,
    height
  } = element.getBoundingClientRect();

  const right = left + width;
  const isLeft = options.direction === 'left';

  const {
    startX = isLeft ? right - 1 : left + 1,
    endX = isLeft ? left + 1 : right - 1,
    duration = 300,
    resolution = 17 // ms per step
  } = options;

  const steps = Math.ceil(duration / resolution);
  const middleY = top + height/2;

  sendEvent(element, 'touchstart', startX, middleY);
  for(let i = 1; i < steps; i++){
    await timeout(resolution);
    const x = isLeft
      ? startX - (startX - endX)/steps*i
      : startX + (endX - startX)/steps*i;
    sendEvent(element, 'touchmove',  x, middleY);
  }
  sendEvent(element, 'touchend', endX, middleY);

  if (panPoint) {
    panPoint.remove();
    panPoint = null;
  }
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
