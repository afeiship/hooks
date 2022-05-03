import { act, renderHook } from '@testing-library/react-hooks';
import { useTimeout } from '@/lib/use-timeout';

declare const global: any;

describe('useTimeout()', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  test('should have destroy value', () => {
    const { result } = renderHook(() => useTimeout(jest.fn, 0));
    expect(typeof result.current.destroy).toBe('function');
  });

  test('should only execute 1 time', () => {
    let counter = 0;
    global['fn1'] = () => counter++;
    const spy1 = jest.spyOn(global, 'fn1') as jest.Mock;

    renderHook(() => useTimeout(spy1, 100));

    expect(spy1).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(counter).toBe(1);
  });

  test('destroy should prevent execute timeout handler', () => {
    let counter = 0;
    global['fn2'] = () => {
      counter++;
    };
    const spy2 = jest.spyOn(global, 'fn2') as jest.Mock;
    const { result } = renderHook(() => useTimeout(spy2, 100));

    act(() => {
      result.current.destroy();
      jest.advanceTimersByTime(200);
    });

    expect(spy2).toHaveBeenCalledTimes(0);
    expect(counter).toBe(0);
  });
});
