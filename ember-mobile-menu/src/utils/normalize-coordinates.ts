type XY = { x: number; y: number };

interface TouchCurrent extends XY {
  deltaX: number;
  deltaY: number;
  distance: number;
  distanceX: number;
  distanceY: number;
  angle: number;
  overallVelocityX: number;
  overallVelocityY: number;
  overallVelocity: number;
  velocityX?: number;
  velocityY?: number;
  velocity?: number;
}

export interface TouchData {
  initial: XY & { timeStamp?: number };
  current: TouchCurrent;
  cache?: {
    velocity: { distanceX: number; distanceY: number; timeStamp: number };
  };
  timeStamp?: number;
  originalEvent?: PointerEvent;
  panStarted?: boolean;
  panDenied?: boolean;
}

export function normalizeCoordinates<T extends TouchData>(
  e: T,
  bcr: DOMRect | DOMRectReadOnly,
): T {
  return {
    ...e,
    initial: {
      ...e.initial,
      x: e.initial.x - bcr.x,
      y: e.initial.y - bcr.y,
    },
    current: {
      ...e.current,
      x: e.current.x - bcr.x,
      y: e.current.y - bcr.y,
    },
  };
}

export function scaleCorrection<T extends TouchData>(
  e: T,
  scaleX: number,
  scaleY: number,
): T {
  return {
    ...e,
    current: {
      ...e.current,
      distance: e.current.distance / ((scaleX + scaleY) / 2),
      distanceX: e.current.distanceX / scaleX,
      distanceY: e.current.distanceY / scaleY,
    },
  };
}
