import { Dispatch, SetStateAction, useState } from 'react';

interface ReturnType {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  reset: () => void;
  increment: () => void;
  decrement: () => void;
}

export const useCounter = (defaultValue?: number): ReturnType => {
  const initValue = defaultValue || 0;
  const [count, setCount] = useState(initValue);

  const reset = () => setCount(initValue);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return { count, setCount, reset, increment, decrement };
};
