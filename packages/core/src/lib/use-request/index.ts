import { useState, useRef, useEffect } from 'react';

type ReturnValue<T> = {
  loading: boolean;
  data: T;
  error: Error | null;
};

type Cache<T> = { [url: string]: T };

type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS'
  | 'TRACE'
  | 'CONNECT';

interface Options extends Omit<RequestInit, 'body'> {
  url: string;
}

// @references: https://usehooks-ts.com/react-hook/use-fetch

export const useRequest = (
  inUrl: string,
  inMethod: HttpMethod,
  inPayload: any,
  inOptions: Options
) => {
  const cancelRequest = useRef<boolean>(false);
  // const cache = useRef<Cache<T>>({});

  const isGET = inMethod.toLowerCase() === 'get';

  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    setState({
      data: null,
      loading: true,
      error: null,
    });
  }, []);

  return state;
};
