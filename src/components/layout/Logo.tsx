"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export default function Logo() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={dark ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/logo-dark.png` : `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/logo-light.png`}
      alt="Leetcode Patterns"
      className="h-8 sm:h-10"
    />
  );
}
