// src/components/hooks/useIsScrolled.ts
"use client";

import { useEffect, useState } from "react";

export function useIsScrolled(threshold = 100) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      if ((scrollY > threshold) !== isScrolled) {
  setIsScrolled(scrollY > threshold);
}

    };

    // Check initial scroll position
    checkScroll();

    // Add scroll event listener
    window.addEventListener("scroll", checkScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [threshold]);

  return isScrolled;
}

export default useIsScrolled;
