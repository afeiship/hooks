import { useRef, useCallback, useEffect } from 'react';

type ReturnValue = () => boolean;

export const useMounted = (): ReturnValue => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(() => mountedRef.current, []);
};
