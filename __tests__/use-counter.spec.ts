import { act, renderHook } from '@testing-library/react-hooks';

import { useCounter } from '@/lib/use-counter';

describe('useCounter()', () => {
  test('should use counter', () => {
    const { result } = renderHook(() => useCounter(0));
    expect(result.current.count).toBe(0);
    expect(typeof result.current.setCount).toBe('function');
    expect(typeof result.current.reset).toBe('function');
    expect(typeof result.current.increment).toBe('function');
    expect(typeof result.current.decrement).toBe('function');
  });

  test('api: setCount', () => {
    const { result } = renderHook(() => useCounter(0));
    expect(result.current.count).toBe(0);
    act(() => result.current.setCount(10));
    expect(result.current.count).toBe(10);
    act(() => result.current.setCount(-5));
    expect(result.current.count).toBe(-5);
  });
});
