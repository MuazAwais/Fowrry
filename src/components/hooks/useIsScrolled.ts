// src/components/hooks/useIsScrolled.ts
"use client";

import { useEffect, useRef, useState } from "react";

export function useIsScrolled(threshold = 0) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return isScrolled;
}

export default useIsScrolled;
