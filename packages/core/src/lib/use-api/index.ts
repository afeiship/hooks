import { useCallback, useEffect, useState } from 'react';

interface Options {
  immediate?: boolean;
}

export const useApi = (fn: Function, inOptions?: Options) => {
  const { immediate = false } = inOptions || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const go = useCallback(() => {
    setLoading(true);
    fn()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [fn]);

  useEffect(() => {
    immediate && go();
  }, []);

  return { go, data, error, loading };
};
