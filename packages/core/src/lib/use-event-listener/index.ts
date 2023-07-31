import { useRef, useEffect, EventHandler, useCallback } from 'react';
import '@jswork/next-dom-event';

interface Destroyable {
  destroy: () => void;
}

export const useEventListener = (
  inEventName: string,
  inHandler: EventHandler<any>,
  inElement: Element | Window | null = window
): Destroyable => {
  const savedHandler = useRef<EventListener>();
  const resource = useRef<Destroyable>();
  const destroy = useCallback(() => resource.current!.destroy(), []);

  useEffect(() => {
    savedHandler.current = inHandler;
  }, [inHandler]);

  useEffect(() => {
    resource.current = nx.DomEvent.on(inElement, inEventName, savedHandler.current) as Destroyable;
    return destroy;
  }, [inEventName, inElement]);

  return { destroy };
};
