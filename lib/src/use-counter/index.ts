import { Dispatch, SetStateAction, useState } from 'react';

interface ReturnType {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  reset: () => void;
  increment: () => void;
  decrement: () => void;
}

export const useCounter = (defaultValue?: number): ReturnType => {
  const initValue = defaultValue || 0;
  const [value, setValue] = useState(initValue);

  const reset = () => setValue(initValue);
  const increment = () => setValue(value + 1);
  const decrement = () => setValue(value - 1);

  return { value, setValue, reset, increment, decrement };
};
