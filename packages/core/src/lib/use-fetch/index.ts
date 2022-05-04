import { useRef, useReducer, useEffect, useCallback } from 'react';
import { useTimeout } from '../use-timeout';

// @references: https://usehooks-ts.com/react-hook/use-fetch
// @references: https://www.30secondsofcode.org/react/s/use-fetch

type Status = keyof typeof STATUS;
type State<T> = {
  status: Status;
  data: T | null;
  error: Error | null;
  destroy: () => void;
};

// discriminated union type
type Action<T> =
  | { type: STATUS.init }
  | { type: STATUS.loading }
  | { type: STATUS.success; payload: T }
  | { type: STATUS.error; payload: Error };

type Cache<T> = { [url: string]: T };

enum STATUS {
  init = 'init',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

interface Options extends RequestInit {
  timeout?: number;
}

const defaults = {
  timeout: 6e4,
};

export function useFetch<T>(inUrl: string, inOptions?: Options) {
  const cache = useRef<Cache<T>>({});
  const ctrlRef = useRef<AbortController>(new AbortController());
  const signal = ctrlRef.current.signal;
  const { timeout, ...options } = { ...defaults, ...inOptions, signal };
  const opts = useRef(options);

  useTimeout(() => {
    try {
      ctrlRef.current.abort();
    } catch (e) {}
  }, timeout);

  const destroy = useCallback(() => {
    ctrlRef.current.abort();
  }, []);

  const initialState: State<T> = {
    status: 'init',
    error: null,
    data: null,
    destroy,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    initialState.status = action.type;
    switch (action.type) {
      case STATUS.init:
      case STATUS.loading:
        return { ...initialState };
      case STATUS.success:
        return { ...initialState, data: action.payload };
      case STATUS.error:
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: STATUS.init });

    const fetchData = async () => {
      dispatch({ type: STATUS.loading });
      try {
        const response = await fetch(inUrl, opts.current);
        if (!response.ok) throw new Error(response.statusText);

        const data = (await response.json()) as T;
        cache.current[inUrl] = data;

        dispatch({ type: STATUS.success, payload: data });
      } catch (error) {
        dispatch({ type: STATUS.error, payload: error as Error });
      }
    };

    void fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return destroy;
  }, [inUrl, opts]);

  return state;
}
