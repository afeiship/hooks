import { useCounter } from '../lib/src/use-counter';
import { act, renderHook } from '@testing-library/react-hooks';

describe('useCounter()', () => {
  test('should use counter', () => {
    const { result } = renderHook(() => useCounter(0));
    expect(result.current.value).toBe(0);
    expect(typeof result.current.setValue).toBe('function');
    expect(typeof result.current.reset).toBe('function');
    expect(typeof result.current.increment).toBe('function');
    expect(typeof result.current.decrement).toBe('function');
  });
});
