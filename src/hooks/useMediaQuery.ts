import { useState, useEffect } from 'react';

export function useMediaQuery(breakpoint = 640) {
  const [matches, setMatches] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setMatches(e.matches);

    handler(mq);

    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);

  return matches;
}

