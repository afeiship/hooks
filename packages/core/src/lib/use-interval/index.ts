import { useEffect, useRef, useState } from 'react';

interface Destroyable {
  destroy: () => void;
}

export const useInterval = (callback: () => void, delay: number | null): Destroyable => {
  const savedCallback = useRef<() => void>();
  const timerId = useRef<number>();
  const destroy = () => window.clearInterval(timerId.current);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }

    if (delay !== null) {
      timerId.current = window.setInterval(tick, delay);
      return destroy;
    }
  }, [delay]);

  return { destroy };
};
