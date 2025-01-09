/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-01-08 18:18:38
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-01-09 09:37:18
 */
import {useState, useCallback} from 'react';

export interface DynamicListActions<T> {
  add: (item: T) => void;
  remove: (index: number) => void;
  replace: (index: number, item: T) => void;
  reset: (newList?: T[]) => void;
  move: (fromIndex: number, toIndex: number) => void;
  clear: () => void;
}

export function useDynamicList<T>(initialList: T[] = []): [T[], DynamicListActions<T>] {
  const [list, setList] = useState<T[]>(initialList);

  const add = useCallback((item: T) => {
    setList(prev => [...prev, item]);
  }, []);

  const remove = useCallback((index: number) => {
    setList(prev => prev.filter((_, i) => i !== index));
  }, []);

  const replace = useCallback((index: number, item: T) => {
    setList(prev => prev.map((current, i) => (i === index ? item : current)));
  }, []);

  const reset = useCallback((newList: T[] = []) => {
    setList(newList);
  }, []);

  const move = useCallback((fromIndex: number, toIndex: number) => {
    setList(prev => {
      const updatedList = [...prev];
      const [movedItem] = updatedList.splice(fromIndex, 1);
      updatedList.splice(toIndex, 0, movedItem);
      return updatedList;
    });
  }, []);

  const clear = useCallback(() => {
    setList([]);
  }, []);

  return [
    list,
    {
      add,
      remove,
      replace,
      reset,
      move,
      clear,
    },
  ];
}

export default useDynamicList;
