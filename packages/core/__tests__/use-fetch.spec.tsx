import { act, renderHook } from '@testing-library/react-hooks';
import {screen, render, fireEvent} from '@testing-library/react';
import { useFetch } from '@/lib/use-fetch';
import React from 'react';
import { D1 } from './fixtures/d1';

describe('useFetch()', () => {
  test('should use fetch', async () => {
    // jest.useFakeTimers();
    render(<D1 />);
    // fireEvent.click(screen.getByText('Hi'));
    // screen.debug();
    // const { result } = renderHook(() => useFetch('https://api.github.com/users/afeiship'));

    // console.log(result.current);
    // expect(result.current).toBe(null);
    // expect(result.current.value).toBe(false);
    // expect(typeof result.current.setTrue).toBe('function');
    // expect(typeof result.current.setFalse).toBe('function');
    // expect(typeof result.current.toggle).toBe('function');
    // expect(typeof result.current.setValue).toBe('function');
    // jest.advanceTimersByTime(6000);
    // console.log(result.current, result.current.data);
    // expect(1 + 1).toBe(2);
  });
});
