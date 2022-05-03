import { act, renderHook } from '@testing-library/react-hooks';
import { useInterval } from '@/lib/use-interval';

describe('useInterval()', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  test('should have destroy value', () => {
    const { result } = renderHook(() => useInterval(jest.fn, 0));
    expect(typeof result.current.destroy).toBe('function');
  });

  test('should called times(N)', () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useInterval(fn, 10));
    act(() => {
      jest.advanceTimersByTime(40);
    });
    expect(fn).toBeCalledTimes(4);
  });

  test('should be manual destroyed when destroy called', () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useInterval(fn, 10));
    act(() => result.current.destroy());
    expect(fn).toBeCalledTimes(0);
  });

  test('should be unmount when component was eject', () => {
    const fn = jest.fn();
    const { unmount } = renderHook(() => useInterval(fn, 10));
    act(() => {
      unmount();
    });
    expect(fn).toBeCalledTimes(0);
  });
});
