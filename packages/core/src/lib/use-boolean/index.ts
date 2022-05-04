import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface ReturnType {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

export const useBoolean = (inInitialValue?: boolean): ReturnType => {
  const [value, setValue] = useState(!!inInitialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((x) => !x), []);

  return { value, setValue, setTrue, setFalse, toggle };
};
