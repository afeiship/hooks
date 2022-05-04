import { act, renderHook } from '@testing-library/react-hooks';

import { useMounted } from '@/lib/use-mounted';

describe('useMounted()', () => {
  test('should return boolean function', () => {
    const { result } = renderHook(() => useMounted());
    const hookRes = result.current;
    expect(typeof hookRes.current).toBe('boolean');
  });

  test('should return true when mounted', () => {
    const { result } = renderHook(() => useMounted());
    const hookRes = result.current;
    expect(hookRes.current).toBe(true);
  });

  test('should return false when unmounted', () => {
    const { unmount, result } = renderHook(() => useMounted());
    const hookRes = result.current;
    unmount();
    expect(hookRes.current).toBe(false);
  });
});
