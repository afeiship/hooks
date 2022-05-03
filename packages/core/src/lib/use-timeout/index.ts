import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

// @references: https://www.joshwcomeau.com/snippets/react-hooks/use-timeout/
// @references: https://stackoverflow.com/questions/45802988/typescript-use-correct-version-of-settimeout-node-vs-window

interface Destroyable {
  destroy: () => void;
}

export const useTimeout = (callback: (args: void) => void, delay = 0): Destroyable => {
  const timeoutRef = useRef<number>();
  const savedCallback = useRef(callback);
  const destroy = () => window.clearTimeout(timeoutRef.current);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = savedCallback.current;
    timeoutRef.current = window.setTimeout(tick, delay);
    return destroy;
  }, [delay]);

  return { destroy };
};
