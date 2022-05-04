import { useCallback, useEffect, useState } from 'react';

// https://spectrum.chat/react/general/use-custom-hook-usefetch-on-button-submit~2067eb8a-5029-4d3a-b759-dcd7871b584a

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
