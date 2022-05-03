import { useRef, useEffect } from 'react';
import NxDomEvent from '@jswork/next-dom-event';

type Handler = (event: Event) => void;

export const useEventListener = (
  eventName: string,
  handler: Handler,
  element: Element | Window | null = window
) => {
  const savedHandler = useRef<Handler>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const resource = NxDomEvent.on(element, eventName, savedHandler.current);
    return () => resource.destroy();
  }, [eventName, element]);
};
