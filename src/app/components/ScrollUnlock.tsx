"use client";

import { useEffect } from "react";

export default function ScrollUnlock() {
  useEffect(() => {
    const unlock = () => {
      window.scrollTo(window.scrollX, window.scrollY + 1);
      window.scrollTo(window.scrollX, window.scrollY);
    };

    const id = window.setTimeout(unlock, 50);
    return () => window.clearTimeout(id);
  }, []);

  return null;
}
