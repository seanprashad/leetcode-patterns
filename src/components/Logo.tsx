"use client";

import { useEffect, useState } from "react";

export default function Logo() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);

    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (!mounted) return <div className="h-8 sm:h-10" />;

  return (
    <img
      src={dark ? "/logo-dark.png" : "/logo-light.png"}
      alt="Leetcode Patterns"
      className="h-8 sm:h-10"
    />
  );
}
