import { useEffect } from 'react';
import type { RefObject } from 'react';

interface UseClickOutsideOptions<T extends HTMLElement> {
  ref: RefObject<T | null>;
  handler: () => void;
  isEnabled?: boolean;
}

export function useClickOutside<T extends HTMLElement>({
  ref,
  handler,
  isEnabled = true,
}: UseClickOutsideOptions<T>) {
  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler, isEnabled]);
}
