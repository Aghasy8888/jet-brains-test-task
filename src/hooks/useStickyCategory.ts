import { useState, useEffect, useRef } from 'react';

interface UseStickyCategoryReturn {
  activeStickyCategory: string | null;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  registerCategoryRef: (
    categoryName: string
  ) => (element: HTMLDivElement | null) => void;
}

export function useStickyCategory(
  openCategories: Set<string>
): UseStickyCategoryReturn {
  const [activeStickyCategory, setActiveStickyCategory] = useState<
    string | null
  >(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const rafIdRef = useRef<number | null>(null);

  const updateActiveSticky = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || openCategories.size === 0) {
      setActiveStickyCategory(null);
      return;
    }

    const containerTop = scrollContainer.getBoundingClientRect().top;
    let candidateCategory: string | null = null;
    let candidateTop = -Infinity;

    for (const categoryName of openCategories) {
      const element = categoryRefs.current.get(categoryName);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementBottom = rect.bottom;

      if (elementTop <= containerTop + 2 && elementBottom > containerTop) {
        if (elementTop > candidateTop) {
          candidateTop = elementTop;
          candidateCategory = categoryName;
        }
      }
    }

    setActiveStickyCategory((prev) => {
      if (candidateCategory) {
        return candidateCategory;
      }

      if (!prev) return null;
      if (!openCategories.has(prev)) return null;

      const prevElement = categoryRefs.current.get(prev);
      if (!prevElement) return null;

      const prevRect = prevElement.getBoundingClientRect();
      const prevTop = prevRect.top;
      const prevBottom = prevRect.bottom;

      if (prevTop <= containerTop + 2 && prevBottom > containerTop) {
        return prev;
      }
      return null;
    });
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    updateActiveSticky();

    const observer = new IntersectionObserver(
      () => {
        updateActiveSticky();
      },
      {
        root: scrollContainer,
        rootMargin: '0px',
        threshold: [0],
      }
    );

    const handleScroll = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        updateActiveSticky();
        rafIdRef.current = null;
      });
    };

    categoryRefs.current.forEach((element, categoryName) => {
      if (openCategories.has(categoryName)) {
        observer.observe(element);
      } else {
        observer.unobserve(element);
        setActiveStickyCategory((prev) =>
          prev === categoryName ? null : prev
        );
      }
    });

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [openCategories]);

  const registerCategoryRef = (categoryName: string) => {
    return (element: HTMLDivElement | null) => {
      if (element) {
        categoryRefs.current.set(categoryName, element);
      } else {
        categoryRefs.current.delete(categoryName);
      }
    };
  };

  return {
    activeStickyCategory,
    scrollContainerRef,
    registerCategoryRef,
  };
}
