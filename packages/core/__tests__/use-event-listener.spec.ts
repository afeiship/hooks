import {renderHook} from '@testing-library/react-hooks';
import {useEventListener} from '@/lib/use-event-listener';
import {fireEvent, screen} from '@testing-library/react';
import {EventHandler} from 'react';

describe('useEventListener()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '<div id="test"><button>Hi</button><span id="res"></span></div>';
  });

  test('should bind element when element provide', () => {
    const hiElement = document.querySelector('#test button') as HTMLButtonElement;
    const handler = () => {
      document.querySelector('#res')!.innerHTML = 'res';
    };
    renderHook(() => useEventListener('click', handler, hiElement));
    fireEvent.click(hiElement);
    expect(document.querySelector('#res')!.innerHTML).toBe('res');
  });

  test('should bind windown when element not provide', () => {
    const handler = () => {
      document.querySelector('#res')!.innerHTML = 'res-window';
    };
    renderHook(() => useEventListener('click', handler));
    fireEvent.click(document);
    expect(document.querySelector('#res')!.innerHTML).toBe('res-window');
  });

  test('should unbind the event listener from the window after the hook is unmounted', () => {
    // Act
    const {unmount} = renderHook(() => useEventListener('click', jest.fn()));
    unmount();
    fireEvent.click(document);

    // Assert
    expect(jest.fn()).not.toBeCalled();
    expect(document.querySelector('#res')!.innerHTML).toBe('');
  });

  test('manual unbind event', () => {
    // Arrange
    const fn1 = () => {
      console.log('called.')
    };
    const spy1 = jest.fn(fn1);

    // Act
    const {result} = renderHook(() => useEventListener('click', spy1));
    fireEvent.click(document);
    // Assert
    expect(spy1).toBeCalledTimes(1);

    // Act
    result.current.destroy();
    fireEvent.click(document);

    // Assert
    expect(spy1).toBeCalledTimes(1);
  });
});
