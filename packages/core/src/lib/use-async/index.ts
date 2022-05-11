import { useEffect, useState } from 'react';

// @reference: https://spectrum.chat/react/general/use-custom-hook-usefetch-on-button-submit~2067eb8a-5029-4d3a-b759-dcd7871b584a

interface Options {
  immediate?: boolean;
}

type AsyncFunction = (args?) => Promise<any>;

const defaults = {
  immediate: false,
};

type State<T> = {
  data: T | null;
  error: Error | null;
  pending: boolean;
};

export const useAsync = (inFn: AsyncFunction, inArgs?, inOptions?: Options) => {
  const { immediate } = { ...defaults, ...inOptions };
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const run = () => {
    setPending(true);
    inFn(inArgs)
      .then(setData)
      .catch(setError)
      .finally(() => setPending(false));
  };

  useEffect(() => {
    immediate && run();
  }, []);

  return { run, data, error, pending };
};
