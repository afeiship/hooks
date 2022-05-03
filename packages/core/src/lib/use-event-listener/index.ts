import { useRef, useEffect, EventHandler, useCallback } from 'react';
import NxDomEvent from '@jswork/next-dom-event';

interface Destroyable {
  destroy: () => void;
}

export const useEventListener = (
  eventName: string,
  handler: React.EventHandler<any>,
  element: Element | Window | null = window
): Destroyable => {
  const savedHandler = useRef<EventListener>();
  const resource = useRef<Destroyable>();
  const destroy = useCallback(() => resource.current!.destroy(), []);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    resource.current = NxDomEvent.on(element, eventName, savedHandler.current) as Destroyable;
    return destroy;
  }, [eventName, element]);

  return { destroy };
};
