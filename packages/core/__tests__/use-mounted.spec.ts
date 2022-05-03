import { act, renderHook } from '@testing-library/react-hooks';

import { useMounted } from '@/lib/use-mounted';

describe('useMounted()', () => {
  test('should return boolean function', () => {
    const { result } = renderHook(() => useMounted());
    expect(typeof result.current).toBe('function');
  });

  test('should return true when mounted', () => {
    const { result } = renderHook(() => useMounted());
    act(() => {
      result.current();
    });
    expect(result.current()).toBe(true);
  });

  test('should return false when unmounted', () => {
    const { unmount, result } = renderHook(() => useMounted());
    act(() => {
      result.current();
    });
    unmount();
    expect(result.current()).toBe(false);
  });
});
