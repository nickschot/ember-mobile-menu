export interface BodyScrollLockOptions {
  /**
   * Whether to reserve space for the scrollbar when locking scroll
   */
  reserveScrollBarGap?: boolean;
  /**
   * Function to determine if touch move should be allowed for a given element
   */
  allowTouchMove?: (element: Element) => boolean;
}

/**
 * Disables body scroll while preserving the position and preventing scroll on the provided target element
 * @param targetElement - The element that should remain scrollable
 * @param options - Configuration options for the scroll lock behavior
 */
export function disableBodyScroll(
  targetElement: HTMLElement,
  options?: BodyScrollLockOptions,
): void;

/**
 * Re-enables body scroll for the provided target element
 * @param targetElement - The element to remove scroll lock from
 */
export function enableBodyScroll(targetElement: HTMLElement): void;

/**
 * Clears all body scroll locks and restores normal scrolling behavior
 */
export function clearAllBodyScrollLocks(): void;
