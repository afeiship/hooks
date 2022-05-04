import { useCallback, useEffect, useState } from 'react';

// @reference: https://spectrum.chat/react/general/use-custom-hook-usefetch-on-button-submit~2067eb8a-5029-4d3a-b759-dcd7871b584a

interface Options {
  immediate?: boolean;
}

type AsyncFunction = () => Promise<any>;

export const useAsync = (fn: AsyncFunction, inOptions?: Options) => {
  const { immediate = false } = inOptions || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const run = useCallback(() => {
    setLoading(true);
    fn()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [fn]);

  useEffect(() => {
    immediate && run();
  }, []);

  return { run, data, error, loading };
};
