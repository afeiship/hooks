import { useCallback, useState } from 'react';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

type UseWaitingCallbackRequest = {
  interval?: number;
  callback: () => Promise<any>;
};

type UseWaitingCallbackResponse = {
  execute: () => void;
  loading: boolean;
};

const defaults = {
  interval: 500,
  callback: () => Promise.resolve(),
};

export const useWaitingCallback = ({
  interval,
  callback,
}: UseWaitingCallbackRequest = defaults): UseWaitingCallbackResponse => {
  const [loading, setLoading] = useState(false);
  const execute = useCallback(() => {
    const start = Date.now();
    setLoading(true);
    callback!().finally(async () => {
      const gap = Date.now() - start;
      if (interval && gap < interval) await delay(interval - gap);
      setLoading(false);
    });
  }, [interval, callback]);

  return { execute, loading };
};
