"use client";

import { useCallback, useRef } from "react";

/**
 * Shared keyboard behavior for tab lists (WAI-ARIA tabs pattern):
 * Arrow keys move selection, Home/End jump to the edges.
 */
export function useRovingTabs(count: number, onSelect: (index: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const setRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      refs.current[index] = el;
    },
    [],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent, current: number) => {
      let next: number | null = null;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          next = (current + 1) % count;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          next = (current - 1 + count) % count;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = count - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      onSelect(next);
      refs.current[next]?.focus();
    },
    [count, onSelect],
  );

  return { setRef, onKeyDown };
}
