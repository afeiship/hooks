import { act, renderHook } from '@testing-library/react-hooks';

import { useMounted } from '@/lib/use-mounted';

describe('useMounted()', () => {
  test('should return boolean function', () => {
    const { result } = renderHook(() => useMounted());
    expect(typeof result.current).toBe('function');
  });
});
