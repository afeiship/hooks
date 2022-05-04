import { useRef, useCallback, useEffect, RefObject, Ref } from 'react';

export const useMounted = (): RefObject<boolean> => {
  const mountedRef = useRef<boolean>(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};
